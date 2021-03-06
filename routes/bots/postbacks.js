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
            model.getCoins(sender).then((coins) => {
                console.log("Coins for ", sender, " is ", coins);
                conversations.sendCoins(request, sender, coins, token);
            });
        } else if (payload === 'subscribe_5') {
            console.log("Subscribing user to 5 in a row");
            games.subscribe(sender, games.types.FIVE_IN_ROW)
                .then(g => {
                    console.log("Subscription completed, ", g);
                    let message = `Twój obecny wynik w grze ${g.progress}/${g.max}.\nSkanuj kupony, żeby zdobywać punkty.`;
                    conversations.sendTextMessage(request, sender, message, token);
                });

        } else if (payload === 'subscribe_quiz') {
            try {
                games.subscribe(sender, games.types.GUESS_WINNERS)
                    .then(g => {
                        console.log("Subscription for quiz completed, ", g);
                        let message = `Jesteś zasubskrybowany do gry w quizie.
W tej chwili trwają prace nad ułatwieniem typowania miejsca wygranej,
odezwę się do ciebie jak tylko Quiz będzie gotowy.`;
                        conversations.sendTextMessage(request, sender, message, token);
                    });
            } catch (e) {
                console.log("Łapię na quizie na wszelki wypadek");
            }

        } else if (payload === 'subscribe_goto') {
            console.log("Subscribing user to GOTO");

            games.subscribe(sender, games.types.GO_TO)
                .then(g => {
                    console.log("Subscription completed, sending map to user");
                    conversations.sendTextMessage(request, sender, "Wspaniale! Udaj się do następującej kolektury. Kupując kupon do godziny 18, zdobędziesz monety.", token);
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