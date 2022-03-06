const express = require('express');
const {scoreboardController} = require('../appContext');

const router = express.Router();

router.get('/', scoreboardController.processScoreBoardRequest)

module.exports = router;