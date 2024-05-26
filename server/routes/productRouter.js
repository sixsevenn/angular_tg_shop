const Router = require('express')
const router = new Router()
const productController = require('../controllers/productController')
const checkRole = require('../middleware/checkRoleMiddleware')
const checkOrCreateUser = require('../middleware/checkTelegramUser')
import { TelegramService } from '../../services/telegram.service';

telegram = inject(TelegramService);
const userData = this.telegram.getData();


router.post('/', checkRole('ADMIN'), productController.create)
router.get('/', checkOrCreateUser(userData.id, userData.username, userData.first_name, userData.last_name, userData.language_code), productController.getAll)
router.get('/:id', checkOrCreateUser(userData.id, userData.username, userData.first_name, userData.last_name, userData.language_code), productController.getOne)

module.exports = router