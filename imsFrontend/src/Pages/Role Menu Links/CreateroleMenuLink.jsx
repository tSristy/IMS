import React, { useState } from 'react';
import { Button, Row, Col, Container, FloatingLabel, Form, Stack } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const CreateroleMenuLink = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    Role_Id: '',
    Menu_Id: '',
    Action: '',
    Created_By: '',
    Created_Date: '',
    Modified_By: '',
    Modified_Date: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:4321/rolemenulinks', formData);
      navigate('/rolemenulink');
    } catch (error) {
      console.error('Error creating role menu link:', error);
    }
  };

  return (
    <Container>
      <Row className="justify-content-md-center">
        <Col sm={12} md={6} lg={8}>
          <h4 className='mt-4 mb-5'>Add Role Menu Links</h4>
          <Form onSubmit={handleSubmit}>
            <Row className="mb-3">
              <Form.Group as={Col} controlId="formGridRoleId">
                <FloatingLabel controlId="floatingInput" label="Role Id" className="mb-3">
                  <Form.Control type="text" name="Role_Id" value={formData.Role_Id} onChange={handleChange} required />
                </FloatingLabel>
              </Form.Group>

              <Form.Group as={Col} controlId="formGridMenuId">
                <FloatingLabel controlId="floatingInput" label="Menu Id" className="mb-3">
                  <Form.Control type="text" name="Menu_Id" value={formData.Menu_Id} onChange={handleChange} required />
                </FloatingLabel>
              </Form.Group>
            </Row>

            <Form.Group className="mb-3" controlId="formGridAction">
              <FloatingLabel controlId="floatingInput" label="Action" className="mb-3">
                <Form.Control type="text" name="Action" value={formData.Action} onChange={handleChange} required />
              </FloatingLabel>
            </Form.Group>

            <Stack gap={2} className="col-md-5 mx-auto">
              <Button variant="outline-primary" type="submit">Save changes</Button>
              <Button variant="outline-secondary" onClick={() => navigate("/rolemenulink")}>Go back</Button>
            </Stack>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default CreateroleMenuLink;
