const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const { ensureAuth } = require('../middleware/authMiddleware');


router.get('/', ensureAuth, productController.list);
router.get('/:id', ensureAuth, productController.get);
router.post('/', ensureAuth, productController.create);
router.put('/:id', ensureAuth, productController.update);
router.delete('/:id', ensureAuth, productController.remove);


module.exports = router;