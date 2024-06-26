const Gameboard = require('./gameboard');

test('Gameboard creation', () => {
  const testboard = new Array(10).fill(new Array(10).fill('?'));
  const testGameboard = {
    board: testboard
  }
  const board = new Gameboard();
  expect(testGameboard).toEqual(board);
})