import { ReactElement, useEffect, useState } from "react";
import { useQuery } from "@apollo/client";
import { SUPER_QUERY } from "../../graphql/queries";
import FilmInstance from "../filmInstance/FilmInstance";
import { IMovie, IMovie_initial, paginationProps } from "../../types/typesAndConstants";
import Modal from "../modal/Modal";
import RateMovie from "../rateMovie/RateMovie";
import styles from "./Pagination.module.css";

// ============ DESCRIPTION ==================
// Displays a list of all relevant movies to the users filtered search by issuing a graphQL query
// The results are sorted into pages, with 20 movies listed on each page

const ENTRIES_PER_PAGE: number = 20;

function Pagination(props: paginationProps): ReactElement {
  const [page, setPage] = useState<number>(0);
  const [maxPage, setMaxPage] = useState<number>(0);

  useEffect(() => {
    setPage(0)
  }, [props])
  
  const { data, loading, error } = useQuery(SUPER_QUERY, {
    variables: {
      options: {
        limit: ENTRIES_PER_PAGE,
        offset: ENTRIES_PER_PAGE * page,
        sort: {
          numVotes: props.numVotes,
          averageRating: props.rating,
          releaseYear: props.release,
          runtimeMinutes: props.runtime,
        },
      },
      moviesWhere: {
        lowercaseTitle_CONTAINS: props.primaryTitle,    // String
        isAdult: props.isAdult,                       // Boolean (true/false)
        releaseYear_GTE: props.releaseYearGTE,        // Int
        releaseYear_LTE: props.releaseYearLTE,        // Int
        runtimeMinutes_GTE: props.runtimeMinutes,     // Int
        genres_CONTAINS: props.genres,                // String
        averageRating_GTE: props.averageRating,       // Float
      },
    },
  });

  const [show, setShow] = useState(false);
  const [currentMovie, setCurrentMovie] = useState<IMovie>({
    ...IMovie_initial,
  });
  const onChange = (movie: IMovie) => {
    setCurrentMovie(movie);
    setShow(true);
  };

  // checks for useQuery to see if data has been retrieved or if something wrong happened.
  if (loading) return <p className={styles.infoTexts}>Loading...</p>;
  if (error)
    return (
      <pre className={styles.infoTexts} style={{ color: "red" }}>
        {error.message}
      </pre>
    );

  return (
    <>
      {data.movies.length !== 0 ? (
        <>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <label htmlFor="Previous Page">
              <button
                className={styles.buttonStyle}
                aria-label="Previous page button"
                data-cy="prevPage"
                disabled={page === 0}
                onClick={() => setPage((prev) => prev - 1)}
              >
                Prev Page
              </button>
            </label>
            <div aria-label="Current page" className={styles.currentPageText}>
              Page {page+1}
            </div>
            <label htmlFor="Next Page">
              <button
                className={styles.buttonStyle}
                data-cy="nextPage"
                aria-label="Next page button"
                disabled={
                  data.movies.length < ENTRIES_PER_PAGE || page === maxPage - 1
                }
                onClick={() => setPage((prev) => prev + 1)}
              >
                Next Page
              </button>
            </label>
          </div>
          <ul>
            {data.movies.map((movie: IMovie) => {
              return (
                <li
                  className ={styles.noBullets} 
                  aira-label={
                    "Wrapper div for FilmInstance and RateMovie"
                  }
                  key={movie.id}
                >
                  <FilmInstance
                    id={movie.id}
                    primaryTitle={movie.primaryTitle}
                    releaseYear={movie.releaseYear}
                    runtimeMinutes={movie.runtimeMinutes}
                    averageRating={movie.averageRating}
                    numVotes={movie.numVotes}
                    isAdult={Boolean(movie.isAdult)}
                    genres={movie.genres}
                    onClick={() => onChange(movie)}
                  />
                  <RateMovie
                  id={movie.id}
                  numVotes = {movie.numVotes}
                  averageRating = {movie.averageRating}
                  ></RateMovie>
                  
                  
                </li>
              );
            })}
          </ul>
          <Modal
            movie={currentMovie}
            onClose={() => setShow(false)}
            show={show}
          />
        </>
      ) : (
        <p className={styles.infoTexts}>No results were found</p>
      )}
    </>
  );
}

export default Pagination;
