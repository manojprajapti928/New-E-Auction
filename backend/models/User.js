const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const Product = require("../models/Product");
const Bid = require("../models/Bid");
const { FORCE } = require("sequelize/lib/index-hints");

const User = sequelize.define("User", {
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




User.hasMany(Product, { foreignKey: "adminId" });
Product.belongsTo(User, { foreignKey: "adminId" });

User.hasMany(Bid, { foreignKey: "userId" });
Bid.belongsTo(User, { foreignKey: "userId" });

module.exports = User;
