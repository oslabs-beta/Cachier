const fetch = (...args) =>
  import('node-fetch').then(({ default: fetch }) => fetch(...args));

const testQuery = '{ clients { id name email phone } }';

const singleQuery = `{
  client(id:"637467069709ed1503e1f48b"){
    id
    __typename
    name 
  }
}`;

console.log(seperateOuterQueries(singleQuery));

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
    value += query[index];
  }
  variables[key] = value.slice(1, -1);

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
  let tempStr = '';

  while (bracketCount > 0) {
    if (query[index++] === '{') bracketCount--;
  }

  while (bracketCount >= 0 && index < query.length) {
    if (query[index] === '}') {
      bracketCount--;
      break;
    }
    if (query[index] === '{') {
      bracketCount++;
    }

    while (query[index] === ' ' || query.charCodeAt(index) === 10) {
      ++index;
    }

    while (
      query[index] !== ' ' &&
      query.charCodeAt(index) !== 10 &&
      index < query.length &&
      query[index] !== '}'
    ) {
      tempStr += query[index];
      ++index;
    }
    if (tempStr !== '') {
      resultArr.push(tempStr);
      tempStr = '';
    }
    index++;
  }
  return resultArr;
}

function createKeyForVariableQuery(query) {
  const id = checkVariable(query).id;
  const type = checkType(query);
  return `${type}:${id}`;
}

console.log(checkVariable(singleQuery));
console.log(checkType(singleQuery));
console.log(createKeyForVariableQuery(singleQuery));
console.log(seperateInnerQueries(singleQuery));
console.log(
  seperateOuterQueries(singleQuery).map((query) => {
    seperateInnerQueries(query);
  })
);

function partialQueryCache(endpoint) {
  const cache = {};

  return async function checkCache() {
    const query = testQuery;
    const variable = checkVariable(query);

    if (variable) {
      const cacheKey = createKeyForVariableQuery(query);
      if (cache[cacheKey]) {
      } else {
        fetch(endpoint, {
          method: 'POST',
          headers: { 'Content-type': 'application/json' },
          body: JSON.stringify({
            query,
          }),
        })
          .then((response) => response.json())
          .then((data) => {
            const type = checkType(query);
            console.log(data.data[type]);
            cache[cacheKey] = data.data[type];
            console.log(cache);
          });
      }
    } else {
      const cacheKey = checkType(query);
      if (cache[cacheKey]) {
      } else {
      }
    }
  };
}

const test = partialQueryCache('http://localhost:3000/graphql');
test();
