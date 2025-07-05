# Library Management 📚

A minimal and efficient client-side library management system built with React, TypeScript, Redux Toolkit Query, and Tailwind CSS. This application allows users to manage books, view details, borrow books, and see a summary of borrowed items, all without the need for authentication.

## Live Link 
### https://libary-frontend.vercel.app/

## ✨ Features Implemented

Through this project, the following core functionalities and UI/UX enhancements have been implemented:

-   **Public Access**: All core functionalities are accessible without any login or authentication.
-   **Book Management (CRUD Operations)**:
    -   **View All Books**: Displays a comprehensive table of all available books.
        -   **Filtering**: Books can be filtered by `Genre`.
        -   **Sorting**: Books can be sorted by `Title`, `Author`, `Genre`, `Copies` in ascending or descending order.
        -   **Pagination/Limit**: Users can control the number of items displayed per page.
    -   **Add New Book**: A dedicated form for adding new books with fields like Title, Author, Genre, ISBN, Description, and Copies. Includes genre selection via a dropdown to ensure valid entries.
    -   **View Book Details**: Clicking the "View" icon (`<FaEye />`) in the book list navigates to a dedicated page showing a single book's full information in a clean, responsive card design.
    -   **Edit Book**: Clicking the "Edit" icon (`<FaEdit />`) in the book list navigates to an edit form. This form pre-fills with the existing book data, which can then be updated and submitted to the backend.
    -   **Delete Book**: Clicking the "Delete" icon (`<FaTrash />`) triggers a confirmation dialog. Upon confirmation, the book is deleted from the backend, and the UI automatically updates without a page reload.
-   **Borrow Management**:
    -   **Borrow Book Form**: Accessed via the "Borrow" icon (`<FaHandshake />`) in the book list.
    -   **Fields**: Includes fields for `Quantity` to borrow and a `Due Date`.
    -   **Business Logic**:
        -   Prevents borrowing more copies than `available`.
        -   Updates book `copies` and `available` status in the backend upon successful borrowing.
    -   **Redirection**: Redirects to the Borrow Summary page upon successful borrowing.
-   **Borrow Summary**:
    -   Displays an aggregated list of books that have been borrowed, retrieved from a backend aggregation API.
    -   Columns include `Book Title`, `ISBN`, and `Total Quantity Borrowed`.
    -   Accessible via a dedicated link in the Navbar.
-   **Latest Books Section (Homepage)**:
    -   A prominent section on the homepage showcasing the 6 most recently added books.
    -   Each book is displayed in a responsive card design with key details and a "Borrow" button.
-   **Responsive UI/UX**:
    -   Clean and minimalist user interface designed with **Tailwind CSS**.
    -   Layouts are fully responsive, adapting seamlessly to mobile, tablet, and desktop devices (e.g., Header, Tables, Cards, Forms).
    -   Easy navigation between pages with clearly labeled buttons and links.
-   **Toast Notifications**: Provides user feedback for successful operations (e.g., "Book added successfully!") and error messages using `react-hot-toast`.
-   **Optimistic UI Updates (via RTK Query)**: Although not explicitly implemented as 'optimistic', RTK Query's `invalidatesTags` effectively handles cache invalidation, leading to automatic UI updates after CRUD operations (Add, Edit, Delete, Borrow) without manual re-fetching, providing a smooth user experience.

## 🚀 Technologies Used

This project leverages a modern and robust tech stack for both frontend development and API integration.

### Frontend
-   **React**: For building the interactive user interface.
-   **TypeScript**: Ensures type safety throughout the frontend codebase, reducing runtime errors.
-   **Redux Toolkit**: Manages global application state, providing a streamlined Redux development experience.
-   **Redux Toolkit Query (RTK Query)**: Handles all API data fetching, caching, and state management, significantly reducing boilerplate.
-   **Tailwind CSS**: For utility-first styling, enabling rapid UI development and responsive design.
-   **React Router DOM**: For client-side routing and navigation between different pages.
-   **React Icons (`react-icons/fa`)**: Provides a wide range of customizable icons for UI elements (e.g., View, Edit, Delete, Borrow icons).
-   **React Hot Toast**: For displaying elegant and informative toast notifications to the user.

### Backend (Based on provided code snippets & common practices)
-   **Node.js**: As the server-side runtime environment.
-   **Express.js**: A flexible and minimalist web application framework for Node.js, used for building the RESTful API.
-   **MongoDB**: A NoSQL database used for storing book and borrow data.
-   **Mongoose**: An ODM (Object Data Modeling) library for MongoDB and Node.js, providing schema validation and data modeling.
-   **CORS**: Middleware enabled to allow cross-origin requests from the frontend application.

## 📦 Project Structure