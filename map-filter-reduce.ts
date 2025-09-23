import assert from 'node:assert';

const numbers = [1, 2, 3, 4, 5];

// Finding squares of the numbers
// Imperative style : giving how instructions directly to the machine.
// low level abstraction.
const result = [];
for (let num of numbers) {
  result.push(num * num); // transform operation is squaring the number
}

// array of numbers ====> array of numbers
assert.deepEqual(result, [1, 4, 9, 16, 25]);

// Converting strings in an array into uppercase
const strings = ['one', 'Two', 'three', 'four'];
const upperStrings = [];
for (let str of strings) {
  upperStrings.push(str.toUpperCase()); // transformation operation is converting to upper case
}

// transform numbers into strings.
// 1 -> one
/// 11 -> one one
// 12 -> one two
// 233 -> two three three
const stringReps = [];

// num into string form
const numToStr = (num: number) => {
  // Exercise : Type this correctly so that only numbers
  // from 0 to 9 can be there in this mapping.
  // have a union type
  // then have a custom type that represents the object, where
  // key must be one among the types present in your union type
  const mapping: Record<number, string> = {
    0: 'zero',
    1: 'one',
    2: 'two',
    3: 'three',
    4: 'four',
    5: 'five',
  };
  return mapping[num];
};

assert.equal(numToStr(0), 'zero');
assert.equal(numToStr(1), 'one');

for (let num of numbers) {
  stringReps.push(numToStr(num));
}

assert.deepEqual(stringReps, ['one', 'two', 'three', 'four', 'five']);

// Array of strings. ===> array of strings
assert.deepEqual(upperStrings, ['ONE', 'TWO', 'THREE', 'FOUR']);

// Get the full name from each of the student object
const students = [
  { first: 'John', last: 'AppleSeed' },
  { first: 'Ram', last: 'Rao' },
];

const fullNames = [];

for (let student of students) {
  fullNames.push(`${student.first} ${student.last}`); // transformation is concatenating first and last name
}
// Array of student object ===> array of strings
assert.deepEqual(fullNames, ['John AppleSeed', 'Ram Rao']);

// Arrays have a prototype Array.prototype  > Object.prototype

// have a result array
// loop through each item of the array
// apply a transform function on each item and get the result
// push result to the result array
// return the result array.
// length of input array must be equal to length of transformed array.
//
// original array never gets modified, it remains intact.

// such transformation is known as mapping.  A.map(transform) should produce transformed array B
// DRY principle needs to be followed by abstracting out the above logic into a reusable
// function.

Array.prototype.map = function (
  transform: (item: any, index: number, array: any[]) => any
) {
  console.log('our version of map');
  const result: any[] = [];
  for (let i = 0; i < this.length; i++) {
    result.push(transform(this[i], i, this));
  }
  return result;
};

interface Student {
  first: string;
  last: string;
}
console.log(
  // from how things are done => what is done
  // This is functional style and is preferred.
  students.map(
    (student: Student, index: number, array: Student[]) =>
      `${index + 1} of ${array.length}. ${student.first} ${student.last}`
  )
);
