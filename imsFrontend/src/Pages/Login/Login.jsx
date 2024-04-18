import { IconButton, InputAdornment,InputLabel, OutlinedInput, TextField } from '@mui/material';
import React, { useState } from 'react';
import { Button, Form, Stack } from 'react-bootstrap';
import { URL } from '../../config';
import { AccountCircle, Visibility, VisibilityOff } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

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
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errMsg, setErrMsg] = useState('');

    const loginHandleBtn = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(URL + '/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    username: username,
                    password: password
                })
            });
    
            if (response.ok) {
                // Jwt token
                const { token } = await response.json();
                console.log('User successfully logged in. Token:', token);
                navigate("/home");
            } else {
                console.log('User not valid');
                setErrMsg('Invalid username or password');
            }
        } catch (error) {
            console.error('Error during login:', error);
            setErrMsg('Failed to connect to server');
        }
    };

    const [showPassword, setShowPassword] = useState(false);
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
                                <InputLabel htmlFor="component-simple">Username</InputLabel>
                                <TextField name="username"
                                    fullWidth
                                    variant="outlined"
                                    type="text"
                                    onChange={(e) => setUsername(e.target.value)}
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
                                <InputLabel htmlFor="component-simple">Password</InputLabel>
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
                                <Button type="submit" variant="primary">Login</Button>
                                {(errMsg) && (<p className="text-center text-danger">{errMsg}</p>)}
                            </div>
                        </Stack>
                    </Form>
                </div>
            </Stack>
        </div>
    );
};

export default Login;
