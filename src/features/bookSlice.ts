import { createSlice, type PayloadAction} from '@reduxjs/toolkit';

interface Book {
  title: string;
  author: string;
  genre: string;
  isbn: string;
  description: string;
  copies: number;
  available: boolean;
}

interface BookState {
  books: Book[];
}

const initialState: BookState = {
  books: [],
};

const bookSlice = createSlice({
  name: 'books',
  initialState,
  reducers: {
    addBook: (state, action: PayloadAction<Book>) => {
      state.books.push(action.payload);
      console.log('Book added:', action.payload); 
    },
  },
});

export const { addBook } = bookSlice.actions;
export default bookSlice.reducer;
