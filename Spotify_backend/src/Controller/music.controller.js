const musicModel = require("../model/music.model");
const userModel = require("../model/user.model");
const albumModel = require("../model/album.model");
const jwt = require("jsonwebtoken");
const {uploadToImageKit} = require("../Services/storage.service");

const uploadMusic = async (req, res) => {
    
      

        const {title} = req.body;
        const file = req.file;
        if (!file) {
            return res.status(400).json({ message: "No file uploaded" });
        }

        const uri = await uploadToImageKit(file.buffer.toString('base64'));


        const artist = req.user._id;
        const newMusic = new musicModel({ uri, title, artist });
        await newMusic.save();
        res.status(201).json({ message: "Music uploaded successfully", music: newMusic });
    
};

const createAlbum = async (req, res) => {
    

        const {title, musics} = req.body;
        const newAlbum = new albumModel({ title, artist: req.user._id, musics });
        await newAlbum.save();
        res.status(201).json({ message: "Album created successfully", album: newAlbum });
     
};

const getAllMusics = async (req, res) => {
    try {
        const musics = await musicModel.find().populate("artist", "username email");
        res.status(200).json(musics);
    } catch (error) {
        res.status(500).json({ message: "Error fetching musics", error });
    }
};

const getAllAlbums = async (req, res) => {
    try {
        const albums = await albumModel.find().select("title artist").populate("artist", "username email");
        res.status(200).json(albums);
    } catch (error) {
        res.status(500).json({ message: "Error fetching albums", error });
    }
};

const getAllAlbumById = async (req, res) => {
    try {
        const  albumId  = req.params.albumId;
        const album = await albumModel.findById(albumId).populate("artist", "username email");
        res.status(200).json(album);
    } catch (error) {
        res.status(500).json({ message: "Error fetching album musics", error });
    }
};

module.exports = {
    uploadMusic,
    createAlbum,
    getAllMusics,
    getAllAlbums,
    getAllAlbumById
};