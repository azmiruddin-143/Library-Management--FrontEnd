
import { createBrowserRouter, } from "react-router";
import Root from "./Root";
import AddBookForm from "../components/AddBookForm";
;
export const router = createBrowserRouter([
    {
        path: "/",
        element: <Root></Root>,
        children: [
            {
                path: "/add-book",
                element: <AddBookForm></AddBookForm>,
            }
        ]

    }

]);