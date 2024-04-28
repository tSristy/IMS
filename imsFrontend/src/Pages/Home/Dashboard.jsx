import React, { useState } from 'react'
import { Link, Outlet } from 'react-router-dom';
import "bootstrap-icons/font/bootstrap-icons.css";


//DashboardSidebar
const DashboardSidebar = () => {

    return (
        <div className='col-auto col-md-3 col-xl-2 px-sm-2 px-0 bg-dark'>
            <div className='d-flex flex-column align-items-center align-items-sm-start px-3 pt-2 text-white min-vh-100'>

                <Link
                    className='d-flex align-items-center pb-3 mb-md-1 mt-md-3 me-md-auto text-white text-decoration-none'
                    to="/home">
                    <span className='fs-5 fw-bolder d-none d-sm-inline'>
                        Admin Dashboard
                    </span>
                </Link>

                <ul
                    className='nav nav-pills flex-column mb-sm-auto mb-0 align-items-center align-items-sm-start'
                    id='menu'>

                    <li className='w-100'>
                        <Link
                            className='nav-link text-white px-0 align-middle'
                            to="/ListCat">
                            <i className='fs-4 bi-speedometer2 ms-2'></i>
                            <span className='ms-2 d-none d-sm-inline'>NEW UX/UI</span>
                        </Link>
                        <hr />

                    </li>

                    <li className='w-100'>
                        <Link
                            className='nav-link text-white px-0 align-middle'
                            to="/ListProduct">
                            <i className='fs-4 bi-speedometer2 ms-2'></i>
                            <span className='ms-2 d-none d-sm-inline'>NEW product UX/UI</span>
                        </Link>
                        <hr />

                    </li>

                    <li className='w-100'>
                        <Link
                            className='nav-link text-white px-0 align-middle'
                            to="/home">
                            <i className='fs-4 bi-speedometer2 ms-2'></i>
                            <span className='ms-2 d-none d-sm-inline'>Dashboard</span>
                        </Link>
                        <hr />

                    </li>

                    <li className='w-100'>
                        <Link
                            className='nav-link text-white px-0 align-middle'
                            to="/category">
                            <i className='fs-4 bi-columns ms-2'></i>
                            <span className='ms-2 d-none d-sm-inline'>Category</span>
                        </Link>
                        <hr />

                    </li>

                    <li className='w-100'>
                        <Link
                            className='nav-link text-white px-0 align-middle'
                            to="/product">
                            <i className='fs-4 bi-shop ms-2'></i>
                            <span className='ms-2 d-none d-sm-inline'>Product</span>
                        </Link>
                        <hr />

                    </li>

                    <li className='w-100'>
                        <Link
                            className='nav-link text-white px-0 align-middle'
                            to="/transactionMaster">
                            <i className='fs-4 bi-cash ms-2'></i>
                            <span className='ms-2 d-none d-sm-inline'>Transaction Master</span>
                        </Link>
                        <hr />

                    </li>

                    {/* <li className='w-100'>
                      <Link 
                          className='nav-link text-white px-0 align-middle'
                          to="/transactionDetails">
                          <i className='fs-4 bi-ticket-detailed-fill ms-2'></i>
                          <span className='ms-2 d-none d-sm-inline'>Transaction Details</span>
                      </Link>
                  </li>

                  <li className='w-100'>
                      <Link 
                          className='nav-link text-white px-0 align-middle'
                          to="/home/profile">
                          <i className='fs-4 bi-person ms-2'></i>
                          <span className='ms-2 d-none d-sm-inline'>Profile</span>
                      </Link>
                  </li> */}
                </ul>
            </div>
        </div>
    );
}

// DashboardTopBar
const DashboardTopBar = () => {
    const [dropDown, setDropdown] = useState(false);

    const toggleDropdown = () => {
        setDropdown(!dropDown);
    };

    return (
        <div className='p-5  pt-2 pb-2 d-flex flex-row-reverse border bg-white'>
            {/* <h4>Inventory Management</h4> */}
            <div className="dropdown ml-auto">
                <Link className='dropdown-item' to="/login">
                    <i className='fs-4 bi-power ms-2'></i>
                    {/* Logout */}
                </Link>
            </div>
        </div>
    );
}

const Dashboard = () => {


    return (
        <div className='container-fluid' style={{backgroundColor: "rgb(236, 236, 236)"}}>
            <div className='row flex-nowrap' >
                <DashboardSidebar />
                <div className='col p-0 m-0'>
                    <DashboardTopBar />
                    <div className='p-3 pt-5'>
                        <Outlet />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Dashboard