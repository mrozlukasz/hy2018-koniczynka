const urlExtractor = require("./image-url-extractor");
const ocr = require("./service");
const preprocessor = require("./preprocessor");
const numbersExtractor = require("./numbers-extractor");
const ticketNumberExtractor = require("./ticket-number-extractor");
const dateExtractor = require("./date-extractor");
const _ = require('lodash');


function extractTicketProperties(lines){
    let numbers = numbersExtractor.extract(lines);
    console.log("Found numbers", JSON.stringify(numbers));
    let ticketId = ticketNumberExtractor.extract(lines);
    console.log("Found ticket id", ticketId);
    let lotteryDate = dateExtractor.extract(lines);
    console.log("Found lotery date", lotteryDate);

   return _(numbers).map(n => {
        return {
            ticketId,
            lotteryDate,
            numbers: n
        }
    })
    .value();
}

function extendWithUserId(tickets, userId){
    tickets.forEach(t => {
        t.userId = userId;
    });
    return tickets;
}

exports.process = function(event){
    let imgUrl = urlExtractor.extract(event);
    console.log("Found image with url",imgUrl);

    return preprocessor.adjust(imgUrl)
        .then(ocr.parseImageFromFile)
        .then(extractTicketProperties)
        .then(t => { return extendWithUserId(t, event.sender.id) })
};