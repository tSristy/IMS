import { createBrowserRouter } from "react-router-dom";
import Layout from "../Layout/Layout";
// import TestPage from "../TestPage";
import Login from "../Pages/Login/Login";
import Category from "../Pages/Home/Category";
import Home from "../Pages/Home/Home";
import Product from "../Pages/Home/Product";
import TransactionMaster from "../Pages/Home/TransactionMaster";
import CreateCategory from "../Pages/Category/CreateCategory";
import Menu from "../Pages/Menu/Menu";
import CreateMenu from "../Pages/Menu/CreateMenu";
import ListMenu from "../Pages/Menu/ListMenu";
import ListCategory from "../Pages/Category/ListCategory";
import CreateProduct from "../Pages/Product/CreateProduct";
import ListProduct from "../Pages/Product/ListProduct";
import CreateOrg from "../Pages/Org_partners/CreateOrg";
import ListOrg from "../Pages/Org_partners/ListOrg";
//import CreateRole from "../Pages/Roles/CreateRole";
//import ListRole from "../Pages/Roles/ListRole";

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
                path: 'menu',
                element: <Menu />
            },
            {
                path: 'ListMenu',
                element: <ListMenu />
            },
            {
                path: 'newMenu',
                element: <CreateMenu />
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
            /*{
                path: 'ListRole',
                element: <ListRole />
            },
            {
                path: 'newRole',
                element: <CreateRole />
            } */        
        ]
    }
])

export default router;