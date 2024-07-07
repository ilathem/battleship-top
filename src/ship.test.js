const Ship = require('./ship');

test('ship creation', () => {
  const testShip = {
    length: 2,
    hitCount: 0,
  };
  const ship = new Ship(2);
  expect(ship.length).toEqual(testShip.length);
  expect(ship.hitCount).toEqual(testShip.hitCount);
});

test('hit function', () => {
  const ship = new Ship(2);
  ship.hit();
  expect(ship.hitCount).toEqual(1);
});

test('is sunk', () => {
  const ship = new Ship(2);
  expect(ship.isSunk()).toBeFalsy();
  ship.hit();
  ship.hit();
  expect(ship.isSunk()).toBeTruthy();
});
