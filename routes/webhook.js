const express = require('express');
const request = require('request');
const conversation = require('./bots/conversation');
const model = require('../game/state/model');
const _ = require('lodash');
const ocr = require('../image-processing/index');

const router = express.Router();

// Accepts POST requests at /webhook endpoint
router.post('/', (req, res) => {

    var PAGE_ACCESS_TOKEN = process.env.PAGE_ACCESS_TOKEN;
    // Parse the request body from the POST
    let body = req.body;

    console.info(req.headers);
    console.info(body);

    // Check the webhook event is from a Page subscription
    if (body.object === 'page') {

        // Iterate over each entry - there may be multiple if batched
        body.entry.forEach(function(entry) {
            var pageID = entry.id;
            var timeOfEvent = entry.time;


            // // Iterate over each messaging event
            // entry.messaging.forEach(function(messagingEvent) {
            //     if (messagingEvent.optin) {
            //         bots.receivedAuthentication(messagingEvent);
            //     } else if (messagingEvent.message) {
            //         bots.receivedMessage(messagingEvent);
            //     } else if (messagingEvent.delivery) {
            //         bots.receivedDeliveryConfirmation(messagingEvent);
            //     } else if (messagingEvent.postback) {
            //         bots.receivedPostback(messagingEvent);
            //     } else {
            //         console.log("Webhook received unknown messagingEvent: ", messagingEvent);
            //     }
            // });


            // Get the webhook event. entry.messaging is an array, but
            // will only ever contain one event, so we get index 0
            let webhook_event = entry.messaging[0];
            console.log(webhook_event);
            console.log(" ");
            console.log(entry);

            if (webhook_event.message) {
                if (webhook_event.message.text === 'pomoc') {
                    conversation.sendTextMessage(request, webhook_event.sender.id, "Zeskanuj kupon żeby wejść do gry.", PAGE_ACCESS_TOKEN);
                }

                try {
                    model.StateModel.count({_id: webhook_event.sender.id}, function (err, count) {
                        if (count === 0) {
                            model.StateModel.create({_id: webhook_event.sender.id, coins: 0}, function (err, ctx) {
                                if (err) return handleError(err);
                            });
                        } else {
                            let state = model.StateModel.findById(webhook_event.sender.id);
                            conversation.sendTextMessage(request, webhook_event.sender.id, "Ilość Twoich monet to " + state.coins, PAGE_ACCESS_TOKEN);
                        }
                    });
                } catch (e) {
                    console.error(e);
                }
            }

            if(webhook_event.message.attachments){
                ocr.process(webhook_event)
                    .then(coupons => {
                        let message = `Dodałeś kupon ${coupons[0].ticketId} na numerki:`;
                        coupons.forEach(c => {
                            message += "\n" + _.join(c.numbers)
                        });
                        let date = coupons[0].lotteryDate;
                        message += `\n losowanie odbędzie się ${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`;

                        conversation.sendTextMessage(request, webhook_event.sender.id, message, PAGE_ACCESS_TOKEN);
                    }).catch(e => {
                        console.error("Error during processing image with coupon", e);
                        let message = "Przepraszam ale nie udało mi się odczytać twojego kuponu" +
                            "\n Spróbuj jeszcze raz.";
                        conversation.sendTextMessage(request, webhook_event.sender.id, message, PAGE_ACCESS_TOKEN);
                    });

                let message = "Dziękuję za przesłanie kuponu, próbuję go odczytać.";
                conversation.sendTextMessage(request, webhook_event.sender.id, message, PAGE_ACCESS_TOKEN);
            }

        });

        // Return a '200 OK' response to all events
        res.status(200).send('EVENT_RECEIVED');

    } else {
        // Return a '404 Not Found' if event is not from a page subscription
        res.sendStatus(404);
    }

});


// Accepts GET requests at the /webhook endpoint
router.get('/', (req, res) => {

    /** UPDATE YOUR VERIFY TOKEN **/
    const VERIFY_TOKEN = process.env.VERIFY_TOKEN ;

    // Parse params from the webhook verification request
    let mode = req.query['hub.mode'];
    let token = req.query['hub.verify_token'];
    let challenge = req.query['hub.challenge'];

    // Check if a token and mode were sent
    if (mode && token) {

        // Check the mode and token sent are correct
        if (mode === 'subscribe' && token === VERIFY_TOKEN) {

            // Respond with 200 OK and challenge token from the request
            console.log('WEBHOOK_VERIFIED');
            res.status(200).send(challenge);

        } else {
            // Responds with '403 Forbidden' if verify tokens do not match
            res.sendStatus(403);
        }
    }
});

module.exports = router;
