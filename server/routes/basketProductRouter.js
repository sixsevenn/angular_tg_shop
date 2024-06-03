const Router = require('express')
const router = new Router()
const basketProductController = require('../controllers/basketProductController')


router.post('/', basketProductController.addProduct)
router.delete('/', basketProductController.removeProduct)
router.get('/', basketProductController.getAll)

module.exports = router
