import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Button, Col, Container, FloatingLabel, Form, Row, Stack } from 'react-bootstrap';
import { Typeahead } from 'react-bootstrap-typeahead';
import { useNavigate } from 'react-router-dom';
import { Autocomplete, TextField } from '@mui/material';

const CreateUser = () => {
    const navigate = useNavigate();    
    const [selected, setSelected] = useState([]);
    const [roleDetails, setRoleDetails] = useState([]);
    const [formData, setFormData] = useState({
        user_Name: '',
        password: '',
        fullname: '',
        email: '',
        designation: '',
        Role_id: '',
    });
    const [errorMessage, setErrorMessage] = useState('');


    useEffect(() => {
        const fetchRoles = async () => {
          try {
            const response = await axios.get('http://localhost:4321/roles');
            // console.log(response)
            setRoleDetails(response.data);
          } catch (error) {
            console.error('Error fetching roles:', error);
          }
        };
      
        fetchRoles();
      }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (Object.values(formData).some(value => value === '')) {
            setErrorMessage('Fill up all fields, please');
            return;
        }

        try {
            await axios.post('http://localhost:4321/roles', formData);
            setErrorMessage('Succesfully added');

            setFormData({
                user_Name: '',
                password: '',
                fullname: '',
                email: '',
                designation: '',
                Role_id: '',
            });
        } catch (error) {
            console.error('Error adding category:', error);
        }
    };

    return (
        <>
            <Container>

                <Row className="justify-content-md-center">
                    <Col sm={12} md={6} lg={8}>
                        <h4 className='mt-4 mb-5'>Create User</h4>
                        <Form onSubmit={handleSubmit}>
                            <Row className="mb-3">
                                <Form.Group as={Col} controlId="formGridCategory">
                                    <FloatingLabel
                                        controlId="floatingInput"
                                        label="Username"
                                        className="mb-3"
                                    >
                                        <Form.Control type="text" name="Username" onChange={handleChange} required />
                                    </FloatingLabel>
                                </Form.Group>

                                <Form.Group as={Col} controlId="formGridParent">
                                    <FloatingLabel
                                        controlId="floatingInput"
                                        label="Password"
                                        className="mb-3"
                                    >
                                        <Form.Control type="text" />
                                    </FloatingLabel>
                                </Form.Group>
                            </Row>


                            <Row className="mb-3">
                                <Form.Group as={Col} controlId="formGridCategory">
                                    <FloatingLabel
                                        controlId="floatingInput"
                                        label="Full Name"
                                        className="mb-3"
                                    >
                                        <Form.Control type="text" name="fullname" onChange={handleChange} required />
                                    </FloatingLabel>
                                </Form.Group>

                                <Form.Group as={Col} controlId="formGridParent">
                                    <FloatingLabel
                                        controlId="floatingInput"
                                        label="email"
                                        className="mb-3"
                                    >
                                        <Form.Control type="email" />
                                    </FloatingLabel>
                                </Form.Group>
                            </Row>

                            <Row className="mb-3">
                                <Form.Group as={Col} controlId="formGridCategory">
                                    <FloatingLabel
                                        controlId="floatingInput"
                                        label="Designation"
                                        className="mb-3"
                                    >
                                        <Form.Control type="text" name="designation" onChange={handleChange} required />
                                    </FloatingLabel>
                                </Form.Group>

                                <Form.Group as={Col} controlId="formGridParent">
                                    <FloatingLabel
                                        controlId="floatingInput"
                                        // label="Role"
                                        className="mb-3"
                                    >   
                                    {/* <Form.Control type="text" name="designation" onChange={handleChange} required /> */}
                                    
                                    <Autocomplete 
  disablePortal fullWidth
  id="combo-box-demo"
  options={roleDetails} getOptionLabel={(option) => option.Role_Name || ""}
  renderInput={(params) => <TextField {...params} label="Role" style={{background: "white", border: 'none'}}/>}
/>
                                    </FloatingLabel>
                                </Form.Group>
                            </Row>

                            <Stack gap={2} className="col-md-5 mx-auto">
                                <Button variant="outline-primary" type="submit" >Save changes</Button>
                                <Button variant="outline-secondary" onClick={(e) => { navigate("/ListCat") }}>Go back</Button>
                            </Stack>

                        </Form>
                    </Col>
                </Row>
            </Container>
        </>
    );
};

export default CreateUser;