const express = require('express');

const controller = require('../controllers/update-profile');

const router = express.Router();

router.put('/:id', controller.put);

module.exports = router;