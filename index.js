const express = require('express');
const {mongoose} = require('mongoose');
const app = express();
const routes = require('./src/routes.js');

const startDataBase = () =>{
    try {
        mongoose.connect('mongodb://localhost:27017/transfer-market', () =>{
            console.log('Database connected.')
        })
    }
    catch (err){
        console.log('Error connecting to the database.')
    }
};

startDataBase();

app.use(express.json());
app.use(routes);

app.listen(3000, () => console.log('Server is listening on port 3000...'))