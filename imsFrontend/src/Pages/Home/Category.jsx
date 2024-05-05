import React, { useState } from 'react';
import axios from 'axios';
import CategoryList from './CategoryList';

const Category = () => {
  const [showForm, setShowForm] = useState(false);
  const [showCategoryList, setShowCategoryList] = useState(false);
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

  const toggleForm = () => {
    setShowForm(!showForm);
    setShowCategoryList(false);
    setErrorMessage('');
  };

  const toggleCategoryList = () => {
    setShowCategoryList(!showCategoryList);
    setShowForm(false);
    setErrorMessage('');
  };

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
    <div style={{ textAlign: 'center' }}>
      <div style={{ marginBottom: '20px' }}>
        <button style={{ backgroundColor: 'green', padding: '10px 20px', borderRadius: '5px', marginRight: '10px', color: 'white', border: 'none' }} onClick={toggleForm}>Add Category</button>
        <button style={{ backgroundColor: 'blue', padding: '10px 20px', borderRadius: '5px', color: 'white', border: 'none' }} onClick={toggleCategoryList}>View Category List</button>
      </div>

      {showForm && (
        <div style={{ boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)', padding: '20px', borderRadius: '10px', width: 'fit-content', margin: '0 auto' }}>
          <h2>Add Category</h2>
          {errorMessage && <p style={{ color: 'Blue' }}>{errorMessage}</p>}
          <form onSubmit={handleSubmit}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', marginBottom: '10px' }}>
              <label htmlFor="Category_Name">Category Name:</label>
              <input type="text" id="Category_Name" name="Category_Name" placeholder= "Enter Category name" value={formData.Category_Name} onChange={handleChange} required style={{ padding: '10px', borderRadius: '5px', width: '300px', margin: '5px 0' }} />
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', marginBottom: '10px' }}>
              <label htmlFor="Parent_Id">Parent ID:</label>
              <input type="number" id="Parent_Id" name="Parent_Id"placeholder= "Enter parent ID" value={formData.Parent_Id} onChange={handleChange} style={{ padding: '10px', borderRadius: '5px', width: '300px', margin: '5px 0' }} />
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', marginBottom: '10px' }}>
              <label htmlFor="Category_Path">Category Path:</label>
              <input type="text" id="Category_Path" name="Category_Path" placeholder= "Enter Category path" value={formData.Category_Path} onChange={handleChange} style={{ padding: '10px', borderRadius: '5px', width: '300px', margin: '5px 0' }} />
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', marginBottom: '10px' }}>
              <label htmlFor="Created_By">Created By:</label>
              <input type="text" id="Created_By" name="Created_By" placeholder= "Enter name" value={formData.Created_By} onChange={handleChange} style={{ padding: '10px', borderRadius: '5px', width: '300px', margin: '5px 0' }} />
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', marginBottom: '10px' }}>
              <label htmlFor="Created_Date">Created Date:</label>
              <input type="date" id="Created_Date" name="Created_Date" value={formData.Created_Date} onChange={handleChange} style={{ padding: '10px', borderRadius: '5px', width: '300px', margin: '5px 0' }} />
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', marginBottom: '10px' }}>
              <label htmlFor="Modified_By">Modified By:</label>
              <input type="text" id="Modified_By" name="Modified_By" placeholder= "Enter name" value={formData.Modified_By} onChange={handleChange} style={{ padding: '10px', borderRadius: '5px', width: '300px', margin: '5px 0' }} />
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', marginBottom: '10px' }}>
              <label htmlFor="Modified_Date">Modified Date:</label>
              <input type="date" id="Modified_Date" name="Modified_Date" value={formData.Modified_Date} onChange={handleChange} style={{ padding: '10px', borderRadius: '5px', width: '300px', margin: '5px 0' }} />
            </div>

            <button type="submit" style={{ backgroundColor: 'green', padding: '10px 20px', borderRadius: '5px', color: 'white', border: 'none' }}>Submit</button>
          </form>
        </div>
      )}
      {showCategoryList && <CategoryList />}
    </div>
  );
};

export default Category;
