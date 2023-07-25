// Imports important parts of the sequelize library. //
const { Model, DataTypes } = require('sequelize');

// Imports our database connection from config/connection.js. //
const sequelize = require('../config/connection.js');

// Initialize Tag model (table) by extending off Sequelize's Model class. //
class Tag extends Model {}

Tag.init(
  {
    // Columns defined below: //
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    tag_name: {
      type: DataTypes.STRING,
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'tag',
  }
);

module.exports = Tag;
