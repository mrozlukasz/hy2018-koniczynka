const express = require('express');
const request = require('request');
const conversation = require('./bots/conversation');
const postbacks = require('./bots/postbacks');
const model = require('../game/state/model');
const games = require('../game/games');
const _ = require('lodash');
const ocr = require('../image-processing/index');

const router = express.Router();

// Accepts POST requests at /webhook endpoint
router.post('/', (req, res) => {

        var PAGE_ACCESS_TOKEN = process.env.PAGE_ACCESS_TOKEN;
        // Parse the request body from the POST
        let body = req.body;

        //console.info(req.headers);
        //console.info(body);

        // Check the webhook event is from a Page subscription
        if (body.object === 'page') {

            // conversation.menuButtons(request, PAGE_ACCESS_TOKEN);

            // Iterate over each entry - there may be multiple if batched
            body.entry.forEach(function (entry) {
                var pageID = entry.id;
                var timeOfEvent = entry.time;

                // Get the webhook event. entry.messaging is an array, but
                // will only ever contain one event, so we get index 0
                let webhook_event = entry.messaging[0];
                console.log(webhook_event);
                console.log(" ");
                console.log(entry);
                try {
                    if (webhook_event.postback) {
                        postbacks.handle(request, webhook_event, token);
                        res.status(200).send('EVENT_RECEIVED');
                        return;
                    }

                    if (webhook_event.message) {
                        if (webhook_event.message.text === 'pomoc') {
                            conversation.sendTextMessage(request, webhook_event.sender.id, "Zeskanuj kupon żeby wejść do gry.", PAGE_ACCESS_TOKEN);
                        }


                        if (webhook_event.message.text === 'Moje monety') {
                            model.getCoins(webhook_event.sender.id).then((state) => {
                                console.log("State for ", webhook_event.sender.id, " is ", state);
                                if (!_.isEmpty(state.coins)) {
                                    conversation.sendTextMessage(request, webhook_event.sender.id, "Ilość Twoich monet to " + state.coins, PAGE_ACCESS_TOKEN);
                                } else {
                                    conversation.sendTextMessage(request, webhook_event.sender.id, "Czy my się znamy? :)", PAGE_ACCESS_TOKEN);
                                }
                            });
                        }

                        if (webhook_event.message.attachments) {
                            ocr.process(webhook_event)
                                .then(coupons => {
                                    let message = `Dodałeś kupon ${coupons[0].ticketId} na numerki:`;
                                    coupons.forEach(c => {
                                        message += "\n" + _.join(c.numbers)
                                    });
                                    let date = coupons[0].lotteryDate;
                                    message += `\n losowanie odbędzie się ${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
                                    message += "\n Poinformuję Cię o wynikach.";

                                    conversation.sendTextMessage(request, webhook_event.sender.id, message, PAGE_ACCESS_TOKEN);
                                    model.registerCoupons(webhook_event.sender.id, coupons);
                                    games.addProgress(webhook_event.sender.id, games.types.FIVE_IN_ROW).then(s => {
                                        if (s === "FINISHED") {
                                            conversation.sendTextMessage(request, webhook_event.sender.id, "Gratuluję udało ci się zdobyć monetę", PAGE_ACCESS_TOKEN);
                                        }
                                    });
                                    games.addProgress(webhook_event.sender.id, games.types.GO_TO).then(s => {
                                        if (s === "FINISHED") {
                                            conversation.sendTextMessage(request, webhook_event.sender.id, "Gratuluję udało ci się zdobyć monetę", PAGE_ACCESS_TOKEN);
                                        }
                                    })
                                }).catch(e => {
                                console.error("Error during processing image with coupon", e);
                                let message = "Przepraszam ale nie udało mi się odczytać twojego kuponu" +
                                    "\n Spróbuj jeszcze raz.";
                                conversation.sendTextMessage(request, webhook_event.sender.id, message, PAGE_ACCESS_TOKEN);
                            });

                            let message = "Próbuję odczytać kupon ...";
                            conversation.sendTextMessage(request, webhook_event.sender.id, message, PAGE_ACCESS_TOKEN);
                            setTimeout(() => conversation.sendTypingOn(request, webhook_event.sender.id, PAGE_ACCESS_TOKEN), 250);
                        }
                    }
                } catch (e) {
                    console.error(e);
                }
                // Return a '200 OK' response to all events
                res.status(200).send('EVENT_RECEIVED');

            })
        } else {
            // Return a '404 Not Found' if event is not from a page subscription
            res.sendStatus(404);
        }
    }
);


// Accepts GET requests at the /webhook endpoint
router.get('/', (req, res) => {

    /** UPDATE YOUR VERIFY TOKEN **/
    const VERIFY_TOKEN = process.env.VERIFY_TOKEN;

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
