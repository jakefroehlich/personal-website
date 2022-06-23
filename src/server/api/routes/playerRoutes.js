const { Router } = require('express');
const bcrypt = require('bcrypt');
const {
  models: { Player, Session },
} = require('../../db/index');

const playerRouter = Router();

playerRouter.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const player = await Player.findOne({
    where: {
      email,
    },
  });
  if (!player) {
    res.status(401).send('failure');
  } else {
    const match = await bcrypt.compare(password, player.password);
    if (match) {
      const playersSession = await Session.findByPk(req.session_id);
      await playersSession.setPlayer(player);
      await Session.update({ name: player.name }, { where: { playerId: player.id } });
      res.status(200).send(player);
    } else {
      res.status(401).send('failure');
    }
  }
});

playerRouter.get('/whoami', (req, res) => {
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

// create a player
playerRouter.post('/create', async (req, res) => {
  try {
    const { email, name, password } = req.body;
    const createdPlayer = await Player.create({ email, name, password });
    res.status(201).send(createdPlayer);
  } catch (e) {
    res.status(500).send('could not find');
    console.log(e);
  }
});

// adds players to a game session
playerRouter.put('/session', async (req, res) => {
  try {
    const sessionId = req.session_id;
    const gameSessionId = req.body.id;
    await Session.update({ gameSessionId }, { where: { id: sessionId } });
    res.status(200).send('found');
  } catch (e) {
    res.status(500).send('could not find');
    console.log(e);
  }
});

// add stats to the player's profile after the game
playerRouter.put('/player/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { score, winner } = req.body;
    if (req.player.highScore < score && winner) {
      await Player.update(
        {
          highScore: score,
          gamesPlayed: (req.player.gamesPlayed += 1),
          gamesWon: (req.player.gamesWon += 1),
        },
        { where: { id } },
      );
    } else if (req.player.highScore < score) {
      await Player.update(
        { highScore: score, gamesPlayed: (req.player.gamesPlayed += 1) },
        { where: { id } },
      );
    } else {
      await Player.update(
        { gamesPlayed: (req.player.gamesPlayed += 1) },
        { where: { id } },
      );
    }
    res.status(200).send('found');
  } catch (e) {
    res.status(500).send('could not find');
    console.log(e);
  }
});

module.exports = {
  path: '/player',
  router: playerRouter,
};
