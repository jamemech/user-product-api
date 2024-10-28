const router = require('express').Router()
const productController = require('../controllers/product.controller')

router.get('/', productController.getAllProducts)
router.get('/price', productController.getProductByPrice)
router.get('/:id', productController.getProductById)
router.post('/', productController.addProduct)
router.put('/:id', productController.updateProduct)
router.delete('/:id', productController.deleteProduct)

module.exports = router