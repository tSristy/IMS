const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const config  = require('./Server/config');


const app = express();
app.use(cors());
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true, parameterLimit: 50000 }));

config.connect((err)=>{
 if(!!err){
    console.error(err)
 }
 else console.log('true')
})

app.listen(4321)