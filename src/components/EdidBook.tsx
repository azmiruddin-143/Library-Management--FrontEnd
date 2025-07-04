// src/components/EditBook.tsx
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { toast } from 'react-hot-toast';

import {
  useGetBookByIdQuery, // বইয়ের ডেটা আনার জন্য
  useUpdateBookMutation, // বই আপডেট করার জন্য
} from '../redux/api/baseApi';
import { FaArrowLeft } from 'react-icons/fa';

// GENRE_OPTIONS টি AddBookForm থেকে কপি করে এখানে রাখুন বা একটি শেয়ার্ড ফাইল থেকে ইম্পোর্ট করুন
const GENRE_OPTIONS = [
  'FICTION', // আপনার ব্যাকএন্ডের enum ভ্যালুগুলোর সাথে হুবহু মিলতে হবে
  'NON_FICTION',
  'SCIENCE',
  'HISTORY',
  'BIOGRAPHY',
  'FANTASY'
  // অন্যান্য জেনার যোগ করুন
];


const EditBook: React.FC = () => {
  const { id } = useParams<{ id: string }>(); // URL থেকে বইয়ের ID নিন
  const navigate = useNavigate();

  // 1. বইয়ের বর্তমান ডেটা ফেচ করুন
  const { data: bookResponse, error: fetchError, isLoading: isFetchingBook } = useGetBookByIdQuery(id || '');

  // 2. বই আপডেট করার জন্য মিউটেশন হুক
  const [updateBook, { isLoading: isUpdating, error: updateError, isSuccess: updateSuccess }] = useUpdateBookMutation();

  // ফর্মের স্টেট
  const [formData, setFormData] = useState({
    title: '',
    author: '',
    genre: '',
    isbn: '',
    description: '',
    copies: 1,
  });

  // যখন বইয়ের ডেটা লোড হবে, তখন ফর্মের স্টেট আপডেট করুন
  useEffect(() => {
    if (bookResponse?.book) { // নিশ্চিত করুন যে bookResponse এবং book অবজেক্ট আছে
      const bookData = bookResponse.book;
      setFormData({
        title: bookData.title,
        author: bookData.author,
        genre: bookData.genre,
        isbn: bookData.isbn,
        description: bookData.description,
        copies: bookData.copies,
      });
    }
  }, [bookResponse]); // bookResponse পরিবর্তিত হলে এই useEffect আবার রান করবে

  // এরর বা লোডিং স্টেট
  if (isFetchingBook) {
    return (
      <div className="flex justify-center items-center h-screen text-xl text-gray-700">
        <p>Loading book data for editing...</p>
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

  // যদি বই না পাওয়া যায়
  if (!bookResponse?.book) {
    return (
      <div className="container mx-auto p-4 mt-8 text-center">
        <h2 className="text-3xl font-bold mb-6 text-gray-800">Book Not Found</h2>
        <p className="text-gray-600 mt-4">The book you are looking to edit does not exist.</p>
        <Link to="/books" className="mt-6 inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-md transition duration-300">
          Back to All Books
        </Link>
      </div>
    );
  }


  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'number' ? Number(value) : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const updatedBookData = {
      ...formData,
      copies: Number(formData.copies),
      available: formData.copies > 0, 
    };

    try {

      await updateBook({ id: id || '', data: updatedBookData }).unwrap();

      toast.success('Book updated successfully!');
      navigate('/all-books');

    } catch (err) {
      toast.error(`Failed to update book: ${(err as any)?.data?.message || 'Unknown error'}`);
    }
  };

  return (
    <div className="max-w-3xl mx-auto mt-8 p-6 bg-white shadow-md rounded-xl">
      <Link to="/all-books" className="inline-flex items-center text-blue-600 hover:text-blue-800 transition duration-300 mb-6">
        <FaArrowLeft className="mr-2" /> Back to All Books
      </Link>
      <h2 className="text-2xl font-bold mb-6 text-center">Edit Book</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Title */}
        <div>
          <label htmlFor="title" className="block text-gray-700 text-sm font-medium mb-2">Title</label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-md p-2 focus:ring-blue-500 focus:border-blue-500"
            required
          />
        </div>
        {/* Author */}
        <div>
          <label htmlFor="author" className="block text-gray-700 text-sm font-medium mb-2">Author</label>
          <input
            type="text"
            id="author"
            name="author"
            value={formData.author}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-md p-2 focus:ring-blue-500 focus:border-blue-500"
            required
          />
        </div>
        {/* Genre */}
        <div>
          <label htmlFor="genre" className="block text-gray-700 text-sm font-medium mb-2">Genre</label>
          <select
            id="genre"
            name="genre"
            value={formData.genre}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-md p-2 focus:ring-blue-500 focus:border-blue-500"
            required
          >
            <option value="">-- Select Genre --</option>
            {GENRE_OPTIONS.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>
        {/* ISBN */}
        <div>
          <label htmlFor="isbn" className="block text-gray-700 text-sm font-medium mb-2">ISBN</label>
          <input
            type="text"
            id="isbn"
            name="isbn"
            value={formData.isbn}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-md p-2 focus:ring-blue-500 focus:border-blue-500"
            required
          />
        </div>
        {/* Description */}
        <div>
          <label htmlFor="description" className="block text-gray-700 text-sm font-medium mb-2">Description</label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-md p-2 focus:ring-blue-500 focus:border-blue-500"
            rows={4}
          />
        </div>
        {/* Copies */}
        <div>
          <label htmlFor="copies" className="block text-gray-700 text-sm font-medium mb-2">Copies</label>
          <input
            type="number"
            id="copies"
            name="copies"
            value={formData.copies}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-md p-2 focus:ring-blue-500 focus:border-blue-500"
            min="0"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-md transition duration-300"
          disabled={isUpdating || isFetchingBook}
        >
          {isUpdating ? 'Updating Book...' : 'Update Book'}
        </button>
      </form>
    </div>
  );
};

export default EditBook;