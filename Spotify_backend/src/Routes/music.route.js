const express = require("express");
const router = express.Router();
const { uploadMusic, createAlbum, getAllMusics, getAllAlbums, getAllAlbumById } = require("../Controller/music.controller");
const multer = require("multer");
const authMiddleware = require("../Middleware/auth.middleware");


const upload = multer({
    storage: multer.memoryStorage(),
});

router.post("/upload", authMiddleware.authArtist, upload.single("music"), uploadMusic);
router.post("/album", authMiddleware.authArtist, createAlbum);
router.get("/",authMiddleware.authListener, getAllMusics);
router.get("/albums",authMiddleware.authListener, getAllAlbums);
router.get("/albums/:albumId",authMiddleware.authListener, getAllAlbumById);

module.exports = router;