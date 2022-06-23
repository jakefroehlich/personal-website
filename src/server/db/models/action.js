const {
    UUID,
    UUIDV4,
    INTEGER,
    STRING,
} = require('sequelize');
const db = require('../db');

const Action = db.define('action', {
    id: {
        type: UUID,
        defaultValue: UUIDV4,
        primaryKey: true,
    },
    playerId: {
        type: UUID,
        allowNull: false,
        validate: {
            notEmpty: true,
        }
    },
    text: {
        type: STRING,
        allowNull: false,
        validate: {
            notEmpty: true,
        },
    },
});

module.exports = Action;