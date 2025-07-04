// src/components/BorrowSummary.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { useGetBorrowSummaryQuery } from '../redux/api/baseApi';
import { FaArrowLeft, FaTable } from 'react-icons/fa';




const BorrowSummary: React.FC = () => {
  const { data: responseData, error, isLoading, isFetching } = useGetBorrowSummaryQuery();

  const summaryItems = responseData?.data || []; // <--- ডেটা অ্যাক্সেস একই থাকবে

  // লোডিং স্টেট
  if (isLoading || isFetching) {
    return (
      <div className="flex justify-center items-center h-screen text-xl text-gray-700">
        <p>Loading borrow summary...</p>
      </div>
    );
  }

  // এরর স্টেট
  if (error) {
    const errorMessage = (error as any).data?.message || (error as any).error || 'Failed to fetch borrow summary.';
    toast.error(errorMessage);
    return (
      <div className="flex justify-center items-center h-screen text-xl text-red-600">
        <p>Error: {errorMessage}</p>
        <Link to="/books" className="ml-4 text-blue-600 hover:text-blue-800">Back to Books</Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4 mt-8">
      <Link to="/all-books" className="inline-flex items-center text-blue-600 hover:text-blue-800 transition duration-300 mb-6">
        <FaArrowLeft className="mr-2" /> Back to All Books
      </Link>

      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold text-gray-800 flex items-center">
          <FaTable className="mr-3 text-blue-600" /> Borrow Summary
        </h2>
      </div>

      {summaryItems.length === 0 ? (
        <div className="text-center py-8 bg-white shadow-md rounded-lg">
          <p className="text-gray-600 text-lg">No books have been borrowed yet.</p>
          <Link to="/books" className="mt-4 inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-md transition duration-300">
            Borrow a Book Now
          </Link>
        </div>
      ) : (
        <div className="overflow-x-auto bg-white shadow-lg rounded-lg">
          <table className="min-w-full leading-normal">
            <thead>
              <tr className="bg-gray-200 text-gray-700 uppercase text-sm leading-normal">
                <th className="py-3 px-6 text-left">Book Title</th>
                <th className="py-3 px-6 text-left">ISBN</th>
                <th className="py-3 px-6 text-center">Total Quantity Borrowed</th>
              </tr>
            </thead>
            <tbody className="text-gray-600 text-sm font-light">
              {summaryItems.map((item) => (
                // key এর জন্য item.book.isbn ব্যবহার করা হয়েছে, যদি এটি অনন্য হয়।
                // অথবা, item.bookId ব্যবহার করতে পারেন যদি আপনার aggregation এ bookId থাকে।
                <tr key={item.book.isbn || item.book.title} className="border-b border-gray-200 hover:bg-gray-100">
                  <td className="py-3 px-6 text-left whitespace-nowrap">{item.book.title}</td> {/* <--- ডেটা অ্যাক্সেস পরিবর্তন */}
                  <td className="py-3 px-6 text-left">{item.book.isbn}</td> {/* <--- ডেটা অ্যাক্সেস পরিবর্তন */}
                  <td className="py-3 px-6 text-center text-lg font-semibold text-blue-700">{item.totalQuantity}</td> {/* <--- ডেটা অ্যাক্সেস পরিবর্তন */}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default BorrowSummary;