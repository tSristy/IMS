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
<<<<<<< HEAD
import CreateUser from "../Pages/User/CreateUser";
=======
import CreateOrg from "../Pages/Org_partners/CreateOrg";
import ListOrg from "../Pages/Org_partners/ListOrg";
>>>>>>> 2163acaf701e5e108de7138dcb88670e3883187d

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
<<<<<<< HEAD
            
=======
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
>>>>>>> 2163acaf701e5e108de7138dcb88670e3883187d
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