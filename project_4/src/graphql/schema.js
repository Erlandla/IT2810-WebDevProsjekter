const { gql } = require("@apollo/client");

const typeDefs = gql`
    type Movie {
        id: Int!
        primaryTitle: String!
        lowercaseTitle: String
        isAdult: Boolean
        releaseYear: Int
        runtimeMinutes: Int
        genres: String
        averageRating: Float
        numVotes: Int
    }
`;

module.exports = typeDefs;
