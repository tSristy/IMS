import React, { useState, useEffect } from 'react';
import axios from 'axios';
import MenuList from './MenuList';

const Menu = () => {
    const [showMenuForm, setShowMenuForm] = useState(false);
    const [showMenuList, setShowMenuList] = useState(false);
  
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
    const [menus, setMenu] = useState([]);
    const [errorMessage, setErrorMessage] = useState('');
  
    const toggleMenuForm = () => {
      setShowMenuForm(!showMenuForm);
      setShowMenuList(false);
      setErrorMessage('');
    };
  
    const toggleMenuList = () => {
      setShowMenuList(!showMenuList);
      setShowMenuForm(false);
      setErrorMessage('');
    };
  
    const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData({ ...formData, [name]: value });
    };
  
    useEffect(() => {
        const fetchMenu = async () => {
          try {
            const response = await axios.get('http://localhost:4321/menus');
            setMenu(response.data);
          } catch (error) {
            console.error('Error fetching menu:', error);
          }
        };
      
        fetchMenu();
      }, []);
  
      const handleSubmit = async (e) => {
        e.preventDefault();

        if (Object.values(formData).some(value => value === '')) {
            setErrorMessage('Fill up all fields, please');
            return;
        }
          
        try {
          await axios.post('http://localhost:4321/menus', formData);
          setFormData({
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
          console.log("Added menu successfully")
          setErrorMessage('Succesfully Menu added');

        } catch (error) {
          console.error('Error submitting menu data:', error);
          setErrorMessage('Failed to submit menu data. Please try again.');
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
            onClick={toggleMenuForm}
          >
            Add Menu
          </button>
          <button
            style={{
              backgroundColor: 'rgb(128,128,128)',
              padding: '10px 20px',
              borderRadius: '5px',
              color: 'white',
              border: 'none',
            }}
            onClick={toggleMenuList}
          >
            View Menu List
          </button>
        </div>
    
        {showMenuForm && (
          <div
            style={{
              boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)',
              padding: '20px',
              borderRadius: '10px',
              width: 'fit-content',
              margin: '0 auto',
            }}
          >
            <h2>Add Menu</h2>
            <hr></hr>
            {errorMessage && <p style={{ color: 'blue' }}>{errorMessage}</p>}
            <form onSubmit={handleSubmit}>
              <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' }}>
    
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', marginBottom: '10px', width: '48%' }}>
                  <label htmlFor="Code">Code:</label>
                  <input
                    type="text"
                    id="Code"
                    name="Code"
                    placeholder="Enter Code"
                    value={formData.Code}
                    onChange={handleChange}
                    style={{ padding: '10px', borderRadius: '5px', width: '100%', margin: '5px 0' }}
                  />
                </div>
    
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', marginBottom: '10px', width: '48%' }}>
                  <label htmlFor="Description">Description:</label>
                  <input
                    type="text"
                    id="Description"
                    name="Description"
                    placeholder="Enter Description"
                    value={formData.Description}
                    onChange={handleChange}
                    style={{ padding: '10px', borderRadius: '5px', width: '100%', margin: '5px 0' }}
                  />
                </div>
    
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', marginBottom: '10px', width: '48%' }}>
                  <label htmlFor="Is_Active">Is_Active:</label>
                  <input
                    
                    id="Is_Active"
                    name="Is_Active"
                    placeholder="Enter Is_Active"
                    value={formData.Is_Active}
                    onChange={handleChange}
                    style={{ padding: '10px', borderRadius: '5px', width: '100%', margin: '5px 0' }}
                  />
                </div>
    
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', marginBottom: '10px', width: '48%' }}>
                  <label htmlFor="Title">Title:</label>
                  <input
                    type="text"
                    id="Title"
                    name="Title"
                    placeholder="Enter Title"
                    value={formData.Title}
                    onChange={handleChange}
                    style={{ padding: '10px', borderRadius: '5px', width: '100%', margin: '5px 0' }}
                  />
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', marginBottom: '10px', width: '48%' }}>
                  <label htmlFor="URL_Path">URL Path:</label>
                  <input
                    type="text"
                    id="URL_Path"
                    name="URL_Path"
                    placeholder="Enter URL Path"
                    value={formData.URL_Path}
                    onChange={handleChange}
                    style={{ padding: '10px', borderRadius: '5px', width: '100%', margin: '5px 0' }}
                  />
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', marginBottom: '10px', width: '48%' }}>
                  <label htmlFor="Parent_Id">Parent_Id:</label>
                  <input
                    id="Parent_Id"
                    name="Parent_Id"
                    placeholder="Enter Parent Id"
                    value={formData.Parent_Id}
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
        {showMenuList && <MenuList />}
      </div>
  );
};

export default Menu;
