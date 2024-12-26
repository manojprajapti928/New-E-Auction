const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const Product = require("../models/Product");
const Bid = require("../models/Bid");


const User = sequelize.define("User", {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  }, 
  username: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  role: {
    type: DataTypes.ENUM("admin", "user"),
    allowNull: false,
    defaultValue: "user",
  },
  imageUrl: {
    type: DataTypes.STRING, 
    allowNull: true,
  },
  address: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  city: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  state: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  country: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  contactNo: {
    type: DataTypes.STRING,
    allowNull: true, 
    validate: {
      is: /^[0-9]{10,15}$/,
    },
  },
});




User.hasMany(Product, { foreignKey: "adminId" ,onDelete: 'CASCADE', onUpdate: 'CASCADE'  });
Product.belongsTo(User, { foreignKey: "adminId" , onDelete: 'CASCADE', onUpdate: 'CASCADE' });

User.hasMany(Bid, { foreignKey: "userId" , onDelete: 'CASCADE', onUpdate: 'CASCADE' });
Bid.belongsTo(User, { foreignKey: "userId", onDelete: 'CASCADE', onUpdate: 'CASCADE'  });

module.exports = User;
