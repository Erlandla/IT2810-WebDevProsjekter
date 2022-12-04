import { DocumentNode, gql } from "@apollo/client";

/**
 * #### GraphQL mutation to rate a specified movie.
 * 
 * Variables has to be the following:
 * 
 * `{
        variables: {
            "movieId": K,
            update: {
                "numVotes_INCREMENT": 1,
                "averageRating": N
            },
        },
    }`,
 * 
 *  where K is the ID of the movie you want to rate, and N is the 
    updated average rating.

    #### Forumla for updated average rating: 
    
    `(avgRating * numVotes + [USER'S NEW VOTE]) / (numVotes + 1)`
 */
export const RATE_MOVIE: DocumentNode = gql`
  mutation rateMovie($movieId: Int, $update: MovieUpdateInput) {
    updateMovies(where: { id: $movieId }, update: $update) {
      movies {
        id
        primaryTitle
        numVotes
        averageRating
      }
    }
  }
`;

export const RESET_MOVIE_RATING: DocumentNode = gql`
  mutation resetMovieRatings($update: MovieUpdateInput, $movieId: Int) {
    updateMovies(update: $update, where: { id: $movieId }) {
      movies {
        primaryTitle
        averageRating
        numVotes
      }
    }
  }
`;
