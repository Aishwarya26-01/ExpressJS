const Sequelize = require('sequelize');

const sequelize = new Sequelize('booking-appointment', 'root', 'Aishwarya@26', {
    dialect: 'mysql', 
    host: 'localhost'
});

module.exports = sequelize;