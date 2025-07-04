
import React, { useState } from 'react'; 
import { Link } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { useGetAllBooksQuery, useDeleteBookMutation } from '../redux/api/baseApi';

import { FaEdit, FaEye, FaHandshake, FaTrash, FaFilter, FaSort } from 'react-icons/fa';



const GENRE_OPTIONS = [
  'FICTION',
  'NON_FICTION',
  'SCIENCE',
  'HISTORY',
  'BIOGRAPHY',
  'FANTASY'
];

const AllBooks: React.FC = () => {
  const [genreFilter, setGenreFilter] = useState<string>(''); 
  const [sortBy, setSortBy] = useState<string>(''); 
  const [sortOrder, setSortOrder] = useState<string>('asc'); 
  const [limit, setLimit] = useState<number>(20); 

  const { data: responseData, error, isLoading, isFetching } = useGetAllBooksQuery({
    genre: genreFilter,
    sortBy: sortBy,
    sort: sortOrder,
    limit: limit,
  } as any);

  const books = responseData?.data || [];

  const [deleteBook, { isLoading: isDeleting }] = useDeleteBookMutation();

  const handleDeleteBook = async (bookId: string, bookTitle: string) => {
    const confirmDelete = window.confirm(`Are you sure you want to delete "${bookTitle}"?`);
    if (!confirmDelete) {
      return;
    }

    try {
      await deleteBook(bookId).unwrap();
      toast.success(`"${bookTitle}" deleted successfully!`);
    } catch (err) {
      console.error('Failed to delete book:', err);
      toast.error(`Failed to delete "${bookTitle}": ${(err as any)?.data?.message || 'Unknown error'}`);
    }
  };

  if (isLoading || isFetching) {
    return (
      <div className="flex justify-center items-center h-screen text-xl text-gray-700">
        <p>Loading books...</p>
      </div>
    );
  }

  if (error) {
    const errorMessage = (error as any).data?.message || (error as any).error || 'Failed to fetch books.';
    toast.error(errorMessage);
    return (
      <div className="flex justify-center items-center h-screen text-xl text-red-600">
        <p>Error: {errorMessage}</p>
      </div>
    );
  }


  if (!books || books.length === 0) {
    return (
      <div className="container mx-auto p-4 mt-8 text-center">
        <h2 className="text-3xl font-bold mb-6 text-gray-800">All Books</h2>
        <Link to="/create-book" className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition duration-300 mb-6 inline-block">
          Add New Book
        </Link>
        <p className="text-gray-600 mt-4">No books found. Please add some books!</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4 mt-8">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold text-gray-800">All Books</h2>
        <Link to="/create-book" className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition duration-300">
          Add New Book
        </Link>
      </div>


      <div className="bg-white shadow-lg rounded-lg p-4 mb-6 flex flex-wrap items-center justify-between space-y-4 md:space-y-0 md:space-x-4">

        <div className="w-full md:w-auto flex-grow">
          <label htmlFor="genreFilter" className="block text-gray-700 text-sm font-medium mb-1">
            <FaFilter className="inline-block mr-2 text-gray-500" />Filter by Genre:
          </label>
          <select
            id="genreFilter"
            value={genreFilter}
            onChange={(e) => setGenreFilter(e.target.value)}
            className="w-full border border-gray-300 rounded-md p-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="">All Genres</option>
            {GENRE_OPTIONS.map((genre) => (
              <option key={genre} value={genre}>
                {genre}
              </option>
            ))}
          </select>
        </div>

        {/* Sort By */}
        <div className="w-full md:w-auto flex-grow">
          <label htmlFor="sortBy" className="block text-gray-700 text-sm font-medium mb-1">
            <FaSort className="inline-block mr-2 text-gray-500" />Sort By:
          </label>
          <select
            id="sortBy"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="w-full border border-gray-300 rounded-md p-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="">None</option>
            <option value="title">Title</option>
            <option value="author">Author</option>
            <option value="genre">Genre</option>
            <option value="copies">Copies</option>

          </select>
        </div>

        {/* Sort Order */}
        <div className="w-full md:w-auto">
          <label htmlFor="sortOrder" className="block text-gray-700 text-sm font-medium mb-1 invisible md:visible">Sort Order:</label> {/* মোবাইল এ লুকানো */}
          <select
            id="sortOrder"
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
            className="w-full border border-gray-300 rounded-md p-2 focus:ring-blue-500 focus:border-blue-500"
            disabled={!sortBy} 
          >
            <option value="asc">Ascending</option>
            <option value="desc">Descending</option>
          </select>
        </div>

        {/* Limit */}
        <div className="w-full md:w-auto">
          <label htmlFor="limit" className="block text-gray-700 text-sm font-medium mb-1">Items per page:</label>
          <input
            type="number"
            id="limit"
            value={limit}
            onChange={(e) => setLimit(Number(e.target.value))}
            className="w-full border border-gray-300 rounded-md p-2 focus:ring-blue-500 focus:border-blue-500"
            min="1"
          />
        </div>
      </div>

      <div className="overflow-x-auto bg-white shadow-lg rounded-lg">
        <table className="min-w-full leading-normal">
          <thead>
            <tr className="bg-gray-200 text-gray-700 uppercase text-sm leading-normal">
              <th className="py-3 px-6 text-left">Title</th>
              <th className="py-3 px-6 text-left">Author</th>
              <th className="py-3 px-6 text-left">Genre</th>
              <th className="py-3 px-6 text-left">ISBN</th>
              <th className="py-3 px-6 text-center">Copies</th>
              <th className="py-3 px-6 text-center">Availability</th>
              <th className="py-3 px-6 text-center">Actions</th>
            </tr>
          </thead>
          <tbody className="text-gray-600 text-sm font-light">
            {books.map((book) => (
              <tr key={book._id} className="border-b border-gray-200 hover:bg-gray-100">
                <td className="py-3 text-black font-medium px-6 text-left whitespace-nowrap">{book.title}</td>
                <td className="py-3 text-black font-medium px-6 text-left">{book.author}</td>
                <td className="py-3 px-6 text-black font-medium text-left">{book.genre}</td>
                <td className="py-3 px-6 text-black font-medium text-left">{book.isbn}</td>
                <td className="py-3 px-6 text-black font-medium text-center">{book.copies}</td>
                <td className="py-3 px-6 text-black font-medium text-center">
                  <span className={`relative inline-block px-3 py-1 font-semibold leading-tight ${book.available ? 'text-green-900' : 'text-red-900'}`}>
                    <span aria-hidden="true" className={`absolute inset-0 opacity-50 rounded-full ${book.available ? 'bg-green-200' : 'bg-red-200'}`}></span>
                    <span className="relative">{book.available ? 'Available' : 'Unavailable'}</span>
                  </span>
                </td>
                <td className="py-3 px-6 text-center">
                  <div className="flex items-center justify-center space-x-2">
                    <Link to={`/books/${book._id}`} className="w-8 h-8 flex items-center justify-center bg-blue-500 hover:bg-blue-600 text-white rounded-full transition duration-300" title="View Details">
                      <FaEye className="h-4 w-4" />
                    </Link>
                    <Link to={`/edit-book/${book._id}`} className="w-8 h-8 flex items-center justify-center bg-yellow-500 hover:bg-yellow-600 text-white rounded-full transition duration-300" title="Edit Book">
                      <FaEdit className="h-4 w-4" />
                    </Link>
                    <button
                      onClick={() => handleDeleteBook(book._id, book.title)}
                      className="w-8 h-8 flex items-center justify-center bg-red-500 hover:bg-red-600 text-white rounded-full transition duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                      title="Delete Book"
                      disabled={isDeleting}
                    >
                      {isDeleting ? (
                        <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                      ) : (
                        <FaTrash className="h-4 w-4" />
                      )}
                    </button>
                    <Link to={`/borrow/${book._id}`} className="w-8 h-8 flex items-center justify-center bg-green-500 hover:bg-green-600 text-white rounded-full transition duration-300" title="Borrow Book">
                      <FaHandshake className="h-4 w-4" />
                    </Link>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllBooks;