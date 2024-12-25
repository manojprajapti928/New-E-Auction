
const { Sequelize } = require('sequelize');


const sequelize = new Sequelize("sqldatabase", "root", "root", {
  host: "localhost",
  dialect: "mysql",
  logging: false,
});

// sequelize.sync({ alter:true }).then(() => {
//   console.log('Database connected!');
// });

module.exports = sequelize;
