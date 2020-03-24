/* eslint-disable linebreak-style */
const logger = require('./lib/logger');

const winConditions = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];
let field = [[0, 0, 0], [0, 0, 0], [0, 0, 0]];
let player = 'x';

function getField() {
  return field;
}

function getPlayer() {
  return player;
}

function changeTurn() {
  player = getPlayer() === 'x' ? 'o' : 'x';
}

function makeMove(x,y) {
  if (field[y][x] === 0){
  field[y][x] = getPlayer();
    if(!checkWinner()) changeTurn();
  } else throw new Error;
  
}

function reset() {
  field = [[0, 0, 0], [0, 0, 0], [0, 0, 0]];
}

function showMessage(string) {
  logger.log(string);
}

function presetField(newField) {
  field = newField;
}

function presetPlayer(newPlayer) {
  player = newPlayer;
}

function checkWinner() {
  const checkedField = field.map(e=>e.join('')).join('').split('');
  return winConditions.some((condition) => condition.every((index) => checkedField[index] === player));
}

function checkDraw() {
  const checkedField = field.map(e=>e.join('')).join('').split('');
  return checkedField.every((e) => e === 'x' || e === 'o');
}
function checkStatus() {
  return checkWinner() ? `${player} is Winner!`: checkDraw() ? `It's Draw!`: 'Make next move!'
}

module.exports = {
  getField,
  getPlayer,
  makeMove,
  changeTurn,
  reset,
  presetPlayer,
  presetField,
  showMessage,
  checkStatus,
};
