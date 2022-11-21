const request = require('supertest');
const app = require('../demo/server/server');
const demoFunc = require('../demo/server/DemoFunc');
const CacheMoney = require('../demo/server/cacheMoney');

describe('GraphQL endpoint returns an object', () => {
  describe('/graphql', () => {
    it('is a json object with valid query', async () => {
      const response = await request(app)
        .post('/graphql')
        .send({ query: `{ clients { id name email phone } }` })
        .expect('Content-Type', /application\/json/)
        .expect(200)
        .then((res) => {
          expect(typeof res).toBe('object');
          expect(JSON.stringify(res)).toBe(JSON.stringify(res));
        });
    }, 15000);

    it('returns 400 status on invalid query', async () => {
      const response = await request(app)
        .post('/graphql')
        .send({ query: `` })
        .expect(400);
    });
  });
});

test('Demo func middleware check cache function', () => {
  expect(typeof demoFunc('http://localhost:3000/graphql', 4, 2)).toBe(
    'function'
  );
});

test('Cachier caching returns check cache function', () => {
  expect(typeof CacheMoney('http://localhost:3000/graphql', 4, 2)).toBe(
    'function'
  );
});
