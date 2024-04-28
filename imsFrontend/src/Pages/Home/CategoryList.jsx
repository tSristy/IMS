import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CategoryList = () => {
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:4321/categories/${editCategory.Category_Id}`, formData);
      fetchCategories();
      setEditCategory(null); 
      console.log('Category updated successfully');
    } catch (error) {
      console.error('Error updating category:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSearch = (value) => {
    setSearchTerm(value);
    const filteredCategories = categories.filter((category) =>
      category.Category_Name.toLowerCase().includes(value.toLowerCase())
    );
    setSearchResult(filteredCategories);
  };

  return (
    <div style={{ boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)', padding: '20px', borderRadius: '10px', width: 'fit-content', margin: '0 auto' }}>
      <h2>Category List</h2>
      <div style={{ marginBottom: '20px', display: 'flex', alignItems: 'center' }}>
        <input type="text" placeholder="Search by category name" value={searchTerm} onChange={(e) => handleSearch(e.target.value)} style={{ padding: '5px', borderRadius: '5px', marginRight: '5px',width: 'calc(100% - 100px)' }} />
        <button onClick={() => handleSearch('')} style={{ padding: '5px 10px', borderRadius: '5px' }}>Clear</button>
      </div>
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr style={{ backgroundColor: '#f2f2f2' }}>
            <th style={{ padding: '10px', borderBottom: '1px solid #ddd' }}>Category Name</th>
            <th style={{ padding: '10px', borderBottom: '1px solid #ddd' }}>Parent Id</th>
            <th style={{ padding: '10px', borderBottom: '1px solid #ddd' }}>Category Path</th>
            <th style={{ padding: '10px', borderBottom: '1px solid #ddd' }}>Created By</th>
            <th style={{ padding: '10px', borderBottom: '1px solid #ddd' }}>Created Date</th>
            <th style={{ padding: '10px', borderBottom: '1px solid #ddd' }}>Modified By</th>
            <th style={{ padding: '10px', borderBottom: '1px solid #ddd' }}>Modified Date</th>
            <th style={{ padding: '10px', borderBottom: '1px solid #ddd' }}>Actions</th>
          </tr>
        </thead>
        <tbody>

          {(searchTerm ? searchResult : categories).map((category) => (
            <tr key={category.Category_Id}>
              <td style={{ padding: '10px', borderBottom: '1px solid #ddd' }}>{category.Category_Name}</td>
              <td style={{ padding: '10px', borderBottom: '1px solid #ddd' }}>{category.Parent_Id}</td>
              <td style={{ padding: '10px', borderBottom: '1px solid #ddd' }}>{category.Category_Path}</td>
              <td style={{ padding: '10px', borderBottom: '1px solid #ddd' }}>{category.Created_By}</td>
              <td style={{ padding: '10px', borderBottom: '1px solid #ddd' }}>{category.Created_Date}</td>
              <td style={{ padding: '10px', borderBottom: '1px solid #ddd' }}>{category.Modified_By}</td>
              <td style={{ padding: '10px', borderBottom: '1px solid #ddd' }}>{category.Modified_Date}</td>
              <td style={{ padding: '10px', borderBottom: '1px solid #ddd' }}>
                <button style={{ backgroundColor: 'blue', color: 'white', padding: '5px 10px', borderRadius: '5px', border: 'none', marginRight: '5px' }} onClick={() => handleEdit(category.Category_Id)}>Edit</button>
                <button style={{ backgroundColor: 'red', color: 'white', padding: '5px 10px', borderRadius: '5px', border: 'none' }} onClick={() => handleDelete(category.Category_Id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {editCategory && (
        <div style={{ position: 'fixed', top: '50%', left: '55%', transform: 'translate(-50%, -50%)', backgroundColor: 'rgba(93, 109, 126,3)', padding: '20px', borderRadius: '10px', boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)' }}>
          <h2>Edit Category</h2>
          <form onSubmit={handleSubmit}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', marginBottom: '10px' }}>
              <label htmlFor="Category_Name">Category Name:</label>
              <input type="text" id="Category_Name" name="Category_Name" value={formData.Category_Name} onChange={handleChange} style={{ padding: '10px', borderRadius: '5px', width: '300px' }} />
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', marginBottom: '10px' }}>
              <label htmlFor="Parent_Id">Parent ID:</label>
              <input type="number" id="Parent_Id" name="Parent_Id" value={formData.Parent_Id} onChange={handleChange} style={{ padding: '10px', borderRadius: '5px', width: '300px' }} />
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', marginBottom: '10px' }}>
              <label htmlFor="Category_Path">Category Path:</label>
              <input type="text" id="Category_Path" name="Category_Path" value={formData.Category_Path} onChange={handleChange} style={{ padding: '10px', borderRadius: '5px', width: '300px' }} />
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', marginBottom: '10px' }}>
              <label htmlFor="Created_By">Created By:</label>
              <input type="text" id="Created_By" name="Created_By" value={formData.Created_By} onChange={handleChange} style={{ padding: '10px', borderRadius: '5px', width: '300px' }} />
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', marginBottom: '10px' }}>
              <label htmlFor="Created_Date">Created Date:</label>
              <input type="date" id="Created_Date" name="Created_Date" value={formData.Created_Date} onChange={handleChange} style={{ padding: '10px', borderRadius: '5px', width: '300px' }} />
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', marginBottom: '10px' }}>
              <label htmlFor="Modified_By">Modified By:</label>
              <input type="text" id="Modified_By" name="Modified_By" value={formData.Modified_By} onChange={handleChange} style={{ padding: '10px', borderRadius: '5px', width: '300px' }} />
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', marginBottom: '10px' }}>
              <label htmlFor="Modified_Date">Modified Date:</label>
              <input type="date" id="Modified_Date" name="Modified_Date" value={formData.Modified_Date} onChange={handleChange} style={{ padding: '10px', borderRadius: '5px', width: '300px' }} />
            </div>


            <button type="submit" style={{ backgroundColor: 'green', padding: '10px 20px', borderRadius: '5px', color: 'white', border: 'none', marginRight: '5px' }}>Update</button>
            <button onClick={() => setEditCategory(null)} style={{ backgroundColor: 'black', color: 'white', padding: '10px 20px', borderRadius: '5px', border: 'none' }}>Cancel</button>
          </form>
        </div>
      )}
    </div>
  );
};

export default CategoryList;
