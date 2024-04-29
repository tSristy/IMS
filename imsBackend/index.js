const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
const bodyParser = require('body-parser');
const { authenticateUser } = require('./Controller/userController');
const { addCategory , getAllCategories,updateCategory,getCategoryById, deleteCategory, getAllCategoryIds} = require('./Controller/categoryController');
const { addProduct, updateProduct, deleteProduct, getAllProducts, getProductById } = require('./Controller/productController'); 
const { addMenu, getAllMenus,updatedMenu,getMenu, deletedMenu, getAllMenuIds } = require('./Controller/menuController');
const Category = require('./Model/categoryModel');
// const { addTransactionDetails } = require('./Controller/tDetailsController')
const { addTransaction, getAllTransactionIds } =  require('./Controller/transactionsController');

const app = express();
app.use(cors({
    origin: 'http://localhost:3000'
}));
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true, parameterLimit: 50000 }));

const { createUser, getAllUsers, findUserById, updateUserById, deleteUserById } = require('./Controller/userController');

app.get('/', async(req,res)=>{
   const result = await getAllUsers();
   res.send(result);
})

app.post('/login', async (req, res) => {
   const { username, password } = req.body;
   try {
       const user = await authenticateUser(username, password);
       if (user && user.token) {
           console.log('User successfully logged in');
           res.json({ token: user.token });
       } else {
           console.log('User not valid');
           res.status(401).send('Invalid username or password');
       }
   } catch (error) {
       console.error('Error during login:', error);
       res.sendStatus(500);
   }
});

//Menu
app.post('/menus', addMenu);
app.get('/menus', getAllMenus);
app.put('/menus/:id', updatedMenu);
app.get('/menus/:id', getMenu);
app.get('/menus/:id', getAllMenuIds);
app.delete('/menus/:id', deletedMenu);

//   app.get all menu items
  app.get('/menus', async (req, res) => {
    try {
      const menus = await Menu.findAll({
        attributes: ['Code', 'Title', 'URL_Path', 'Parent_Id', 'Is_Active']
      });
      res.json(menus);
    } catch (error) {
      console.error('Error fetching menus:', error);
      res.status(500).json({ error: 'Failed to fetch menus' });
    }
  });

// Category
app.post('/categories', addCategory);
app.get('/categories', getAllCategories);
app.put('/categories/:id', updateCategory);
app.get('/categories/:id', getCategoryById);
app.delete('/categories/:id', deleteCategory);

//   app.get('/category-ids', getAllCategoryIds);
app.get('/category-ids', async (req, res) => {
    try {
      const categoryIds = await Category.findAll({ attributes: ['Category_Id'] });
      const ids = categoryIds.map(category => category.Category_Id);
      res.json(ids);
    } catch (error) {
      console.error('Error fetching category IDs:', error);
      res.status(500).json({ error: 'Failed to fetch category IDs' });
    }
  });


// Product
app.post('/products', addProduct);
app.get('/products', getAllProducts);
app.put('/products/:id', updateProduct);
app.get('/products/:id', getProductById);
app.delete('/products/:id', deleteProduct);



// Transaction
app.post('/transactions', addTransaction);
app.get('/transaction_master', getAllTransactionIds);


app.listen(4321)
