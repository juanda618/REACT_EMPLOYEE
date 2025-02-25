import { createBrowserRouter, RouterProvider, Navigate } from "react-router-dom";
import { ThemeProvider } from "@/contexts/theme-context";
import { ToastContainer } from 'react-toastify';
import ProtectedRoute from "./components/ProtectedRoute";

import Layout from "@/routes/layout";
import DashboardPage from "@/routes/dashboard/page";
import ListEmployees from './routes/listemployees/page';
import EmployeeRegister from './routes/employeeregister/page';
import LoginComponent from "@/components/LoginComponent";
import RegisterComponent from "@/components/RegisterComponent"; 

const router = createBrowserRouter([
    {
        path: "/",
        element: <LoginComponent />, 
    },
    {
        path: "/register",
        element: <RegisterComponent />,
    },
    {
        path: "/dashboard",
        element: (
            <ProtectedRoute> 
                <Layout />
            </ProtectedRoute>
        ), 
        children: [
            {
                index: true,
                element: (
                    <ProtectedRoute>
                        <DashboardPage />
                    </ProtectedRoute>
                ),
            },
            {
                path: "list-employees",
                element: (
                    <ProtectedRoute>
                        <ListEmployees />
                    </ProtectedRoute>
                ),
            },
            {
                path: "register-employee",
                element: (
                    <ProtectedRoute>
                        <EmployeeRegister />
                    </ProtectedRoute>
                ),
            },
        ],
    },
]);

function App() {
    return (
        <ThemeProvider storageKey="theme">
            <ToastContainer position="top-right" autoClose={3000} />
            <RouterProvider router={router} />
        </ThemeProvider>
    );
}

export default App;
