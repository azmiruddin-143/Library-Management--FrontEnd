import { Outlet, ScrollRestoration } from "react-router-dom";
import Header from "../components/Header";
import { Toaster } from 'react-hot-toast';
import Footer from "../components/Footer";
const Root = () => {
    return (
        <div>
            <Toaster
                position="top-right"
                reverseOrder={false}
            />
            <Header></Header>
            <Outlet></Outlet>
            <Footer></Footer>
             <ScrollRestoration />
        </div>
    );
};

export default Root;