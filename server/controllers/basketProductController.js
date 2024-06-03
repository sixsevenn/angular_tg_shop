const ApiError = require('../error/ApiError');
const { Basket, BasketProduct, Product, User } = require('../models/models');

class BasketProductController {
    // Добавить продукт в корзину
    async addProduct(req, res, next) {
        try {
            const { tgUserId, productId, quantity=1 } = req.body;
            
            const tgUserIdStr = tgUserId.toString();
            // Найти пользователя
            const user = await User.findOne({ where: { tg_user_id: tgUserIdStr } });
            if (!user) {
                return next(ApiError.badRequest('Пользователь не найден'));
            }
            
            // Найти корзину пользователя
            const basket = await Basket.findOne({ where: { userId: user.id } });

            if (!basket) {
                return next(ApiError.badRequest('Корзина пользователя не найдена'));
            }
            
            // Найти товар в корзине
            const existingProduct = await BasketProduct.findOne({
                where: { basket_id: basket.id, product_id: productId }
            });

            if (existingProduct) {
                // Если товар уже есть в корзине, увеличить количество
                existingProduct.quantity += quantity;
                await existingProduct.save();
                return res.json(existingProduct);
            } else {
                // Если товара еще нет в корзине, добавить его
                const basketProduct = await BasketProduct.create({
                    basket_id: basket.id,
                    product_id: productId,
                    quantity: quantity
                });
                return res.json(basketProduct);
            }

        } catch (error) {
            return next(ApiError.internal('Ошибка при добавлении товара в корзину'));
        }
    }

    // Удалить продукт из корзины
    async removeProduct(req, res, next) {
        try {
            const { tgUserId, productId, quantity, delete_all=False } = req.body;

            const tgUserIdStr = tgUserId.toString();

            // Найти пользователя
            const user = await User.findOne({ where: { tg_user_id: tgUserIdStr } });
            if (!user) {
                return next(ApiError.badRequest('Пользователь не найден'));
            }

            // Найти корзину пользователя
            const basket = await Basket.findOne({ where: { userId: user.id } });
            if (!basket) {
                return next(ApiError.badRequest('Корзина пользователя не найдена'));
            }

            const basketProduct = await BasketProduct.findOne({
                where: { basket_id: basket.id, product_id: productId }
            });

            if (!basketProduct) {
                return next(ApiError.badRequest('Товар не найден в корзине'));
            }

            if (delete_all) {
                await basketProduct.destroy();
                return res.json({ message: 'Товар успешно полностью удален из корзины' });
            }
            
            // Уменьшить количество товара или удалить товар, если количество <= 0
            if (basketProduct.quantity > parseInt(quantity)) {
                basketProduct.quantity -= parseInt(quantity);
                await basketProduct.save();
                return res.json({ message: 'Количество товара успешно уменьшено в корзине' });

            } else {
                await basketProduct.destroy();
                return res.json({ message: 'Товар успешно удален из корзины' });
            }

        } catch (error) {
            return next(ApiError.internal('Ошибка при удалении товара из корзины'));
        }
    }

    async getAll(req, res, next) {
        try {
            const { tgUserId } = req.query;

            if (!tgUserId) {
                return next(ApiError.badRequest('tgUserId не предоставлен'));
            }

            const tgUserIdStr = tgUserId.toString();

            // Найти пользователя
            const user = await User.findOne({ where: {tg_user_id: tgUserIdStr } });
            if (!user) {
                return next(ApiError.badRequest('Пользователь не найден'));
            }

            // Найти корзину пользователя
            const basket = await Basket.findOne({ where: { userId: user.id } });
            if (!basket) {
                return next(ApiError.badRequest('Корзина пользователя не найдена'));
            }

            // Все товары из корзины пользователя
            const products = await BasketProduct.findAll({ where: { basket_id: basket.id } });

            return res.json(products);
        } catch (error) {
            console.error('Ошибка при получении товаров из корзины:', error);
            return next(ApiError.internal('Ошибка при получении товаров из корзины'));
        }
    }
}


module.exports = new BasketProductController();

// добавить второй продукт в корзину другому пользователю, проверить функцию геталл для продуктов определенного пользователя, написать логики удаленя товаров из карзины(уменьшать сначала количество, а когда оно закончится, удалять сам товар),
// прописать в сервисе запрос на сервер по добавлению, получению, и удалению товаров из корзины, придумать, как это будет отображаться на сайте. (например цена на главной кнопке)