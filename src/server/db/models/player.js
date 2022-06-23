const {
    STRING,
    UUID,
    UUIDV4,
} = require('sequelize');
const db = require('../db');

const Player = db.define('player', {
    id: {
        type: UUID,
        defaultValue: UUIDV4,
        primaryKey: true,
    },
    name: {
        type: STRING,
        defaultValue: "Guest",
        allowNull: false,
        validate: {
            notEmpty: true,
        },
    },
});

module.exports = Player;