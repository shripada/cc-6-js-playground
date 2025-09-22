"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var node_assert_1 = require("node:assert");
// JS is a prototypal language
// You create one object that is an extension of another object
// classes are completely unnecessary to create objects. Classes are just
// a syntactic sugar ( will become clear soon)
// Object.prototype is at the root of the prototype chain.
// The most straightforward way to create an object is to use a literal syntax.
var empty = {};
// empty object has no key - vals of its own. But has a linkage to Object.prototype
// That means, it still has inherited key-vals from Object.prototype
node_assert_1.default.strictEqual(Object.getPrototypeOf(empty), Object.prototype);
Object.prototype.name = 'Test name';
Object.prototype.displayFoo = function () { return console.log('Displaying foo'); };
empty.toString(); // toString() is a method available on Object.prototype
empty.valueOf();
empty.displayFoo();
var list = [1, 2]; // Array.protype -> Object.protype
node_assert_1.default.equal(empty.name, 'Test name');
node_assert_1.default.equal(list.name, 'Test name');
var vehicle = {}; // any type is a way to escape from TS strong typechecking
vehicle.wheels = 4; //name is a property introduced into the notEmpty object now.
var petrolCar = Object.create(vehicle);
petrolCar.fuelType = 'petrol';
console.table(petrolCar.toString());
for (var key in petrolCar) {
    // keys of self and inherited enumerable keys
    console.log("".concat(key, ": ").concat(petrolCar[key]));
}
// Exercise 1.
// add aother property to vehicle, say vehicleType that says if the vehicle is
// commercial or private (hint: use union type). Also check if this property
// now automatically becomes available in petrolCar object.
// Special object called null is used to indicate explicitely that
// a reference value is missing.
node_assert_1.default.equal(typeof null, 'object');
//assert.notEqual(Object.getPrototypeOf(null), Object.prototype); // null has no prototype
node_assert_1.default.equal(typeof undefined, 'undefined'); // value of any var before it is assigned a value
var x; // x is defined, thus its value is undefined by default
node_assert_1.default.equal(x, undefined);
// null is used to explicitly mark a variable as not having a value. in practice
// both undefined and null almost serve the same purpose. if a var has value null, that
// means some one has explicitly written to it.
delete petrolCar.fuelType;
