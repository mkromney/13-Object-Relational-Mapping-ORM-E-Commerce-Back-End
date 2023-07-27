// Sets up a web server that connects to the relevant databases. //
const nodemon = require('nodemon');

const express = require('express');
const routes = require('./routes');
const sequelize = require('./config/connection')

// Imports sequelize connection. //
const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(routes);


sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log('Now listening'));
});