// Imports important parts of the sequelize library. //
const { Model, DataTypes } = require('sequelize');

// Imports our database connection from config/connection.js. //
const sequelize = require('../config/connection');

// Initialize ProductTag model (table) by extending off Sequelize's Model class. //
class ProductTag extends Model {}

ProductTag.init(
  {
    // Columns defined below: //
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    product_id: {
      type: DataTypes.INTEGER,
      //insert: reference to the Product model's id.
      references: {
        model: "product",
        key: "id"
      }
    },
    tag_id: {
      type: DataTypes.INTEGER,
      //insert: reference to the Tag model's id.
      references: {
        model: "tag",
        key: "id"
      }
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'product_tag',
  }
);

module.exports = ProductTag;
