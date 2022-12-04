import { DocumentNode, gql } from "@apollo/client";

/**
 * GraphQL query only for fetching N movies that partially match the given string query, 
 * with pagination enabled.
 * This constant is an input parameter for the hook `useQuery`,
 * as well as the following as the second argument:
 * 
 * `{
        variables: {
            options: {
                limit: N,
                offset: N * page,
            sort: {
                numVotes: props.numVotes,
                averageRating: props.rating,
                releaseYear: props.release,
                runtimeMinutes: props.runtime,
            },
        },
        moviesWhere: {
            lowercaseTitle_CONTAINS:    props.primaryTitle,         // String
            isAdult:                    props.isAdult,              // Boolean
            releaseYear_GTE:            props.releaseYearGTE,       // Int
            releaseYear_LTE:            props.releaseYearLTE,       // Int
            runtimeMinutes_GTE:         props.runtimeMinutes,       // Int
            genres_CONTAINS:            props.genres,               // String
            averageRating_GTE:          props.averageRating,        // Float
        },
    },
    }`,
 * where N is the amount of pages you want to limit each page to,
 * props.* are state-variables used to filter the query in various ways,
 * and page is a state-variable identifying which page the user is on.
 */
export const SUPER_QUERY: DocumentNode = gql`
    query superQuery($moviesWhere: MovieWhere, $options: MovieOptions) {
        movies(where: $moviesWhere, options: $options) {
            id
            primaryTitle
            isAdult
            releaseYear
            runtimeMinutes
            genres
            averageRating
            numVotes
        }
    }`