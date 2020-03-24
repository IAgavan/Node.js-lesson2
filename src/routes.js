/* eslint-disable linebreak-style */
const router = require('express').Router();
const controller = require('./game');

router.get('/getField', (req, res) => {
  res.send(controller.getField());
});

router.get('/getPlayer', (req, res) => {
  res.send(controller.getPlayer());
});

router.get('/getStatus', (req, res) => {
  res.send(controller.checkStatus());
});

router.post('/reset', () => {
  controller.reset();
  res.send('reset');
});

router.post('/move', (req, res) => {
  controller.makeMove(req.body.x, req.body.y);
  res.send('ok');
});

module.exports = router;
