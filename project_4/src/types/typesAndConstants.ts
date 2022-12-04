//FilmInstances

export type IMovie = {
  onClick: any;
  id: number;
  primaryTitle: string;
  isAdult: Boolean;
  releaseYear: number;
  runtimeMinutes: number;
  genres: string;
  averageRating: number;
  numVotes: number;
};

export const IMovie_initial: IMovie = {
  onClick: null,
  id: 0,
  primaryTitle: "",
  isAdult: false,
  releaseYear: 0,
  runtimeMinutes: 0,
  genres: "",
  averageRating: 0,
  numVotes: 0,
};

//Watchlist

export type watchListState = {
  movies: IMovie[];
};

export type ratedMoviesState = {
  ratedMovies: String[];
};

// props for the search filter
export type searchFilterProps = {
  primaryTitle?: String | undefined;
  isAdult: Boolean | undefined;
  releaseYearGTE: number | undefined;
  releaseYearLTE: number | undefined;
  runtimeMinutes: number | undefined;
  genres: String | undefined;
  averageRating: number | undefined;
};

// props for the sorting of search
export type searchSortingProps = {
  numVotes: String | undefined;
  rating: string | undefined;
  release: string | undefined;
  runtime: string | undefined;
};

//CustomButton
export type ButtonProps = {
  valueSelected: (arg: string[]) => void;
  buttonText: string;
  dropdownContent: string[]; // String-list of categories for the buttons dropdown menu
};

export type paginationProps = {
  primaryTitle: String | undefined;
  isAdult: Boolean | undefined;
  releaseYearGTE: number | undefined;
  releaseYearLTE: number | undefined;
  runtimeMinutes: number | undefined;
  genres: String | undefined;
  averageRating: number | undefined;

  numVotes: String | undefined;
  rating: String | undefined;
  release: String | undefined;
  runtime: String | undefined;
};
