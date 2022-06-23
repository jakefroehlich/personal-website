const {
    UUID,
    UUIDV4,
    INTEGER,
} = require('sequelize');
const db = require('../db');

const GameSession = db.define('gamesession', {
    id: {
        type: UUID,
        defaultValue: UUIDV4,
        primaryKey: true,
      },
    code: {
        type: INTEGER,
        allowNull: false,
        validate: {
            notEmpty: true,
        },
    },
});

module.exports = GameSession;