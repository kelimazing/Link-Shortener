const Url = require(`../models/Url`)

const { 
  GraphQLObjectType, 
  GraphQLID, 
  GraphQLString, 
  GraphQLSchema, 
  GraphQLList
} = require("graphql");
const sampleData = require("../sampledata");

// URL TYPE
const UrlType = new GraphQLObjectType({
  name: 'Url',
  fields: () => ({
    id: { type: GraphQLID },
    urlCode: { type: GraphQLString },
    longUrl: { type: GraphQLString },
    shortUrl: { type: GraphQLString },
  })
})


// ROOT QUERY
const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    urls: {
      type: new GraphQLList(UrlType),
      resolve(parent, args) {
        return Url.find()
      }
    },
    url: {
      type: UrlType,
      args: { urlCode: { type: GraphQLString }},
      resolve(parent, args) {
        return Url.findOne({ urlCode: args.urlCode})
      }
    }
  }
});

module.exports = new GraphQLSchema({
  query: RootQuery,

})