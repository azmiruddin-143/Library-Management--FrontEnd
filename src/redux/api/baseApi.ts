
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

      deleteBook: builder.mutation({ 
        query: (bookId) => ({ 
            url: `/api/books/${bookId}`,
            method: 'DELETE',
        }),
        invalidatesTags: ['Books'],
    }),

    getBookById: builder.query({ 
      query: (id) => `/api/books/${id}`, 
      providesTags: (result, error, id) => [{ type: 'Books' as const, id }],
    }),


    addBook: builder.mutation<Book, Partial<Book>>({ 
        query: (newBook) => ({
            url: '/api/books',
            method: 'POST',
            body: newBook,
        }),
        invalidatesTags: ['Books'], 
    }),


   updateBook: builder.mutation({ // <--- updateBook মিউটেশন
        query: ({ id, data }) => ({
            url: `/api/books/${id}`, // আপনার API এর PUT এন্ডপয়েন্ট
            method: 'PUT',
            body: data, // আপডেট করার জন্য ডেটা
        }),
        invalidatesTags: (result, error, { id }) => [{ type: 'Books', id }, 'Books'],
    }),


    
  }),

  
})


export const { useGetBookQuery,useGetBookByIdQuery, useAddBookMutation, useDeleteBookMutation, useUpdateBookMutation} = baseapi