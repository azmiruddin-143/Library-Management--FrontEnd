
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { FaArrowLeft } from 'react-icons/fa';
import { useDeleteBookMutation, useGetBookByIdQuery } from '../redux/api/baseApi';
import LoadingSpinner from './LoadingSpinner';


const BookDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  const { data: responseData, error, isLoading, isFetching } = useGetBookByIdQuery(id || '');

  const book = responseData?.book || [] ;

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
        <LoadingSpinner></LoadingSpinner>
      </div>
    );
  }

  // এরর স্টেট
  if (error) {
    const errorMessage = (error as any).data?.message || (error as any).error || 'Failed to fetch book details.';
    toast.error(errorMessage);
    return (
      <div className="flex justify-center items-center h-screen text-xl text-red-600">
        <p>Error: {errorMessage}</p>
      </div>
    );
  }

  if (!book) { 
    return (
      <div className="container mx-auto p-4 mt-8 text-center h-screen">
        <h2 className="text-3xl font-bold mb-6 text-gray-800">Book Not Found</h2>
        <p className="text-gray-600 mt-4">The book you are looking for does not exist.</p>
        <Link to="/books" className="mt-6 inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-md transition duration-300">
          Back to All Books
        </Link>
      </div>
    );
  }

  return (
    <div className=" max-w-5xl mx-auto p-4 mt-8">
      <Link to="/all-books" className="inline-flex items-center text-blue-600 hover:text-blue-800 transition duration-300 mb-6">
        <FaArrowLeft className="mr-2" /> Back to All Books
      </Link>

      <div className="bg-white shadow-lg rounded-xl overflow-hidden p-8 border border-gray-200">
        <h2 className="text-4xl font-extrabold text-gray-900 mb-4 text-center">{book.title}</h2>
        <p className="text-xl text-gray-600 mb-6 text-center">Author: <span className="font-semibold">{book.author}</span></p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-gray-700">
          <div>
            <p className="font-semibold text-lg mb-2">Details:</p>
            <p><span className="font-medium">Genre:</span> {book.genre}</p>
            <p><span className="font-medium">ISBN:</span> {book.isbn}</p>
            <p><span className="font-medium">Copies:</span> {book.copies}</p>
            <p><span className="font-medium">Availability:</span>
              <span className={`ml-2 px-2 py-1 rounded-full text-sm font-semibold ${book.available ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                {book.available ? 'Available' : 'Unavailable'}
              </span>
            </p>
          </div>
          <div>
            <p className="font-semibold text-lg mb-2">Description:</p>
            <p className="text-justify">{book.description}</p>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-gray-200 flex flex-wrap justify-center gap-4">
          <Link to={`/edit-book/${book._id}`} className="flex items-center justify-center px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-md transition duration-300 shadow-md">
            Edit Book
          </Link>
          <Link to={`/borrow/${book._id}`} className="flex items-center justify-center px-6 py-3 bg-green-500 hover:bg-green-600 text-white font-semibold rounded-md transition duration-300 shadow-md">
            Borrow Book
          </Link>
          <button onClick={() => handleDeleteBook(book._id, book.title)}  className="flex items-center justify-center px-6 py-3 bg-red-500 hover:bg-red-600 text-white font-semibold rounded-md transition duration-300 shadow-md">
            Delete Book
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookDetails;