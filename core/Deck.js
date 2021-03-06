const { GameOver } = require('./exceptions');

class Deck {
    constructor(numPlayers) {
        this.numPlayers = numPlayers;
        this.createDeck();
        this.numShuffles = 0;
        this.maxShuffles = numPlayers > 2 ? 2 : 0;
        this.discardPile = [];
    };

    determineCardTypes() {
        let cardTypes = [];
        switch (this.numPlayers) {
            case 2:
                cardTypes = ["garden", "red", "black-eyed", "soy", "green", "stink", "chili", "blue"];
                break;
            case 3:
                cardTypes = ["garden", "red", "black-eyed", "soy", "green", "stink", "chili", "blue", "wax", "coffee"];
                break;
            case 4:
            case 5:
                cardTypes = ["garden", "red", "black-eyed", "soy", "green", "stink", "chili", "blue", "wax", "cocoa"];
                break;
            case 6:
            case 7:
                cardTypes = ["red", "black-eyed", "soy", "green", "stink", "chili", "blue", "wax", "coffee"];
                break;
            default:
                throw new Error('Number of players is not in 2 <= N <= 7');
        }
        return cardTypes;
    };

    createDeck() {
        const cardTypes = this.determineCardTypes();
        const cards = []
        cardTypes.forEach((c) => {
            const numToAdd = cardMeta[c]['numCards'];
            for (let i = 0; i < numToAdd; i++) {
                cards.push(c);
            }
        });
        this.cards = cards;
        this.shuffle();
    };

    shuffle() {
        for (let i = this.cards.length - 1; i > 0; i--) {
            let j = Math.floor(Math.random() * (i + 1));
            [this.cards[i], this.cards[j]] = [this.cards[j], this.cards[i]];
        }
    };

    reshuffle() {
        this.cards.push(...this.discardPile);
        this.shuffle();
        this.numShuffles += 1;
    };

    draw() {
        if (this.numPlayers >= 3) {
            return [this._draw(), this._draw(), this._draw()];
        } else {
            return [this._draw(), this._draw()];
        }
    };

    turn_over() {  // same as draw, but calibrated for game
        if (this.numPlayers >= 3) {
            return [this._draw(), this._draw()];
        } else {
            return [this._draw(), this._draw(), this._draw()];
        }
    };

    deal() {  // same as draw, but calibrated for initial deal
        return [this._draw(), this._draw(), this._draw(), this._draw(), this._draw()];
    };

    _draw() {
        if (this.cards.length == 0) {
            if (this.hasShufflesRemaining) {
                this.reshuffle(this.discardPile);
                return this._draw();
            } else {
                throw new GameOver('No more cards to draw!');
            }
        } else {
            return this.cards.shift();
        }
    };

    get count() {
        return this.cards.length;
    };

    get hasShufflesRemaining() {
        return this.maxShuffles - this.numShuffles;
    };

    static getCoinMap(card) {
        return cardMeta[card]['map'];
    };
};

// number of cards in the game, and map from card --> coin
const cardMeta = {
    'cocoa': {
        numCards: 4,
        map: {
            2: 1,
            3: 3,
            4: 4,
        }
    },
    'garden': {
        numCards: 6,
        map: {
            2: 2,
            3: 3
        }
    },
    'red': {
        numCards: 8,
        map: {
            2: 1,
            3: 2,
            4: 3,
            5: 4,
        }
    },
    'black-eyed': {
        numCards: 10,
        map: {
            2: 1,
            4: 2,
            5: 3,
            6: 4,
        }
    },
    'soy': {
        numCards: 12,
        map: {
            2: 1,
            4: 2,
            6: 3,
            7: 4,
        }
    },
    'green': {
        numCards: 14,
        map: {
            3: 1,
            5: 2,
            6: 3,
            7: 4,
        }
    },
    'stink': {
        numCards: 16,
        map: {
            3: 1,
            5: 2,
            7: 3,
            8: 4,
        }
    },
    'chili': {
        numCards: 18,
        map: {
            3: 1,
            6: 2,
            8: 3,
            9: 4,
        }
    },
    'blue': {
        numCards: 20,
        map: {
            4: 1,
            6: 2,
            8: 3,
            10: 4,
        }
    },
    'wax': {
        numCards: 22,
        map: {
            4: 1,
            7: 2,
            9: 3,
            11: 4,
        }
    },
    'coffee': {
        numCards: 24,
        map: {
            4: 1,
            7: 2,
            10: 3,
            12: 4,
        }
    },
};

module.exports = Deck;
