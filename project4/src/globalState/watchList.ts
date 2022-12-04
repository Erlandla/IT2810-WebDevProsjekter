import {createSlice} from '@reduxjs/toolkit';
import { watchListState } from '../types/typesAndConstants';


const initialState: watchListState = {  //Get titles if they exist in local storage
    movies: window.localStorage.getItem('movies') ? JSON.parse(window.localStorage.getItem('movies')!) : [],

}



export const watchListSlice = createSlice({
    name: 'myWatchList',
    initialState,
    reducers: {
        addMovie: (state, action) => {
            state.movies = [...state.movies, action.payload] //Append movie to global state
            window.localStorage.setItem('movies', JSON.stringify(state.movies)) //And send to local storage
        },
        removeMovie: (state, action) => {
            let newArray = state.movies;
            const indexOfObject = state.movies.findIndex(object => {
                return object.id === action.payload.id;
            });
             newArray.splice(indexOfObject, 1);

            state.movies = newArray;            //Update the watchlist
                
            
            window.localStorage.setItem('movies', JSON.stringify(state.movies)) //Overwrite the watchlist in local storage
        }
    } 
})

export const  {addMovie, removeMovie} = watchListSlice.actions;

export default watchListSlice.reducer;