const sequelize = require('../db')
const {DataTypes, INTEGER} = require('sequelize')

const User = sequelize.define('user', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    username: {type: DataTypes.STRING, unique: true},
    role: {type: DataTypes.STRING, defaultValue: "USER"},
})

const Basket = sequelize.define ('basket', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},

})

const BasketProduct = sequelize.define ('basket_product', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    
})

const Product = sequelize.define ('product', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, allowNull: false},
    description: {type: DataTypes.STRING, allowNull: false},
    price: {type: DataTypes.INTEGER, allowNull: false},
    weight: {type: DataTypes.INTEGER, allowNull: false}, 
    img: {type: DataTypes.STRING, allowNull: false},
    structure: {type: DataTypes.STRING, allowNull: false},
    nutritional_value: {type: DataTypes.STRING, allowNull: false},
})
 
const Type = sequelize.define('type', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, unique: true,allowNull: false},
})

const Size = sequelize.define('size', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, unique: true,allowNull: false},
})

const TypeSize = sequelize.define('type_size', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
})

User.hasOne(Basket)
Basket.belongsTo(User)

Basket.hasMany(BasketProduct)
BasketProduct.belongsTo(Basket)

Type.hasMany(Product)
Product.belongsTo(Type)

Size.hasMany(Product)
Product.belongsTo(Size)

Product.hasMany(BasketProduct)
BasketProduct.belongsTo(Product)

Type.belongsToMany(Size, {through: TypeSize})
Size.belongsToMany(Type, {through: TypeSize})

module.exports = {
    User, 
    Basket,
    BasketProduct,
    Product,
    Type,
    Size,
    TypeSize,
}



