const { Neo4jGraphQL } = require("@neo4j/graphql");
const { ApolloServer } = require("apollo-server");
const neo4j = require("neo4j-driver");
const typeDefs = require("../graphql/schema");

const driver = neo4j.driver(
    "bolt://it2810-36.idi.ntnu.no:7687/",
    neo4j.auth.basic(NO, ACCESS)
);

const neoSchema = new Neo4jGraphQL({ typeDefs, driver });

neoSchema.getSchema().then((schema) => {
    const server = new ApolloServer({
        schema,
    });

    server.listen().then(({ url }) => {
        console.log(`Great success at ${url}!`);
    });
});
