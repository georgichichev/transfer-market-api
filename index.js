const express = require('express');
const {mongoose} = require('mongoose');
const app = express();
const routes = require('./src/routes.js');
const {auth} = require('./src/middlewares/auth.js');
const cors = require('./src/middlewares/cors.js');
const {PORT, DB_URI} = require('./src/constants.js');

const startDataBase = () =>{
    try {
        mongoose.connect(DB_URI, () =>{
            console.log('Database connected.')
        })
    }
    catch (err){
        console.log('Error connecting to the database.')
    }
};

startDataBase();

app.use(express.json());
app.use(cors);
app.use(auth);
app.use(routes);

app.listen(PORT, () => console.log(`Server is listening on port ${PORT}...`))