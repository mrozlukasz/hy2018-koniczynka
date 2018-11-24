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
            console.log("Successfully sent generic message with response %s ", response);
        } else {
            console.error("Unable to send message.");
            console.error(response);
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
                        title: "Wytypuj gdzie padnie wygrana",
                        subtitle: "Quiz",
                        item_url: "http://www.voltaren.pl/",
                        image_url: "https://cdn.pixabay.com/photo/2017/02/11/22/38/quiz-2058883_960_720.png",
                        buttons: [{
                            type: "web_url",
                            url: "https://www.quizowa.pl/",
                            title: "Typuję"
                        }]
                    }, {
                        title: "Kup kupon do godziny 18:00",
                        subtitle: "Udaj się do wskazanej kolektury",
                        item_url: "https://www.lotto.pl/lotto/mapa-kolektur",
                        image_url: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/61/Toicon-icon-hatch-navigate.svg/2000px-Toicon-icon-hatch-navigate.svg.png",
                        buttons: [{
                                type: "web_url",
                                url: "https://www.google.pl/maps/dir/52.254699,21.0436229/Przy+Wile%C5%84skiej.+Apteka,+Wile%C5%84ska+9,+03-001+Warszawa/@52.2541613,21.0350818,16z/data=!3m1!4b1!4m9!4m8!1m1!4e1!1m5!1m1!1s0x471ecc3f414bc595:0x4e9d9d28e8bf3966!2m2!1d21.0357!2d52.256389",
                                title: "Udaję się do kolektury"
                            }

                        ]
                    },
                        {
                            title: "Nie przegap losowania",
                            subtitle: "Weź udział w 5 kolejnych losowaniach",
                            item_url: "https://www.lotto.pl/",
                            image_url: "https://www.lotto.pl/sites/default/files/svg/lotto_z_bialym_obrysem.svg",
                            buttons: [{
                                type: "web_url",
                                url: "https://www.lotto.pl/",
                                title: "Wchodzę do gry"
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
            console.log("Successfully sent generic message with response %s ", response);
        } else {
            console.error("Unable to send message.");
            console.error(response);
            console.error(error);
        }
    });
};