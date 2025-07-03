import { configureStore } from '@reduxjs/toolkit';
import bookReducer from '../features/bookSlice';
import { baseapi } from './api/baseApi';

export const store = configureStore({
    reducer: {
        books: bookReducer,
        [baseapi.reducerPath]: baseapi.reducer
    },

    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(baseapi.middleware),

});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
