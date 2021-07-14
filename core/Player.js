const Deck = require('./Deck');

class Player {
    constructor(name) {
        this.name = name;
        this.coins = 0;
        this.hand = [];
        this.fields = [[], [], []]
    };

    get numCards() {
        return this.hand.length;
    };

    plant(fieldId) {
        if (this.fields[fieldId].length == 0) {
            this.fields[fieldId].push(this.hand[0]);
            this.hand.shift();
        } else if (this.fields[fieldId][0] == this.hand[0]) {
            this.fields[fieldId].push(this.hand[0]);
            this.hand.shift();
        } else {
            // TODO: ERR?
            console.log('TODO');
        }
    };

    harvest(fieldId) {
        const num_cards = this.fields[fieldId].length;
        const coin_map = Deck.getCoinMap(this.fields[fieldId][0])
        const sortedHarvestOptions = Object.keys(coin_map).map(Number).sort((a, b) => b - a);
        var discard_pile = []
        for (let opt of sortedHarvestOptions) {
            if (opt <= num_cards) {
                this.coins += coin_map[opt];
                discard_pile = this.fields[fieldId].splice(0, opt);
                this.deck.discard_pile.push(...discard_pile);
                break
            }
        }
        return discard_pile;
    }

    draw(deck) {
        const new_cards = deck.draw();
        this.hand.push(...new_cards);
    };
};

module.exports = Player;
