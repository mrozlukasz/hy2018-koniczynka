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
    return ocrSpaceApi.parseImageFromLocalFile(imageFilePath, options)
        .then(function (parsedResult) {
            console.log('parsedResult: \n', parsedResult);
            console.log('parsedResult: \n', parsedResult.ocrParsedResult.ParsedResults);
            return parsedResult.ocrParsedResult.ParsedResults["0"].TextOverlay.Lines;
        });
};