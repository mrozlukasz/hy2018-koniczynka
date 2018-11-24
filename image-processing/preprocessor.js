const replaceColor = require('replace-color');
const Jimp = require('jimp');




exports.adjust = (imageName) => {
    let processedImageName = imageName + "_deleted_bck.jpg";

    replaceColor({
        image: imageName,
        colors: {
            type: 'hex',
            targetColor: '#D3ADA6',
            replaceColor: '#FFFFFF'
        },
        deltaE: 30
    })
        .then((jimpObject) =>  {
            return jimpObject.resize(Jimp.AUTO, 1536);
        })
        .then((jimpObject) => {
            jimpObject.write(processedImageName, (err) => {
                if(err) return console.log(err)
            })
        }).catch((err) => {
        console.log(err)
    });

    return processedImageName;

};


