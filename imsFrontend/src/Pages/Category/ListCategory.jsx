import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Button, Col, Container, Row, Table } from 'react-bootstrap';

const ListCategory = () => {
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

    return (
        <>
            <Container>
                <Row className="justify-content-md-center">
                    <Col sm={12} md={6} lg={8}>
                        <h4 className='mt-4 mb-5'>Category List</h4>
                        <Table size="sm">
                            <thead>
                                <tr>
                                    <th>Category Name</th>
                                    <th>Parent Id</th>
                                    <th>Category Path</th>
                                    <th colSpan={2}>Actions</th>
                                </tr>
                            </thead>

                            <tbody>
                                {(searchTerm ? searchResult : categories).map((category) => (
                                    <tr key={category.Category_Id}>
                                        <td>{category.Category_Name}</td>
                                        <td>{category.Parent_Id}</td>
                                        <td>{category.Category_Path}</td>
                                        <td>
                                            <Button variant='none' onClick={() => handleEdit(category.Category_Id)}><i class="bi bi-pencil-square" style={{color:"blue"}}></i></Button>
                                        </td>
                                        <td>
                                            <Button variant="none"  onClick={() => handleDelete(category.Category_Id)}><i class="bi bi-trash3-fill" style={{color:"red"}}></i></Button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    </Col>
                </Row>
            </Container>
        </>
    );
};

export default ListCategory;
