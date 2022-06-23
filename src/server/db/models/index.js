const Player = require("./player");
const GameSession = require("./gamesession");
const Action = require("./action");

GameSession.hasMany(Player);
Player.belongsTo(GameSession);
Player.hasMany(Action);
Action.belongsTo(Player);

module.exports = {
  models: {
    Player,
    GameSession,
    Action,
  },
};