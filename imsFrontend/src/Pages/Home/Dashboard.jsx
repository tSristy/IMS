import React, { useState } from 'react'
import { Link, Outlet } from 'react-router-dom';
import "bootstrap-icons/font/bootstrap-icons.css";


//DashboardSidebar
const DashboardSidebar = () => {

  return (
      <div className='col-auto col-md-3 col-xl-2 px-sm-2 px-0' style={{ backgroundColor: 'white'}}>
          <div className='d-flex flex-column align-items-center align-items-sm-start px-3 pt-2 text-dark min-vh-100'>

              {/* <Link 
                  className='d-flex align-items-center pb-3 mb-md-1 mt-md-3 me-md-auto text-dark text-decoration-none'
                  to="/home">
                  <span className='fs-5 fw-bolder d-none d-sm-inline'>
                      Admin Dashboard
                  </span>
              </Link> */}

              <ul 
                  className='nav nav-pills flex-column mb-sm-auto mb-0 align-items-center align-items-sm-start'
                  id='menu'>

<li className='w-100'>
                      <Link 
                          className='nav-link text-dark px-0 align-middle'
                          to="/newCat">
                          <i className='fs-4 bi-speedometer2 ms-2'></i>
                          <span className='ms-2 d-none d-sm-inline'>NEW UX/UI</span>
                      </Link>
                      <hr />

                  </li>

                  <li className='w-100'>
                      <Link 
                          className='nav-link text-dark px-0 align-middle'
                          to="/home">
                          <i className='fs-4 bi-speedometer2 ms-2'></i>
                          <span className='ms-2 d-none d-sm-inline'>Dashboard</span>
                      </Link>
                      <hr />

                  </li>

                  <li className='w-100'>
                      <Link 
                          className='nav-link text-dark px-0 align-middle'
                          to="/category">
                          <i className='fs-4 bi-columns ms-2'></i>
                          <span className='ms-2 d-none d-sm-inline'>Category</span>
                      </Link>
                      <hr />

                  </li>

                  <li className='w-100'>
                      <Link 
                          className='nav-link text-dark px-0 align-middle'
                          to="/product">
                          <i className='fs-4 bi-shop ms-2'></i>
                          <span className='ms-2 d-none d-sm-inline'>Product</span>
                      </Link>
                      <hr />

                  </li>

                  <li className='w-100'>
                      <Link 
                          className='nav-link text-dark px-0 align-middle'
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
//   const [dropDown, setDropdown] = useState(false);

  const handleLogout = () => {
    //   setDropdown(!dropDown);
  };

  return (
    <div className='container-fluid p-0'>
    <div className='row'>
      <div className='col p-0'>
        <div className='p-2 d-flex justify-content-between text-white w-100' style={{backgroundColor: '#53A0F1'}}>
          <div></div>
          <div className="ml-auto" style={{ marginRight: '20px' }}>
            <button 
              className="btn btn-secondary" 
              type="button" 
              id="dropdownMenuButton" 
              onClick={handleLogout}
            >
              <i className="bi bi-power fs-4"></i>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
  );
}

const Dashboard = () => {


  return (
    <div className='container-fluid'>
        <DashboardTopBar /> 
      <div className='row flex-nowrap'>
                <DashboardSidebar /> 
                <div className='col p-0 m-0'>
                    <div className='p-2'>
                        <Outlet />
                    </div>
                </div>
            </div>
    </div>
  )
}

export default Dashboard