import SearchBar from "../../src/components/search/Search";
import FilmInstance from "../../src/components/filmInstance/FilmInstance";
import DropdownButton from "../../src/components/dropdownButton/DropdownButton";

import {
  ApolloClient,
  ApolloProvider,
  InMemoryCache,
} from "@apollo/client";
import { Provider } from "react-redux";
import { store } from "../../src/globalState/store";


const client = new ApolloClient({
  uri: "http://it2810-36.idi.ntnu.no:4000",
  cache: new InMemoryCache(),
});

describe("Test search-bar component", () => {
  

    it("Search-bar searches and displays movie-items", () => {
      cy.mount(
        <ApolloProvider client={client}>
          <Provider store={store}>
            <SearchBar />
          </Provider>
        </ApolloProvider>
      );
      cy.get('[data-cy="searchInput"]').type("The Prestige");
      cy.contains("The Prestige").should("be.visible");
      cy.contains("YEAR").should("be.visible")
      cy.contains("RUNTIME").should("be.visible")
      cy.contains("Rating").should("be.visible")
      cy.contains("Next Page").should("be.visible")
    });
  });

 

  describe("Test filmInstance component", () => {
    it("tests if a created filmInstance component contains the correct fields", () => {
      cy.mount(
        <FilmInstance
          id={123}
          primaryTitle={"testMovie"}
          releaseYear={1973}
          runtimeMinutes={70}
          numVotes={13400}
          averageRating={3.2}
          isAdult={true}
          genres="Drama, Western"
          onClick={undefined}
        />
      );
      cy.contains("testMovie").should("be.visible");
      cy.contains(1973).should("be.visible");
      cy.contains(70).should("be.visible");
      cy.contains(3.2).should("be.visible");
      cy.contains("Porno Alert!").should("be.visible");
      cy.contains("Drama").should("be.visible");
      cy.contains("Western").should("not.exist");
      cy.contains("13400").should("not.exist");
    });
  });

  const buttonMethod = (arr: string[]) => {
    console.log(arr[0]);
    return buttonMethod;
  };

  describe("Test DropdownButton component", () => {
    it("tests if navbar contains correct text, and that the routing works", () => {
      cy.mount(
        <DropdownButton
          valueSelected={buttonMethod(["string", "string2"])}
          buttonText="GENRES"
          dropdownContent={[
            "Drama",
            "Western",
            "Sci-fi",
            "Dinosaur",
            "Documentary",
            "😎",
          ]}
        />
      );
      cy.contains("GENRES");
      cy.contains("Dinosaur").should("not.be.visible");
      cy.get('[data-cy ="GENRES"]').click();
      cy.contains("😎").should("be.visible");
      cy.contains("GENRES").click();
      cy.contains("Dinosaur").should("not.be.visible");
    });
});
