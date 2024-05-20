const sequelize = require('../db')
const {DataTypes} = require('sequelize')

const User = sequelize.define('user', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    username: {type: DataTypes.STRING, unique: true},
    email: {type: DataTypes.STRING, unique: true},
    password: {type: DataTypes.STRING},
    role: {type: DataTypes.STRING, defaultValue: "USER"},
})

const Basket = sequelize.define('basket', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},

})

const BasketProduct = sequelize.define('basket_product', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    
})

const Product = sequelize.define('product', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, unique: true, allowNull: false},
    description: {type: DataTypes.TEXT, allowNull: false},
    price: {type: DataTypes.INTEGER, allowNull: false},
    weight: {type: DataTypes.INTEGER, allowNull: false}, 
    img: {type: DataTypes.STRING, allowNull: false},
    nutritional_value: {type: DataTypes.STRING, allowNull: false},
})
 
const Type = sequelize.define('type', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, unique: true,allowNull: false},
})


User.hasOne(Basket)
Basket.belongsTo(User)

Basket.hasMany(BasketProduct)
BasketProduct.belongsTo(Basket)

Type.hasMany(Product)
Product.belongsTo(Type)

Product.hasMany(BasketProduct)
BasketProduct.belongsTo(Product)


module.exports = {
    User, 
    Basket,
    BasketProduct,
    Product,
    Type,
}
// при изменениях запустить 
// sequelize.sync({ alter: true }).then(() => {  
//     console.log("Все таблицы были успешно обновлены");
// });