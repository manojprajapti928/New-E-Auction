
const { Sequelize } = require('sequelize');


const sequelize = new Sequelize("sqldatabase", "root", "root", {
  host: "localhost",
  dialect: "mysql",
  logging: false,
  timezone: "+05:30",
});

// sequelize.sync({ alter:true})

module.exports = sequelize;
