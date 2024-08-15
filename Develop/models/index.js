//Import models

const Product = require('./Product');
const Category = require('./Category');
const Tag = require('./Tag');
const ProductTag = require('./ProductTag');

// Product belongsTo Category
Product.belongsTo(Category, {
  foreignKey: 'category_id',
});

// Category hasMany Products
Category.hasMany(Product, {
  foreignKey: 'category_id',
});

// Product belongsToMany Tags (through ProductTag)
Product.belongsToMany(Tag, {
  through: ProductTag,
  foreignKey: 'product_id',
});

// Tag belongsToMany Products (through ProductTag)
Tag.belongsToMany(Product, {
  through: ProductTag,
  foreignKey: 'tag_id',
});

//export 

module.exports = {
  Product,
  Category,
  Tag,
  ProductTag,
};