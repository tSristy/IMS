import { createBrowserRouter } from "react-router-dom";
import Layout from "../Layout/Layout";
import TestPage from "../TestPage";

const router = createBrowserRouter([
    {
        path: '/login',
        element: <TestPage/>,
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