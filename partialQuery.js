const fetch = (...args) =>
  import('node-fetch').then(({ default: fetch }) => fetch(...args));

const singleQuery = `query Query {
  allFilms {
    films {
      title
      director
      releaseDate
      speciesConnection {
        species {
          name
          classification
          homeworld {
            name
          }
        }
      }
    }
  }
}
`;

const testPartialQuery = `query Query {
  allFilms {
    films {
      title
      director
      releaseDate
      speciesConnection {
        species {
          name
          classification
          homeworld {
            name
          }
        }
      }
    }
  }
}`;

const uniques = { films: 'title', species: 'id' };

function addTypenameField(query) {
  let newQuery = '';
  let bracketCount = 2;
  let index = 0;
  while (bracketCount > 0) {
    if (query[index] === '{') bracketCount--;
    newQuery += query[index++];
  }

  newQuery += ' __typename';

  while (query[index] !== undefined) {
    newQuery += query[index];
    if (query[index] === '{') newQuery += ' __typename';
    index++;
  }
  console.log(newQuery);
  return newQuery;
}

function seperateOuterQueries(query) {
  const outerQueryArr = [];
  let index = 0;
  let mainbracketCount = 1;
  while (query[index] !== '{') {
    index++;
  }
  index++;
  while (mainbracketCount > 0) {
    let currQueryStr = '{';
    let currInnerBracketCount = 1;
    while (query[index] !== '{') {
      if (query[index] === '}') {
        return outerQueryArr;
      }
      currQueryStr += query[index];
      index++;
    }
    currQueryStr += query[index];
    index++;
    mainbracketCount++;
    while (currInnerBracketCount > 0) {
      if (query[index] === '{') {
        currInnerBracketCount++;
        mainbracketCount++;
      }
      if (query[index] === '}') {
        currInnerBracketCount--;
        mainbracketCount--;
      }
      currQueryStr += query[index];
      index++;
    }
    outerQueryArr.push((currQueryStr += '}'));
  }
  return outerQueryArr;
}

function checkVariable(query) {
  const variables = {};
  let key = '';
  let value = '';
  let index = 0;

  while (query[index] !== '(') {
    if (query[index] === '}') return false;
    index++;
  }
  while (query[++index] !== ':') {
    key += query[index];
  }
  while (query[++index] !== ')') {
    if (query[index] !== '"' && query[index] !== "'" && query[index] !== ' ') {
      value += query[index];
    }
  }
  key = key.toLowerCase().trim();
  variables[key] = value.trim();

  return variables;
}

function checkType(query) {
  let index = 0;
  let str = '';
  while (query[index] !== '{') {
    index++;
  }
  index++;
  while (query[index] !== '(' && query[index] !== '{') {
    if (query[index] !== ' ' && query.charCodeAt(index) !== 10) {
      str += query[index];
    }
    index++;
  }

  return str;
}

function seperateInnerQueries(query) {
  const resultArr = [];
  let bracketCount = 2;
  let index = 0;
  let obj = {};
  let tempStr = '';

  while (bracketCount > 0) {
    if (query[index++] === '{') bracketCount--;
  }
  const helper = () => {
    while (bracketCount >= 0 && index < query.length) {
      if (query[index] === '}') {
        bracketCount--;
        index++;
      }

      while (query[index] === ' ' || query.charCodeAt(index) === 10) {
        ++index;
      }
      while (
        query[index] !== ' ' &&
        query.charCodeAt(index) !== 10 &&
        index < query.length &&
        query[index] !== '}' &&
        query[index] !== '{'
      ) {
        tempStr += query[index];
        ++index;
      }
      if (query[index] === '{') {
        bracketCount++;
        index++;
        const key = resultArr[resultArr.length - 1];
        resultArr[resultArr.length - 1] = {};
        resultArr[resultArr.length - 1][key] = [];
        let currArray = resultArr[resultArr.length - 1][key];

        while (bracketCount >= 1) {
          let nestStr = '';
          if (query[index] === '}') {
            bracketCount--;
          }
          while (
            query[index] !== ' ' &&
            query.charCodeAt(index) !== 10 &&
            index < query.length &&
            query[index] !== '}' &&
            query[index] !== '{'
          ) {
            nestStr += query[index];
            ++index;
          }

          if (query[index + 1] === '{') {
            bracketCount++;

            currArray.push({});
            currArray[currArray.length - 1][nestStr] = [];
            currArray = currArray[currArray.length - 1][nestStr];
            nestStr = '';
          } else if (nestStr !== '') {
            currArray.push(nestStr);
          }
          index++;
        }
        // }
      }
      if (tempStr !== '') {
        resultArr.push(tempStr);
        tempStr = '';
      }
    }

    index++;
  };
  helper();
  return resultArr;
}

function createKeyForVariableQuery(query) {
  const variable = Object.keys(checkVariable(query))[0];
  const id = checkVariable(query)[variable];
  const type = checkType(query);
  if (!id) return type;
  return `${type}:${id}`;
}

function queryNormalizer(query, addType = true) {
  if (addType) {
    query = addTypenameField(query);
  }
  const outerQueryArr = seperateOuterQueries(query);
  const normalizedQueryObj = {};
  normalizedQueryObj.typesArr = outerQueryArr.map((query) => checkType(query));
  normalizedQueryObj.cacheKeysArr = outerQueryArr.map((query) =>
    createKeyForVariableQuery(query)
  );
  normalizedQueryObj.fieldsArr = outerQueryArr.map((query) =>
    seperateInnerQueries(query)
  );

  return normalizedQueryObj;
}
console.log(queryNormalizer(singleQuery).typesArr);
console.log(queryNormalizer(singleQuery).cacheKeysArr);
console.log(queryNormalizer(singleQuery).fieldsArr);

console.log('QUERY', queryNormalizer(singleQuery));
const data = {
  data: {
    __typename: 'Root',
    allFilms: {
      __typename: 'FilmsConnection',
      films: [
        {
          __typename: 'Film',
          title: 'A New Hope',
          director: 'George Lucas',
          releaseDate: '1977-05-25',
          speciesConnection: {
            __typename: 'FilmSpeciesConnection',
            species: [
              {
                id: 'c3BlY2llczox',
                __typename: 'Species',
                name: 'Human',
                classification: 'mammal',
                homeworld: {
                  __typename: 'Planet',
                  name: 'Coruscant',
                },
              },
              {
                id: 'c3BlY2llczoy',
                __typename: 'Species',
                name: 'Droid',
                classification: 'artificial',
                homeworld: null,
              },
              {
                id: 'c3BlY2llczoz',
                __typename: 'Species',
                name: 'Wookie',
                classification: 'mammal',
                homeworld: {
                  __typename: 'Planet',
                  name: 'Kashyyyk',
                },
              },
              {
                id: 'c3BlY2llczo0',
                __typename: 'Species',
                name: 'Rodian',
                classification: 'sentient',
                homeworld: {
                  __typename: 'Planet',
                  name: 'Rodia',
                },
              },
              {
                id: 'c3BlY2llczo1',
                __typename: 'Species',
                name: 'Hutt',
                classification: 'gastropod',
                homeworld: {
                  __typename: 'Planet',
                  name: 'Nal Hutta',
                },
              },
            ],
          },
        },
        {
          __typename: 'Film',
          title: 'The Empire Strikes Back',
          director: 'Irvin Kershner',
          releaseDate: '1980-05-17',
          speciesConnection: {
            __typename: 'FilmSpeciesConnection',
            species: [
              {
                id: 'c3BlY2llczox',
                __typename: 'Species',
                name: 'Human',
                classification: 'mammal',
                homeworld: {
                  __typename: 'Planet',
                  name: 'Coruscant',
                },
              },
              {
                id: 'c3BlY2llczoy',
                __typename: 'Species',
                name: 'Droid',
                classification: 'artificial',
                homeworld: null,
              },
              {
                id: 'c3BlY2llczoz',
                __typename: 'Species',
                name: 'Wookie',
                classification: 'mammal',
                homeworld: {
                  __typename: 'Planet',
                  name: 'Kashyyyk',
                },
              },
              {
                id: 'c3BlY2llczo2',
                __typename: 'Species',
                name: "Yoda's species",
                classification: 'mammal',
                homeworld: {
                  __typename: 'Planet',
                  name: 'unknown',
                },
              },
              {
                id: 'c3BlY2llczo3',
                __typename: 'Species',
                name: 'Trandoshan',
                classification: 'reptile',
                homeworld: {
                  __typename: 'Planet',
                  name: 'Trandosha',
                },
              },
            ],
          },
        },
        {
          __typename: 'Film',
          title: 'Return of the Jedi',
          director: 'Richard Marquand',
          releaseDate: '1983-05-25',
          speciesConnection: {
            __typename: 'FilmSpeciesConnection',
            species: [
              {
                id: 'c3BlY2llczox',
                __typename: 'Species',
                name: 'Human',
                classification: 'mammal',
                homeworld: {
                  __typename: 'Planet',
                  name: 'Coruscant',
                },
              },
              {
                id: 'c3BlY2llczoy',
                __typename: 'Species',
                name: 'Droid',
                classification: 'artificial',
                homeworld: null,
              },
              {
                id: 'c3BlY2llczoz',
                __typename: 'Species',
                name: 'Wookie',
                classification: 'mammal',
                homeworld: {
                  __typename: 'Planet',
                  name: 'Kashyyyk',
                },
              },
              {
                id: 'c3BlY2llczo1',
                __typename: 'Species',
                name: 'Hutt',
                classification: 'gastropod',
                homeworld: {
                  __typename: 'Planet',
                  name: 'Nal Hutta',
                },
              },
              {
                id: 'c3BlY2llczo2',
                __typename: 'Species',
                name: "Yoda's species",
                classification: 'mammal',
                homeworld: {
                  __typename: 'Planet',
                  name: 'unknown',
                },
              },
              {
                id: 'c3BlY2llczo4',
                __typename: 'Species',
                name: 'Mon Calamari',
                classification: 'amphibian',
                homeworld: {
                  __typename: 'Planet',
                  name: 'Mon Cala',
                },
              },
              {
                id: 'c3BlY2llczo5',
                __typename: 'Species',
                name: 'Ewok',
                classification: 'mammal',
                homeworld: {
                  __typename: 'Planet',
                  name: 'Endor',
                },
              },
              {
                id: 'c3BlY2llczoxMA==',
                __typename: 'Species',
                name: 'Sullustan',
                classification: 'mammal',
                homeworld: {
                  __typename: 'Planet',
                  name: 'Sullust',
                },
              },
              {
                id: 'c3BlY2llczoxNQ==',
                __typename: 'Species',
                name: "Twi'lek",
                classification: 'mammals',
                homeworld: {
                  __typename: 'Planet',
                  name: 'Ryloth',
                },
              },
            ],
          },
        },
        {
          __typename: 'Film',
          title: 'The Phantom Menace',
          director: 'George Lucas',
          releaseDate: '1999-05-19',
          speciesConnection: {
            __typename: 'FilmSpeciesConnection',
            species: [
              {
                id: 'c3BlY2llczox',
                __typename: 'Species',
                name: 'Human',
                classification: 'mammal',
                homeworld: {
                  __typename: 'Planet',
                  name: 'Coruscant',
                },
              },
              {
                id: 'c3BlY2llczoy',
                __typename: 'Species',
                name: 'Droid',
                classification: 'artificial',
                homeworld: null,
              },
              {
                id: 'c3BlY2llczo2',
                __typename: 'Species',
                name: "Yoda's species",
                classification: 'mammal',
                homeworld: {
                  __typename: 'Planet',
                  name: 'unknown',
                },
              },
              {
                id: 'c3BlY2llczoxMQ==',
                __typename: 'Species',
                name: 'Neimodian',
                classification: 'unknown',
                homeworld: {
                  __typename: 'Planet',
                  name: 'Cato Neimoidia',
                },
              },
              {
                id: 'c3BlY2llczoxMg==',
                __typename: 'Species',
                name: 'Gungan',
                classification: 'amphibian',
                homeworld: {
                  __typename: 'Planet',
                  name: 'Naboo',
                },
              },
              {
                id: 'c3BlY2llczoxMw==',
                __typename: 'Species',
                name: 'Toydarian',
                classification: 'mammal',
                homeworld: {
                  __typename: 'Planet',
                  name: 'Toydaria',
                },
              },
              {
                id: 'c3BlY2llczoxNA==',
                __typename: 'Species',
                name: 'Dug',
                classification: 'mammal',
                homeworld: {
                  __typename: 'Planet',
                  name: 'Malastare',
                },
              },
              {
                id: 'c3BlY2llczoxNQ==',
                __typename: 'Species',
                name: "Twi'lek",
                classification: 'mammals',
                homeworld: {
                  __typename: 'Planet',
                  name: 'Ryloth',
                },
              },
              {
                id: 'c3BlY2llczoxNg==',
                __typename: 'Species',
                name: 'Aleena',
                classification: 'reptile',
                homeworld: {
                  __typename: 'Planet',
                  name: 'Aleen Minor',
                },
              },
              {
                id: 'c3BlY2llczoxNw==',
                __typename: 'Species',
                name: 'Vulptereen',
                classification: 'unknown',
                homeworld: {
                  __typename: 'Planet',
                  name: 'Vulpter',
                },
              },
              {
                id: 'c3BlY2llczoxOA==',
                __typename: 'Species',
                name: 'Xexto',
                classification: 'unknown',
                homeworld: {
                  __typename: 'Planet',
                  name: 'Troiken',
                },
              },
              {
                id: 'c3BlY2llczoxOQ==',
                __typename: 'Species',
                name: 'Toong',
                classification: 'unknown',
                homeworld: {
                  __typename: 'Planet',
                  name: 'Tund',
                },
              },
              {
                id: 'c3BlY2llczoyMA==',
                __typename: 'Species',
                name: 'Cerean',
                classification: 'mammal',
                homeworld: {
                  __typename: 'Planet',
                  name: 'Cerea',
                },
              },
              {
                id: 'c3BlY2llczoyMQ==',
                __typename: 'Species',
                name: 'Nautolan',
                classification: 'amphibian',
                homeworld: {
                  __typename: 'Planet',
                  name: 'Glee Anselm',
                },
              },
              {
                id: 'c3BlY2llczoyMg==',
                __typename: 'Species',
                name: 'Zabrak',
                classification: 'mammal',
                homeworld: {
                  __typename: 'Planet',
                  name: 'Iridonia',
                },
              },
              {
                id: 'c3BlY2llczoyMw==',
                __typename: 'Species',
                name: 'Tholothian',
                classification: 'mammal',
                homeworld: {
                  __typename: 'Planet',
                  name: 'Tholoth',
                },
              },
              {
                id: 'c3BlY2llczoyNA==',
                __typename: 'Species',
                name: 'Iktotchi',
                classification: 'unknown',
                homeworld: {
                  __typename: 'Planet',
                  name: 'Iktotch',
                },
              },
              {
                id: 'c3BlY2llczoyNQ==',
                __typename: 'Species',
                name: 'Quermian',
                classification: 'mammal',
                homeworld: {
                  __typename: 'Planet',
                  name: 'Quermia',
                },
              },
              {
                id: 'c3BlY2llczoyNg==',
                __typename: 'Species',
                name: 'Kel Dor',
                classification: 'unknown',
                homeworld: {
                  __typename: 'Planet',
                  name: 'Dorin',
                },
              },
              {
                id: 'c3BlY2llczoyNw==',
                __typename: 'Species',
                name: 'Chagrian',
                classification: 'amphibian',
                homeworld: {
                  __typename: 'Planet',
                  name: 'Champala',
                },
              },
            ],
          },
        },
        {
          __typename: 'Film',
          title: 'Attack of the Clones',
          director: 'George Lucas',
          releaseDate: '2002-05-16',
          speciesConnection: {
            __typename: 'FilmSpeciesConnection',
            species: [
              {
                id: 'c3BlY2llczox',
                __typename: 'Species',
                name: 'Human',
                classification: 'mammal',
                homeworld: {
                  __typename: 'Planet',
                  name: 'Coruscant',
                },
              },
              {
                id: 'c3BlY2llczoy',
                __typename: 'Species',
                name: 'Droid',
                classification: 'artificial',
                homeworld: null,
              },
              {
                id: 'c3BlY2llczo2',
                __typename: 'Species',
                name: "Yoda's species",
                classification: 'mammal',
                homeworld: {
                  __typename: 'Planet',
                  name: 'unknown',
                },
              },
              {
                id: 'c3BlY2llczoxMg==',
                __typename: 'Species',
                name: 'Gungan',
                classification: 'amphibian',
                homeworld: {
                  __typename: 'Planet',
                  name: 'Naboo',
                },
              },
              {
                id: 'c3BlY2llczoxMw==',
                __typename: 'Species',
                name: 'Toydarian',
                classification: 'mammal',
                homeworld: {
                  __typename: 'Planet',
                  name: 'Toydaria',
                },
              },
              {
                id: 'c3BlY2llczoxNQ==',
                __typename: 'Species',
                name: "Twi'lek",
                classification: 'mammals',
                homeworld: {
                  __typename: 'Planet',
                  name: 'Ryloth',
                },
              },
              {
                id: 'c3BlY2llczoyOA==',
                __typename: 'Species',
                name: 'Geonosian',
                classification: 'insectoid',
                homeworld: {
                  __typename: 'Planet',
                  name: 'Geonosis',
                },
              },
              {
                id: 'c3BlY2llczoyOQ==',
                __typename: 'Species',
                name: 'Mirialan',
                classification: 'mammal',
                homeworld: {
                  __typename: 'Planet',
                  name: 'Mirial',
                },
              },
              {
                id: 'c3BlY2llczozMA==',
                __typename: 'Species',
                name: 'Clawdite',
                classification: 'reptilian',
                homeworld: {
                  __typename: 'Planet',
                  name: 'Zolan',
                },
              },
              {
                id: 'c3BlY2llczozMQ==',
                __typename: 'Species',
                name: 'Besalisk',
                classification: 'amphibian',
                homeworld: {
                  __typename: 'Planet',
                  name: 'Ojom',
                },
              },
              {
                id: 'c3BlY2llczozMg==',
                __typename: 'Species',
                name: 'Kaminoan',
                classification: 'amphibian',
                homeworld: {
                  __typename: 'Planet',
                  name: 'Kamino',
                },
              },
              {
                id: 'c3BlY2llczozMw==',
                __typename: 'Species',
                name: 'Skakoan',
                classification: 'mammal',
                homeworld: {
                  __typename: 'Planet',
                  name: 'Skako',
                },
              },
              {
                id: 'c3BlY2llczozNA==',
                __typename: 'Species',
                name: 'Muun',
                classification: 'mammal',
                homeworld: {
                  __typename: 'Planet',
                  name: 'Muunilinst',
                },
              },
              {
                id: 'c3BlY2llczozNQ==',
                __typename: 'Species',
                name: 'Togruta',
                classification: 'mammal',
                homeworld: {
                  __typename: 'Planet',
                  name: 'Shili',
                },
              },
            ],
          },
        },
        {
          __typename: 'Film',
          title: 'Revenge of the Sith',
          director: 'George Lucas',
          releaseDate: '2005-05-19',
          speciesConnection: {
            __typename: 'FilmSpeciesConnection',
            species: [
              {
                id: 'c3BlY2llczox',
                __typename: 'Species',
                name: 'Human',
                classification: 'mammal',
                homeworld: {
                  __typename: 'Planet',
                  name: 'Coruscant',
                },
              },
              {
                id: 'c3BlY2llczoy',
                __typename: 'Species',
                name: 'Droid',
                classification: 'artificial',
                homeworld: null,
              },
              {
                id: 'c3BlY2llczoz',
                __typename: 'Species',
                name: 'Wookie',
                classification: 'mammal',
                homeworld: {
                  __typename: 'Planet',
                  name: 'Kashyyyk',
                },
              },
              {
                id: 'c3BlY2llczo2',
                __typename: 'Species',
                name: "Yoda's species",
                classification: 'mammal',
                homeworld: {
                  __typename: 'Planet',
                  name: 'unknown',
                },
              },
              {
                id: 'c3BlY2llczoxNQ==',
                __typename: 'Species',
                name: "Twi'lek",
                classification: 'mammals',
                homeworld: {
                  __typename: 'Planet',
                  name: 'Ryloth',
                },
              },
              {
                id: 'c3BlY2llczoxOQ==',
                __typename: 'Species',
                name: 'Toong',
                classification: 'unknown',
                homeworld: {
                  __typename: 'Planet',
                  name: 'Tund',
                },
              },
              {
                id: 'c3BlY2llczoyMA==',
                __typename: 'Species',
                name: 'Cerean',
                classification: 'mammal',
                homeworld: {
                  __typename: 'Planet',
                  name: 'Cerea',
                },
              },
              {
                id: 'c3BlY2llczoyMw==',
                __typename: 'Species',
                name: 'Tholothian',
                classification: 'mammal',
                homeworld: {
                  __typename: 'Planet',
                  name: 'Tholoth',
                },
              },
              {
                id: 'c3BlY2llczoyNA==',
                __typename: 'Species',
                name: 'Iktotchi',
                classification: 'unknown',
                homeworld: {
                  __typename: 'Planet',
                  name: 'Iktotch',
                },
              },
              {
                id: 'c3BlY2llczoyNQ==',
                __typename: 'Species',
                name: 'Quermian',
                classification: 'mammal',
                homeworld: {
                  __typename: 'Planet',
                  name: 'Quermia',
                },
              },
              {
                id: 'c3BlY2llczoyNg==',
                __typename: 'Species',
                name: 'Kel Dor',
                classification: 'unknown',
                homeworld: {
                  __typename: 'Planet',
                  name: 'Dorin',
                },
              },
              {
                id: 'c3BlY2llczoyNw==',
                __typename: 'Species',
                name: 'Chagrian',
                classification: 'amphibian',
                homeworld: {
                  __typename: 'Planet',
                  name: 'Champala',
                },
              },
              {
                id: 'c3BlY2llczoyOA==',
                __typename: 'Species',
                name: 'Geonosian',
                classification: 'insectoid',
                homeworld: {
                  __typename: 'Planet',
                  name: 'Geonosis',
                },
              },
              {
                id: 'c3BlY2llczoyOQ==',
                __typename: 'Species',
                name: 'Mirialan',
                classification: 'mammal',
                homeworld: {
                  __typename: 'Planet',
                  name: 'Mirial',
                },
              },
              {
                id: 'c3BlY2llczozMA==',
                __typename: 'Species',
                name: 'Clawdite',
                classification: 'reptilian',
                homeworld: {
                  __typename: 'Planet',
                  name: 'Zolan',
                },
              },
              {
                id: 'c3BlY2llczozMw==',
                __typename: 'Species',
                name: 'Skakoan',
                classification: 'mammal',
                homeworld: {
                  __typename: 'Planet',
                  name: 'Skako',
                },
              },
              {
                id: 'c3BlY2llczozNA==',
                __typename: 'Species',
                name: 'Muun',
                classification: 'mammal',
                homeworld: {
                  __typename: 'Planet',
                  name: 'Muunilinst',
                },
              },
              {
                id: 'c3BlY2llczozNQ==',
                __typename: 'Species',
                name: 'Togruta',
                classification: 'mammal',
                homeworld: {
                  __typename: 'Planet',
                  name: 'Shili',
                },
              },
              {
                id: 'c3BlY2llczozNg==',
                __typename: 'Species',
                name: 'Kaleesh',
                classification: 'reptile',
                homeworld: {
                  __typename: 'Planet',
                  name: 'Kalee',
                },
              },
              {
                id: 'c3BlY2llczozNw==',
                __typename: 'Species',
                name: "Pau'an",
                classification: 'mammal',
                homeworld: null,
              },
            ],
          },
        },
      ],
    },
  },
};
function iterateFieldsArr(fieldArr, currCacheKey, data, dataKey, currCache) {
  let currDepthObj = {};
  currCache[currCacheKey] = currDepthObj;

  for (let j = 0; j < fieldArr.length; j++) {
    if (Array.isArray(data[dataKey])) {
      const tempArr = [];
      let index = 0;

      data[dataKey].forEach((obj) => {
        // may need to edge case check in future to have error in case user forgets to insert a unique id.
        const unique = uniques[currCacheKey] || 'id';
        const objTypeName = `${obj.__typename}`;
        const uniqueKey = `${objTypeName.toLowerCase()}:${obj[unique]}`;

        tempArr.push(uniqueKey);
        currCache[uniqueKey] = iterateFieldsArr(
          fieldArr,
          index,
          data[dataKey],
          index,
          currCache[currCacheKey]
        );
        index++;
      });
      currCache[currCacheKey] = tempArr;
    } else if (typeof fieldArr[j] === 'string') {
      currDepthObj[fieldArr[j]] = data[dataKey][fieldArr[j]];
    } else {
      const currNestedFieldName = Object.keys(fieldArr[j])[0];
      if (data[dataKey][currNestedFieldName] === null) {
        currCache[dataKey][currNestedFieldName] = null;
      } else {
        const innerField = fieldArr[j][currNestedFieldName];
        iterateFieldsArr(
          innerField,
          currNestedFieldName,
          data[dataKey],
          currNestedFieldName,
          currCache[currCacheKey]
        );
      }
    }
  }
  return currDepthObj;
}

function cacheNewData(normalizedQuery, data, cache) {
  const { typesArr, cacheKeysArr, fieldsArr } = normalizedQuery;
  const currData = data.data;
  for (let i = 0; i < fieldsArr.length; i++) {
    let currCacheKey = cacheKeysArr[i];
    iterateFieldsArr(fieldsArr[i], currCacheKey, currData, currCacheKey, cache);
  }
  console.log('CACHE', testCache);
}

const testCache = {};
cacheNewData(queryNormalizer(singleQuery), data, testCache);

function iterateCache(fieldArr, currCacheKey, currReturnData, currCache) {
  const currDepthObj = {};
  currReturnData[currCacheKey] = currDepthObj;

  for (let j = 0; j < fieldArr.length; j++) {
    if (currCache[currCacheKey] === undefined) {
      checkMissingData = false;
      return;
    } else {
      if (Array.isArray(currCache[currCacheKey])) {
        const tempArr = [];
        let index = 0;

        currCache[currCacheKey].forEach((key) => {
          tempArr.push(
            iterateCache(
              fieldArr,
              currCache[currCacheKey][index],
              currReturnData[currCacheKey],
              currCache
            )
          );
          if (tempArr[index] === false) {
            checkMissingData = false;
            return;
          }
          index++;
        });
        currReturnData[currCacheKey] = tempArr;
      } else if (typeof fieldArr[j] === 'string') {
        if (currCache[currCacheKey][fieldArr[j]] === undefined) {
          checkMissingData = false;
          return;
        }
        currDepthObj[fieldArr[j]] = currCache[currCacheKey][fieldArr[j]];
      } else {
        const currNestedFieldName = Object.keys(fieldArr[j])[0];
        const innerField = fieldArr[j][currNestedFieldName];
        if (currCache[currCacheKey][currNestedFieldName] === null) {
          currDepthObj[currNestedFieldName] = null;
        } else {
          const result = iterateCache(
            innerField,
            currNestedFieldName,
            currDepthObj,
            currCache[currCacheKey]
          );
          if (result === false) {
            checkMissingData = false;
            return;
          }
        }
      }
    }
  }
  return currDepthObj;
}
let checkMissingData = true;
function checkCache(normalizedQuery, cache) {
  const { typesArr, cacheKeysArr, fieldsArr } = normalizedQuery;
  const resultData = { data: {} };
  const currData = resultData.data;

  for (let i = 0; i < fieldsArr.length; i++) {
    let currCacheKey = cacheKeysArr[i];
    const result = iterateCache(fieldsArr[i], currCacheKey, currData, cache);
  }
  return checkMissingData ? resultData : false;
}
checkCache(queryNormalizer(testPartialQuery, false), testCache);
console.log(
  'RESULTDATA',
  checkCache(queryNormalizer(testPartialQuery, false), testCache)
);

// function partialQueryCache(endpoint) {
//   const cache = {};
//   const uniques = { continents: 'code' };

//   return async function checkCache() {
//     const query = testQuery;
//     const variable = checkVariable(query);

//     if (variable) {
//       const cacheKey = createKeyForVariableQuery(query);
//       if (cache[cacheKey]) {
//       } else {
//         fetch(endpoint, {
//           method: 'POST',
//           headers: { 'Content-type': 'application/json' },
//           body: JSON.stringify({
//             query,
//           }),
//         })
//           .then((response) => response.json())
//           .then((data) => {
//             const type = checkType(query);
//             console.log(data.data[type]);
//             cache[cacheKey] = data.data[type];
//             console.log(cache);
//           });
//       }
//     } else {
//       const cacheKey = checkType(query);
//       if (cache[cacheKey]) {
//       } else {
//       }
//     }
//   };
// }

// const test = partialQueryCache('http://localhost:3000/graphql');
