const path = require("path");
const fs = require("fs");

module.exports = {

    uploadImage : (storeLocation, file) => {
        switch(storeLocation){
            case "gallery" : storeLocation = process.env.GALLERY_STORE_LOCATION;
                break;
            case "site" :   storeLocation = process.env.SITEIMAGE_STORE_LOCATION;
                break;
        }

        console.log("upload-temp :" + file.path);
        const storeDirectory = path.join(path.dirname(require.main.filename), process.env.STATIC_RESOURCES_DIRECTORY, storeLocation);
        console.log("storeDir : " +storeDirectory);

        const url = path.join(storeLocation, file.filename) + path.extname(file.originalname);
        console.log("url : " + url);

        const storePath = path.join( storeDirectory, file.filename ) + path.extname(file.originalname);
        fs.existsSync(storeDirectory) || fs.mkdirSync(storeDirectory);
        const content = fs.readFileSync(file.path);
        fs.writeFileSync(storePath, content, {flag: "w+"});

        return url.replace(/\\/gi, '/');
    }
}