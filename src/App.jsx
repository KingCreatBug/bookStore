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
import { useDispatch, useSelector } from "react-redux";
import { doGetAccountAction } from "./redux/account/accountSlice";
import Loading from "./components/Loading";
import NotFound from "./components/NotFound";
import AdminPage from "./pages/admin";
import ProtectedRoute from "./components/ProtectedRoute";
import AdminUser from "./pages/admin/AdminUser";
import AdminBook from "./pages/admin/AdminBook";
import AdminOrder from "./pages/admin/AdminOrder";
import LayoutAdmin from "./components/Admin/LayoutAdmin";

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
        errorElement: <NotFound />,
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
        path: "/admin",
        element: <LayoutAdmin />,
        errorElement: <NotFound />,
        children: [
            {
                index: true,
                element: (
                    <ProtectedRoute>
                        <AdminPage />
                    </ProtectedRoute>
                ),
            },
            {
                path: "user",
                element: <AdminUser />,
            },
            {
                path: "book",
                element: <AdminBook />,
            },
            {
                path: "order",
                element: <AdminOrder />,
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
    const isLoading = useSelector((state) => state.account.isLoading);

    const getAccount = async () => {
        if (
            window.location.pathname === "/login" ||
            window.location.pathname === "/register"
        )
            return;
        const res = await callFetchAccount();
        if (res?.data) {
            dispatch(doGetAccountAction(res.data));
        }
    };

    useEffect(() => {
        getAccount();
    }, []);

    return (
        <>
            {!isLoading ||
            window.location.pathname === "/login" ||
            window.location.pathname === "/register" ||
            window.location.pathname === "/" ? (
                <RouterProvider router={router} />
            ) : (
                <Loading />
            )}
        </>
    );
}

export default App;
