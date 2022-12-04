import { useQuery } from "@apollo/client";


//<reference types="cypress" />
//@ts-check

describe("Renders, searches, filters and sorts movie titles", () => {
  //Function for clean up
  //It restores the average rating and number of votes of the movie "The Lucky Horseshoe" to ensure that test enviroment is the same throughout multiple runs of e2e tests
  before(() => {
    cy.request({
      url: "http://it2810-36.idi.ntnu.no:4000",
      method: "POST",
      body: {
        query: `
        mutation resetMovieRatings($update: MovieUpdateInput, $movieId: Int) {
          updateMovies(update: $update, where: { id: $movieId }) {
            movies {
              primaryTitle
              averageRating
              numVotes
            }
          }
        }
      `,
        variables: {
          movieId: 2372,
          update: {
            averageRating: 5.2,
            numVotes: 40,
          },
        },
      },
    }).then((Response) => {
      console.log("This is the response:" + Response.body);
    });
  });

  //Visits main page before each test
  beforeEach(() => {
    cy.visit("/");
  });

  it("Changes page", () => {
    cy.get('[data-cy="nextPage"]').should("be.enabled").click();
    cy.contains("The Avengers").should("be.visible");
    cy.get('[data-cy="prevPage"]').should("be.enabled").click();
    cy.contains("The Avengers").should("not.exist")
    
  });

  //Test for the Search function
  it("Renders correctly", () => {
    cy.get('[data-cy="searchInput"]').click().type("The Matrix");
    cy.contains("The Matrix").should("be.visible");
    cy.contains("The Matrix Revolutions").should("be.visible");
  });

  //Test that movies are appendended and deleted from watchlist
  it("Appends movies to Watchlist", () => {
    cy.get('[data-cy="searchInput"]').click().type("The Lucky Horseshoe"); // ID: 2372
    cy.contains("The Lucky Horseshoe").should("be.visible");
    cy.get('[data-cy="filmTitle"]').click();
    cy.get('[data-cy="addToWatchlist"]').click();
    cy.get('[data-cy="watchListButton"]').click();
    cy.contains("The Lucky Horseshoe").should("be.visible");
    cy.get('[data-cy="filmTitle"]').click();
    cy.get('[data-cy="removeFromWatchlist"]').click();
    cy.contains("The Lucky Horseshoe").should("not.exist");
  });

  //Test changing movie rating
  it("Changes Movie Ratings", () => {
    //firstRating => The score-rating before the test-agent rates the movie
    //secondRating => score-rating after
    let firstRating: number;
    let secondRating: number;
    cy.get('[data-cy="searchInput"]').click().type("The Lucky Horseshoe");
    cy.contains("The Lucky Horseshoe").should("be.visible");
    cy.get('[data-cy="filmRating"]')
      .first()
      .invoke("text")
      .as("movieRating");
    cy.get("@movieRating").then((movieRating) => {
      firstRating = parseFloat(String(movieRating));
    });
    cy.get(
      '[data-cy="rattingButton8"]'
    ).click();
    //Wait so that DB has time to update values
    cy.wait(1000);
    cy.get('[data-cy="filmRating"]')
      .first()
      .invoke("text")
      .as("secondMovieRating");
    cy.get("@secondMovieRating").then((secondMovieRating) => {
      secondRating = parseFloat(String(secondMovieRating));
      //As agent rates the movie with 10-stars, the new rating should be different from the original
      expect(firstRating).to.not.equal(secondRating);
    });
  });

  //Most of the filter test follow a similar pattern;
  //1 check that movies exist before applying the filter, 2 apply the filter, 3 check that movies that should be filtered out do not exist
  // We check that movies should 'not exist' as only 10 movies are rendered at a time as to not tank the performance
  it("Filters movies by release year", () => {
    cy.get('[data-cy="searchInput"]').click().type("The Matrix");
    cy.get('[data-cy="YEAR"]').click();
    cy.get('[data-cy="1990s"]').click();
    cy.contains("The Matrix").should("be.visible");
    cy.contains("The Matrix Reloaded").should("not.exist");
    cy.contains("The Matrix Revolutions").should("not.exist");
    cy.contains("The Matrix Resurrections").should("not.exist");
  });

  it("Filter movies by runtime", () => {
    cy.get('[data-cy="searchInput"]').click().type("Casablanca");
    cy.contains("Burning Casablanca").should("exist");
    cy.contains("Casablanca").should("exist");
    cy.get('[data-cy="RUNTIME"]').click();
    cy.get('[data-cy="120+ min"]').click();
    cy.contains("Casablanca").should("not.exist");
    cy.contains("Burning Casablanca").should("exist");
  });

  it("Filter movies by Genre", () => {
    cy.get('[data-cy="searchInput"]').click().type("The Wolf");
    cy.contains("The Wolf of Wall Street").should("exist");
    cy.contains("The Wolfman").should("exist");
    cy.get('[data-cy="GENRE"]').click();
    cy.get('[data-cy="Comedy"]').click();
    cy.contains("The Wolfman").should("not.exist");
    cy.contains("The Wolf of Wall Street").should("exist");
    cy.get('[data-cy="GENRE: Comedy"]').click();
    cy.get('[data-cy="Drama"]').click();
    cy.contains("The Wolfman").should("exist");
  });
  it("Filters movies by rating", () => {
    cy.get('[data-cy="searchInput"]').click().type("Transformers");
    cy.contains("Transformers").should("exist");
    cy.contains("Transformers: Revenge of the Fallen").should("exist");
    cy.contains("Transformers: The Last Knight").should("exist");
    cy.get('[data-cy="RATING"]').click();
    cy.get('[data-cy="7.0+"]').click();
    cy.contains("Transformers").should("exist");
    cy.contains("Transformers: Revenge of the Fallen").should("not.exist");
    cy.contains("Transformers: The Last Knight").should("not.exist");
  });
  it("Filters adult movies", () => {
    cy.get('[data-cy="searchInput"]').click().type("Alice in Wonderland");
    cy.get('[data-cy="ADULT MOVIES"]').click();
    cy.get('[data-cy="Hide"]').click();
    cy.contains("Alice in Wonderland").should("exist");
    cy.contains("Alice in Wonderland: An X-Rated Musical Fantasy").should(
      "not.exist"
    );
    cy.get('[data-cy="ADULT MOVIES: Hide"]').click();
    cy.get('[data-cy="Only Adult"]').click();
    cy.contains("Alice in Wonderland").should("not.exist");
  });
  it("Applies all filters togheter", () => {
    cy.get('[data-cy="YEAR"] > img').click();
    cy.get('[data-cy="2010s"]').click();
    cy.get('[data-cy="RUNTIME"]').click();
    cy.get('[data-cy="120+ min"]').click();
    cy.get('[data-cy="GENRE"]').click();
    cy.get('[data-cy="Thriller"]').click();
    cy.get('[data-cy="RATING"]').click();
    cy.get('[data-cy="8.0+"]').click();
    cy.get('[data-cy="ADULT MOVIES"]').click();
    cy.get('[data-cy="Hide"]').click();
    cy.contains("Shutter Island").should("be.visible");
    cy.contains("Joker").should("be.visible");
    cy.contains("Parasite").should("be.visible");
    cy.contains("The Shawshank Redemption").should("not.exist");
    cy.contains("The Dark Knight").should("not.exist");
    cy.contains("Forrest Gump").should("not.exist");
  });
  it("Sorts movies", () => {
    //sorts by popularity
    cy.contains("The Shawshank Redemption").should("be.visible");
    cy.get('[data-cy="numVotesSorting"]').click();
    cy.contains("The Shawshank Redemption").should("not.exist");
    //sorts by Rating
    cy.get('[data-cy="ratingSorting"]').click();
    cy.contains("The Chinese Parrot").should("not.exist");
    cy.get('[data-cy="ratingSorting"]').click();
    cy.contains("The Chinese Parrot").should("be.visible");
    

    //sorts by release date'
    cy.get('[data-cy="releaseSorting"]').click();
    cy.contains("La casa entre los cactus").should("be.visible");
    cy.contains("Miss Jerry").should("not.exist");
    cy.get('[data-cy="releaseSorting"]').click();
    cy.contains("La casa entre los cactus").should("not.exist");
    cy.contains("Miss Jerry").should("be.visible");

    //Sorts by runtime
    cy.get('[data-cy="runtimeSorting"]').click();
    cy.contains("Logistics").should("be.visible");
    cy.contains("Fair at Ljutomer").should("not.exist");
    cy.get('[data-cy="runtimeSorting"]').click();
    cy.contains("Logistics").should("not.exist");
    cy.contains("Fair at Ljutomer").should("be.visible");
  });
});
