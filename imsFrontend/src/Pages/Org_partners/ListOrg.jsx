import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, Card, Col, Container, Form, InputGroup, Row, Table, Modal, Stack } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const ListOrg = () => {
    const navigate = useNavigate();
    const [searchTerm, setSearchTerm] = useState('');
    const [orgPartners, setOrgPartners] = useState([]);
    const [searchResult, setSearchResult] = useState([]);
    const [editOrgPartner, setEditOrgPartner] = useState(null);
    const [showEditModal, setShowEditModal] = useState(false);
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

    useEffect(() => {
        fetchOrgPartners();
    }, []);

    const fetchOrgPartners = async () => {
        try {
            const response = await axios.get('http://localhost:4321/orgPartners');
            setOrgPartners(response.data);
            setSearchResult(response.data);
        } catch (error) {
            console.error('Error fetching', error);
        }
    };

    const handleSearch = (value) => {
        setSearchTerm(value);
        const filteredOrgPartners = orgPartners.filter((orgPartner) =>
            orgPartner.Name.toLowerCase().includes(value.toLowerCase())
        );
        setSearchResult(filteredOrgPartners);
    };

    const handleEdit = async (id) => {
        try {
            const response = await axios.get(`http://localhost:4321/orgPartners/${id}`);
            setEditOrgPartner(response.data);
            setFormData(response.data);
            setShowEditModal(true);
        } catch (error) {
            console.error('Error fetching:', error);
        }
    };
    
    
    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:4321/orgPartners/${id}`);
            fetchOrgPartners();
            console.log('Organization partner deleted successfully');
        } catch (error) {
            console.error('Error deleting:', error);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleUpdateOrgPartner = async () => {
        try {
            await axios.put(`http://localhost:4321/orgPartners/${editOrgPartner.Id}`, formData);
            setShowEditModal(false);
            fetchOrgPartners();
            console.log('updated successfully');
        } catch (error) {
            console.error('Error updating:', error);
        }
    };

    return (
        <>
        <Container>
            <Card>
                <Card.Text className='m-3' style={{ fontSize: "26px", fontWeight: "100" }}>Organization Partners</Card.Text>
                <Card.Subtitle className='m-3 mt-0 text-muted'>
                    <Row className='justify-content-md-center'>
                        <Col lg={4}>
                            Here results are displayed
                        </Col>
                        <Col lg={8} sm={12}>
                            <InputGroup>
                                <Form.Control
                                    placeholder='Enter Name of Org partner'
                                    aria-label='searchBar'
                                    aria-describedby='basic-addon2'
                                    value={searchTerm}
                                    onChange={(e) => handleSearch(e.target.value)}
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
                                <th className='text-secondary text-uppercase fw-light' style={{ fontSize: "smaller" }}>Name</th>
                                <th className='text-secondary text-uppercase fw-light' style={{ fontSize: "smaller" }}>Address</th>
                                <th className='text-secondary text-uppercase fw-light' style={{ fontSize: "smaller" }}>TIN No</th>
                                <th className='text-secondary text-uppercase fw-light' style={{ fontSize: "smaller" }}>BIN No</th>
                                <th className='text-secondary text-uppercase fw-light' style={{ fontSize: "smaller" }}>Contact No</th>
                                <th className='text-secondary text-uppercase fw-light' style={{ fontSize: "smaller" }}>Email</th>
                                <th className='text-secondary text-uppercase fw-light' style={{ fontSize: "smaller" }}>Partner Type</th>
                                <th className='text-secondary text-uppercase fw-light' style={{ fontSize: "smaller" }} colSpan={2}>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {(searchTerm ? searchResult : orgPartners).map((orgPartner, index) => (
                                <tr key={index}>
                                    <td className='p-2 text-muted'>{index + 1}</td>
                                    <td className='p-2'>{orgPartner.Name}</td>
                                    <td className='p-2'>{orgPartner.Address}</td>
                                    <td className='p-2'>{orgPartner.TIN_No}</td>
                                    <td className='p-2'>{orgPartner.BIN_No}</td>
                                    <td className='p-2'>{orgPartner.Contact_No}</td>
                                    <td className='p-2'>{orgPartner.Email}</td>
                                    <td className='p-2'>{orgPartner.Partner_Type}</td>
                                    <td className='p-2'>
                                        <Button className='m-0 p-0' variant='none' onClick={() => handleEdit(orgPartner.Id)}><i className="bi bi-pencil-square" style={{ color: "blue" }}></i></Button>
                                    </td>
                                    <td className='p-2'>
                                        <Button className='m-0 p-0' variant="none" onClick={() => handleDelete(orgPartner.Id)}><i className="bi bi-trash3-fill" style={{ color: "red" }}></i></Button>
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
                        <i className="bi bi-plus-circle-fill" style={{ fontSize: "35px" }} onClick={(e) => { navigate("/CreateOrg") }}></i>
                    </Button>
                </div>
            </Stack>

            <Modal show={showEditModal} onHide={() => setShowEditModal(false)} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Edit Organization Partner</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleUpdateOrgPartner}>
                        <Row>
                            <Col>
                                <Form.Group className="mb-3" controlId="editOrgPartnerName">
                                    <Form.Label>Name</Form.Label>
                                    <Form.Control type="text" name="Name" value={formData.Name} onChange={handleChange} />
                                </Form.Group>
                            </Col>
                            <Col>
                                <Form.Group className="mb-3" controlId="editAddress">
                                    <Form.Label>Address</Form.Label>
                                    <Form.Control type="text" name="Address" value={formData.Address} onChange={handleChange} />
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <Form.Group className="mb-3" controlId="editTIN">
                                    <Form.Label>TIN No</Form.Label>
                                    <Form.Control type="text" name="TIN_No" value={formData.TIN_No} onChange={handleChange} />
                                </Form.Group>
                            </Col>
                            <Col>
                                <Form.Group className="mb-3" controlId="editBIN">
                                    <Form.Label>BIN No</Form.Label>
                                    <Form.Control type="text" name="BIN_No" value={formData.BIN_No} onChange={handleChange} />
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <Form.Group className="mb-3" controlId="editContactNo">
                                    <Form.Label>Contact No</Form.Label>
                                    <Form.Control type="text" name="Contact_No" value={formData.Contact_No} onChange={handleChange} />
                                </Form.Group>
                            </Col>
                            <Col>
                                <Form.Group className="mb-3" controlId="editEmail">
                                    <Form.Label>Email</Form.Label>
                                    <Form.Control type="email" name="Email" value={formData.Email} onChange={handleChange} />
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <Form.Group className="mb-3" controlId="editPartnerType">
                                    <Form.Label>Partner Type</Form.Label>
                                    <Form.Control type="text" name="Partner_Type" value={formData.Partner_Type} onChange={handleChange} />
                                </Form.Group>
                            </Col>
                        </Row>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowEditModal(false)}>Cancel</Button>
                    <Button variant="primary" onClick={handleUpdateOrgPartner}>Update</Button>
                </Modal.Footer>
            </Modal>

        </Container>

        </>
    );
};

export default ListOrg;
