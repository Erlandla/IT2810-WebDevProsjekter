import { render, screen, cleanup } from "@testing-library/react";
import renderer from "react-test-renderer";
import FilmInstance from "../filmInstance/FilmInstance";

// systematic testing of FilmInstance

afterEach(() => {
  cleanup();
});

describe("filmInstance testing", () => {
  test("Checks if ", () => {
    render(
      <FilmInstance
        id={123}
        primaryTitle="TestFilm"
        releaseYear={1999}
        runtimeMinutes={103}
        averageRating={9.2}
        numVotes={1003}
        isAdult={false}
        genres="Drama, Western"
        onClick={undefined}
      />
    );
    const filmTitle = screen.getByTestId("filmTitle");
    const filmRelease = screen.getByTestId("filmRelease");
    const filmRuntime = screen.getByTestId("filmRuntime");
    const filmRating = screen.getByTestId("filmRating");
    const filmGenre = screen.getByTestId("filmGenre");

    expect(filmTitle).toBeInTheDocument();
    expect(filmTitle).toHaveTextContent("TestFilm");

    expect(filmRelease).toBeInTheDocument();
    expect(filmRelease).toHaveTextContent("1999");

    expect(filmRuntime).toBeInTheDocument();
    expect(filmRuntime).toHaveTextContent("103 min");

    expect(filmRating).toBeInTheDocument();
    expect(filmRating).toHaveTextContent("9.2/10");

    expect(filmGenre).toBeInTheDocument();
    expect(filmGenre).toHaveTextContent("Drama");
    expect(filmGenre).not.toHaveTextContent("Western");
  });

  test("checks if matches snapshot", () => {
    const snapshot = renderer.create(<FilmInstance
        id={123}
        primaryTitle="TestFilm"
        releaseYear={1999}
        runtimeMinutes={103}
        averageRating={9.2}
        numVotes={1003}
        isAdult={false}
        genres="Drama, Western"
        onClick={undefined}
      />).toJSON();
      expect(snapshot).toMatchSnapshot();
  });


});