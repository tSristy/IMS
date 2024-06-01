import React, { useState, useEffect } from 'react';
import { Card, Container, Row, Col, InputGroup, Form, Table, Stack, Button, Modal } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const ListroleMenulink = () => {
    const navigate = useNavigate();
    const [roleMenuLinks, setRoleMenuLinks] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [showEditModal, setShowEditModal] = useState(false);
    const [formData, setFormData] = useState({
        Role_Id: '',
        Menu_Id: '',
        Action: '',
        Created_By: '',
        Created_Date: '',
        Modified_By: '',
        Modified_Date: ''
    });
    const [editId, setEditId] = useState(null);

    useEffect(() => {
        fetchRoleMenuLinks();
    }, []);

    const fetchRoleMenuLinks = async () => {
        try {
            const response = await axios.get('http://localhost:4321/rolemenulinks');
            setRoleMenuLinks(response.data);
        } catch (error) {
            console.error('Error fetching role menu links:', error);
        }
    };

    const handleSearch = (value) => {
        setSearchTerm(value);
    };

    const handleEdit = (link) => {
        setEditId(link.Id);
        setFormData({
            Role_Id: link.Role_Id,
            Menu_Id: link.Menu_Id,
            Action: link.Action,
            Created_By: link.Created_By,
            Created_Date: link.Created_Date,
            Modified_By: link.Modified_By,
            Modified_Date: link.Modified_Date
        });
        setShowEditModal(true);
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:4321/rolemenulinks/${id}`);
            fetchRoleMenuLinks();
        } catch (error) {
            console.error('Error deleting role menu link:', error);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleUpdate = async () => {
        try {
            await axios.put(`http://localhost:4321/rolemenulinks/${editId}`, formData);
            fetchRoleMenuLinks();
            setShowEditModal(false);
        } catch (error) {
            console.error('Error updating role menu link:', error);
        }
    };

    return (
        <Container>
            <Card>
                <Card.Body>
                    <Card.Title className='m-3' style={{ fontSize: "26px", fontWeight: "100" }}>Role Menu Links</Card.Title>
                    <Card.Subtitle className='m-3 mt-0 text-muted'>
                        <Row className="justify-content-md-center">
                            <Col lg={4}>
                                Here results are displayed
                            </Col>
                            <Col lg={8} sm={12}>
                                <InputGroup>
                                    <Form.Control
                                        placeholder='Role Id'
                                        aria-label="searchBar"
                                        aria-describedby="basic-addon2"
                                        value={searchTerm}
                                        onChange={(e) => handleSearch(e.target.value)}
                                    />
                                    <InputGroup.Text id="basic-addon2" style={{ fontSize: "smaller" }}>Search</InputGroup.Text>
                                </InputGroup>
                            </Col>
                        </Row>
                    </Card.Subtitle>
                    <Table striped hover size="sm" className='mt-3 table-borderless'>
                        <thead>
                            <tr>
                                <th className='text-muted'></th>
                                <th className='text-secondary text-uppercase fw-light' style={{ fontSize: "smaller" }}>Role Id</th>
                                <th className='text-secondary text-uppercase fw-light' style={{ fontSize: "smaller" }}>Menu Id</th>
                                <th className='text-secondary text-uppercase fw-light' style={{ fontSize: "smaller" }}>Action</th>
                                <th className='text-secondary text-uppercase fw-light' style={{ fontSize: "smaller" }} colSpan={2}>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {roleMenuLinks.filter(link => link.Role_Id.toString().includes(searchTerm)).map((link, index) => (
                                <tr key={link.Id}>
                                    <td className='p-2 text-muted'>{index + 1}</td>
                                    <td className='p-2'>{link.Role_Id}</td>
                                    <td className='p-2'>{link.Menu_Id}</td>
                                    <td className='p-2'>{link.Action}</td>
                                    <td className='p-2'>
                                        <Button className='m-0 p-0' variant='none' onClick={() => handleEdit(link)}><i className="bi bi-pencil-square" style={{ color: "blue" }}></i></Button>
                                    </td>
                                    <td className='p-2'>
                                        <Button className='m-0 p-0' variant="none" onClick={() => handleDelete(link.Id)}><i className="bi bi-trash3-fill" style={{ color: "red" }}></i></Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </Card.Body>
            </Card>
            <Stack direction="horizontal" gap={3} className='mt-3'>
                <div className="p-2 ms-auto">
                    <Button variant='none'>
                        <i className="bi bi-plus-circle-fill" style={{ fontSize: "35px" }} onClick={() => { navigate("/createrolemenu") }}></i>
                    </Button>
                </div>
            </Stack>

            <Modal show={showEditModal} onHide={() => setShowEditModal(false)} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Edit Role Menu Link</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Row>
                            <Col>
                                <Form.Group className="mb-3" controlId="editRoleId">
                                    <Form.Label>Role Id</Form.Label>
                                    <Form.Control type="text" name="Role_Id" value={formData.Role_Id} onChange={handleChange} />
                                </Form.Group>
                            </Col>
                            <Col>
                                <Form.Group className="mb-3" controlId="editMenuId">
                                    <Form.Label>Menu Id</Form.Label>
                                    <Form.Control type="text" name="Menu_Id" value={formData.Menu_Id} onChange={handleChange} />
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <Form.Group className="mb-3" controlId="editAction">
                                    <Form.Label>Action</Form.Label>
                                    <Form.Control type="text" name="Action" value={formData.Action} onChange={handleChange} />
                                </Form.Group>
                            </Col>
                        </Row>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowEditModal(false)}>Cancel</Button>
                    <Button variant="primary" onClick={handleUpdate}>Update</Button>
                </Modal.Footer>
            </Modal>
        </Container>
    );
};

export default ListroleMenulink;
