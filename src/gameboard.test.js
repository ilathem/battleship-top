const Gameboard = require('./gameboard');

test('Gameboard creation', () => {
  const testboard = Array.from(Array(10), () => new Array(10));
  const board = new Gameboard();
  expect(board.board).toEqual(testboard);
})

test('Ship placement vertical', () => {
  let testboard = Array.from(Array(10), () => new Array(10));
  const board = new Gameboard();
  testboard[0][0] = 'S';
  testboard[0][1] = 'S';
  testboard[0][2] = 'S';
  testboard[0][3] = 'S';
  board.placeShip(0, 0, 0, 3);
  for (let i = 0; i < 4; i++) {
    expect(board.board[0][i]).toBeGreaterThan(0);
  }
  // expect(board.board).toEqual(testboard);
})

test('Ship placement horizontal', () => {
  let testboard = Array.from(Array(10), () => new Array(10));
  const board = new Gameboard();
  testboard[1][1] = 'S';
  testboard[2][1] = 'S';
  testboard[3][1] = 'S';
  testboard[4][1] = 'S';
  board.placeShip(1, 1, 4, 1);
  for (let i = 1; i < 5; i++) {
    expect(board.board[i][1]).toBeGreaterThan(0);
  }
  // expect(board.board).toEqual(testboard);
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
  for (let i = 0; i < 4; i++) {
    expect(board.board[0][i]).toBeGreaterThan(0);
  }
  for (let i = 1; i < 5; i++) {
    expect(board.board[i][1]).toBeGreaterThan(0);
  }
  // expect(board.board).toEqual(testboard);
})

// test('Diagonal coordinates throws', () => {
//   expect(() => new Gameboard().placeShip(0, 0, 1, 3)).toThrow('No diagonal ships');
// })

test('Receive attack', () => {
  const board = new Gameboard();
  const testShip = board.placeShip(0, 3, 0, 0);
  const testAttack = board.receiveAttack(0, 2);
  expect(testShip.hitCount).toEqual(1);
  expect(testAttack).toEqual('Hit!')
})

test('Same coordinate hits only hit ship once', () => {
  const board = new Gameboard();
  const testShip = board.placeShip(0, 3, 0, 0);
  board.receiveAttack(0, 2);
  board.receiveAttack(0, 2);
  expect(testShip.hitCount).toEqual(1);
})

test('Misses receive coordinates', () => {
  const board = new Gameboard();
  const testShip = board.placeShip(0, 3, 0, 0);
  const attack = board.receiveAttack(0, 7);
  expect(attack).toEqual([0, 7]);
  expect(testShip.hitCount).toEqual(0);
})

test('Gameboard should keep track of missed attacks to display properly', () => {
  const board = new Gameboard();
  board.placeShip(0, 3, 0, 0);
  expect(board.missedAttacks).toEqual([]);
  board.receiveAttack(0, 7);
  expect(board.missedAttacks).toEqual([
    [0, 7]
  ]);
})

test('Report if all ships are sunk', () => {
  console.log('start of all ships sunk test');
  const board = new Gameboard();
  board.placeShip(0, 0, 0, 3, 'firstTestShip')
  // console.log(board.ships);
  board.placeShip(1, 0, 1, 2, 'secondTestShip');
  expect(board.allSunk()).toEqual(false);
  console.log(board.board);
  board.receiveAttack(0, 0);
  board.receiveAttack(0, 1);
  board.receiveAttack(0, 2);
  board.receiveAttack(0, 3);
  board.receiveAttack(1, 0);
  board.receiveAttack(1, 1);
  board.receiveAttack(1, 2);
  console.log(board.ships);
  expect(board.allSunk()).toEqual(true);
})

