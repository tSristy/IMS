const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { authenticateUser } = require('./Controller/userController');

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

app.listen(4321)
