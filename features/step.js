/* eslint-disable linebreak-style */
const assert = require('assert');
const { Given, When, Then } = require('cucumber');
const request = require('supertest');
const app = require('../src/server');
const controller = require('../src/game');


Given('пустое поле', () => {
  controller.reset();
});

Given('ходит игрок {string}', (string) => {
  controller.presetPlayer(string);
});

Given('поле {string}', (string) => {
  const arr = string.split('').map(e=>e = e =="0"? 0: e);
  controller.presetField([arr.slice(0,3), arr.slice(3,6), arr.slice(6)]);
});

When('игрок ходит в клетку {string}, {string}', (x, y) => {
  return request(app).post('/move').send({ x: +x, y: +y });
});

Given('сбрасывается поле', function () {
  return request(app).post('/reset');
});

When('меняется ход', () => {
  controller.changeTurn();
});

Then('ход переходит к {string}', (string) => {
  return request(app).get('/getPlayer')
    .expect(string)
});


Then('поле становится {string}', (string) => {
  const arr = string.split('').map(e=>e = e =="0"? 0: e);
  return request(app).get('/getField').expect([arr.slice(0,3), arr.slice(3,6), arr.slice(6)]);
});

Then('возвращается ошибка', () => {
  controller.showMessage('выбери другое поле');
});

Then('победил игрок {string}', (string) => {
  assert.equal(controller.getPlayer(), string);
});

Then('определился победитель', () => {
  assert.equal(controller.checkWinner(), true);
});

Then('определилась ничья', () => {
  assert.equal(controller.checkDraw(), true);
});
