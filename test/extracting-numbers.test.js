const extractor = require("../image-processing/numbers-extractor");
const lines = require("./parsed-lines.json");
const linesWithTwoNumbersRows = require("./parsed-lines-with-2-numbers-lines.json");
const expect = require('chai').expect;


describe("extract numbers from result of ocr", function () {
    it("extract numbers from one liner", function () {
        //when
        let numbers = extractor.extract(lines);

        expect(numbers).to.have.lengthOf(1);
        expect(numbers[0]).to.be.deep.equal([5, 7, 12, 19, 23, 47]);

    });

    it("extract numbers from two liner", function () {
        //when
        let numbers = extractor.extract(linesWithTwoNumbersRows);

        expect(numbers).to.have.lengthOf(2);
        expect(numbers).to.have.deep.members([[5, 6, 16, 44, 48, 49], [3, 20, 21, 22, 45, 48]]);
    });


});




