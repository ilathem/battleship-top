const Gameboard = require('./gameboard');

test('Gameboard creation', () => {
  const testboard = Array.from(Array(10), () => new Array(10));
  const testGameboard = {
    board: testboard
  }
  const board = new Gameboard();
  expect(testGameboard).toEqual(board);
})

test('Ship placement vertical', () => {
  let testboard = Array.from(Array(10), () => new Array(10));
  const board = new Gameboard();
  testboard[0][0] = 'S';
  testboard[0][1] = 'S';
  testboard[0][2] = 'S';
  testboard[0][3] = 'S';
  board.placeShip(0, 0, 0, 3);
  expect(board.board).toEqual(testboard);
})

test('Ship placement horizontal', () => {
  let testboard = Array.from(Array(10), () => new Array(10));
  const board = new Gameboard();
  testboard[1][1] = 'S';
  testboard[2][1] = 'S';
  testboard[3][1] = 'S';
  testboard[4][1] = 'S';
  board.placeShip(1, 1, 4, 1);
  expect(board.board).toEqual(testboard);
})

test('Reverse coordinates work with ship placements', () => {
  let testboard = Array.from(Array(10), () => new Array(10));
  const board = new Gameboard();
  testboard[0][0] = 'S';
  testboard[0][1] = 'S';
  testboard[0][2] = 'S';
  testboard[0][3] = 'S';
  board.placeShip(0, 3, 0, 0);
  testboard[1][1] = 'S';
  testboard[2][1] = 'S';
  testboard[3][1] = 'S';
  testboard[4][1] = 'S';
  board.placeShip(4, 1, 1, 1);
  expect(board.board).toEqual(testboard);
})

test('Diagonal coordinates throws', () => {
  expect(() => new Gameboard().placeShip(0, 0, 1, 3)).toThrow('No diagonal ships');
})

test('Receive attack', () => {
  let testboard = Array.from(Array(10), () => new Array(10));
  const board = new Gameboard();
  const testShip = board.placeShip(0, 3, 0, 0);
  const testAttack = board.receiveAttack(0, 2);
  expect(testShip.hitCount).toEqual(1);
})