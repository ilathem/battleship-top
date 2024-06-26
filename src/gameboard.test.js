const Gameboard = require('./gameboard');

test('Gameboard creation', () => {
  const testboard = Array.from(Array(10), () => new Array(10));
  const testGameboard = {
    board: testboard
  }
  const board = new Gameboard();
  expect(testGameboard).toEqual(board);
})