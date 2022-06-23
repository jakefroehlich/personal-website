const { Router } = require('express');
const bcrypt = require('bcrypt');
const {
  models: { Player, GameSession, Action },
} = require('../../db/index');

const apiRouter = Router();

apiRouter.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const player = await Player.findOne({
    where: {
      email,
    },
  });
  if (!player) {
    res.status(401).send('failure');
  } else {
    const match = await bcrypt.compare(password, user.password);
    if (match) {
      const playerSession = await Session.findByPk(req.session_id);
      await playerSession.setPlayer(player);
      res.status(200).send(player);
    } else {
      res.status(401).send('failure');
    }
  }
});

apiRouter.get('/whoami', (req, res) => {
  if (req.player) {
    res.send({
      email: req.player.email,
      role: req.player.role,
      loggedIn: true,
    });
  } else {
    res.send({
      email: null,
      role: 'guest',
      loggedIn: false,
    });
  }
});

module.exports = {
  router: apiRouter,
};