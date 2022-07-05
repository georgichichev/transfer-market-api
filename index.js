const express = require('express');
const app = express();
const routes = require('./src/routes.js');

app.use(express.json());
app.use(routes);

app.listen(3000, () => console.log('Server is listening on port 3000...'))