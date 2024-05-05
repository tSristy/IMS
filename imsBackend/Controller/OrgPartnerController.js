const OrgPartner = require('../Model/orgPartnerModel');

// Add
const addOrgPartner = async (req, res) => {
  try {
    const { Name, Address, TIN_No, BIN_No, Contact_No, Email, Partner_Type, Created_By, Created_Date, Modified_By, Modified_Date } = req.body;
    const newOrgPartner = await OrgPartner.create({
      Name,
      Address,
      TIN_No,
      BIN_No,
      Contact_No,
      Email,
      Partner_Type,
      Created_By,
      Created_Date,
      Modified_By,
      Modified_Date,
    });
    res.status(201).json(newOrgPartner);
  } catch (error) {
    console.error('Error adding:', error);
    res.status(500).json({ error: 'Failed to add' });
  }
};

// Update
const updateOrgPartner = async (req, res) => {
  const orgPartnerId = req.params.id;
  try {
    const updatedOrgPartner = await OrgPartner.update(req.body, { where: { Id: orgPartnerId } });
    if (updatedOrgPartner[0] === 1) {
      res.status(200).json({ message: 'updated successfully' });
    } else {
      res.status(404).json({ error: 'not found' });
    }
  } catch (error) {
    console.error('Error updating:', error);
    res.status(500).json({ error: 'Failed to update' });
  }
};

// Delete
const deleteOrgPartner = async (req, res) => {
  const orgPartnerId = req.params.id;
  try {
    const deletedOrgPartner = await OrgPartner.destroy({ where: { Id: orgPartnerId } });
    if (deletedOrgPartner === 1) {
      res.status(200).json({ message: 'deleted successfully' });
    } else {
      res.status(404).json({ error: 'not found' });
    }
  } catch (error) {
    console.error('Error deleting:', error);
    res.status(500).json({ error: 'Failed to delete' });
  }
};

// Get all
const getAllOrgPartners = async (req, res) => {
  try {
    const orgPartners = await OrgPartner.findAll();
    res.status(200).json(orgPartners);
  } catch (error) {
    console.error('Error fetching:', error);
    res.status(500).json({ error: 'Failed to fetch' });
  }
};

// Get by ID for edit
const getOrgPartnerById = async (req, res) => {
  const orgPartnerId = req.params.id;
  try {
    const orgPartner = await OrgPartner.findByPk(orgPartnerId);
    if (orgPartner) {
      res.status(200).json(orgPartner);
    } else {
      res.status(404).json({ error: 'not found' });
    }
  } catch (error) {
    console.error('Error fetching organization partner by ID:', error);
    res.status(500).json({ error: 'Failed to fetch organization partner' });
  }
};

module.exports = { addOrgPartner, updateOrgPartner, deleteOrgPartner, getAllOrgPartners, getOrgPartnerById, getOrgPartnerById };
