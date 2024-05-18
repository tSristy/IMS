const Menu = require('../Model/menuModel');

// Add a new menu
const addMenu = async (req, res) => {
  try {
    const { Code, Description, Is_Active, Title, URL_Path, Parent_Id, Created_By,Created_Date, Modified_By, Modified_Date } = req.body;
    const newMenu = await Menu.create({
        Code,
        Description,
        Is_Active,
        Title,
        URL_Path,
        Parent_Id,
        Created_By,
        Created_Date,
        Modified_By,
        Modified_Date,
    });
    res.status(201).json(newMenu);
  } catch (error) {
    console.error('Error adding menu:', error);
    res.status(500).json({ error: 'Failed to add menu' });
  }
};

// Get all menus
const getAllMenus = async (req, res) => {
  try {
    const menus = await Menu.findAll();
    res.json(menus);
  } catch (error) {
    console.error('Error fetching menus:', error);
    res.status(500).json({ error: 'Failed to fetch menus' });
  }
};

// Update a menu 
const updatedMenu = async (req, res) => {
  try {
    const Id = req.params.id;
    const { Code, Description, Is_Active, Title, URL_Path, Parent_Id, Created_By,Created_Date, Modified_By, Modified_Datee } = req.body;
    const updatedMenu = await Menu.update(
      { Code, Description, Is_Active, Title, URL_Path, Parent_Id, Created_By,Created_Date, Modified_By, Modified_Date },
      { where: { Id: Id } }
    );
    res.sendStatus(204);
  } catch (error) {
    console.error('Error updating menu:', error);
    res.status(500).json({ error: 'Failed to update menu' });
  }
};

// Fetch menu for edit by code
const getMenu = async (req, res) => {
  try {
    const Id = req.params.id;
    const menu = await Menu.findByPk(Id);
    if (!menu) {
      return res.status(404).json({ error: 'Menu not found' });
    }
    res.json(menu);
  } catch (error) {
    console.error('Error fetching menu details:', error);
    res.status(500).json({ error: 'Failed to fetch menu details' });
  }
};
  
  

// Delete a menu item 
const deletedMenu = async (req, res) => {
  try {
    const Id = req.params.id;
    await Menu.destroy({ where: { Id: Id } });
    res.sendStatus(204);
  } catch (error) {
    console.error('Error deleting menu:', error);
    res.status(500).json({ error: 'Failed to delete menu' });
  }
};

// fetch all rows of menu
const getAllMenuIds = async (req, res) => {
  try {
    const menu = await Menu.findAll({ attributes: ['Id'] });
    const Id = Id.map(menu => menu.Id);
    res.json(Id);
  } catch (error) {
    console.error('Error fetching menu IDs:', error);
    res.status(500).json({ error: 'Failed to fetch menu IDs' });
  }
};



module.exports = { addMenu, getAllMenus,updatedMenu,getMenu, deletedMenu, getAllMenuIds };