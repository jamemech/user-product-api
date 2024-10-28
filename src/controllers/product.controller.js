const productService = require('../services/product.service')
const multer = require('multer')
const multerConfig = require('../configs/multer')
const upload = multer(multerConfig.config).single(multerConfig.keyUpload)

exports.getAllProducts = async (req, res) => res.json(await productService.findAll())

exports.getProductByPrice = async (req, res) => {
    const { min, max } = req.query
    res.json(await productService.findByPrice(min, max))
}

exports.getProductById = async (req, res) => {
    const id = req.params.id
    const result = await productService.findById(id)
    if (result) {
        res.json(result)
    } else {
        res.status(404).json({})
    }
}

exports.addProduct = (req, res) => {
    upload(req, res, async (error) => {
        if (error) {
            console.log(`error: ${JSON.stringify(error)}`)
            res.status(500).json({ message: error.message })
        } else {
            res.status(201).json(await productService.add(req.body, req.file))
        }
    })
}

exports.updateProduct = (req, res) => {
    upload(req, res, async (error) => {
        if (error) {
            console.log(`error: ${JSON.stringify(error)}`)
            return res.status(500).json({ message: error.message })
        }
        const id = req.params.id
        const result = await productService.update(id, req.body, req.file)
        if (result) {
            res.json(result)
        } else {
            res.status(404).json({})
        }
    })
}

exports.deleteProduct = async (req, res) => {
    const id = req.params.id
    const result = await productService.delete(id)
    if (result) {
        res.status(204).end()
    } else {
        res.status(404).json({})
    }
}