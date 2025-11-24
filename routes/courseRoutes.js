const express = require('express');
const router = express.Router();
const courseController = require('../controllers/courseController');
const { ensureAuth } = require('../middleware/authMiddleware');


router.get('/', ensureAuth, courseController.list);
router.get('/:id', ensureAuth, courseController.get);
router.post('/', ensureAuth, courseController.create);
router.put('/:id', ensureAuth, courseController.update);
router.delete('/:id', ensureAuth, courseController.remove);


module.exports = router;