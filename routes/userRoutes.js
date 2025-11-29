const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { ensureAuth } = require('../middleware/authMiddleware');


router.get('/', ensureAuth, userController.list);
router.get('/:id', ensureAuth, userController.get);
router.put('/:id', ensureAuth, userController.update);
router.delete('/:id', ensureAuth, userController.remove);


module.exports = router;