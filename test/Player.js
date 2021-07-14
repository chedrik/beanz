const assert = require('assert');
const Player = require('../core/Player');
const Deck = require('../core/Deck');

describe('Player', function () {
    describe('Creation', function () {
        it('Should be able to create a player', function () {
            const p = new Player('chasen');
            assert.equal(p.name, 'chasen');
        });
    });

    describe('Drawing cards', function () {
        it('Drawing should add to the players hand', function () {
            const p = new Player('chasen');
            const d = new Deck(3);
            p.draw(d);
            assert.equal(p.numCards, 3);
        });

        it('Drawing should add to the back of a players hand', function () {
            const p = new Player('chasen');
            const d = new Deck(3);
            p.draw(d);
            const curP = JSON.parse(JSON.stringify(p));
            p.draw(d);
            assert.equal(JSON.stringify(p.hand.slice(0, 3)), JSON.stringify(curP.hand));
        });
    });

    describe('Planting', function () {
        it('Planting in an empty field', function () {
            const p = new Player('chasen');
            p.hand = ['red'];
            p.plant(0);
            assert.equal(p.hand.length, 0);
            assert.equal(p.fields[0][0], 'red');
        });

        it('Planting in a non-empty field', function () {
            const p = new Player('chasen');
            p.hand = ['red', 'red'];
            p.plant(0);
            p.plant(0);
            assert.equal(p.hand.length, 0);
            assert.equal(p.fields[0].length, 2);
            assert.equal(p.fields[0][1], 'red');
        });

        it('Planting in a field with a different bean', function () {
            const p = new Player('chasen');
            p.hand = ['red', 'blue'];
            p.plant(0);
            p.plant(0);
            assert.equal(p.hand.length, 1);
            assert.equal(p.fields[0].length, 1);
            assert.equal(p.fields[0][0], 'red');
        });
    });
});