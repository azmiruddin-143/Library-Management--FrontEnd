// src/components/BorrowBookForm.tsx
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { FaArrowLeft } from 'react-icons/fa';

import {
  useGetBookByIdQuery,
  useBorrowBookMutation,
} from '../redux/api/baseApi';
import LoadingSpinner from './LoadingSpinner';

const BorrowBookForm: React.FC = () => {
  const { bookId } = useParams<{ bookId: string }>();
  const navigate = useNavigate();
  const { data: bookResponse, error: fetchError, isLoading: isFetchingBook } = useGetBookByIdQuery(bookId || '');
  const book = bookResponse?.book;


  const [borrowBook, { isLoading: isBorrowing, error: borrowError }] = useBorrowBookMutation();


  const [formData, setFormData] = useState({
    quantity: 1,
    dueDate: '',
  });


  useEffect(() => {
    const today = new Date();
    const dueDate = new Date(today.setDate(today.getDate() + 7));
    setFormData((prev) => ({
      ...prev,
      dueDate: dueDate.toISOString().split('T')[0],
    }));
  }, []);


  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'number' ? Number(value) : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!book) {
      toast.error('Book data not loaded.');
      return;
    }

    if (formData.quantity <= 0) {
      toast.error('Quantity must be at least 1.');
      return;
    }
    if (formData.quantity > book.copies) {
      toast.error(`You cannot borrow more than ${book.copies} copies available.`);
      return;
    }

    try {

      await borrowBook({
        book: book._id,
        quantity: formData.quantity,
        dueDate: formData.dueDate,
      }).unwrap();

      toast.success(`Successfully borrowed ${formData.quantity} copies of "${book.title}"!`);
      navigate('/borrow-summary');

    } catch (err) {
      console.error('Failed to borrow book:', err);
      toast.error(`Failed to borrow book: ${(err as any)?.data?.message || 'Unknown error'}`);
    }
  };

  if (isFetchingBook) {
    return (
      <div className="flex justify-center items-center h-screen text-xl text-gray-700">
        <LoadingSpinner></LoadingSpinner>
      </div>
    );
  }

  if (fetchError) {
    const errorMessage = (fetchError as any).data?.message || (fetchError as any).error || 'Failed to load book data.';
    toast.error(errorMessage);
    return (
      <div className="flex justify-center items-center h-screen text-xl text-red-600">
        <p>Error: {errorMessage}</p>
        <Link to="/books" className="ml-4 text-blue-600 hover:text-blue-800">Back to Books</Link>
      </div>
    );
  }

  if (!book) {
    return (
      <div className="container mx-auto p-4 mt-8 text-center h-screen">
        <h2 className="text-3xl font-bold mb-6 text-gray-800">Book Not Found</h2>
        <p className="text-gray-600 mt-4">The book you are trying to borrow does not exist.</p>
        <Link to="/books" className="mt-6 inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-md transition duration-300">
          Back to All Books
        </Link>
      </div>
    );
  }

  return (
    <div className='h-screen'>
      <div className="max-w-3xl mx-auto mt-8 p-6 bg-white shadow-md rounded-xl">
        <Link to="/all-books" className="inline-flex items-center text-blue-600 hover:text-blue-800 transition duration-300 mb-6">
          <FaArrowLeft className="mr-2" /> Back to All Books
        </Link>
        <h2 className="text-2xl font-bold mb-6 text-center">Borrow Book: "{book.title}"</h2>
        <p className="text-center text-gray-600 mb-4">Available Copies: <span className="font-semibold text-blue-600">{book.copies}</span></p>

        <form onSubmit={handleSubmit} className="space-y-4">

          <div>
            <label htmlFor="quantity" className="block text-gray-700 text-sm font-medium mb-2">Quantity to Borrow</label>
            <input
              type="number"
              id="quantity"
              name="quantity"
              value={formData.quantity}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md p-2 focus:ring-blue-500 focus:border-blue-500"
              min="1"
              max={book.copies}
              required
            />
          </div>

          <div>
            <label htmlFor="dueDate" className="block text-gray-700 text-sm font-medium mb-2">Due Date</label>
            <input
              type="date"
              id="dueDate"
              name="dueDate"
              value={formData.dueDate}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md p-2 focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded-md transition duration-300"
            disabled={isBorrowing || isFetchingBook || book.copies === 0}
          >
            {isBorrowing ? 'Borrowing...' : (book.copies === 0 ? 'No Copies Available' : 'Borrow Book')}
          </button>
        </form>
      </div>
    </div>
  );
};

export default BorrowBookForm;