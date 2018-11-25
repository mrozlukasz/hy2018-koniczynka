const conversations = require('./conversation');
const games = require("../../game/games");
const model = require('../game/state/model');

exports.handle = function (request, event, token) {
    var sender = event.sender.id;
    var payload = event.postback.payload;

    if (payload) {
        if (payload === 'welcome') {
            conversations.sendTextMessage(request, sender, "Witaj. Nazywam się Koniczynka. Prześlij mi zdjęcie kuponu i zagrajmy w grę", token);
        } else if (payload === 'games') {
            conversations.sendGames(request, sender, token);
        } else if (payload === 'stations') {
            conversations.sendTextMessage(request, sender, "Najbliższe, czynne kolektury to:", token);
            conversations.sendStores(request, sender, token);
        } else if (payload === 'coins') {
            console.log("Asking for user coins");
            model.getCoins(webhook_event.sender.id).then((state) => {
                console.log("State for ", webhook_event.sender.id, " is ", state);
                if (!_.isEmpty(state.coins)) {
                    console.log("Sending to user that he have ", state.coins);
                    conversations.sendCoins(request, webhook_event.sender.id, state.coins, token);
                } else {
                    console.log("Sending to user that we don't know him");
                    conversation.sendTextMessage(request, webhook_event.sender.id, "Czy my się znamy? :)", token);
                }
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
                    conversations.sendMap(request, sender, token);
                });

        } else if (payload === 'prizes') {
            conversations.sendPrizes(request, sender, token);
        } else if (payload === 'help') {
            conversations.sendTextMessage(request, sender, "Możesz przesłać mi zdjęcie nowego kuponu lotto i dołączyć do gry. Dostępne gry to:", token);
            conversations.sendGames(request, sender, token);
        }

    } else {
        // When a postback is called, we'll send a message back to the sender to
        // let them know it was successful
        conversations.sendTextMessage(request, sender, "Przepraszam, nie rozumiem. Możesz spróbować jeszcze raz?", token);
    }
};