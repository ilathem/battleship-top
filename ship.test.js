const Ship = require('./ship');

test('ship creation', () => {
  const testShip = {
    length: 2,
    hitCount: 0,
    sunk: false,
  };
  const ship = new Ship(2);
  expect(testShip).toEqual(ship);
});

test('hit function', () => {
  const testShip = {
    length: 2,
    hitCount: 1,
    sunk: false,
  };
  const ship = new Ship(2);
  ship.hit();
  expect(testShip).toEqual(ship);
});
