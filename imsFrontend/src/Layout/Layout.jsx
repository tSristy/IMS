import React from 'react';
// import { Stack } from '@mui/material';
// import { Outlet } from 'react-router-dom';
import Dashboard from '../Pages/Home/Dashboard';



const Layout = (props) => {
    return (
        <div>
            {/* <Stack direction="row">
                <Outlet/>
            </Stack> */}
            <Dashboard />
        </div>
    );
};

export default Layout;