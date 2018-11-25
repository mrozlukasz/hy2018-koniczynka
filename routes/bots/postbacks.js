const conversations = require('./conversation');
const games = require("../../game/games");
const model = require('../../game/state/model');
const _ = require('lodash');

exports.handle = function (request, event, token) {
    var sender = event.sender.id;
    var payload = event.postback.payload;

    if (payload) {
        if (payload === 'welcome') {
            conversations.sendTextMessage(request, sender, "Witaj. Nazywam się Koniczynka. Prześlij mi zdjęcie kuponu, powiadomię Cię o wynikach losowania. Wysyłając kupon otrzymujesz dostęp do gier i quizów. Zagrajmy razem. Powodzenia!", token);
        } else if (payload === 'games') {
            conversations.sendGames(request, sender, token);
        } else if (payload === 'stations') {
            conversations.sendTextMessage(request, sender, "Najbliższe, czynne kolektury to:", token);
            conversations.sendStores(request, sender, token);
        } else if (payload === 'coins') {
            console.log("Asking for user coins");
            model.getCoins(sender).then((state) => {
                console.log("State for ", sender, " is ", state);
                console.log("Sending to user that he have ", state.coins);
                conversations.sendCoins(request, sender, state.coins, token);
            });
        } else if (payload === 'subscribe_5') {
            console.log("Subscribing user to 5 in a row");
            games.subscribe(sender, games.types.FIVE_IN_ROW)
                .then(g => {
                    console.log("Subscription completed, ", g);
                    let message = `Twój obecny wynik w grze ${g.progress}/${g.max}`;
                    conversations.sendTextMessage(request, sender, message, token);
                });

        } else if (payload === 'subscribe_goto') {
            console.log("Subscribing user to GOTO");

            games.subscribe(sender, games.types.GO_TO)
                .then(g => {
                    console.log("Subscription completed, sending map to user");
                    conversations.sendTextMessage(request, sender, "Wspaniale! Udaj się do kolektury następującej kolektury. Kupując kupon do godziny 18, zdobędziesz monety.", token);
                    conversations.sendMap(request, sender, token);
                });

        } else if (payload === 'prizes') {
            conversations.sendPrizes(request, sender, token);
        } else if (payload === 'help') {
            conversations.sendTextMessage(request, sender, "Możesz przesłać mi zdjęcie nowego kuponu lotto a ja powiadomię Cię o wynikach losowania. Wysyłając kupon otrzymujesz dostęp do gier i quizów. Dostępne gry to:", token);
            conversations.sendGames(request, sender, token);
        }

    } else {
        // When a postback is called, we'll send a message back to the sender to
        // let them know it was successful
        conversations.sendTextMessage(request, sender, "Przepraszam, nie rozumiem. Możesz spróbować jeszcze raz?", token);
    }
};