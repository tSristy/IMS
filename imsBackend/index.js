const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');


const app = express();
app.use(cors());
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true, parameterLimit: 50000 }));


const { createUser, getAllUsers, findUserById, updateUserById, deleteUserById } = require('./Controller/userController');

app.get('/', async(req,res)=>{
   const result = await getAllUsers();
   res.send(result);
})
app.post('/login',(req,res)=>{
   console.log(req.body)
})

app.listen(4321)