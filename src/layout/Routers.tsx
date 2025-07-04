
import { createBrowserRouter, } from "react-router";
import Root from "./Root";
import AddBookForm from "../components/AddBookForm";
import AllBooks from "../components/AllBooks";
import BookDetails from "../components/BookDetails";
import EditBook from "../components/EdidBook";
import BorrowBookForm from "../components/BorrowBookForm";
import BorrowSummary from "../components/BorrowSummary";
import LatestBooksSection from "../components/LatestBooksSection";
;
export const router = createBrowserRouter([
    {
        path: "/",
        element: <Root></Root>,
        children: [
            {
                path: "/",
                element: <LatestBooksSection></LatestBooksSection>,
            },
            {
                path: "/add-book",
                element: <AddBookForm></AddBookForm>,
            },
            {
                path: "/all-books",
                element: <AllBooks></AllBooks>,
            },
            {
                path: "books/:id",
                element: <BookDetails />
            },
            {
                path: "edit-book/:id",
                element: <EditBook />
            },
            {
                path: "borrow/:bookId", 
                element: <BorrowBookForm />,
            },
            {
                path: "borrow-summary", 
                element: <BorrowSummary />,
            },
          
        ]

    }

]);