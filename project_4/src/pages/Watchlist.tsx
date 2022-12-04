import FilmInstance from "../components/filmInstance/FilmInstance";
import "./Watchlist.css";
import { useSelector } from "react-redux";
import { RootState } from "../globalState/store";
import { IMovie, IMovie_initial } from "../types/typesAndConstants";
import Modal from "../components/modal/Modal";
import { useState } from "react";

const Watchlist = () => {


  const myWatchList = useSelector((state: RootState) => state.myWatchList.movies);  //Global state
  const [show, setShow] = useState(false);
  const [currentMovie, setCurrentMovie] = useState<IMovie>({...IMovie_initial});
  
  const onChange = (movie: IMovie) => {
      setCurrentMovie(movie)
      setShow(true)
  }

  return (
    <>
      <main className="centeredDiv">
        <h1 className="yourWatchList">YOUR WATCHLIST</h1>

        {myWatchList.map((movie: IMovie) => {   
          //Return a FilmInstance for every movie in watchlist (global state)
          return <FilmInstance 

                  key={movie.id} 
                  onClick={() => onChange(movie)}
                  primaryTitle={movie.primaryTitle} 
                  releaseYear={movie.releaseYear} 
                  runtimeMinutes={movie.runtimeMinutes} 
                  genres={movie.genres} 
                  id={movie.id} 
                  isAdult={movie.isAdult} 
                  averageRating={movie.averageRating} 
                  numVotes={movie.numVotes}
                  
                  />
                  
        })}

      </main>
      <Modal
            movie={currentMovie} 
            onClose={() => setShow(false)}
            show={show}
            />
    </>
  );
};

export default Watchlist;
