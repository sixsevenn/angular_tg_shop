const ApiError = require('../error/ApiError')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const {User, Basket} = require('../models/models')

const generateJwt = (id, email, role) => {
    return jwt.sign(
        {id, email, role}, 
        process.env.SECRET_KEY,
        {expiresIn: '24h'}
    )
}

class UserController {
    async checkOrCreateUser(req, res, next) {
        try {
            const { tg_user_id, username, first_name, last_name, language_code } = req.body;

            if (!tg_user_id) {
                return res.status(400).json({ message: "Не передан Telegram ID пользователя" });
            }

            let user = await User.findOne({ where: { tg_user_id } });

            if (!user) {
                user = await User.create({
                    tg_user_id,
                    username,
                    first_name,
                    last_name,
                    language: language_code
                });
            }

            const token = generateJwt(user.id, user.tg_user_id, user.role);

            return res.json({ message: "Пользователь проверен или добавлен", user, token });
        } catch (e) {
            next(ApiError.badRequest(e.message));
        }
    }
}

module.exports = new UserController();