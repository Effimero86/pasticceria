const { Router } = require('express');
const cakeController = require('../controllers/cakeController');

const router = Router();

router.get('/:id', cakeController.cake_get_by_id);
router.get('/', cakeController.cake_get);
router.post('/', cakeController.cake_post);
router.put('/:id', cakeController.cake_put);
router.delete('/:id', cakeController.cake_delete);

module.exports = router;