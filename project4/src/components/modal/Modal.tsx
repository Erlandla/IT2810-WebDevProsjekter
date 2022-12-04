
import PropTypes from "prop-types";
import styles from "./Modal.module.css";
import { useDispatch, useSelector } from "react-redux";
import { addMovie, removeMovie } from "../../globalState/watchList";
import {  useEffect, useState } from "react";
import { RootState } from "../../globalState/store";
import { IMovie } from "../../types/typesAndConstants";
import Notification from "../notification/Notification";
const FocusTrap = require('focus-trap-react')

// ============ DESCRIPTION ==================
// Displays a more detailed description of the film at hand when a FilmInstance is clicked on

function Modal(props: { movie: IMovie; onClose: any | undefined; show: boolean; }){

    const dispatch = useDispatch();
    const movie = props.movie;
    const [addedToWatchlist, setAddedToWatchlist] = useState<boolean>(false);
    const myWatchList = useSelector((state: RootState) => state.myWatchList.movies);   //Global state

    useEffect(() => {
        setAddedToWatchlist(myWatchList.some(e => e.id === movie.id)) //Check if movie is in watchlist every render
    })

    const handleClick = (event: { preventDefault: () => void; }) => {
        if(!addedToWatchlist){
        event.preventDefault();
        dispatch(addMovie(movie))
        props.onClose();
        Notification("Added to Watchlist")
        
        }

        else{
            event.preventDefault();
            dispatch(removeMovie(movie))
            props.onClose();
            Notification("Removed from Watchlist")
        }
    }



    if(!props.show){
        return null;
    }



    return(
        <FocusTrap>
        <article className={styles.modalContainer} onClick={props.onClose}>
    
            <section className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
                <h1 className={styles.h1}>{movie.primaryTitle}
                    <hr />
                </h1>
                <section className={styles.movieInfo}>
                    <p>Released in year {movie.releaseYear}</p>
                    <p><b>Runtime:</b> {movie.runtimeMinutes} minutes</p>
                    <p><b>Average rating:</b> {movie.averageRating}/10 out of {movie.numVotes} votes</p>
                    <p><b>Genres:</b></p>
                    <ul>
                        {movie.genres
                            .split(",")
                            .map((genre: string) =>{
                                return(
                                    <li key={genre}>{genre}</li>
                                );
                            })
                        }
                    </ul>
                        {!movie.isAdult ?
                            (
                                null
                            ):
                            (
                                <p>Warning! This is an adult film!</p>
                            )
                    
                        }
                </section>
                <section className={styles.btnContainer}>
                    {!addedToWatchlist ?
                        (
                        <button className={styles.btnAddToWatchlist} onClick={handleClick} data-cy="addToWatchlist">Add to my WatchList</button>
                        ):
                        (
                        <button className={styles.btnRemoveFromWatchlist} onClick={handleClick} data-cy="removeFromWatchlist">Remove from watchlist</button>
                        )
                     }
                
                    <button className={styles.btnClose} onClick={props.onClose}>Close</button>
                </section>
            </section>


        </article>
    </FocusTrap>

    )



}
Modal.propTypes = {
    movie : PropTypes.any,
    onClose: PropTypes.any,
    show: PropTypes.any,

};

export default Modal;
