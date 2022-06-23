const { Router } = require('express');
const {
  models: { Player, GameSession, Action },
} = require('../../db/index');

const actionRouter = Router();

actionRouter.get

actionRouter.post('/create', async (req, res) => {
    try {
        const { text } = req.body;
        const playerId = req.session_id;
        const createdAction = await Action.create({ text, playerId });
        res.status(201).send(createdAction);
    } catch (e) {
        res.status(500).send('Error creating action.');
        console.log(e);
    }
})

actionRouter.get('/actions', async (req, res) => {
    try {
        const actions = await Action.findAll({ where: { playerId: req.session_id } });
        res.status(201).send(actions);
      } catch (e) {
        console.log('Error getting actions.');
        console.log(e);
      }
})

actionRouter.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        console.log('id: ', id)
        Action.destroy({ where: { id }});
        res.status(201).send(id);
    } catch (e) {
        console.log('Error deleting action.');
        console.log(e);
    }
})

module.exports = {
    path: '/action',
    router: actionRouter,
};
  