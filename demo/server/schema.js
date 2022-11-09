
const dataArray = [
    {
        "id": 2,
        "name": "El Tarter",
        "population": 1052,
        "country_id": 1
    },
    {
        "id": 3,
        "name": "La Massana",
        "population": 7211,
        "country_id": 1
    },
    {
        "id": 4,
        "name": "Canillo",
        "population": 3292,
        "country_id": 1
    }
]

const { 
  GraphQLSchema, 
  GraphQLObjectType, 
  GraphQLString, 
  GraphQLList, 
  GraphQLInt, 
  GraphQLNonNull 
} = require('graphql');

const City = new GraphQLObjectType({
  name: 'Cities', 
  description: 'City information',
  fields: () => ({
    id: { type: GraphQLNonNull(GraphQLInt)},
    name:  { type: GraphQLNonNull(GraphQLString)},
    population:  { type: GraphQLNonNull(GraphQLInt)},
    country_id: { type: GraphQLNonNull(GraphQLInt)}
  })
});

const RootQueryType = new GraphQLObjectType({
  name: 'Query', 
  description: 'Root Query', 
  type: 'Query',
  fields: () => ({
    cities: {
      type: new GraphQLList(City), 
      resolve: async (parentValue, args) => {
        return dataArray;
      }
    },
  }),
});

const schema = new GraphQLSchema({
  query: RootQueryType,
  type: [City]
});

module.exports = schema; 