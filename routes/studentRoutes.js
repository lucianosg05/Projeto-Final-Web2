const express = require('express');
const router = express.Router();
const studentController = require('../controllers/studentController');
const { ensureAuth } = require('../middleware/authMiddleware');


router.get('/', ensureAuth, studentController.list);
router.get('/:id', ensureAuth, studentController.get);
router.post('/', ensureAuth, studentController.create);
router.put('/:id', ensureAuth, studentController.update);
router.delete('/:id', ensureAuth, studentController.remove);


module.exports = router;