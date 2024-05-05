import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ProductList from './ProductList';

const Product = () => {
    const [showProductForm, setShowProductForm] = useState(false);
    const [showProductList, setShowProductList] = useState(false);
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
  
    const toggleProductForm = () => {
      setShowProductForm(!showProductForm);
      setShowProductList(false);
      setErrorMessage('');
    };
  
    const toggleProductList = () => {
      setShowProductList(!showProductList);
      setShowProductForm(false);
      setErrorMessage('');
    };
  
    const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData({ ...formData, [name]: value });
    };
  
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
            Category_Id: '',
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
        <div style={{ textAlign: 'center' }}>
        <div style={{ marginBottom: '20px' }}>
          <button
            style={{
              backgroundColor: 'rgb(0, 150, 255)',
              padding: '10px 20px',
              borderRadius: '5px',
              marginRight: '10px',
              color: 'white',
              border: 'none',
            }}
            onClick={toggleProductForm}
          >
            Add Product
          </button>
          <button
            style={{
              backgroundColor: 'rgb(128,128,128)',
              padding: '10px 20px',
              borderRadius: '5px',
              color: 'white',
              border: 'none',
            }}
            onClick={toggleProductList}
          >
            View Product List
          </button>
        </div>
    
        {showProductForm && (
          <div
            style={{
              boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)',
              padding: '20px',
              borderRadius: '10px',
              width: 'fit-content',
              margin: '0 auto',
            }}
          >
            <h2>Add Product</h2>
            <hr></hr>
            {errorMessage && <p style={{ color: 'blue' }}>{errorMessage}</p>}
            <form onSubmit={handleSubmit}>
              <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', marginBottom: '10px', width: '48%' }}>
                  <label htmlFor="Product_Type">Product Type:</label>
                  <input
                    type="text"
                    id="Product_Type"
                    name="Product_Type"
                    placeholder="Enter product type"
                    value={formData.Product_Type}
                    onChange={handleChange}
                    required
                    style={{ padding: '10px', borderRadius: '5px', width: '100%', margin: '5px 0' }}
                  />
                </div>
    
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', marginBottom: '10px', width: '48%' }}>
                  <label htmlFor="Product_Name">Product Name:</label>
                  <input
                    type="text"
                    id="Product_Name"
                    name="Product_Name"
                    placeholder="Enter product name"
                    value={formData.Product_Name}
                    onChange={handleChange}
                    style={{ padding: '10px', borderRadius: '5px', width: '100%', margin: '5px 0' }}
                  />
                </div>
    
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', marginBottom: '10px', width: '48%' }}>
                  <label htmlFor="Brand">Brand:</label>
                  <input
                    type="text"
                    id="Brand"
                    name="Brand"
                    placeholder="Enter brand name"
                    value={formData.Brand}
                    onChange={handleChange}
                    style={{ padding: '10px', borderRadius: '5px', width: '100%', margin: '5px 0' }}
                  />
                </div>
    
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', marginBottom: '10px', width: '48%' }}>
                  <label htmlFor="Depreciation">Depreciation:</label>
                  <input
                    type="text"
                    id="Depreciation"
                    name="Depreciation"
                    placeholder="Enter depreciation"
                    value={formData.Depreciation}
                    onChange={handleChange}
                    style={{ padding: '10px', borderRadius: '5px', width: '100%', margin: '5px 0' }}
                  />
                </div>
    
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', marginBottom: '10px', width: '48%' }}>
                  <label htmlFor="Model_No">Model No:</label>
                  <input
                    type="text"
                    id="Model_No"
                    name="Model_No"
                    placeholder="Enter model no"
                    value={formData.Model_No}
                    onChange={handleChange}
                    style={{ padding: '10px', borderRadius: '5px', width: '100%', margin: '5px 0' }}
                  />
                </div>
    
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', marginBottom: '10px', width: '48%' }}>
                  <label htmlFor="Category_Id">Category Id:</label>
                  <select
                    id="Category_Id"
                    name="Category_Id"
                    value={formData.Category_Id}
                    onChange={handleChange}
                    style={{ padding: '10px', borderRadius: '5px', width: '100%', margin: '5px 0' }}
                  >
                    <option value="">Select Category ID</option>
                    {categoryIds.map(id => (
                      <option key={id} value={id}>{id}</option>
                    ))}
                  </select>
                </div>
    
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', marginBottom: '10px', width: '48%' }}>
                  <label htmlFor="Created_By">Created By:</label>
                  <input
                    type="text"
                    id="Created_By"
                    name="Created_By"
                    placeholder="Enter name"
                    value={formData.Created_By}
                    onChange={handleChange}
                    style={{ padding: '10px', borderRadius: '5px', width: '100%', margin: '5px 0' }}
                  />
                </div>
    
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', marginBottom: '10px', width: '48%' }}>
                  <label htmlFor="Created_Date">Created Date:</label>
                  <input
                    type="date"
                    id="Created_Date"
                    name="Created_Date"
                    value={formData.Created_Date}
                    onChange={handleChange}
                    style={{ padding: '10px', borderRadius: '5px', width: '100%', margin: '5px 0' }}
                  />
                </div>
    
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', marginBottom: '10px', width: '48%' }}>
                  <label htmlFor="Modified_By">Modified By:</label>
                  <input
                    type="text"
                    id="Modified_By"
                    name="Modified_By"
                    placeholder="Enter name"
                    value={formData.Modified_By}
                    onChange={handleChange}
                    style={{ padding: '10px', borderRadius: '5px', width: '100%', margin: '5px 0' }}
                  />
                </div>
    
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', marginBottom: '10px', width: '48%' }}>
                  <label htmlFor="Modified_Date">Modified Date:</label>
                  <input
                    type="date"
                    id="Modified_Date"
                    name="Modified_Date"
                    value={formData.Modified_Date}
                    onChange={handleChange}
                    style={{ padding: '10px', borderRadius: '5px', width: '100%', margin: '5px 0' }}
                  />
                </div>
              </div>
    
              <button type="submit" style={{ backgroundColor: 'green', padding: '10px 20px', borderRadius: '5px', color: 'white', border: 'none' }}>
                Submit
              </button>
            </form>
          </div>
        )}
        {showProductList && <ProductList />}
      </div>
  );
};

export default Product;
