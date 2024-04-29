import React, { useState, useEffect } from 'react';
import axios from 'axios';

const MenuList = () => {
  const [menus, setMenu] = useState([]);
  const [editMenu, setEditMenu] = useState(null);
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

  useEffect(() => {
    fetchMenus();
  }, []);

  const fetchMenus = async () => {
    try {
      const response = await axios.get('http://localhost:4321/menus');
      setMenu(response.data);
    } catch (error) {
      console.error('Error fetching menus:', error);
    }
  };

  const handleEdit = async (Id) => {
    try {
      const response = await axios.get(`http://localhost:4321/menus/${Id}`);
      setEditMenu(response.data);
      setFormData(response.data);
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:4321/menus/${editMenu.Id}`, formData);
      fetchMenus();
      setEditMenu(null); 
      console.log('Menu updated successfully');
    } catch (error) {
      console.error('Error updating menu:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSearch = (value) => {
    setSearchTerm(value);
    const filteredMenus = menus.filter((menu) =>
      menu.Id.toLowerCase().includes(value.toLowerCase())
    );
    setSearchResult(filteredMenus);
  };

  return (
    <div style={{ boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)', padding: '20px', borderRadius: '10px', width: 'fit-content', margin: '0 auto' }}>
      <h2>Menu List</h2>
      <div style={{ marginBottom: '20px', display: 'flex', alignItems: 'center' }}>
        <input type="text" placeholder="Search by Menu Code" value={searchTerm} onChange={(e) => handleSearch(e.target.value)} style={{ padding: '5px', borderRadius: '5px', marginRight: '5px',width: 'calc(100% - 100px)' }} />
        <button onClick={() => handleSearch('')} style={{ padding: '5px 10px', borderRadius: '5px' }}>Clear</button>
      </div>
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr style={{ backgroundColor: '#f2f2f2' }}>
            <th style={{ padding: '10px', borderBottom: '1px solid #ddd' }}>Code</th>
            <th style={{ padding: '10px', borderBottom: '1px solid #ddd' }}>Description</th>
            <th style={{ padding: '10px', borderBottom: '1px solid #ddd' }}>Is Active</th>
            <th style={{ padding: '10px', borderBottom: '1px solid #ddd' }}>Title</th>
            <th style={{ padding: '10px', borderBottom: '1px solid #ddd' }}>URL Path</th>
            <th style={{ padding: '10px', borderBottom: '1px solid #ddd' }}>Parent Id</th>
            <th style={{ padding: '10px', borderBottom: '1px solid #ddd' }}>Created By</th>
            <th style={{ padding: '10px', borderBottom: '1px solid #ddd' }}>Created Date</th>
            <th style={{ padding: '10px', borderBottom: '1px solid #ddd' }}>Modified By</th>
            <th style={{ padding: '10px', borderBottom: '1px solid #ddd' }}>Modified Date</th>
            <th style={{ padding: '10px', borderBottom: '1px solid #ddd' }}>Actions</th>
          </tr>
        </thead>
        <tbody>

          {(searchTerm ? searchResult : menus).map((menu) => (
            <tr key={menu.Id}>
              <td style={{ padding: '10px', borderBottom: '1px solid #ddd' }}>{menu.Code}</td>
              <td style={{ padding: '10px', borderBottom: '1px solid #ddd' }}>{menu.Description}</td>
              <td style={{ padding: '10px', borderBottom: '1px solid #ddd' }}>{menu.Is_Active}</td>
              <td style={{ padding: '10px', borderBottom: '1px solid #ddd' }}>{menu.Parent_Id}</td>
              <td style={{ padding: '10px', borderBottom: '1px solid #ddd' }}>{menu.URL_Path}</td>
              <td style={{ padding: '10px', borderBottom: '1px solid #ddd' }}>{menu.Created_By}</td>
              <td style={{ padding: '10px', borderBottom: '1px solid #ddd' }}>{menu.Created_Date}</td>
              <td style={{ padding: '10px', borderBottom: '1px solid #ddd' }}>{menu.Modified_By}</td>
              <td style={{ padding: '10px', borderBottom: '1px solid #ddd' }}>{menu.Modified_Date}</td>
              <td style={{ padding: '10px', borderBottom: '1px solid #ddd' }}>
                <button style={{ backgroundColor: 'blue', color: 'white', padding: '5px 10px', borderRadius: '5px', border: 'none', marginRight: '5px' }} onClick={() => handleEdit(menu.Id)}>Edit</button>
                <button style={{ backgroundColor: 'red', color: 'white', padding: '5px 10px', borderRadius: '5px', border: 'none' }} onClick={() => handleDelete(menu.Id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {editMenu && (
        <div style={{ position: 'fixed', top: '50%', left: '55%', transform: 'translate(-50%, -50%)', backgroundColor: 'rgba(93, 109, 126,3)', padding: '20px', borderRadius: '10px', boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)' }}>
          <h2>Edit Menu</h2>
          <form onSubmit={handleSubmit}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', marginBottom: '10px' }}>
              <label htmlFor="Description">Description:</label>
              <input type="text" id="Description" name="Description" value={formData.Description} onChange={handleChange} style={{ padding: '10px', borderRadius: '5px', width: '300px' }} />
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', marginBottom: '10px' }}>
              <label htmlFor="Is_Active">Is Active:</label>
              <input type="number" id="Is_Active" name="Is_Active" value={formData.Is_Active} onChange={handleChange} style={{ padding: '10px', borderRadius: '5px', width: '300px' }} />
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', marginBottom: '10px' }}>
              <label htmlFor="Title">Title:</label>
              <input type="text" id="Title" name="Title" value={formData.Title} onChange={handleChange} style={{ padding: '10px', borderRadius: '5px', width: '300px' }} />
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', marginBottom: '10px' }}>
              <label htmlFor="URL_Path">URL_Path:</label>
              <input type="text" id="URL_Path" name="URL_Path" value={formData.URL_Path} onChange={handleChange} style={{ padding: '10px', borderRadius: '5px', width: '300px' }} />
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', marginBottom: '10px' }}>
              <label htmlFor="Parent_Id">Parent ID:</label>
              <input type="number" id="Parent_Id" name="Parent_Id" value={formData.Parent_Id} onChange={handleChange} style={{ padding: '10px', borderRadius: '5px', width: '300px' }} />
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
            <button onClick={() => setEditMenu(null)} style={{ backgroundColor: 'black', color: 'white', padding: '10px 20px', borderRadius: '5px', border: 'none' }}>Cancel</button>
          </form>
        </div>
      )}
    </div>
  );
};

export default MenuList;