/** UPDATE YOUR VERIFY TOKEN **/
const OCR_TOKEN = process.env.OCR_TOKEN;


var options =  {
    apikey: OCR_TOKEN,
    language: 'pol', // Português
    imageFormat: 'image/jpeg',
    isOverlayRequired: true
};

exports.parseImage = function(imageFilePath) {
    // Run and wait the result
    ocrSpaceApi.parseImageFromLocalFile(imageFilePath, options)
        .then(function (parsedResult) {
            console.log('parsedText: \n', parsedResult.parsedText);
            console.log('ocrParsedResult: \n', parsedResult.ocrParsedResult);
        }).catch(function (err) {
        console.log('ERROR:', err);
    });
}