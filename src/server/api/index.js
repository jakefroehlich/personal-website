const path = require('path');
const chalk = require('chalk');
const cors = require('cors');
const express = require('express');
const cookieParser = require('cookie-parser');
const {
    playerRouter,
    actionRouter,
    apiRouter,
  } = require('./routes/index');
const {
    models: {
        Player,
        GameSession,
        Action
    }
} = require('../db/models');
const { app } = require('./server');

const PORT = process.env.PORT || 3000;
const PUBLIC_PATH = path.join(__dirname, '../../../public');
const DIST_PATH = path.join(__dirname, '../../../dist');

app.use(cookieParser());

app.use(async (req, res, next) => {
    if (!req.cookies.session_id) {
        const player = await Player.create();
        const oneWeek = 1000 * 60 * 60 * 24 * 7;
        res.cookie('session_id', player.id, {
            path: '/',
            expires: new Date(Date.now() + oneWeek),
        });
        req.session_id = player.id;
        next();
    } else {
        req.session_id = req.cookies.session_id;
          const player = await Player.findOne({ where: { id: req.session_id } });
          if (player) {
            req.player = player;
          }
        next();
    }
});

app.use(express.static(PUBLIC_PATH));
app.use(express.static(DIST_PATH));
app.use(cors());
app.use(express.json());
app.use('/api', apiRouter.router);
app.use('/player', playerRouter.router);
app.use('/action', actionRouter.router);
// app.use('/session', sessionRouter.router);

const startServer = () => new Promise((res) => {
    app.listen(PORT, () => {
        console.log(chalk.green(`server listening on port ${PORT}`));
        res();
    });
});

app.get('*', (req, res) => {
    res.sendFile(path.join(PUBLIC_PATH, './index.html'));
});

module.exports = {
    startServer,
    app,
};
