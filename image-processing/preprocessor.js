const replaceColor = require('replace-color');
const Jimp = require('jimp');
const path = require("path");
const crypto = require("crypto");
const fs = require('fs');
const request = require('request');


const TMP_DIR=".tmp/";


exports.adjust = (imageUrl) => {

    let urlOfImage = new URL(imageUrl);
    imageName = TMP_DIR + path.basename(urlOfImage.pathname);

    let downloaded = new Promise((resolve) => {
        console.log("Donwloading...");
        request(imageUrl).pipe(fs.createWriteStream(imageName)).on('close', () => resolve(imageName));
    });


    let processedImageName = imageName + crypto.randomBytes(4).readUInt32LE(0) + "_processed.jpg";

    return downloaded.then(() => {
        console.log("Removing pink...");
        return replaceColor({
            image: imageName,
            colors: {
                type: 'hex',
                targetColor: '#D3ADA6',
                replaceColor: '#FFFFFF'
            },
            deltaE: 30
        }).then((jimpObject) => {
            console.log("Resizing img...");
            return jimpObject.resize(Jimp.AUTO, 1536);
        }).then((jimpObject) => {
            console.log("Saving processed img", processedImageName , " ...");
            return jimpObject.writeAsync(processedImageName)
        }).then(() => {
            return processedImageName
        }).catch((err) => {
            console.log(err)
        });
    });

};


