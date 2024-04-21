import React, { useState } from 'react';
import axios from 'axios';
import { Button, Col, Container, FloatingLabel, Form, Row, Stack } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const CreateCategory = () => {
    const navigate = useNavigate();
  const [formData, setFormData] = useState({
    Category_Name: '',
    Parent_Id: '',
    Category_Path: '',
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
      await axios.post('http://localhost:4321/categories', formData);
      console.log('Category added successfully');
      setErrorMessage('Succesfully added');

      setFormData({
        Category_Name: '',
        Parent_Id: '',
        Category_Path: '',
        Created_By: '',
        Created_Date: '',
        Modified_By: '',
        Modified_Date: '',
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
            <h4 className='mt-4 mb-5'>Add Category</h4>
            <Form onSubmit={handleSubmit}>
              <Row className="mb-3">
                <Form.Group as={Col} controlId="formGridCategory">
                  <FloatingLabel
                    controlId="floatingInput"
                    label="Category Name"
                    className="mb-3"
                  >
                    <Form.Control type="text" name="Category_Name" value={formData.Category_Name} onChange={handleChange} required />
                  </FloatingLabel>
                </Form.Group>

                <Form.Group as={Col} controlId="formGridParent">
                  <FloatingLabel
                    controlId="floatingInput"
                    label="Parent Category"
                    className="mb-3"
                  >
                    <Form.Control type="text" />
                  </FloatingLabel>
                </Form.Group>
              </Row>

              <Form.Group className="mb-3" controlId="formGridCategoryPath">
                <FloatingLabel
                  controlId="floatingInput"
                  label="Category Path"
                  className="mb-3"
                >
                  <Form.Control type="text" />
                </FloatingLabel>
              </Form.Group>

              <Stack gap={2} className="col-md-5 mx-auto">
                <Button variant="outline-primary" type="submit" >Save changes</Button>
                <Button variant="outline-secondary" onClick={(e)=>{ navigate("/ListCat")}}>Go back</Button>
              </Stack>

            </Form>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default CreateCategory;
