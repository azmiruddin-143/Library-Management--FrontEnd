
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

interface Book {
  title: string;
  author: string;
  genre: string;
  isbn: string;
  description: string;
  copies: number;
  available: boolean;
}

export const baseapi = createApi({
  reducerPath: 'baseapi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:5000' }), 
  tagTypes: ['Books'], 

  endpoints: (builder) => ({
    getBook: builder.query<Book[], void>({ 
      query: () => `/api/books`,
      providesTags: ['Books'], 
    }),
    

    addBook: builder.mutation<Book, Partial<Book>>({ 
        query: (newBook) => ({
            url: '/api/books',
            method: 'POST',
            body: newBook,
        }),
        invalidatesTags: ['Books'], 
    }),
  }),
})


export const { useGetBookQuery, useAddBookMutation } = baseapi