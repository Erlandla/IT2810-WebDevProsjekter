import styles from "./Search.module.css";
import Pagination from "../pagination/Pagination";
import FilterComponent from "../filterComponent/FilterComponent";
import { useEffect, useState } from "react";
import {
  searchFilterProps,
  searchSortingProps,
} from "../../types/typesAndConstants";

// ============ DESCRIPTION ==================
// The bulk of the application; it contains a searchbar, a component for filtering (FilterComponent),
// a list display of relevant movies (Pagination), and buttons for sorting.

/**
 * Component for querying movies, and displays the results from the query
 * @returns a search bar, some things to filter and sort the query on, and FilmInstance-components
 */
const SearchBar = () => {
  const [title, setTitle] = useState<string | undefined>();
  const [sorting, setSorting] = useState<searchSortingProps>({
    numVotes: "DESC",
    rating: undefined,
    release: undefined,
    runtime: undefined,
  });
  const [filters, setFilters] = useState<searchFilterProps>({
    primaryTitle: undefined,
    isAdult: undefined,
    releaseYearGTE: undefined,
    releaseYearLTE: undefined,
    runtimeMinutes: undefined,
    genres: undefined,
    averageRating: undefined,
  });

  // Adds the movie title to the filter-object when filters, title,
  //  or sorting has been modified
  useEffect(() => {
    setFilters((filters) => {
      filters.primaryTitle = title;
      return filters;
    });
  }, [filters, title, sorting]);

  //Stores the value from the inputfield
  const handleSearchInput = (event: React.FormEvent<HTMLInputElement>) => {
    setTitle(event.currentTarget.value);
  };

  // applies the data-parameter as filter
  const applyFilter = (data: searchFilterProps) => {
    setFilters({ ...data });
  };

  /**
   * Modifies the sorting of the results (technically the entire query and how it is sorted).
   * Sorting can only be on one attribute at one time.
   * @param data the filter for the query
   * @param category which attribute to sort the query on. If the category is different, remove the previous one and set it to the new one. If it's the same, change from ASC to DESC or DESC to ASC
   */
  const changeSorting = (data: searchSortingProps, category: string) => {
    setSorting((prevFilters) => {
      prevFilters = { ...data };

      switch (category) {
        case "numVotes":
          prevFilters.numVotes === "DESC"
            ? (prevFilters.numVotes = "ASC")
            : (prevFilters.numVotes = "DESC");
          prevFilters.runtime = undefined;
          prevFilters.rating = undefined;
          prevFilters.release = undefined;
          break;
        case "runtime":
          prevFilters.runtime === "DESC"
            ? (prevFilters.runtime = "ASC")
            : (prevFilters.runtime = "DESC");
          prevFilters.numVotes = undefined;
          prevFilters.rating = undefined;
          prevFilters.release = undefined;
          break;
        case "rating":
          prevFilters.rating === "DESC"
            ? (prevFilters.rating = "ASC")
            : (prevFilters.rating = "DESC");
          prevFilters.numVotes = undefined;
          prevFilters.runtime = undefined;
          prevFilters.release = undefined;
          break;
        case "release":
          prevFilters.release === "DESC"
            ? (prevFilters.release = "ASC")
            : (prevFilters.release = "DESC");
          prevFilters.numVotes = undefined;
          prevFilters.runtime = undefined;
          prevFilters.rating = undefined;
          break;
      }
      return prevFilters;
    });
  };

  const sortingText = (sortingCategory: String | undefined) => {
    // const text:any = typeof sortingCategory === "undefined" ? "" : sortingCategory == "ASC" ? <><img src={ASC}></img></>:<><img src={DESC}></img></>
    const text: String =
      typeof sortingCategory === "undefined"
        ? ""
        : sortingCategory == "ASC"
        ? "ASC"
        : "DESC";
    return text;
  };

  return (
    <>
      <div
        aria-label={"Search bar for the website"}
        className={styles.searchBar}
      >
        <input
          type="text"
          data-cy="searchInput"
          onChange={handleSearchInput}
          placeholder={"Search for a Movie Title"}
        ></input>
      </div>

      <FilterComponent onFilterChanged={applyFilter} />

      <div
        aria-label={"Container for the different sorting sorting categories"}
        className={styles.sortingContainer}
      >
        <button
          className={
            typeof sorting.numVotes === "undefined"
              ? styles.sortingButton
              : styles.activeSortingButton
          }
          onClick={() => changeSorting(sorting, "numVotes")}
          data-cy="numVotesSorting"
        >
          Popularity {sortingText(sorting.numVotes)}
        </button>

        <button
          className={
            typeof sorting.rating === "undefined"
              ? styles.sortingButton
              : styles.activeSortingButton
          }
          onClick={() => changeSorting(sorting, "rating")}
          data-cy="ratingSorting"
        >
          Rating {sortingText(sorting.rating)}
        </button>

        <button
          className={
            typeof sorting.release === "undefined"
              ? styles.sortingButton
              : styles.activeSortingButton
          }
          onClick={() => changeSorting(sorting, "release")}
          data-cy="releaseSorting"
        >
          Releasedate {sortingText(sorting.release)}
        </button>

        <button
          className={
            typeof sorting.runtime === "undefined"
              ? styles.sortingButton
              : styles.activeSortingButton
          }
          onClick={() => changeSorting(sorting, "runtime")}
          data-cy="runtimeSorting"
        >
          Runtime {sortingText(sorting.runtime)}
        </button>
      </div>

      <Pagination
        primaryTitle={title}
        isAdult={filters.isAdult}
        releaseYearGTE={filters.releaseYearGTE}
        releaseYearLTE={filters.releaseYearLTE}
        runtimeMinutes={filters.runtimeMinutes}
        genres={filters.genres}
        averageRating={filters.averageRating}
        numVotes={sorting.numVotes}
        rating={sorting.rating}
        release={sorting.release}
        runtime={sorting.runtime}
      />
    </>
  );
};

export default SearchBar;
