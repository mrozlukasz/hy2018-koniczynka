exports.sendWin = function(request, recipientId, game,  token) {
    var messageData = {
        messaging_type: "RESPONSE",
        recipient: {
            id: recipientId
        },
        message: {
            attachment: {
                type: "template",
                payload: {
                    template_type: "generic",
                    elements: [{
                        title: "Zdobywasz monetę!",
                        subtitle: "Wygrana w \"" + game + "\"",
                        item_url: "https://hy2018-koniczynka.herokuapp.com/",
                        image_url: "https://hy2018-koniczynka.herokuapp.com/images/coins.png",
                        buttons: [{
                            "type":"postback",
                            "title":"Moje monety",
                            "payload":"coins"
                        }]
                    }]
                }
            }
        }
    };
    request({
        url: 'https://graph.facebook.com/v2.6/me/messages?access_token=' + token,
        method: 'POST',
        json: messageData

    }, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            console.log("Successfully sent generic message with response  ");
        } else {
            console.error("Unable to send message.");
            // console.error(response);
            console.error(error);
        }
    });
};

exports.menuButtons = function (request, token) {
    var messageData = {
        "get_started": {
            "payload": "welcome"
        },
        "persistent_menu": [
            {
                "locale": "default",
                "composer_input_disabled": false,
                "call_to_actions": [
                    {
                        "title": "Zagraj",
                        "type": "postback",
                        "payload": "games"
                    },
                    {
                        "title": "Najbliższe kolektury",
                        "type": "postback",
                        "payload": "stations"
                    },
                    {
                        "title": "Więcej",
                        "type": "nested",
                        "call_to_actions": [
                            {
                                "title": "Moje monety",
                                "type": "postback",
                                "payload": "coins"
                            },
                            {
                                "title": "Dostępne nagrody",
                                "type": "postback",
                                "payload": "prizes"
                            },
                            {
                                "title": "Pomoc",
                                "type": "postback",
                                "payload": "help"
                            }
                        ]
                    }
                ]
            }
        ]
    };
    request({
        url: 'https://graph.facebook.com/v2.6/2014802288613549/messenger_profile?access_token=' + token,
        method: 'POST',
        json: messageData

    }, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            console.log("Successfully sent generic message with response ");
        } else {
            console.error("Unable to send message.");
            // console.error(response);
            console.error(error);
        }
    });
};


exports.sendTextMessage = function (request, recipientId, textMessage, token) {
    var messageData = {
        messaging_type: "RESPONSE",
        recipient: {
            id: recipientId
        },
        message: {
            text: textMessage
        }
    };
    request({
        url: 'https://graph.facebook.com/v2.6/me/messages?access_token=' + token,
        method: 'POST',
        json: messageData

    }, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            console.log("Successfully sent generic message with response  ");
        } else {
            console.error("Unable to send message.");
            // console.error(response);
            console.error(error);
        }
    });
};

exports.sendTypingOn = function(request, recipientId, token){
    let messageData = {
        recipient: {
            id: recipientId
        },
        sender_action:"typing_on"
    };

    request({
        url: 'https://graph.facebook.com/v2.6/me/messages?access_token=' + token,
        method: 'POST',
        json: messageData

    }, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            console.log("Successfully sent generic message with response ");
        } else {
            console.error("Unable to send message.");
            // console.error(response);
            console.error(error);
        }
    });
};

exports.sendGames = function (request, recipientId, token) {
    var messageData = {
        messaging_type: "RESPONSE",
        recipient: {
            id: recipientId
        },
        message: {
            attachment: {
                type: "template",
                payload: {
                    template_type: "generic",
                    elements: [{
                        title: "Kup kupon do godziny 18:00",
                        subtitle: "We wskazanej kolekturze",
                        item_url: "https://www.lotto.pl/lotto/mapa-kolektur",
                        image_url: "https://hy2018-koniczynka.herokuapp.com/images/wskazana_kolektura.png",
                        buttons: [{
                            "type":"postback",
                            "title":"Wskaż mi kolekturę",
                            "payload":"subscribe_goto"
                        }]
                    },
                        {
                            title: "Nie przegap 5 losowań",
                            subtitle: "Weź udział w 5 kolejnych losowaniach",
                            item_url: "https://www.lotto.pl/",
                            image_url: "https://hy2018-koniczynka.herokuapp.com/images/strike.png",
                            buttons: [{
                                "type":"postback",
                                "title":"Gram!",
                                "payload":"subscribe_5"
                            }]
                        },
                        {
                            title: "Wytypuj gdzie padnie wygrana",
                            subtitle: "Quiz",
                            item_url: "https://www.lotto.pl/lotto/mapa-kolektur",
                            image_url: "https://hy2018-koniczynka.herokuapp.com/images/gdzie_padnie_wygrana.png",
                            buttons: [{
                                "type":"postback",
                                "title":"Typuję",
                                "payload":"subscribe_quiz"
                            }]
                        }]
                }
            }
        }
    };
    request({
        url: 'https://graph.facebook.com/v2.6/me/messages?access_token=' + token,
        method: 'POST',
        json: messageData

    }, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            console.log("Successfully sent generic message with response  ");
        } else {
            console.error("Unable to send message.");
            // console.error(response);
            console.error(error);
        }
    });
};

exports.sendStores = function (request, recipientId, token) {
    var messageData = {
        messaging_type: "RESPONSE",
        recipient: {
            id: recipientId
        },
        message: {
            attachment: {
                type: "template",
                payload: {
                    template_type: "generic",
                    elements: [{
                        title: "Kiosk Ruch",
                        subtitle: "ul. Modlińska 8b",
                        item_url: "https://www.lotto.pl/lotto/mapa-kolektur",
                        image_url: "https://media2.pl/g/780/16059.jpg",
                        buttons: [{
                            type: "web_url",
                            url: "https://www.google.pl/maps/dir/52.293979+21.007753/Modli%C5%84ska+8,+05-077+Warszawa/@52.2948783,21.0043761,18z/data=!3m1!4b1!4m11!4m10!1m3!2m2!1d21.007753!2d52.293979!1m5!1m1!1s0x471ec944d5f80aad:0x5bc05a6c54123120!2m2!1d21.0025641!2d52.2950978",
                            title: "Pokaż na mapie"
                        }]
                    }, {
                        title: "Kolektura Lotto",
                        subtitle: "ul. Modlińska 29",
                        item_url: "https://www.lotto.pl/lotto/mapa-kolektur",
                        image_url: "http://bi.gazeta.pl/im/2/10843/z10843362V,Tak-beda-wygladaly-nowe-kolektury-Lotto-w-calym-kr.jpg",
                        buttons: [{
                            type: "web_url",
                            url: "https://www.google.pl/maps/dir/52.293979+21.007753/Modli%C5%84ska+29,+05-110+Jab%C5%82onna/@52.329635,20.934173,13z/data=!3m1!4b1!4m11!4m10!1m3!2m2!1d21.007753!2d52.293979!1m5!1m1!1s0x471eb7e6c1fe8887:0x14f5fe8d1038dd17!2m2!1d20.9309544!2d52.3675377",
                            title: "Pokaż na mapie"
                        }]
                    }]
                }
            }
        }
    };
    request({
        url: 'https://graph.facebook.com/v2.6/me/messages?access_token=' + token,
        method: 'POST',
        json: messageData

    }, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            console.log("Successfully sent generic message with response  ");
        } else {
            console.error("Unable to send message.");
            // console.error(response);
            console.error(error);
        }
    });
};

exports.sendMap = function (request, recipientId, token) {
    var messageData = {
        messaging_type: "RESPONSE",
        recipient: {
            id: recipientId
        },
        message: {
            attachment: {
                type: "template",
                payload: {
                    template_type: "generic",
                    elements: [{
                        title: "Kolektura Lotto",
                        subtitle: "ul. Modlińska 29",
                        item_url: "https://www.google.pl/maps/dir/52.293979+21.007753/Modli%C5%84ska+29,+05-110+Jab%C5%82onna/@52.329635,20.934173,13z/data=!3m1!4b1!4m11!4m10!1m3!2m2!1d21.007753!2d52.293979!1m5!1m1!1s0x471eb7e6c1fe8887:0x14f5fe8d1038dd17!2m2!1d20.9309544!2d52.3675377",
                        image_url: "http://bi.gazeta.pl/im/2/10843/z10843362V,Tak-beda-wygladaly-nowe-kolektury-Lotto-w-calym-kr.jpg",
                        buttons: [{
                            type: "web_url",
                            url: "https://www.google.pl/maps/dir/52.293979+21.007753/Modli%C5%84ska+29,+05-110+Jab%C5%82onna/@52.329635,20.934173,13z/data=!3m1!4b1!4m11!4m10!1m3!2m2!1d21.007753!2d52.293979!1m5!1m1!1s0x471eb7e6c1fe8887:0x14f5fe8d1038dd17!2m2!1d20.9309544!2d52.3675377",
                            title: "Pokaż na mapie"
                        }]
                    }]
                }
            }
        }
    };
    request({
        url: 'https://graph.facebook.com/v2.6/me/messages?access_token=' + token,
        method: 'POST',
        json: messageData

    }, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            console.log("Successfully sent generic message with response  ");
        } else {
            console.error("Unable to send message.");
            // console.error(response);
            console.error(error);
        }
    });
};

exports.sendCoins = function (request, recipientId, coins, token) {
    this.sendTextMessage(request, recipientId, "Masz " + coins + " monet.", token);
};

exports.sendPrizes = function (request, recipientId, token) {
    var messageData = {
        messaging_type: "RESPONSE",
        recipient: {
            id: recipientId
        },
        message: {
            attachment: {
                type: "template",
                payload: {
                    template_type: "generic",
                    elements: [{
                        title: "Maskotka LOTEK",
                        subtitle: "Odbierz maskotkę w jednej z kolektur",
                        item_url: "https://www.lotto.pl/lotto/mapa-kolektur",
                        image_url: "https://4.allegroimg.com/original/0cc8b9/5df10175421fb536045ec208d194",
                        buttons: [{
                            type: "web_url",
                            url: "https://www.lotto.pl/lotto/mapa-kolektur",
                            title: "Odbieram!"
                        }]
                    }, {
                        title: "Oddaję monety na cele harytatywne",
                        subtitle: "Wspieraj fundację Rak&Roll",
                        item_url: "https://fanimani.pl/fundacja-raknroll-wygraj-zycie/",
                        image_url: "https://d357eobw6dp1li.cloudfront.net/media/cache/fund_org_logos/2015/01/29/raknroll_logo.jpg.700x700_q80.jpg",
                        buttons: [{
                            type: "web_url",
                            url: "https://fanimani.pl/fundacja-raknroll-wygraj-zycie/",
                            title: "Wspieram!"
                        }]
                    }]
                }
            }
        }
    };
    request({
        url: 'https://graph.facebook.com/v2.6/me/messages?access_token=' + token,
        method: 'POST',
        json: messageData

    }, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            console.log("Successfully sent generic message with response  ");
        } else {
            console.error("Unable to send message.");
            // console.error(response);
            console.error(error);
        }
    });
};