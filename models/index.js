// import models
const Product = require('./Product');
const Category = require('./Category');
const Tag = require('./Tag');
const ProductTag = require('./ProductTag');

// Products belongsTo Category
Product.belongsTo(Category, { foreignKey: 'category_id' });

// Categories have many Products
Category.hasMany(Product, { foreignKey: 'category_id' });

// Products belongToMany Tags (through ProductTag)
// Defined foreign and other key where...
// foreign key points to source model (product) and other key points to target model (tag)
Product.belongsToMany(Tag, {
  through: ProductTag, 
  foreignKey: 'product_id', 
  otherKey: 'tag_id'
})

// Tags belongToMany Products (through ProductTag)
// Defined foreign and other key where...
// foreign key points to source model (tag) and other key points to target model (product)
Tag.belongsToMany(Product, {
  through: ProductTag, 
  foreignKey: 'tag_id', 
  otherKey: 'product_id'
})

module.exports = {
  Product,
  Category,
  Tag,
  ProductTag,
};