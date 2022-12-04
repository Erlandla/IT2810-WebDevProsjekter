
import { IMovie } from "../../types/typesAndConstants";
import styles from "./FilmInstance.module.css";

// ============ DESCRIPTION ==================
// Displays an instance of a movie, complete with title, release date, average rating, and genre

const FilmInstance = (props: IMovie) => {

    const arr = props.genres.split(",");
    let firstGenre = arr[0];

    return (
        <>
          <article onClick={props.onClick} className={styles.filmInstanceContainer}>
            <div className={styles.flexbox}>
                <div className={styles.title} data-testid="filmTitle">{props.primaryTitle}</div>
                <div className={styles.releaseYear} data-testid="filmRelease"> {props.releaseYear} </div>
                <div className={styles.runtime} data-testid="filmRuntime">
                    {props.runtimeMinutes} min
                </div>
            </div>

            <div className={styles.flexbox2}>
                <div className={styles.rating} data-testid="filmRating">{props.averageRating}/10</div>
                <div className={styles.genres} data-testid="filmGenre"> {firstGenre} </div>
            </div>
      
            {/* Could consider making this a little more subtle */}
            {props.isAdult && (
                <h3 style={{ color: "#a11a31" }} data-testid="filmAdult">Porno Alert!</h3>
            )}
          </article>
        </>
    );
};

export default FilmInstance;
