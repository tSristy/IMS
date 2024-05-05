const Role = require('../Model/RoleModel')

const getAllRules = async (req, res) => {
    try {
      const rules = await Role.findAll();
      res.status(200).json(rules);
    } catch (error) {
      console.error('Error fetching rules:', error);
      res.status(500).json({ error: 'Failed to fetch rules' });
    }
  };

module.exports = { getAllRules }