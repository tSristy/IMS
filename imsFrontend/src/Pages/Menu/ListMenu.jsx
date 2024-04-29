import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, Card, Col, Container, Form, InputGroup, Row, Stack, Table, Modal } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const ListMenu = () => {
    const navigate = useNavigate();
    const [menus, setMenus] = useState([]);
    const [editMenu, setEditMenu] = useState(null);
    //const [categories, setCategories] = useState([]);
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
    const [searchTerm, setSearchTerm] = useState('');
    const [searchResult, setSearchResult] = useState([]);
    const [showEditModal, setShowEditModal] = useState(false);

    useEffect(() => {
        fetchMenus();
        //fetchCategories();
        // fetchCategoryIds();
    }, []);

    const fetchMenus = async () => {
        try {
            const response = await axios.get('http://localhost:4321/menus');
            setMenus(response.data);
        } catch (error) {
            console.error('Error fetching menus:', error);
        }
    };


    const handleEdit = async (Id) => {
        try {
            const response = await axios.get(`http://localhost:4321/menus/${Id}`);
            setEditMenu(response.data);
            setFormData(response.data);
            setShowEditModal(true);
        } catch (error) {
            console.error('Error fetching menu details:', error);
        }
    };

    const handleDelete = async (Id) => {
        try {
            await axios.delete(`http://localhost:4321/menus/${Id}`);
            fetchMenus();
            console.log('Menu deleted successfully');
        } catch (error) {
            console.error('Error deleting menu:', error);
        }
    };
    
    const handleSearch = (value) => {
        setSearchTerm(value);
        const filteredMenus = menus.filter((menu) =>
            menu.Id.toLowerCase().includes(value.toLowerCase())
        );
        setSearchResult(filteredMenus);
    };

    const handleCloseEditModal = () => {
        setShowEditModal(false);
    };

    const handleUpdateMenu = async () => {
        try {
            await axios.put(`http://localhost:4321/menus/${editMenu.Id}`, formData);
            fetchMenus();
            setShowEditModal(false);
            console.log('Menu updated successfully');
        } catch (error) {
            console.error('Error updating menu:', error);
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
                    <Card.Text className='m-3' style={{ fontSize: "26px", fontWeight: "100" }}>Menu</Card.Text>
                    <Card.Subtitle className="m-3 mt-0 text-muted">
                        <Row className="justify-content-md-center">

                            <Col lg={4}>
                                Here results are displayed
                            </Col>
                            <Col lg={8} sm={12}>
                                <InputGroup>
                                    <Form.Control
                                        placeholder="menu"
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
                                    <th className='text-secondary text-uppercase fw-light' style={{ fontSize: "smaller" }}>Code</th>
                                    <th className='text-secondary text-uppercase fw-light' style={{ fontSize: "smaller" }}>Description</th>
                                    <th className='text-secondary text-uppercase fw-light' style={{ fontSize: "smaller" }}>Is Active</th>
                                    <th className='text-secondary text-uppercase fw-light' style={{ fontSize: "smaller" }}>Title</th>
                                    <th className='text-secondary text-uppercase fw-light' style={{ fontSize: "smaller" }}>Parent Id</th>
                                    <th className='text-secondary text-uppercase fw-light' style={{ fontSize: "smaller" }}>URL_Path</th>
                                    <th className='text-secondary text-uppercase fw-light' style={{ fontSize: "smaller" }} colSpan={2}>Actions</th>
                                </tr>
                            </thead>

                            <tbody>
                                {(searchTerm ? searchResult : menus).map((menu, index) => (
                                    <tr key={menu.Code}>
                                        <td className='p-2 text-muted'>{index + 1}</td>
                                        <td className='p-2'>{menu.Description}</td>
                                        <td className='p-2'>{menu.Is_Active}</td>
                                        <td className='p-2'>{menu.Title}</td>
                                        <td className='p-2'>{menu.Parent_Id}</td>
                                        <td className='p-2'>{menu.URL_Path}</td>
                                        <td className='p-2'>
                                            <Button className='m-0 p-0' variant="none" onClick={() => handleEdit(menu.Id)}><i class="bi bi-pencil-square" style={{ color: "blue" }}></i></Button>
                                        </td>
                                        <td className='p-2'>
                                            <Button className='m-0 p-0' variant="none" onClick={() => handleDelete(menu.Id)}><i class="bi bi-trash3-fill" style={{ color: "red" }}></i></Button>
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
                            <i class="bi bi-plus-circle-fill" style={{fontSize: "35px"}} onClick={(e) => { navigate("/newMenu") }}></i>
                        </Button>
                    </div>
                </Stack>
                <Modal show={showEditModal} onHide={handleCloseEditModal} centered>
                    <Modal.Header closeButton>
                        <Modal.Title>Edit Menu</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form>
                            <Form.Group className="mb-3" controlId="editDescription">
                                <Form.Label>Description</Form.Label>
                                <Form.Control type="text" name="Description" value={formData.Description} onChange={handleChange} />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="editIsActive">
                                <Form.Label>Parent ID</Form.Label>
                                <Form.Control type="number" name="Is_Active" value={formData.Is_Active} onChange={handleChange} />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="editTitle">
                                <Form.Label>Title</Form.Label>
                                <Form.Control type="text" name="Title" value={formData.Title} onChange={handleChange} />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="editParentId">
                                <Form.Label>Parent ID</Form.Label>
                                <Form.Control type="number" name="Parent_Id" value={formData.Parent_Id} onChange={handleChange} />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="editURLPath">
                                <Form.Label>URL Path</Form.Label>
                                <Form.Control type="text" name="URL_Path" value={formData.URL_Path} onChange={handleChange} />
                            </Form.Group>
                        </Form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleCloseEditModal}>
                            Cancel
                        </Button>
                        <Button variant="primary" onClick={handleUpdateMenu}>
                            Update
                        </Button>
                    </Modal.Footer>
                </Modal>
            </Container>
        </>
    );
};

export default ListMenu;