const RoleMenuLink = require('../Model/role_menu_linkModel');

// Add 
const addRoleMenuLink = async (req, res) => {
  try {
    const { Role_Id, Menu_Id, Action, Created_By, Created_Date, Modified_By, Modified_Date } = req.body;
    const newRoleMenuLink = await RoleMenuLink.create({
      Role_Id,
      Menu_Id,
      Action,
      Created_By,
      Created_Date,
      Modified_By,
      Modified_Date,
    });
    res.status(201).json(newRoleMenuLink);
  } catch (error) {
    console.error('Error adding role menu link:', error);
    res.status(500).json({ error: 'Failed to add role menu link' });
  }
};

// Update
const updateRoleMenuLink = async (req, res) => {
  const roleMenuLinkId = req.params.id;
  try {
    console.log('Request body:', req.body);
    console.log('Updating role menu link with ID:', roleMenuLinkId);
    const { Role_Id, Menu_Id, Action, Created_By, Created_Date, Modified_By, Modified_Date } = req.body;
    const updatedRoleMenuLink = await RoleMenuLink.update({
      Role_Id,
      Menu_Id,
      Action,
      Created_By,
      Created_Date,
      Modified_By,
      Modified_Date,
    }, { where: { Id: roleMenuLinkId } });

    if (updatedRoleMenuLink[0] === 1) {
      const updatedRoleMenuLinkWithDetails = await RoleMenuLink.findOne({
        where: { Id: roleMenuLinkId }
      });
      res.status(200).json(updatedRoleMenuLinkWithDetails);
    } else {
      res.status(404).json({ error: 'Role menu link not found' });
    }
  } catch (error) {
    console.error('Error updating role menu link:', error);
    res.status(500).json({ error: 'Failed to update role menu link' });
  }
};

// Delete
const deleteRoleMenuLink = async (req, res) => {
  const roleMenuLinkId = req.params.id;
  try {
    const deletedRoleMenuLink = await RoleMenuLink.destroy({ where: { Id: roleMenuLinkId } });
    if (deletedRoleMenuLink === 1) {
      res.status(200).json({ message: 'Role menu link deleted successfully' });
    } else {
      res.status(404).json({ error: 'Role menu link not found' });
    }
  } catch (error) {
    console.error('Error deleting role menu link:', error);
    res.status(500).json({ error: 'Failed to delete role menu link' });
  }
};

// Get all
const getAllRoleMenuLinks = async (req, res) => {
  try {
    const roleMenuLinks = await RoleMenuLink.findAll();
    res.status(200).json(roleMenuLinks);
  } catch (error) {
    console.error('Error fetching role menu links:', error);
    res.status(500).json({ error: 'Failed to fetch role menu links' });
  }
};

// Get a role menu link by ID
const getRoleMenuLinkById = async (req, res) => {
  const roleMenuLinkId = req.params.id;
  try {
    const roleMenuLink = await RoleMenuLink.findByPk(roleMenuLinkId);
    if (roleMenuLink) {
      res.status(200).json(roleMenuLink);
    } else {
      res.status(404).json({ error: 'Role menu link not found' });
    }
  } catch (error) {
    console.error('Error fetching role menu link by ID:', error);
    res.status(500).json({ error: 'Failed to fetch role menu link' });
  }
};

module.exports = { addRoleMenuLink, updateRoleMenuLink, deleteRoleMenuLink, getAllRoleMenuLinks, getRoleMenuLinkById };
