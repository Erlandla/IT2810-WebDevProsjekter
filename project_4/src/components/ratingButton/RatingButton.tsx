import { MouseEventHandler } from "react";
import styles from "../rateMovie/RateMovie.module.css";


//Params: NumValue: Number of the button, eg. 1,2,3...,Func: onclick function, TestId: number used to give id's for testing
//Returns a button with the desired properties
const RatingButton = (props: {
  numValue: number;
  func: (arg: number) => void;
  testID: number
}) => {
  return (
    <>
      <button className={styles.buttonStyle} onClick={() => props.func(props.numValue)} data-cy={"rattingButton" + props.testID}>
        {props.numValue}⭐
      </button>
    </>
  );
};

export default RatingButton;
