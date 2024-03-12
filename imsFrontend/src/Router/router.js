import { createBrowserRouter } from "react-router-dom";
import Layout from "../Layout/Layout";
import TestPage from "../TestPage";
import Login from "../Pages/Login/Login";

const router = createBrowserRouter([
    {
        path: '/login',
        element: <Login/>,
    },
    {
        path: '/',
        element: 
            <Layout />,
        children: [
            
            {
                path: 'home',
                element: <TestPage />
            }          
        ]
    }
])

export default router;