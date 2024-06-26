const Gameboard = require('./gameboard');

test('Gameboard creation', () => {
  const testboard = Array.from(Array(10), () => new Array(10));
  const testGameboard = {
    board: testboard
  }
  const board = new Gameboard();
  expect(testGameboard).toEqual(board);
})

test('Ship placement happy case', () => {
  let testboard = Array.from(Array(10), () => new Array(10));
  const board = new Gameboard();
  testboard[0][0] = 'S';
  testboard[0][1] = 'S';
  testboard[0][2] = 'S';
  testboard[0][3] = 'S';
  board.placeShip(0, 0, 0, 3);
})

test('Diagonal coordinates throws', () => {
  expect(() => new Gameboard().placeShip(0, 0, 1, 3)).toThrow('No diagonal ships');
})