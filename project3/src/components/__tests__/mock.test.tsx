import "@testing-library/jest-dom";
// import renderer from "react-test-renderer";
import { render, screen } from "@testing-library/react";
import { MockedProvider } from "@apollo/client/testing";
import { SUPER_QUERY } from "../../graphql/queries";
import Pagination from "../pagination/Pagination";
import { Provider } from "react-redux";
import { store } from "../../globalState/store";

const mocks = [
  {
    request: {
      query: SUPER_QUERY,
      variables: {
        options: {
          limit: 20,
          offset: 0,
          sort: {
            numVotes: "ASC",
            averageRating: undefined,
            releaseYear: undefined,
            runtimeMinutes: undefined,
          },
        },
        moviesWhere: {
          primaryTitle_CONTAINS: "Silviu: the excellent programmer",
          isAdult: true,
          releaseYear_GTE: 2000,
          releaseYear_LTE: 2030,
          runtimeMinutes_GTE: 70,
          genres_CONTAINS: "Drama,Horror",
          averageRating_GTE: 2.4,
        },
      },
    },
    result: {
      data: {
        movies: [
          {
            id: 1,
            imdbId: null,
            primaryTitle: "Silviu: the excellent programmer",
            originalTitle: "Silviu: el programador excelente",
            isAdult: true,
            releaseYear: 2022,
            runtimeMinutes: 70,
            genres: "Drama,Horror",
            averageRating: 2.4,
            numVotes: 3,
          },
        ],
      },
    },
  },
];

it("renders without error", async () => {
  render(
    <Provider store={store}>
      <MockedProvider mocks={mocks} addTypename={false}>
        <Pagination
          primaryTitle="Silviu: the excellent programmer"
          isAdult={true}
          releaseYearGTE={2000}
          releaseYearLTE={2030}
          runtimeMinutes={70}
          genres={"Drama,Horror"}
          averageRating={2.4}
          numVotes={"ASC"}
          rating={undefined}
          release={undefined}
          runtime={undefined}
        />
      </MockedProvider>
    </Provider>
  );

  expect(await screen.findByText("Loading...")).toBeInTheDocument();
  expect(
    await screen.findByText("Silviu: the excellent programmer")
  ).toBeInTheDocument();
  expect(await screen.findByText("Next Page")).toBeInTheDocument();
  expect(await screen.findByText("Prev Page")).toBeInTheDocument();
  expect(await screen.findByText("Rate the movie!")).toBeInTheDocument();
  expect(await screen.findByText("2022")).toBeInTheDocument();
  expect(await screen.findByText("1⭐")).toBeInTheDocument();
  expect(await screen.findByText("10⭐")).toBeInTheDocument();
});
