import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Button, Card, Col, Container, Form, InputGroup, Row, Stack, Table, Modal } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const ListCategory = () => {
    const navigate = useNavigate();
    const [showEditModal, setShowEditModal] = useState(false);
    const [showCategoryList, setShowCategoryList] = useState(false);
    const [categories, setCategories] = useState([]);
    const [editCategory, setEditCategory] = useState(null);
    const [formData, setFormData] = useState({
        Category_Name: '',
        Parent_Id: '',
        Category_Path: '',
        Created_By: '',
        Created_Date: '',
        Modified_By: '',
        Modified_Date: '',
    });
    const [searchTerm, setSearchTerm] = useState('');
    const [searchResult, setSearchResult] = useState([]);

    useEffect(() => {
        fetchCategories();
    }, []);

    const fetchCategories = async () => {
        try {
            const response = await axios.get('http://localhost:4321/categories');
            setCategories(response.data);
        } catch (error) {
            console.error('Error fetching categories:', error);
        }
    };

    const handleEdit = async (categoryId) => {
        try {
            const response = await axios.get(`http://localhost:4321/categories/${categoryId}`);
            setEditCategory(response.data);
            setFormData(response.data);
            setShowEditModal(true);
        } catch (error) {
            console.error('Error fetching category details:', error);
        }
    };

    const handleDelete = async (categoryId) => {
        try {
            await axios.delete(`http://localhost:4321/categories/${categoryId}`);
            fetchCategories();
            console.log('Category deleted successfully');
        } catch (error) {
            console.error('Error deleting category:', error);
        }
    };

    const handleSearch = (value) => {
        setSearchTerm(value);
        const filteredCategories = categories.filter((category) =>
            category.Category_Name.toLowerCase().includes(value.toLowerCase())
        );
        setSearchResult(filteredCategories);
    };

    const handleCloseEditModal = () => {
        setShowEditModal(false);
    };

    const handleUpdateCategory = async () => {
        try {
            await axios.put(`http://localhost:4321/categories/${editCategory.Category_Id}`, formData);
            fetchCategories();
            setShowEditModal(false);
            console.log('Category updated successfully');
        } catch (error) {
            console.error('Error updating category:', error);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    return (
        <>
            <Container>
                <Card>
                    <Card.Text className='m-3' style={{ fontSize: "26px", fontWeight: "100" }}>Category</Card.Text>
                    <Card.Subtitle className="m-3 mt-0 text-muted">
                        <Row className="justify-content-md-center">

                            <Col lg={4}>
                                Here results are displayed
                            </Col>
                            <Col lg={8} sm={12}>
                                <InputGroup>
                                    <Form.Control
                                        placeholder="category"
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
                                    <th className='text-secondary text-uppercase fw-light' style={{ fontSize: "smaller" }}>Category Name</th>
                                    <th className='text-secondary text-uppercase fw-light' style={{ fontSize: "smaller" }}>Parent Id</th>
                                    <th className='text-secondary text-uppercase fw-light' style={{ fontSize: "smaller" }}>Category Path</th>
                                    <th className='text-secondary text-uppercase fw-light' style={{ fontSize: "smaller" }} colSpan={2}>Actions</th>
                                </tr>
                            </thead>

                            <tbody>
                                {(searchTerm ? searchResult : categories).map((category, index) => (
                                    <tr key={category.Category_Id}>
                                        <td className='p-2 text-muted'>{index + 1}</td>
                                        <td className='p-2'>{category.Category_Name}</td>
                                        <td className='p-2'>{category.Parent_Id}</td>
                                        <td className='p-2'>{category.Category_Path}</td>
                                        <td className='p-2'>
                                            <Button className='m-0 p-0' variant='none' onClick={() => handleEdit(category.Category_Id)}><i class="bi bi-pencil-square" style={{ color: "blue" }}></i></Button>
                                        </td>
                                        <td className='p-2'>
                                            <Button className='m-0 p-0' variant="none" onClick={() => handleDelete(category.Category_Id)}><i class="bi bi-trash3-fill" style={{ color: "red" }}></i></Button>
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
                            <i class="bi bi-plus-circle-fill" style={{fontSize: "35px"}} onClick={(e) => { navigate("/newCat") }}></i>
                        </Button>
                    </div>
                </Stack>

                <Modal show={showEditModal} onHide={handleCloseEditModal} centered>
                    <Modal.Header closeButton>
                        <Modal.Title>Edit Category</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form>
                            <Form.Group className="mb-3" controlId="editCategoryName">
                                <Form.Label>Category Name</Form.Label>
                                <Form.Control type="text" name="Category_Name" value={formData.Category_Name} onChange={handleChange} />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="editParentId">
                                <Form.Label>Parent ID</Form.Label>
                                <Form.Control type="text" name="Parent_Id" value={formData.Parent_Id} onChange={handleChange} />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="editCategoryPath">
                                <Form.Label>Category Path</Form.Label>
                                <Form.Control type="text" name="Category_Path" value={formData.Category_Path} onChange={handleChange} />
                            </Form.Group>
                        </Form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleCloseEditModal}>
                            Cancel
                        </Button>
                        <Button variant="primary" onClick={handleUpdateCategory}>
                            Update
                        </Button>
                    </Modal.Footer>
                </Modal>

            </Container>
        </>
    );
};

export default ListCategory;