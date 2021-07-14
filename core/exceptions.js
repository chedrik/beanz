function GameOver(message) {
    const error = new Error(message);
    return error;
}

GameOver.prototype = Object.create(Error.prototype);

module.exports = { GameOver };