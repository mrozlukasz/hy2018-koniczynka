const ocrProcessor = require("../image-processing/index");
const expect = require('chai').expect;

const SENDER_ID = "010101010101";
const LOTTERY_DATE = new Date("2018-11-15 21:40:00");

const event = {
    sender: {
        id: SENDER_ID
    },
    message: {
        attachments: [
            {
                type: 'image',
                payload: {url: 'https://scontent.xx.fbcdn.net/v/t1.15752-9/46523807_1607692755998554_177864139144691712_n.jpg?_nc_cat=106&_nc_ad=z-m&_nc_cid=0&_nc_ht=scontent.xx&oh=18ba0b56c2347c468c31178dc65c5cdc&oe=5CAD6FF0'}
            }
        ]
    }

};


describe("Process from event to ticket properties", function () {
    it("should work", function (done) {

        this.timeout(20000);

        ocrProcessor.process(event)
            .then(t => {
                    expect(t).to.have.lengthOf(2);
                    expect(t).to.have.deep.members([
                        {
                            userId: SENDER_ID,
                            ticketId: "0061-043494730-086724",
                            lotteryDate: LOTTERY_DATE,
                            numbers:[5, 6, 16, 44, 48, 49]
                        },
                        {
                            userId: SENDER_ID,
                            ticketId: "0061-043494730-086724",
                            lotteryDate: LOTTERY_DATE,
                            numbers:[3, 20, 21, 22, 45, 48]
                        }]
                    );
                    done();
                }
            ).catch(e => done(e))
    });
})