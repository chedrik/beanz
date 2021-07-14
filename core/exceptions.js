function GameOver(message) {
    this.message = message;
};

GameOver.prototype = new Error();

module.exports = { GameOver };