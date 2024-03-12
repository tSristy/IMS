import { IconButton, InputAdornment, InputLabel, OutlinedInput, TextField } from '@mui/material';
import React, { useState } from 'react';
import { Button, Form, Stack } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { AccountCircle, Visibility, VisibilityOff } from '@mui/icons-material';
import { URL } from '../../config';

const backGroundDiv = {
    height: "100vh",
    paddingTop: "5%",
    // backgroundColor: 'rgb(0,0,128, 0.2)',
}

const loginStyle = {
    // backgroundColor: "white",
    padding: "15px",
    borderRadius: "6%",
}


const Login = () => {
    // const navigate = useNavigate();
    const [userID, setUserID] = useState('');
    const [password, setPassword] = useState('');
    const [errMsg, setErrMsg] = useState()

    const loginHandleBtn = (e) => {
        console.log("click")
        fetch(URL+'/login', {
            // fetch(url + 'auth', {
            method: 'POST',
            headers: {
                'Content-Type': 'Application/json'
            },
            body: JSON.stringify({
                // rememberMe: true,
                Username: userID,
                Password: password
            })
        })
            // .then(res => res.json())
            .then(Response => {
                console.log(Response.status)
                if (Response.status === 200) {
                    //     // const defaultUser = {
                    //     //     isLoggedIn: true,
                    //     //     userInfo: data
                    //     // };
                    // signIn(true);
                    //     console.log(Response.status)
                    //     // sessionStorage.setItem("loginInfo", JSON.stringify(defaultUser));
                    // navigate('/')
                }
                // else {
                //     // setErrMsg(data.msgText)
                // }
            })

        e.preventDefault();
    }



    const [showPassword, setShowPassword] = React.useState(false);
    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    return (
        <div style={backGroundDiv}>
            <Stack gap={2} className="col-md-4 mx-auto">
                <div style={loginStyle}>
                    <Form className='mt-5 mb-5' onSubmit={loginHandleBtn}>

                        <h5 className="text-center font-weight-bold">Welcome Back!</h5>
                        <p className="text-center mb-3">Enter your details to log into the system</p>

                        <Stack gap={2} className="col-md-9 mx-auto pt-3">
                            <div className="mt-3 mb-3">
                                <InputLabel htmlFor="component-simple" style={{ fontSize: "14px", fontWeight: "600", padding: "2%" }}>Username</InputLabel>
                                <TextField name="username"
                                    fullWidth
                                    variant="outlined"
                                    type="text"
                                    onChange={(e) => setUserID(e.target.value)}
                                    placeholder="Enter your username"
                                    InputProps={{
                                        style: {
                                            borderRadius: "10px",
                                        },
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <AccountCircle />
                                            </InputAdornment>
                                        ),
                                    }}
                                />
                            </div>

                            <div className="mb-3">
                                <InputLabel htmlFor="component-simple" style={{ fontSize: "14px", fontWeight: "600", padding: "2%" }}>Password</InputLabel>
                                <OutlinedInput
                                    id="standard-adornment-password"
                                    type={showPassword ? 'text' : 'password'}
                                    fullWidth
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="Enter your password"
                                    InputProps={{
                                        style: {
                                            borderRadius: "10px",
                                        }
                                    }}

                                    endAdornment={
                                        <InputAdornment position="end">
                                            <IconButton
                                                aria-label="toggle password visibility"
                                                onClick={handleClickShowPassword}
                                                onMouseDown={handleMouseDownPassword}
                                            >
                                                {showPassword ? <VisibilityOff /> : <Visibility />}
                                            </IconButton>
                                        </InputAdornment>
                                    }
                                />
                            </div>

                            <div className="d-grid gap-2 mt-4 mb-3">
                                <Button type="submit"
                                    style={{
                                        backgroundColor: "#6375f0",
                                        border: "none",
                                        padding: "3%"
                                    }}
                                    // size="sm"
                                    onClick={loginHandleBtn}
                                >
                                    Login
                                </Button>
                                {
                                    (errMsg) && (<p className="text-center text-danger">{errMsg.toUpperCase()}</p>)
                                }
                            </div>
                        </Stack>



                    </Form>
                </div>
            </Stack>
        </div>
    );
};

export default Login;