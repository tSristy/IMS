import React, { useState } from 'react';
import axios from 'axios';
import { Button, Col, Container, FloatingLabel, Form, Row, Stack } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const CreateMenu = () => {
    const navigate = useNavigate();
  const [formData, setFormData] = useState({
      Code: '',
      Description: '',
      Is_Active: '',
      Title: '',
      URL_Path: '',
      Parent_Id: '',
      Created_By: '',
      Created_Date: '',
      Modified_By: '',
      Modified_Date: '',
  });
  const [errorMessage, setErrorMessage] = useState('');

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
      await axios.post('http://localhost:4321/menus', formData);
      console.log('Menu added successfully');
      setErrorMessage('Succesfully added');

      setFormData({
        Code: '',
        Description: '',
        Is_Active: '',
        Title: '',
        URL_Path: '',
        Parent_Id: '',
        Created_By: '',
        Created_Date: '',
        Modified_By: '',
        Modified_Date: '',
      });
    } catch (error) {
      console.error('Error adding menu:', error);
    }
  };

  return (
    <>
      <Container>

        <Row className="justify-content-md-center">
          <Col sm={12} md={6} lg={8}>
            <h4 className='mt-4 mb-5'>Add Menu</h4>
            <Form onSubmit={handleSubmit}>
              <Row className="mb-3">
                <Form.Group as={Col} controlId="formGridMenu">
                  <FloatingLabel
                    controlId="floatingInput"
                    label="Menu Code"
                    className="mb-3"
                  >
                    <Form.Control type="text" name="Code" value={formData.Code} onChange={handleChange} required />
                  </FloatingLabel>
                </Form.Group>

                <Form.Group as={Col} controlId="formGridParent">
                  <FloatingLabel
                    controlId="floatingInput"
                    label="Parent Menu"
                    className="mb-3"
                  >
                    <Form.Control type="text" />
                  </FloatingLabel>
                </Form.Group>
              </Row>

              <Form.Group className="mb-3" controlId="formGridMenuPath">
                <FloatingLabel
                  controlId="floatingInput"
                  label="Menu Path"
                  className="mb-3"
                >
                  <Form.Control type="text" />
                </FloatingLabel>
              </Form.Group>

              <Stack gap={2} className="col-md-5 mx-auto">
                <Button variant="outline-primary" type="submit" >Save changes</Button>
                <Button variant="outline-secondary" onClick={(e)=>{ navigate("/ListMenu")}}>Go back</Button>
              </Stack>

            </Form>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default CreateMenu;