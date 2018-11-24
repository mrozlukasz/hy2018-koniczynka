var conversations = require('./conversation');

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
            conversations.sendCoins(request, sender, 10, token);
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