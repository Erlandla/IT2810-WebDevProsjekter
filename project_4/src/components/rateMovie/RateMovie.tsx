import { ReactElement, useRef, useState } from "react";
import { useMutation } from "@apollo/client";
import { RATE_MOVIE } from "../../graphql/mutations";
import styles from "./RateMovie.module.css";
import RatingButton from "../ratingButton/RatingButton";
import { create } from "cypress/types/lodash";
import Button from "../dropdownButton/DropdownButton";
import Notification from "../notification/Notification";
import { ratedMoviesState } from "../../types/typesAndConstants";

/**
 * performs a rating-mutation using our GraphQL API with our database
 *
 * @param props - an object containing the ID, the number of votes, and the average rating for a movie fetched from `ButtonPaginationExample.tsx`.
 *
 * @returns 10 buttons that corresponds to a star rating from 1 to 10.
 */
function RateMovie(props: {
  id: number;
  numVotes: number;
  averageRating: number;
}): ReactElement {
  const [newRating, setNewRating] = useState<number | undefined>(undefined);
  let N;
  const [rateMovie, { data, loading, error }] = useMutation(RATE_MOVIE, {
    variables: {
      movieId: props.id,
      update: {
        numVotes_INCREMENT: 1,
        averageRating: newRating,
      },
    },
  });

  if (loading) return <p style={{ fontSize: "16pt" }}>Submitting...</p>;
  if (error)
    return (
      <pre style={{ fontSize: "16pt" }}>Submission error! {error.message}</pre>
    );

  /**
   * Calculates a new average rating to insert into the database using the formula
   *  `(numVotes * avgRating + userRating) / (numVotes + 1)`.
   *
   * @param userRating - a rating from 1 to 10 that corresponds to the user star-button the user pressed
   */
  function calculateNewAverage(userRating: number) {
    if (props.averageRating === 0 && props.numVotes === 0) {
      N = userRating;
    } else if (newRating) {
      N = (props.numVotes * newRating + userRating) / (props.numVotes + 1);
    } else {
      N =
        (props.numVotes * props.averageRating + userRating) /
        (props.numVotes + 1);
    }
    N = Math.round((N + Number.EPSILON) * 100) / 100;
    setNewRating(N);
    setTimeout(() => {
      rateMovie();
    }, 50);
    Notification("Submitted successfully");
  }
  //list of rating buttons
  const Buttons: ReactElement[] = [];

  //Function to create 10  rating buttons
  function createButtons() {
    for (let i = 1; i <= 10; i++) {
      Buttons.push(
        <RatingButton
          key={i}
          numValue={i}
          func={() => calculateNewAverage(i)}
          testID={i}
        />
      );
    }
  }

  /**
   * Buttons. Could've created componentes out of this.
   */

  return (
    <>
      {createButtons()}
      <p style={{ paddingTop: "1vh", margin: "0" }}>Rate the movie!</p>
      <div
        aria-label={`Buttons to rate the movie`}
        style={{
          display: "flex",
          flexFlow: "row wrap",
          marginBottom: "1vh",
        }}
      >
        {Buttons.map((button) => {
          return button;
        })}
      </div>
    </>
  );
}

export default RateMovie;
