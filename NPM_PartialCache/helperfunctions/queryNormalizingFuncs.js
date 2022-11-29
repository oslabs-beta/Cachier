/**
 * ***********************************
 *
 * @module trunQify
 * @date 11/5/2019
 * @params apiURL (string), port (integer), timer (integer)
 *
 * @description A Massive he
 * ***********************************
 */

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

//Adds '__typename' field to every sub query. Helper function to ensure each subquery returns its typename which is crucial for creating unique keys in the cache.
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

module.exports = { queryNormalizer, addTypenameField };
