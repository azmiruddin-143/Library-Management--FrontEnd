
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
    // getBook: builder.query<Book[], void>({ 
    //   query: () => `/api/books`,
    //   providesTags: ['Books'], 
    // }),
     // getAllBooks ক্যোয়ারী টাইপিং আপডেট করুন
    getAllBooks: builder.query({ // <--- এখানে পরিবর্তন
      query: (params) => {
        // ক্যোয়ারী প্যারামিটারগুলো URL এ যোগ করুন
        const queryString = new URLSearchParams(params as Record<string, string>).toString();
        return `/api/books?${queryString}`;
      },
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


   updateBook: builder.mutation({ 
        query: ({ id, data }) => ({
            url: `/api/books/${id}`,
            method: 'PUT',
            body: data, 
        }),
        invalidatesTags: (result, error, { id }) => [{ type: 'Books', id }, 'Books'],
    }),


    borrowBook: builder.mutation({ 
        query: (borrowData) => ({
            url: '/api/borrow', 
            method: 'POST',
            body: borrowData,
        }),
        invalidatesTags: ['Books', 'Borrows'], 
    }),

     // *** getBorrowSummary ক্যোয়ারী আপডেট করুন ***
    getBorrowSummary: builder.query({
      query: () => `/api/borrow`, 
      providesTags: ['Borrows'],
    }),

        // *** নতুন getLatestBooks ক্যোয়ারী যোগ করুন ***
    getLatestBooks: builder.query({ // এটি কোনো প্যারামিটার নেবে না
      query: () => {
        // সর্বশেষ 6টি বই, তৈরি হওয়ার তারিখ অনুযায়ী ডিসেন্ডিং অর্ডারে
        const queryString = new URLSearchParams({
          limit: '6',
          sortBy: 'createdAt',
          sort: 'desc',
        }).toString();
        return `/api/books?${queryString}`;
      },
      providesTags: ['Books'], // এটিও Books ট্যাগ সরবরাহ করবে
    }),

    
  }),

  
})

// useGetBookQuery
export const { useGetAllBooksQuery,useGetBookByIdQuery, useAddBookMutation, useDeleteBookMutation, useUpdateBookMutation, useBorrowBookMutation, useGetBorrowSummaryQuery, useGetLatestBooksQuery } = baseapi