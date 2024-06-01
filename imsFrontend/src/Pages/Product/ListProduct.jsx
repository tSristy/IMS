import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, Card, Col, Container, Form, InputGroup, Row, Stack, Table, Modal } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const ListProduct = () => {
    const navigate = useNavigate();
    const [products, setProducts] = useState([]);
    const [editProduct, setEditProduct] = useState(null);
    const [categories, setCategories] = useState([]);
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
    const [searchTerm, setSearchTerm] = useState('');
    const [searchResult, setSearchResult] = useState([]);
    const [showEditModal, setShowEditModal] = useState(false);

    useEffect(() => {
        fetchProducts();
        fetchCategories();
        // fetchCategoryIds();
    }, []);

    const fetchProducts = async () => {
        try {
            const response = await axios.get('http://localhost:4321/products');
            // const productsWithCategoryNames = await Promise.all(response.data.map(async (product) => {
            //     const categoryResponse = await axios.get(`http://localhost:4321/categories/${product.Category_Id}`);
            //     return {
            //         ...product,
            //         Category_Name: categoryResponse.data.Category_Name
            //     };
            // }));
            // setProducts(productsWithCategoryNames);
            setProducts(response.data);
        } catch (error) {
            console.error('Error fetching products:', error);
        }
    };

    const fetchCategories = async () => {
        try {
            const response = await axios.get('http://localhost:4321/categories');
            setCategories(response.data);
        } catch (error) {
            console.error('Error fetching categories:', error);
        }
    };

    const handleEdit = async (productId) => {
        try {
            const response = await axios.get(`http://localhost:4321/products/${productId}`);
            setEditProduct(response.data);
            setFormData(response.data);
            setShowEditModal(true);
        } catch (error) {
            console.error('Error fetching product details:', error);
        }
    };

    const handleDelete = async (productId) => {
        try {
            await axios.delete(`http://localhost:4321/products/${productId}`);
            fetchProducts();
            console.log('Product deleted successfully');
        } catch (error) {
            console.error('Error deleting product:', error);
        }
    };

    const handleSearch = (value) => {
        setSearchTerm(value);
        const filteredProducts = products.filter((product) =>
            product.Product_Name.toLowerCase().includes(value.toLowerCase())
        );
        setSearchResult(filteredProducts);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleUpdateProduct = async () => {
        try {
            await axios.put(`http://localhost:4321/products/${editProduct.Product_Id}`, formData);
            setShowEditModal(false);
            fetchProducts();
            console.log('Product updated successfully');
        } catch (error) {
            console.error('Error updating product:', error);
        }
    };

    return (
        <>
            <Container>
                <Card>
                    <Card.Text className='m-3' style={{ fontSize: "26px", fontWeight: "100" }}>Product</Card.Text>
                    <Card.Subtitle className="m-3 mt-0 text-muted">
                        <Row className="justify-content-md-center">

                            <Col lg={4}>
                                Here results are displayed
                            </Col>
                            <Col lg={8} sm={12}>
                                <InputGroup>
                                    <Form.Control
                                        placeholder="product"
                                        aria-label="searchBar"
                                        aria-describedby="basic-addon2"
                                        value={searchTerm} onChange={(e) => handleSearch(e.target.value)}
                                    />
                                    <InputGroup.Text id="basic-addon2" style={{ fontSize: "smaller" }}>search</InputGroup.Text>
                                </InputGroup>
                            </Col>
                        </Row>
                    </Card.Subtitle>
                    <Card.Text>
                        <Table striped hover size="sm" className='mt-3 table-borderless'>
                            <thead>
                                <tr>
                                    <th className='text-muted'></th>
                                    <th className='text-secondary text-uppercase fw-light' style={{ fontSize: "smaller" }}>Product Name</th>
                                    <th className='text-secondary text-uppercase fw-light' style={{ fontSize: "smaller" }}>Product Type</th>
                                    <th className='text-secondary text-uppercase fw-light' style={{ fontSize: "smaller" }}>Brand</th>
                                    <th className='text-secondary text-uppercase fw-light' style={{ fontSize: "smaller" }}>Depreciation</th>
                                    <th className='text-secondary text-uppercase fw-light' style={{ fontSize: "smaller" }}>Model No</th>
                                    <th className='text-secondary text-uppercase fw-light' style={{ fontSize: "smaller" }}>Category Name</th>
                                    <th className='text-secondary text-uppercase fw-light' style={{ fontSize: "smaller" }} colSpan={2}>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {(searchTerm ? searchResult : products).map((product, index) => (
                                    <tr key={product.Product_Id}>
                                        <td className='p-2 text-muted'>{index + 1}</td>
                                        <td className='p-2'>{product.Product_Name}</td>
                                        <td className='p-2'>{product.Product_Type}</td>
                                        <td className='p-2'>{product.Brand}</td>
                                        <td className='p-2'>{product.Depreciation}</td>
                                        <td className='p-2'>{product.Model_No}</td>
                                        <td className='p-2'>{categories.find(cat => cat.Category_Id === product.Category_Id)?.Category_Name}</td>
                                        <td className='p-2'>
                                            <Button className='m-0 p-0' variant='none' onClick={() => handleEdit(product.Product_Id)}><i class="bi bi-pencil-square" style={{ color: "blue" }}></i></Button>
                                        </td>
                                        <td className='p-2'>
                                            <Button className='m-0 p-0' variant="none" onClick={() => handleDelete(product.Product_Id)}><i class="bi bi-trash3-fill" style={{ color: "red" }}></i></Button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    </Card.Text>
                </Card>


                <Stack direction="horizontal" gap={3} className='mt-3'>
                    <div className="p-2 ms-auto">
                        <Button variant='none'>
                            <i class="bi bi-plus-circle-fill" style={{ fontSize: "35px" }} onClick={(e) => { navigate("/CreateProduct") }}></i>
                        </Button>
                    </div>
                </Stack>

                <Modal show={showEditModal} onHide={() => setShowEditModal(false)} centered>
                    <Modal.Header closeButton>
                        <Modal.Title>Edit Product</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form onSubmit={handleUpdateProduct}>
                            <Row>
                                <Col>
                                    <Form.Group className="mb-3" controlId="editProductName">
                                        <Form.Label>Product Name</Form.Label>
                                        <Form.Control type="text" name="Product_Name" value={formData.Product_Name} onChange={handleChange} />
                                    </Form.Group>
                                </Col>
                                <Col>
                                    <Form.Group className="mb-3" controlId="editProductType">
                                        <Form.Label>Product Type</Form.Label>
                                        <Form.Control type="text" name="Product_Type" value={formData.Product_Type} onChange={handleChange} />
                                    </Form.Group>
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <Form.Group className="mb-3" controlId="editBrand">
                                        <Form.Label>Brand</Form.Label>
                                        <Form.Control type="text" name="Brand" value={formData.Brand} onChange={handleChange} />
                                    </Form.Group>
                                </Col>
                                <Col>
                                    <Form.Group className="mb-3" controlId="editModelNo">
                                        <Form.Label>Model No</Form.Label>
                                        <Form.Control type="text" name="Model_No" value={formData.Model_No} onChange={handleChange} />
                                    </Form.Group>
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <Form.Group className="mb-3" controlId="editDepreciation">
                                        <Form.Label>Depreciation</Form.Label>
                                        <Form.Control type="text" name="Depreciation" value={formData.Depreciation} onChange={handleChange} />
                                    </Form.Group>
                                </Col>
                                <Col>
                                    <Form.Group className="mb-3" controlId="editCategory">
                                        <Form.Label>Category</Form.Label>
                                        <Form.Select name="Category_Id" value={formData.Category_Id} onChange={handleChange}>
                                            <option value="">Select Category</option>
                                            {categories.map((category) => (
                                                <option key={category.Category_Id} value={category.Category_Id}>{category.Category_Name}</option>
                                            ))}
                                        </Form.Select>
                                    </Form.Group>
                                </Col>
                            </Row>
                        </Form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={() => setShowEditModal(false)}>Cancel</Button>
                        <Button variant="primary" onClick={handleUpdateProduct}>Update</Button>
                    </Modal.Footer>
                </Modal>
            </Container>
        </>
    );
};

export default ListProduct;
