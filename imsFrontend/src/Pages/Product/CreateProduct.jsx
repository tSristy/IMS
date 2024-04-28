import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, Col, Container, FloatingLabel, Form, Row, Stack } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const CreateProduct = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    Product_Type: '',
    Product_Name: '',
    Brand: '',
    Depreciation: '',
    Model_No: '',
    Category_Id: '',
    Created_By: '',
    Created_Date: '',
    Modified_By: '',
    Modified_Date: '',
  });
  const [categoryIds, setCategoryIds] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const fetchCategoryIds = async () => {
      try {
        const response = await axios.get('http://localhost:4321/category-ids');
        setCategoryIds(response.data);
      } catch (error) {
        console.error('Error fetching category IDs:', error);
      }
    };
  
    fetchCategoryIds();
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
      await axios.post('http://localhost:4321/products', formData);
      setFormData({
        Product_Type: '',
        Product_Name: '',
        Brand: '',
        Depreciation: '',
        Model_No: '',
        Category_Name: '',
        Created_By: '',
        Created_Date: '',
        Modified_By: '',
        Modified_Date: '',
      });
      console.log("Added product successfully")
      setErrorMessage('Succesfully Product added');
    } catch (error) {
      console.error('Error submitting product data:', error);
      setErrorMessage('Failed to submit product data. Please try again.');
    }
  };

  return (
    <Container>
      <Row className="justify-content-md-center">
        <Col sm={12} md={6} lg={8}>
          <h4 className='mt-4 mb-5'>Add Product</h4>
          <Form onSubmit={handleSubmit}>
            <Row className="mb-3">
              <Form.Group as={Col} controlId="formGridProductType">
                <FloatingLabel controlId="floatingInput" label="Product Type" className="mb-3">
                  <Form.Control type="text" name="Product_Type" value={formData.Product_Type} onChange={handleChange} required />
                </FloatingLabel>
              </Form.Group>

              <Form.Group as={Col} controlId="formGridProductName">
                <FloatingLabel controlId="floatingInput" label="Product Name" className="mb-3">
                  <Form.Control type="text" name="Product_Name" value={formData.Product_Name} onChange={handleChange} required />
                </FloatingLabel>
              </Form.Group>
            </Row>


            <Row className="mb-3">
              <Form.Group as={Col} controlId="formGridBrand">
                <FloatingLabel controlId="floatingInput" label="Brand" className="mb-3">
                  <Form.Control type="text" name="Brand" value={formData.Brand} onChange={handleChange} required />
                </FloatingLabel>
              </Form.Group>

              <Form.Group as={Col} controlId="formGridDepreciation">
                <FloatingLabel controlId="floatingInput" label="Depreciation" className="mb-3">
                  <Form.Control type="text" name="Depreciation" value={formData.Depreciation} onChange={handleChange} required />
                </FloatingLabel>
              </Form.Group>
            </Row>

            <Row className="mb-3">
              <Form.Group as={Col} controlId="formGridModel_No">
                <FloatingLabel controlId="floatingInput" label="Model No" className="mb-3">
                  <Form.Control type="text" name="Model_No" value={formData.Model_No} onChange={handleChange} required />
                </FloatingLabel>
              </Form.Group>

              <Form.Group as={Col} controlId="formGridCategory_Name">
                <FloatingLabel controlId="floatingInput" label="Category Name" className="mb-3">
                  <Form.Control type="text" name="Category_Name" value={formData.Category_Name} onChange={handleChange} required />
                </FloatingLabel>
              </Form.Group>
            </Row>

            <Stack gap={2} className="col-md-5 mx-auto">
              <Button variant="outline-primary" type="submit">Save changes</Button>
              <Button variant="outline-secondary" onClick={() => navigate("/listProduct")}>Go back</Button>
            </Stack>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default CreateProduct;
