import { Outlet } from "react-router-dom";
import Header from "../components/Header";
// import { ToastBar } from "react-hot-toast";

const Root = () => {
    return (
        <div>
            {/* <ToastBar
                position="top-center"
                reverseOrder={false}
            /> */}
            <Header></Header>
            <Outlet></Outlet>
        </div>
    );
};

export default Root;