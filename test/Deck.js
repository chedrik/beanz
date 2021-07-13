const assert = require('assert');
const Deck = require('../core/Deck');

describe('Deck', function () {
    describe('Creation', function () {
        it('Deck should be able to be initialized with non-zero cards', function () {
            const deck = new Deck(3);
            assert.notEqual(deck.count(), 0);
        });
    });

    describe('Different decks by # of players', function () {
        it('Deck initialization with 2 players', function () {
            const deck = new Deck(2);
            assert.equal(deck.count(), 104);
        });

        it('Deck initialization with 3 players', function () {
            const deck = new Deck(3);
            assert.equal(deck.count(), 150);
        });

        it('Deck initialization with 4 players', function () {
            const deck = new Deck(4);
            assert.equal(deck.count(), 130);
        });

        it('Deck initialization with 5 players', function () {
            const deck = new Deck(5);
            assert.equal(deck.count(), 130);
        });

        it('Deck initialization with 6 players', function () {
            const deck = new Deck(6);
            assert.equal(deck.count(), 144);
        });

        it('Deck initialization with 7 players', function () {
            const deck = new Deck(7);
            assert.equal(deck.count(), 144);
        });

        it('Deck initialization with illegal # of players', function () {
            assert.throws(
                () => {
                    new Deck(0)
                },
                /Number of players is not in 2 <= N <= 7/
            );
            assert.throws(
                () => {
                    new Deck(100)
                },
                /Number of players is not in 2 <= N <= 7/
            );
        });
    });

    describe('Shuffling', function () {
        it('Deck should be shuffled', function () {
            const deck1 = new Deck(3);
            const deck2 = new Deck(3);
            assert.notEqual(deck1.cards, deck2.cards);  // technically could be flaky in very unlikely scenario
        });
        
        it('Reshuffling', function () {
            const deck = new Deck(3);
            deck.cards = []; // reset deck
            deck.reshuffle(['card1', 'card2', 'card3']);
            assert.equal(3, deck.count());
        });
    });
});