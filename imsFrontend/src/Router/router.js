import { createBrowserRouter } from "react-router-dom";
import Layout from "../Layout/Layout";
// import TestPage from "../TestPage";
import Login from "../Pages/Login/Login";
import Category from "../Pages/Home/Category";
import Home from "../Pages/Home/Home";
import Product from "../Pages/Home/Product";
import TransactionMaster from "../Pages/Home/TransactionMaster";
import CreateCategory from "../Pages/Category/CreateCategory";
import ListCategory from "../Pages/Category/ListCategory";
import CreateProduct from "../Pages/Product/CreateProduct";
import ListProduct from "../Pages/Product/ListProduct";
import CreateOrg from "../Pages/Org_partners/CreateOrg";
import ListOrg from "../Pages/Org_partners/ListOrg";
import ListroleMenulink from "../Pages/Role/ListroleMenulink";
import CreateroleMenuLink from "../Pages/Role/CreateroleMenuLink";


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
                element: <Home />
            },
            {
                path: 'category',
                element: <Category />
            },
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
                path: 'CreateOrg',
                element: <CreateOrg />
            },
            {
                path: 'ListOrg',
                element: <ListOrg />
            },
            {
                path: 'product',
                element: <Product />
            },
            {
                path: 'transactionMaster',
                element: <TransactionMaster />
            },
            {
                path: 'rolemenulink',
                element: <ListroleMenulink />
            },
            {
                path: 'createrolemenu',
                element: <CreateroleMenuLink />
            }          
        ]
    }
])

export default router;