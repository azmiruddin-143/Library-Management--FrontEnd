
import React, { useState } from 'react';


import { useAddBookMutation } from '../redux/api/baseApi';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { FaArrowLeft } from 'react-icons/fa';

const AddBookForm: React.FC = () => {

    const [addBookToBackend, { isLoading }] = useAddBookMutation();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        title: '',
        author: '',
        genre: '',
        isbn: '',
        description: '',
        copies: 1,
    });

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { name, value, type } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: type === 'number' ? Number(value) : value,
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const bookToAdd = {
            ...formData,
            copies: Number(formData.copies),
            available: formData.copies > 0,
        };

        try {

            await addBookToBackend(bookToAdd).unwrap();

            toast.success('Book added successfully');
            navigate('/all-books');

            setFormData({
                title: '',
                author: '',
                genre: '',
                isbn: '',
                description: '',
                copies: 1,
            });

        } catch (err) {
            console.error('Failed to add book to backend:', err);

        }
    };

    return (
        <div className="max-w-3xl mx-auto mt-8 p-6 bg-white shadow-md rounded-xl">
            <Link to="/all-books" className="inline-flex items-center text-blue-600 hover:text-blue-800 transition duration-300 mb-6">
                <FaArrowLeft className="mr-2" /> Back to All Books
            </Link>
            <h2 className="text-2xl font-bold mb-6 text-center">Add New Book</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block font-medium">Title</label>
                    <input type="text" name="title" value={formData.title} onChange={handleChange} className="w-full border rounded p-2" required />
                </div>
                <div>
                    <label className="block font-medium">Author</label>
                    <input type="text" name="author" value={formData.author} onChange={handleChange} className="w-full border rounded p-2" required />
                </div>
                <div>
                    <label className="block font-medium">Genre</label>
                    <select
                        name="genre"
                        value={formData.genre}
                        onChange={handleChange}
                        className="w-full border rounded p-2"
                        required
                    >
                        <option value="">-- Select Genre --</option>
                        <option value="FICTION">Fiction</option>
                        <option value="NON_FICTION">Non-Fiction</option>
                        <option value="SCIENCE">Science</option>
                        <option value="HISTORY">History</option>
                        <option value="BIOGRAPHY">Biography</option>
                        <option value="FANTASY">Fantasy</option>
                    </select>
                </div>
                <div>
                    <label className="block font-medium">ISBN</label>
                    <input type="text" name="isbn" value={formData.isbn} onChange={handleChange} className="w-full border rounded p-2" required />
                </div>
                <div>
                    <label className="block font-medium">Description</label>
                    <textarea name="description" value={formData.description} onChange={handleChange} className="w-full border rounded p-2" rows={4} />
                </div>
                <div>
                    <label className="block font-medium">Copies</label>
                    <input type="number" name="copies" value={formData.copies} onChange={handleChange} className="w-full border rounded p-2" min="1" required />
                </div>

                <button
                    type="submit"
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded"
                    disabled={isLoading}
                >
                    {isLoading ? 'Adding Book...' : 'Add Book'}
                </button>
            </form>
        </div>
    );
};

export default AddBookForm;