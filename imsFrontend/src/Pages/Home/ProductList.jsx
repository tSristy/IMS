import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [editProduct, setEditProduct] = useState(null);
  const [categoryIds, setCategoryIds] = useState([]);
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

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get('http://localhost:4321/products');
      setProducts(response.data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
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

  const handleEdit = async (productId) => {
    try {
      const response = await axios.get(`http://localhost:4321/products/${productId}`);
      setEditProduct(response.data);
      setFormData(response.data);
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:4321/products/${editProduct.Product_Id}`, formData);
      fetchProducts();
      setEditProduct(null); 
      console.log('Product updated successfully');
    } catch (error) {
      console.error('Error updating product:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSearch = (value) => {
    setSearchTerm(value);
    const filteredProducts = products.filter((product) =>
      product.Product_Name.toLowerCase().includes(value.toLowerCase())
    );
    setSearchResult(filteredProducts);
  };

  return (
    <div style={{ boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)', padding: '20px', borderRadius: '10px', width: 'fit-content', margin: '0 auto' }}>
      <h2>Product List</h2>
      <div style={{ marginBottom: '20px' }}>
        <input type="text" placeholder="Search by product name" value={searchTerm} onChange={(e) => handleSearch(e.target.value)} style={{ padding: '5px', borderRadius: '5px', marginRight: '10px' }} />
        <button onClick={() => handleSearch('')} style={{ padding: '5px 10px', borderRadius: '5px' }}>Clear</button>
      </div>
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr style={{ backgroundColor: '#f2f2f2' }}>
            <th style={{ padding: '10px', borderBottom: '1px solid #ddd' }}>Product Name</th>
            <th style={{ padding: '10px', borderBottom: '1px solid #ddd' }}>Product Type</th>
            <th style={{ padding: '10px', borderBottom: '1px solid #ddd' }}>Brand</th>
            <th style={{ padding: '10px', borderBottom: '1px solid #ddd' }}>Depreciation</th>
            <th style={{ padding: '10px', borderBottom: '1px solid #ddd' }}>Model No</th>
            <th style={{ padding: '10px', borderBottom: '1px solid #ddd' }}>Category Id</th>
            <th style={{ padding: '10px', borderBottom: '1px solid #ddd' }}>Created By</th>
            <th style={{ padding: '10px', borderBottom: '1px solid #ddd' }}>Created Date</th>
            <th style={{ padding: '10px', borderBottom: '1px solid #ddd' }}>Modified By</th>
            <th style={{ padding: '10px', borderBottom: '1px solid #ddd' }}>Modified Date</th>
            <th style={{ padding: '10px', borderBottom: '1px solid #ddd' }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {(searchTerm ? searchResult : products).map((product) => (
            <tr key={product.Product_Id}>
              <td style={{ padding: '10px', borderBottom: '1px solid #ddd' }}>{product.Product_Name}</td>
              <td style={{ padding: '10px', borderBottom: '1px solid #ddd' }}>{product.Product_Type}</td>
              <td style={{ padding: '10px', borderBottom: '1px solid #ddd' }}>{product.Brand}</td>
              <td style={{ padding: '10px', borderBottom: '1px solid #ddd' }}>{product.Depreciation}</td>
              <td style={{ padding: '10px', borderBottom: '1px solid #ddd' }}>{product.Model_No}</td>
              <td style={{ padding: '10px', borderBottom: '1px solid #ddd' }}>{product.Category_Id}</td>
              <td style={{ padding: '10px', borderBottom: '1px solid #ddd' }}>{product.Created_By}</td>
              <td style={{ padding: '10px', borderBottom: '1px solid #ddd' }}>{product.Created_Date}</td>
              <td style={{ padding: '10px', borderBottom: '1px solid #ddd' }}>{product.Modified_By}</td>
              <td style={{ padding: '10px', borderBottom: '1px solid #ddd' }}>{product.Modified_Date}</td>
              <td style={{ padding: '10px', borderBottom: '1px solid #ddd' }}>
                <button style={{ backgroundColor: 'blue', color: 'white', padding: '5px 10px', borderRadius: '5px', border: 'none', marginRight: '5px' }} onClick={() => handleEdit(product.Product_Id)}>Edit</button>
                <button style={{ backgroundColor: 'red', color: 'white', padding: '5px 10px', borderRadius: '5px', border: 'none' }} onClick={() => handleDelete(product.Product_Id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {editProduct && (
        <div style={{ position: 'fixed', top: '50%', left: '59%', transform: 'translate(-50%, -50%)', backgroundColor: 'rgba(93, 109, 126,3)', padding: '20px', borderRadius: '10px', boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)', width: '600px' }}>
        <h2>Edit Product</h2>
        <form onSubmit={handleSubmit}>
          <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', marginBottom: '10px', width: '48%' }}>
              <label htmlFor="Product_Type">Product Type:</label>
              <input type="text" id="Product_Type" name="Product_Type" placeholder="Enter product type" value={formData.Product_Type} onChange={handleChange} required style={{ padding: '10px', borderRadius: '5px', width: '100%', margin: '5px 0' }} />
            </div>
      
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', marginBottom: '10px', width: '48%' }}>
              <label htmlFor="Product_Name">Product Name:</label>
              <input type="text" id="Product_Name" name="Product_Name" placeholder="Enter product name" value={formData.Product_Name} onChange={handleChange} style={{ padding: '10px', borderRadius: '5px', width: '100%', margin: '5px 0' }} />
            </div>
      
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', marginBottom: '10px', width: '48%' }}>
              <label htmlFor="Brand">Brand:</label>
              <input type="text" id="Brand" name="Brand" placeholder="Enter brand name" value={formData.Brand} onChange={handleChange} style={{ padding: '10px', borderRadius: '5px', width: '100%', margin: '5px 0' }} />
            </div>
      
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', marginBottom: '10px', width: '48%' }}>
              <label htmlFor="Depreciation">Depreciation:</label>
              <input type="text" id="Depreciation" name="Depreciation" placeholder="Enter depreciation" value={formData.Depreciation} onChange={handleChange} style={{ padding: '10px', borderRadius: '5px', width: '100%', margin: '5px 0' }} />
            </div>
      
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', marginBottom: '10px', width: '48%' }}>
              <label htmlFor="Model_No">Model No:</label>
              <input type="text" id="Model_No" name="Model_No" placeholder="Enter model no" value={formData.Model_No} onChange={handleChange} style={{ padding: '10px', borderRadius: '5px', width: '100%', margin: '5px 0' }} />
            </div>
      
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', marginBottom: '10px', width: '48%' }}>
              <label htmlFor="Category_Id">Category Id:</label>
              <select id="Category_Id" name="Category_Id" value={formData.Category_Id} onChange={handleChange} style={{ padding: '10px', borderRadius: '5px', width: '100%', margin: '5px 0' }}>
                <option value="">Select Category ID</option>
                {categoryIds.map(id => (
                  <option key={id} value={id}>{id}</option>
                ))}
              </select>
            </div>
      
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', marginBottom: '10px', width: '48%' }}>
              <label htmlFor="Created_By">Created By:</label>
              <input type="text" id="Created_By" name="Created_By" placeholder="Enter name" value={formData.Created_By} onChange={handleChange} style={{ padding: '10px', borderRadius: '5px', width: '100%', margin: '5px 0' }} />
            </div>
      
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', marginBottom: '10px', width: '48%' }}>
              <label htmlFor="Created_Date">Created Date:</label>
              <input type="date" id="Created_Date" name="Created_Date" value={formData.Created_Date} onChange={handleChange} style={{ padding: '10px', borderRadius: '5px', width: '100%', margin: '5px 0' }} />
            </div>
      
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', marginBottom: '10px', width: '48%' }}>
              <label htmlFor="Modified_By">Modified By:</label>
              <input type="text" id="Modified_By" name="Modified_By" placeholder="Enter name" value={formData.Modified_By} onChange={handleChange} style={{ padding: '10px', borderRadius: '5px', width: '100%', margin: '5px 0' }} />
            </div>
      
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', marginBottom: '10px', width: '48%' }}>
              <label htmlFor="Modified_Date">Modified Date:</label>
              <input type="date" id="Modified_Date" name="Modified_Date" value={formData.Modified_Date} onChange={handleChange} style={{ padding: '10px', borderRadius: '5px', width: '100%', margin: '5px 0' }} />
            </div>
          </div>
      
          <button type="submit" style={{ backgroundColor: 'green', padding: '10px 20px', borderRadius: '5px', color: 'white', border: 'none', marginRight: '5px' }}>Update</button>
          <button onClick={() => setEditProduct(null)} style={{ backgroundColor: 'black', color: 'white', padding: '10px 20px', borderRadius: '5px', border: 'none' }}>Cancel</button>
        </form>
      </div>
      
      )}
    </div>
  );
};

export default ProductList;
