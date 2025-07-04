
import React from 'react';
import { Link } from 'react-router-dom'; 
import { toast } from 'react-hot-toast'; 
import {  useDeleteBookMutation, useGetBookQuery } from '../redux/api/baseApi';
import { FaEdit, FaEye, FaHandshake, FaTrash } from 'react-icons/fa';

const AllBooks: React.FC = () => {
  const { data: responseData, error, isLoading, isFetching } = useGetBookQuery();
  const books = responseData?.data || [];

    const [deleteBook] = useDeleteBookMutation();

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

      <div className="overflow-x-auto bg-white shadow-lg rounded-lg">
        <table className="min-w-full leading-normal">
          <thead>
            <tr className="bg-gray-200  text-gray-700 uppercase text-sm leading-normal">
              <th className="py-3  px-6 text-left">Title</th>
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
                    >
                        <FaTrash className="h-4 w-4" />
                  
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