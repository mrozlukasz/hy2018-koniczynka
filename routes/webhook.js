var express = require('express');
var request = require('request');
var router = express.Router();
var bots = require('./bots/bots');

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
                if (webhook_event.message.text === 'test') {
                    console.log("PAGE_ACCESS_TOKEN");
                    console.log(PAGE_ACCESS_TOKEN);
                    var messageData = {
                        messaging_type: "RESPONSE",
                        recipient: {
                            id: "2495467783813050"
                        },
                        message: {
                            text: "HELLO WORLD"
                        }
                    };
                    console.log("Sending to FB ");
                    console.log(messageData);
                    request({
                        url: 'https://graph.facebook.com/v2.6/me/messages?access_token=' + PAGE_ACCESS_TOKEN,
                        method: 'POST',
                        json: messageData

                    }, function (error, response, body) {
                        if (!error && response.statusCode == 200) {
                            console.log("Successfully sent generic message with response %s ", response);
                        } else {
                            console.error("Unable to send message.");
                            console.error(response);
                            console.error(error);
                        }
                    });
                }
            }

            if(webhook_event.message.attachments){
                let atts = webhook_event.message.attachments;

                console.log("Found attachments!!", atts.length);
                atts.forEach(att => {
                    console.log("Type = ",att.type);
                    console.log("Payload = ", att.payload);
                });

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
