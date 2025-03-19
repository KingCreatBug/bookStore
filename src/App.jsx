import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import LoginPage from "./pages/login";
import RegisterPage from "./pages/register";
import ContactPage from "./pages/contact";
import BookPage from "./pages/book";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./components/Home";
import { useEffect } from "react";
import { callFetchAccount } from "./service/api";
import { useDispatch } from "react-redux";
import { doGetAccountAction } from "./redux/account/accountSlice";

const Layout = () => {
    return (
        <>
            <Header />
            <Outlet />
            <Footer />
        </>
    );
};

const router = createBrowserRouter([
    {
        path: "/",
        element: <Layout />,
        errorElement: <h1>Not Found</h1>,
        children: [
            {
                index: true,
                element: <Home />,
            },
            {
                path: "contact",
                element: <ContactPage />,
            },
            {
                path: "book",
                element: <BookPage />,
            },
        ],
    },
    {
        path: "/login",
        element: <LoginPage />,
    },
    {
        path: "/register",
        element: <RegisterPage />,
    },
]);

function App() {
    const dispatch = useDispatch();

    const getAccount = async () => {
        const res = await callFetchAccount();
        if (res?.data) {
            dispatch(doGetAccountAction(res.data));
        }
    };

    useEffect(() => {
        getAccount();
    }, []);

    return <RouterProvider router={router} />;
}

export default App;
