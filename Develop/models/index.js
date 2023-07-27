// import models
const Product = require('./Product');
const Category = require('./Category');
const Tag = require('./Tag');
const ProductTag = require('./ProductTag');

// ADD CODE HERE, "RELATIONSHIPS" aka Data Associations Sequelize//


// A.belongsTo(B, { /* options */ onDelete: 'CASACADE', }); //

// Products belongsTo Category. //
// A <------ B //
Product.belongsTo(Category, {
  foreignKey: 'category_id',
  onDelete: 'CASCADE', // This is the foreign key in the "Products" table that references the "id" column in the "Categories" table. //
});

// Categories have many Products. //
// A ------> B //
Category.hasMany(Product, {
  foreignKey: 'category_id',
   // This is the foreign key in the "Products" table that references the "id" column in the "Categories" table. //
});

// Products belongToMany Tags (through ProductTag). //
Product.belongsToMany(Tag, {
  through: ProductTag, // This indicates that the many-to-many relationship is handled through the "ProductTag" table.
  foreignKey: 'product_id',
   // This is the foreign key in the "ProductTag" table that references the "id" column in the "Products" table. //
});

// Tags belongToMany Products (through ProductTag). //
Tag.belongsToMany(Product, {
  through: ProductTag, // This indicates that the many-to-many relationship is handled through the "ProductTag" table.
  foreignKey: 'tag_id',
   // This is the foreign key in the "ProductTag" table that references the "id" column in the "Tags" table. //
});

module.exports = {
  Product,
  Category,
  Tag,
  ProductTag,
};
