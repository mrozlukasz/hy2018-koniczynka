const assert = require("assert");
const ocr = require("../image-processing/service")

describe("ocr - interface testing", function() {
    it("sendin color file", function() {
        //given
        let file_name = "/home/mzaborow/workspace/hy2018/hy2018-koniczynka/test/img_20181124_101409.jpg";
        process.env.OCR_TOKEN = 'aabbc6b1b288957';
        //when
        let res = ocr.parseImageFromFile(file_name);
        //then
        console.log(res)
    });
});