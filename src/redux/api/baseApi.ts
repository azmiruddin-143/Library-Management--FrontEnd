import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

interface Book {
  title: string;
  author: string;
  genre: string;
  isbn: string;
  description: string;
  copies: number;
  available: boolean;
  _id?: string;
}

interface BorrowSummary {
  totalQuantity: number;
  book: {
    title: string;
    isbn: string;
  };
}

export const baseapi = createApi({
  reducerPath: 'baseapi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://libary-frontend.vercel.app' }),
  tagTypes: ['Books', 'Borrows'],

  endpoints: (builder) => ({
    getAllBooks: builder.query<Book[], Record<string, string>>({
      query: (params) => {
        const queryString = new URLSearchParams(params).toString();
        return `/api/books?${queryString}`;
      },
      providesTags: ['Books'],
    }),

    deleteBook: builder.mutation<{ success: boolean }, string>({
      query: (bookId) => ({
        url: `/api/books/${bookId}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Books'],
    }),

    getBookById: builder.query<Book, string>({
      query: (id) => `/api/books/${id}`,
      transformResponse: (response: { success: boolean; message: string; book: Book }) => response.book,
      providesTags: (_result, _error, id) => [{ type: 'Books', id }],
    }),

    addBook: builder.mutation<Book, Partial<Book>>({
      query: (newBook) => ({
        url: '/api/books',
        method: 'POST',
        body: newBook,
      }),
      invalidatesTags: ['Books'],
    }),

    updateBook: builder.mutation<Book, { id: string; data: Partial<Book> }>({
      query: ({ id, data }) => ({
        url: `/api/books/${id}`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: (_result, _error, { id }) => [{ type: 'Books', id }, 'Books'],
    }),

    borrowBook: builder.mutation<{ success: boolean }, any>({
      query: (borrowData) => ({
        url: '/api/borrow',
        method: 'POST',
        body: borrowData,
      }),
      invalidatesTags: ['Books', 'Borrows'],
    }),

    getBorrowSummary: builder.query<BorrowSummary[], void>({
      query: () => `/api/borrow`,
      providesTags: ['Borrows'],
    }),

    getLatestBooks: builder.query<Book[], void>({
      query: () => {
        const queryString = new URLSearchParams({
          limit: '6',
          sortBy: 'createdAt',
          sort: 'desc',
        }).toString();
        return `/api/books?${queryString}`;
      },
      providesTags: ['Books'],
    }),
  }),
});

export const {
  useGetAllBooksQuery,
  useGetBookByIdQuery,
  useAddBookMutation,
  useDeleteBookMutation,
  useUpdateBookMutation,
  useBorrowBookMutation,
  useGetBorrowSummaryQuery,
  useGetLatestBooksQuery,
} = baseapi;
