const extractor = require("../image-processing/ticket-number-extractor");
const lines = require("./parsed-lines.json");
const linesWithTwoNumbersRows = require("./parsed-lines-with-2-numbers-lines.json");
const expect = require('chai').expect;


describe("extract ticket number from result of ocr", function () {
    it("extract ticket number from one liner", function () {
        //when
        let ticketNumber = extractor.extract(lines);

        expect(ticketNumber).to.be.equal("0061-033086795-085724");

    });

    it("extract ticket number from two liner", function () {
        //when
        let ticketNumber = extractor.extract(linesWithTwoNumbersRows);

        expect(ticketNumber).to.be.equal("0061-043494730-086724");


    });


});




