// src/routes/nftRoutes.js
const express = require('express');
const nftController = require('../controllers/nftController');
const router = express.Router();
const multer = require('multer');
const upload = multer({ dest: 'uploads/' }); 

router.get('/nfts/:address', nftController.getNFTs);
router.post('/mint', upload.single('image'), nftController.mintNFT);
router.post('/transfer', nftController.transferNFT);

module.exports = router;