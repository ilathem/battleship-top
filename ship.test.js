const { Ship } = require('./ship');

test('ship creation', () => {
  const testShip = {
    length: 2,
    hitCount: 0,
    sunk: false
  }
  const ship = new Ship(2);
  expect(testShip).toEqual(ship);
})