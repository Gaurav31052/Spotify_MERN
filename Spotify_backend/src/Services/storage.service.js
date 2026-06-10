const {ImageKit} =require ('@imagekit/nodejs');

const ImagekitClient = new ImageKit({
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY, 
});

async function uploadToImageKit(file) {
    try {
        const response = await ImagekitClient.files.upload({
            file,
            fileName: "music_" + Date.now(),
            folder: "/spotify/music/",
        });
        return response.url; 
    } catch (error) {
        console.error('Error uploading to ImageKit:', error);
        throw error; 
    }   
}

module.exports = {
    uploadToImageKit,
};



