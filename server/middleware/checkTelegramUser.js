const { User } = require('../models/models');



module.exports = async function (req, res, next) {
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

        req.user = user;
        next();
    } catch (e) {
        res.status(500).json({ message: "Ошибка при проверке пользователя" });
    }
}