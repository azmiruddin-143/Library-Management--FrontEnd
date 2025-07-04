
import { createBrowserRouter, } from "react-router";
import Root from "./Root";
import AddBookForm from "../components/AddBookForm";
import AllBooks from "../components/AllBooks";
import BookDetails from "../components/BookDetails";
;
export const router = createBrowserRouter([
    {
        path: "/",
        element: <Root></Root>,
        children: [
            {
                path: "/add-book",
                element: <AddBookForm></AddBookForm>,
            },
            {
                path: "/all-books",
                element: <AllBooks></AllBooks>,
            },
            {
                path: "books/:id" ,
                element: <BookDetails />
            },
        ]

    }

]);