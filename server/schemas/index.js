// combines and exports both the type definitions and resolvers for easy import in the main server file
const typeDefs = require('./typeDefs');
const resolvers = require('./resolvers');

module.exports = { typeDefs, resolvers };