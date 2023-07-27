// Imports important parts of the sequelize library. //
const { Model, DataTypes } = require('sequelize');

// Imports our database connection from config/connection.js. //
const sequelize = require('../config/connection.js');

// Initialize Category model (table) by extending off Sequelize's Model class. //
class Category extends Model {}

Category.init(
  {
    // Columns defined below: //
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    category_name: {
      type: DataTypes.STRING,
      allowNull: false,
    }
    },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'category',
  }
);

module.exports = Category;
