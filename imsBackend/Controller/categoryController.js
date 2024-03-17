const Category = require('../Model/categoryModel');

// Add a new category
const addCategory = async (req, res) => {
  try {
    const { Category_Name, Parent_Id, Category_Path, Created_By,Created_Date, Modified_By, Modified_Date } = req.body;
    const newCategory = await Category.create({
      Category_Name,
      Parent_Id,
      Category_Path,
      Created_By,
      Created_Date,
      Modified_By,
      Modified_Date,
    });
    res.status(201).json(newCategory);
  } catch (error) {
    console.error('Error adding category:', error);
    res.status(500).json({ error: 'Failed to add category' });
  }
};

// Get all categories
const getAllCategories = async (req, res) => {
  try {
    const categories = await Category.findAll();
    res.json(categories);
  } catch (error) {
    console.error('Error fetching categories:', error);
    res.status(500).json({ error: 'Failed to fetch categories' });
  }
};

// Update a category
const updateCategory = async (req, res) => {
    try {
      const categoryId = req.params.id;
      const { Category_Name, Parent_Id, Category_Path, Created_By, Created_Date, Modified_By, Modified_Date } = req.body;
      const updatedCategory = await Category.update(
        { Category_Name, Parent_Id, Category_Path, Created_By, Created_Date, Modified_By, Modified_Date },
        { where: { Category_Id: categoryId } }
      );
      res.sendStatus(204);
    } catch (error) {
      console.error('Error updating category:', error);
      res.status(500).json({ error: 'Failed to update category' });
    }
  };

// Fetch category for edit
  const getCategoryById = async (req, res) => {
    try {
      const categoryId = req.params.id;
      const category = await Category.findByPk(categoryId);
      if (!category) {
        return res.status(404).json({ error: 'Category not found' });
      }
      res.json(category);
    } catch (error) {
      console.error('Error fetching category details:', error);
      res.status(500).json({ error: 'Failed to fetch category details' });
    }
  };
  

// Delete a category
const deleteCategory = async (req, res) => {
  try {
    const categoryId = req.params.id;
    await Category.destroy({ where: { Category_Id: categoryId } });
    res.sendStatus(204);
  } catch (error) {
    console.error('Error deleting category:', error);
    res.status(500).json({ error: 'Failed to delete category' });
  }
};

// for fetch all row of category
const getAllCategoryIds = async (req, res) => {
  try {
    const categoryIds = await Category.findAll({ attributes: ['Category_Id'] });
    const ids = categoryIds.map(category => category.Category_Id);
    res.json(ids);
  } catch (error) {
    console.error('Error fetching category IDs:', error);
    res.status(500).json({ error: 'Failed to fetch category IDs' });
  }
};

module.exports = { addCategory, getAllCategories,updateCategory,getCategoryById, deleteCategory, getAllCategoryIds };
