const ocrSpaceApi = require("ocr-space-api");

exports.parseImageFromFile = function(imageFilePath) {
    let OCR_TOKEN = process.env.OCR_TOKEN;
    let options =  {
        apikey: OCR_TOKEN,
        language: 'pol', // Polish
        imageFormat: 'image/jpeg',
        isOverlayRequired: true
    };
    // Run and wait the result
    ocrSpaceApi.parseImageFromLocalFile(imageFilePath, options)
        .then(function (parsedResult) {
            console.log('parsedText: \n', parsedResult.parsedText);
            console.log('ocrParsedResult: \n', parsedResult.ocrParsedResult);
        }).catch(function (err) {
        console.log('ERROR:', err);
    });
};