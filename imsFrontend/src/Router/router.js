import { createBrowserRouter } from "react-router-dom";
import Layout from "../Layout/Layout";
// import TestPage from "../TestPage";
import Login from "../Pages/Login/Login";
import Category from "../Pages/Home/Category";
import Product from "../Pages/Home/Product";
import TransactionMaster from "../Pages/Home/TransactionMaster";
import CreateCategory from "../Pages/Category/CreateCategory";
import ListCategory from "../Pages/Category/ListCategory";
import CreateProduct from "../Pages/Product/CreateProduct";
import ListProduct from "../Pages/Product/ListProduct";
import CreateUser from "../Pages/User/CreateUser";

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
                path: 'ListCat',
                element: <ListCategory />
            },
            {
                path: 'newCat',
                element: <CreateCategory />
            },
            {
                path: 'ListProduct',
                element: <ListProduct />
                
            },
            {
                path: 'CreateProduct',
                element: <CreateProduct />
            },
            
            {
                path: 'transactionMaster',
                element: <TransactionMaster />
            } ,

            {
                path: 'newUser',
                element: <CreateUser/>
            }
        ]
    }
])

export default router;