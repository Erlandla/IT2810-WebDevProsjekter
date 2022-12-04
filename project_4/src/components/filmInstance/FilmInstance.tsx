import { useEffect, useRef, useState } from "react";
import { IMovie } from "../../types/typesAndConstants";
import RateMovie from "../rateMovie/RateMovie";
import styles from "./FilmInstance.module.css";

// ============ DESCRIPTION ==================
// Displays an instance of a movie, complete with title, release date, average rating, and genre

const FilmInstance = (props: IMovie) => {
  const arr = props.genres.split(",");
  let firstGenre = arr[0];

  return (
    <>
      <article aria-label={"Clickable Film instance of the movie " + props.primaryTitle} onClick={props.onClick} className={styles.filmInstanceContainer}>
        <div className={styles.flexbox}>
          <button className={styles.movieTitleWrapper}>
            <h2 className={styles.title} data-testid="filmTitle" data-cy="filmTitle">
              {props.primaryTitle}{" "}
            </h2>
          </button>
          <div className={styles.releaseYear} data-testid="filmRelease" data-cy="filmRelease">
            {" "}
            {props.releaseYear}{" "}
          </div>
          <div className={styles.runtime} data-testid="filmRuntime" data-cy="filmRuntime">
            {props.runtimeMinutes} min
          </div>
        </div>

        <div className={styles.flexbox2}>
          <div className={styles.rating} data-testid="filmRating" data-cy="filmRating">
            {props.averageRating}/10
          </div>
          <div className={styles.genres} data-testid="filmGenre" data-cy="filmGenre">
            {" "}
            {firstGenre}{" "}
          </div>
        </div>

        {/* Could consider making this a little more subtle */}
        {props.isAdult && (
          <h3 style={{ color: "#a11a31" }} data-testid="filmAdult" data-cy="filmAdult">
            Porno Alert!
          </h3>
        )}
      </article>
    </>
  );
};

export default FilmInstance;
