import {configureStore} from '@reduxjs/toolkit';
import myWatchListReducer from './watchList';

export const store = configureStore({
    reducer: {
        myWatchList: myWatchListReducer
    },
})


export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch