const Ship = require('./ship');

test('ship creation', () => {
  const testShip = {
    length: 2,
    hitCount: 0,
  };
  const ship = new Ship(2);
  expect(testShip).toEqual(ship);
});

test('hit function', () => {
  const testShip = {
    length: 2,
    hitCount: 1,
  };
  const ship = new Ship(2);
  ship.hit();
  expect(testShip).toEqual(ship);
});

test('is sunk', () => {
  const ship = new Ship(2);
  ship.hit();
  ship.hit();
  expect(ship.sunk()).toBeFalsy();
});
