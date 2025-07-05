// src/components/LatestBooksSection.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { useGetLatestBooksQuery } from '../redux/api/baseApi';
import { FaBookOpen, FaHandshake } from 'react-icons/fa';
import LoadingSpinner from './LoadingSpinner';

// interface BookForm {
//   _id: string;
//   title: string;
//   author: string;
//   genre: string;
//   isbn: string;
//   description: string;
//   copies: number;
//   available: boolean
// }




const LatestBooksSection: React.FC = () => {
  const { data: responseData, error, isLoading, isFetching } = useGetLatestBooksQuery();
  const latestBooks = responseData || [];


  if (isLoading || isFetching) {
    return (
      <div className="flex justify-center items-center py-12 text-xl text-gray-700">
        <LoadingSpinner></LoadingSpinner>
      </div>
    );
  }

  if (error) {
    const errorMessage = (error as any).data?.message || (error as any).error || 'Failed to fetch latest books.';
    toast.error(errorMessage);
    return (
      <div className="flex justify-center items-center py-12 text-xl text-red-600">
        <p>Error: {errorMessage}</p>
      </div>
    );
  }


  if (latestBooks.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-600 text-lg">No latest books found. Add some new books!</p>
        <Link to="/all-books" className="mt-4 inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-md transition duration-300">
          Add New Book
        </Link>
      </div>
    );
  }

  return (
    <section className="container mx-auto p-4 mt-12 mb-12">
      <h2 className="text-4xl font-extrabold text-gray-900 mb-8 text-center flex items-center justify-center">
        <FaBookOpen className="mr-4 text-blue-600" /> Latest Books
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"> {/* রেসপনসিভ গ্রিড */}
        {latestBooks.map((book) => (
          <div key={book._id} className="bg-white shadow-xl rounded-lg overflow-hidden border border-gray-200 transform hover:scale-105 transition-transform duration-300 ease-in-out">
            <div className="p-6">
              <h3 className="text-2xl font-bold text-gray-900 mb-2 truncate">{book.title}</h3>
              <p className="text-gray-700 mb-1"><span className="font-semibold">Author:</span> {book.author}</p>
              <p className="text-gray-700 mb-1"><span className="font-semibold">Genre:</span> {book.genre}</p>
              <p className="text-gray-700 mb-1"><span className="font-semibold">ISBN:</span> {book.isbn}</p>
              <p className="text-gray-700 mb-4"><span className="font-semibold">Copies:</span> {book.copies} (
                <span className={`${book.available ? 'text-green-600' : 'text-red-600'}`}>
                  {book.available ? 'Available' : 'Unavailable'}
                </span>)
              </p>


              <div className="flex justify-between items-center mt-4">
                {/* View Details Button (optional) */}
                <Link to={`/books/${book._id}`} className="flex items-center justify-center px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white text-sm font-semibold rounded-md transition duration-300">
                  View Details
                </Link>

                {/* Borrow Button */}
                <Link
                  to={`/borrow/${book._id}`}
                  className={`flex items-center justify-center px-4 py-2 text-sm font-semibold rounded-md transition duration-300 ${book.copies === 0 ? 'bg-gray-400 cursor-not-allowed' : 'bg-green-600 hover:bg-green-700 text-white'
                    }`}
                  title={book.copies === 0 ? 'No copies available for borrowing' : 'Borrow this book'}
                  aria-disabled={book.copies === 0}
                  onClick={(e: React.MouseEvent<HTMLAnchorElement>) => {
                    if (book.copies === 0) e.preventDefault();
                  }}
                >
                  <FaHandshake className="mr-2" /> Borrow
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* View All Books Button (ঐচ্ছিক) */}
      {latestBooks.length > 0 && (
        <div className="text-center mt-12">
          <Link to="/all-books" className="inline-block bg-blue-700 text-white font-semibold py-3 px-8 rounded-full transition duration-300 shadow-lg">
            View All Books
          </Link>
        </div>
      )}
    </section>
  );
};

export default LatestBooksSection;