import assert from 'node:assert';
// JS is a prototypal language
// You create one object that is an extension of another object
// classes are completely unnecessary to create objects. Classes are just
// a syntactic sugar ( will become clear soon)

// Object.prototype is at the root of the prototype chain.

// The most straightforward way to create an object is to use a literal syntax.

const empty = {};

// empty object has no key - vals of its own. But has a linkage to Object.prototype
// That means, it still has inherited key-vals from Object.prototype
assert.strictEqual(Object.getPrototypeOf(empty), Object.prototype);
Object.prototype.name = 'Test name';
Object.prototype.displayFoo = () => console.log('Displaying foo');
empty.toString(); // toString() is a method available on Object.prototype
empty.valueOf();

empty.displayFoo();

const list = [1, 2]; // Array.protype -> Object.protype
assert.equal(empty.name, 'Test name');
assert.equal(list.name, 'Test name');

const vehicle: Vehicle = {
  wheels: 4,
  fuelType: 'diesel',
  maker: 'maruthi',
}; // any type is a way to escape from TS strong typechecking
vehicle.wheels = 5; //name is a property introduced into the notEmpty object now.

// In javascript functions are first class. they are just like other objects/values
// they use pass by reference semantics
let someFuncAlias = function someFunc() {
  console.log('Some function is called');
};
someFuncAlias();

vehicle.toString = function () {
  const stringRep = `Vehicle info: ${this.maker}: ${this.fuelType}`;
  return stringRep;
};
// 'any' usage is not that great. We can help TypeScript by supplying a custom type
// we already know number, and string, and boolean.
// for a custom object like this, one we need to ideally come up with a type.
interface Vehicle {
  wheels: number;
  fuelType: 'diesel' | 'petrol'; // union type
  maker: 'hundai' | 'maruthi'; //string;
  toString: () => string;
}

const petrolCar = Object.create(vehicle) as Vehicle;
petrolCar.fuelType = 'petrol';
petrolCar.maker = 'hundai';

console.log(petrolCar.maker);

assert.strictEqual(Object.getPrototypeOf(petrolCar), vehicle);

console.log(petrolCar.toString());

// for (let key in petrolCar) {
//   // keys of self and inherited enumerable keys
//   console.log(`${key}: ${petrolCar[key]}`);
// }

// Exercise 1.
// add another property to vehicle, say vehicleType that says if the vehicle is
// commercial or private (hint: use union type). Also check if this property
// now automatically becomes available in petrolCar object.

// Special object called null is used to indicate explicitely that
// a reference value is missing.
// assert.equal(typeof null, 'object');
//assert.notEqual(Object.getPrototypeOf(null), Object.prototype); // null has no prototype

assert.equal(typeof undefined, 'undefined'); // value of any var before it is assigned a value
let x; // x is defined, thus its value is undefined by default
assert.equal(x, undefined);

// null is used to explicitly mark a variable as not having a value. in practice
// both undefined and null almost serve the same purpose. if a var has value null, that
// means some one has explicitly written to it.

// delete petrolCar.fuelType;

// function Shape(x: number, y: number) {
//   this.x = x;
//   this.y = y;
// }

// const aShape = new Shape(4, 5);

// console.log(aShape.x, aShape.y);

class Shape {
  x: number;
  y: number;

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }
}

const aShape = new Shape(4, 6);

console.log(aShape);
