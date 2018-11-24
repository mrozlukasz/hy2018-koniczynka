const assert = require("assert");
const ocr = require("../image-processing/service");

describe("ocr - interface testing", function() {
    it("sending color file", function() {
        //given
        let file_name = "./test/img_20181124_101409.jpg";
        process.env.OCR_TOKEN = 'aabbc6b1b288957';
        //when
        let res = ocr.parseImageFromFile(file_name);
        //then
        console.log(res)
    });

    it("sendin b/w file", function() {
        //given
        let file_name = "./test/46678159_2279068278995327_5677922893883768832_n.jpg1987077106_processed.jpg";
        process.env.OCR_TOKEN = 'aabbc6b1b288957';
        //when
        let res = ocr.parseImageFromFile(file_name);
        //then
        console.log("aaa");
        console.log(res);
    });
});