import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaBars, FaTimes } from 'react-icons/fa';

const Header = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(prev => !prev);
    };

    return (
        <header className="bg-blue-600 text-white shadow-md">
            <div className="container  mx-auto px-4 py-3 flex justify-between items-center">
    
                <h1 className="text-lg md:text-xl font-bold">Library Management</h1>

                <nav className="hidden md:flex space-x-6 text-base">
                    <Link to="/add-book" className="hover:underline">Add Book</Link>
                    <Link to="/all-books" className="hover:underline">All Books</Link>
                    <Link to="/borrow-summary" className="hover:underline">Borrow Summary</Link>
                </nav>

                {/* Mobile Menu Icon */}
                <div className="md:hidden">
                    <button onClick={toggleMenu} aria-label="Toggle Menu">
                        {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
                    </button>
                </div>
            </div>

            {/* Mobile Dropdown Menu */}
            <div
                className={`md:hidden bg-blue-500 overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? 'max-h-40' : 'max-h-0'
                    }`}
            >
                <nav className="flex flex-col px-4 py-2 space-y-2">
                    <Link to="/books" onClick={toggleMenu} className="hover:underline">
                        All Books
                    </Link>
                    <Link to="/add-book" onClick={toggleMenu} className="hover:underline">
                        Add Book
                    </Link>
                    <Link to="/borrow-summary" onClick={toggleMenu} className="hover:underline">
                        Borrow Summary
                    </Link>
                </nav>
            </div>
        </header>
    );
};

export default Header;
