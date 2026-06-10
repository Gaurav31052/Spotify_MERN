const jwt = require("jsonwebtoken");
const userModel = require("../model/user.model");

async function authArtist(req, res, next) {
    const token = req.cookies.token;
    if (!token) {
        return res.status(401).json({ message: "Unauthorized" });
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const userId = decoded.userId;
        const user = await userModel.findById(userId);
        if (!user) {
            return res.status(401).json({ message: "Unauthorized" });
        }   
        if(user.role !== 'artist') {
            return res.status(403).json({ message: "you are not an artist" });
        }
        req.user = user;
        next();
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

async function authListener(req, res, next) {
    const token = req.cookies.token;
    if (!token) {
        return res.status(401).json({ message: "Unauthorized" });
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const userId = decoded.userId;
        const user = await userModel.findById(userId);
        if (!user) {
            return res.status(401).json({ message: "Unauthorized" });
        }
        if(user.role !== 'user' && user.role !== 'artist') {
            return res.status(403).json({ message: "Login to listen music" });
        }
        req.user = user;
        next();
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

module.exports = {
    authArtist,
    authListener
}