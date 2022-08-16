// Import errors
const { errorName } = require('./errors/errors')

// Mongoose Schema
const Url = require(`../models/Url`)

// Import shortid and validUrl
const validUrl = require('valid-url')
const shortid = require('shortid')

// Import GraphQL
const { 
  GraphQLObjectType, 
  GraphQLID, 
  GraphQLString, 
  GraphQLSchema, 
  GraphQLList,
  GraphQLNonNull
} = require("graphql");

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

// Mutations
const mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    
    // Add URL Mutation
    addUrl: {
      type: UrlType,
      args: {
        longUrl: { type: GraphQLNonNull(GraphQLString) }
      },
      resolve(parent, args) {
        const { longUrl } = args
        const baseUrl = process.env.BASE_URL

        // Check base url
        if (!validUrl.isUri(baseUrl)) {
          throw new Error(errorName.UNAUTHORIZED)
        } 

        // generate short code
        const urlCode = shortid.generate();

        // Check long url
        if (validUrl.isUri(longUrl)) {
          try {
            let urlMutationRequest = Url.findOne({ longUrl })
              .then(url => {
                if (url) {
                  console.log(url)
                  return Url.findOne({ longUrl })
                } 
                // Create new record if not existing
                else {
                  const shortUrl = baseUrl + "/" + urlCode
    
                  url = new Url({
                    urlCode,
                    longUrl,
                    shortUrl,
                  })
    
                  return url.save()
                }
              })

              // Return result
              return urlMutationRequest
          } catch (err) {
            throw err
          }
        } else {
          throw new Error(errorName.INVALID_LONG_URL)
        }
      }
    },

    // Additional mutations add here if needed

  }
})

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation

})