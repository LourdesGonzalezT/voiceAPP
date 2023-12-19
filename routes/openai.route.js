const express = require('express');
const router = express.Router();

const multer = require('multer');

const { handlerRequest } = require('../controllers/openai.controller');

const upload = multer({ dest: 'voiceFiles/' });

router.post('/voice', upload.single('audio'), handlerRequest);

module.exports = router;