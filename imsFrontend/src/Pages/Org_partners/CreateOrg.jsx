import React, { useState } from 'react';
import axios from 'axios';
import { Button, Col, Container, FloatingLabel, Form, Row, Stack } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const CreateOrg = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        Name: '',
        Address: '',
        TIN_No: '',
        BIN_No: '',
        Contact_No: '',
        Email: '',
        Partner_Type: '',
        Created_By: '',
        Created_Date: '',
        Modified_By: '',
        Modified_Date: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:4321/addOrgPartner', formData);
            console.log("Added organization partner successfully");
            navigate("/listOrg");
        } catch (error) {
            console.error('Error adding organization partner:', error);
        }
    };

    return (
        <Container>
            <Row className="justify-content-md-center">
                <Col sm={12} md={6} lg={8}>
                    <h4 className='mt-4 mb-5'>Add Organization Partner</h4>
                    <Form onSubmit={handleSubmit}>
                     <Row className="mb-3">
                        <Form.Group as={Col} controlId="formName">
                        <FloatingLabel controlId="floatingInput" label="Name" className="mb-3">
                            <Form.Control type="text" name="Name" value={formData.Name} onChange={handleChange} required />
                        </FloatingLabel>
                        </Form.Group>

                        <Form.Group as={Col} controlId="formAddress">
                        <FloatingLabel controlId="floatingInput" label="Address" className="mb-3">
                            <Form.Control type="text" name="Address" value={formData.Address} onChange={handleChange} required />
                        </FloatingLabel>
                      </Form.Group>
                    </Row>

                    <Row className="mb-3">
                        <Form.Group as={Col} controlId="formTIN_No">
                        <FloatingLabel controlId="floatingInput" label="TIN No" className="mb-3">
                            <Form.Control type="text" name="TIN_No" value={formData.TIN_No} onChange={handleChange} required />
                        </FloatingLabel>
                        </Form.Group>

                        <Form.Group as={Col} controlId="formBIN_No">
                        <FloatingLabel controlId="floatingInput" label="BIN No" className="mb-3">
                            <Form.Control type="text" name="BIN_No" value={formData.BIN_No} onChange={handleChange} required />
                        </FloatingLabel>
                      </Form.Group>
                    </Row>

                    <Row className="mb-3">
                        <Form.Group as={Col} controlId="formContact_No">
                        <FloatingLabel controlId="floatingInput" label="Contact No" className="mb-3">
                            <Form.Control type="text" name="Contact_No" value={formData.Contact_No} onChange={handleChange} required />
                        </FloatingLabel>
                        </Form.Group>

                        <Form.Group as={Col} controlId="formEmail">
                        <FloatingLabel controlId="floatingInput" label="Email" className="mb-3">
                            <Form.Control type="text" name="Email" value={formData.Email} onChange={handleChange} required />
                        </FloatingLabel>
                      </Form.Group>
                    </Row>

                    <Form.Group as={Col} controlId="formPartner_Type">
                        <FloatingLabel controlId="floatingInput" label="Partner Type" className="mb-3">
                            <Form.Control type="text" name="Partner_Type" value={formData.Partner_Type} onChange={handleChange} required />
                        </FloatingLabel>
                      </Form.Group>
                      <Stack gap={2} className="col-md-5 mx-auto">
                        <Button variant="outline-primary" type="submit">Save changes</Button>
                        <Button variant="outline-secondary" onClick={() => navigate("/listOrg")}>Go back</Button>
                    </Stack>
                    </Form>
                </Col>
            </Row>
        </Container>
    );
};

export default CreateOrg;
