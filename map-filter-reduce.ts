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

interface Array<T> {
  map1(transform: (item: any, index: number, array: any[]) => any): any[];
}

Array.prototype.map1 = function (
  transform: (item: any, index: number, array: any[]) => any
) {
  console.log('our version of map');
  const result: any[] = [];
  for (let i = 0; i < this.length; i++) {
    result.push(transform(this[i], i, this));
  }
  return result;
};

// 2. exercise. Implement a generic version of map
// function map(array: T[], transform) ==> resultant array U

interface Student {
  first: string;
  last: string;
}
console.log(
  // from how things are done => what is done
  // This is functional style and is preferred.
  students.map1(
    (student: Student, index: number, array: Student[]) =>
      `${index + 1} of ${array.length}. ${student.first} ${student.last}`
  )
);

console.log(
  // from how things are done => what is done
  // This is functional style and is preferred.
  students
    .map(
      (student: Student, index: number, array: Student[]) =>
        `${index + 1} of ${array.length}. ${student.first} ${student.last}`
    )
    .map((st: string) => st.length)
  // Declarative style. Here focus is on What is being done, than how it is done.
);

// Functors - any data structure that has a map method implmented, that can transform the data structure
// into same kind.   Array supports map, and performing map on top of an array, produces another array.

const someNums = [1, 4, 6, 3, 9, 11, 2, 23];
// filter certain items from an array.
// there will be a predicate to decide how do we filter
// predicate is a boolean expression that is operated on an item, and
// then if this returns true, item will be in result, otherwise it will be discarded
// in the result. Result will be an array.
// Type of original array  === type of result array
// length(original array) >=  length(result array)?

// We want only odd numbers
const filtered: number[] = [];
for (let i = 0; i < someNums.length; i++) {
  // predicate?
  const isOdd = (num: number, index: number, array: number[]) => num % 2 !== 0;

  if (isOdd(someNums[i], i, someNums)) {
    filtered.push(someNums[i]);
  }
}

assert.deepEqual(filtered, [1, 3, 9, 11, 23]);

Array.prototype.filter1 = function (predicate: (item: any) => boolean) {
  const filtered: any[] = [];
  for (let i = 0; i < someNums.length; i++) {
    if (predicate(someNums[i])) {
      filtered.push(someNums[i]);
    }
  }
  return filtered;
};

console.log(someNums.filter1((num: number) => num % 2 !== 0));
console.log(someNums.filter((num: number) => num % 2 !== 0));

// we want to get squares of all odd number in someNums
console.log(
  someNums
    .filter((num: number) => num % 2 !== 0)
    .map((n) => n * n)
    .filter((n) => n < 100)
);

// Finding sum of numbers
const initialValue = 0;
let accumulated = initialValue;

for (let i = 0; i < someNums.length; i++) {
  const current = someNums[i];
  const reducer = (accumulated: number, current: number) =>
    accumulated + current;
  accumulated = reducer(accumulated, current);
} // fold, or reduce will compute a single value by iterating through items of array

assert.equal(accumulated, 59);

const names = ['bangalore', 'mangalore', 'Chennai', 'hyderabad'];

// Get a string which looks like this: ::bangalore->mangalore->chennai>hyderabad
const initialVal = '';
let accumulatedStr = initialVal;

for (let i = 0; i < names.length; i++) {
  const current = names[i];
  const reducer = (
    accumulated: string,
    current: string,
    index: number,
    array: string[]
  ) => {
    return (
      accumulated +
      (index > 0 ? '->' : '') +
      current +
      (index === array.length - 1 ? '-]' : '')
    );
  };
  accumulatedStr = reducer(accumulatedStr, current, i, names);
} // fold, or reduce will compute a single value by iterating through items of array

assert.equal(accumulatedStr, 'bangalore->mangalore->Chennai->hyderabad-]');

type ReducerType = (
  accumulated: any,
  current: any,
  index: number,
  array: any[]
) => any;

Array.prototype.reduce1 = function (
  reducer: ReducerType,
  initialValue: any
): any {
  let accumulated = initialValue;

  for (let i = 0; i < this.length; i++) {
    accumulated = reducer(accumulated, this[i], i, this);
  }

  return accumulated;
};

const reducer = (
  accumulated: string,
  current: string,
  index: number,
  array: string[]
) => {
  return (
    accumulated +
    (index > 0 ? '->' : '') +
    current +
    (index === array.length - 1 ? '-]' : '')
  );
};

console.log(names.reduce1(reducer, ''));
console.log(names.reduce(reducer, ''));

// A custom map implementation
// ts is a strongly typed system
// we need to ensure algorithms to work on any type
// map, filter, reduce.
const map = <T, U>(array: T[], transform: (item: T) => U): U[] => {
  const result: U[] = [];
  for (let i = 0; i < array.length; i++) {
    result.push(transform(array[i]));
  }
  return result;
};

const nums_ = [1, 2, 3, 4, 5];

const sqaures_ = map(nums_, (item) => `${item} * ${item}`);

function mapNums(array: number[], transform: (item: number) => number) {
  const result: number[] = [];
  for (let i = 0; i < array.length; i++) {
    result.push(transform(array[i]));
  }
  return result;
}

const sqaures__ = mapNums(nums_, (item) => item * item);

// API response
interface User {
  name: string;
  id: number;
  email: string;
}

// There is an API that returns users in the system.
// data: User[]
interface UserResponse {
  data?: User[];
  error?: Error;
}

interface Student {
  name: string;
}

// There is an API that will return students
interface StudentResponse {
  data?: Student[];
  error?: Error;
}

interface APIResponse<T> {
  data?: T[];
  error?: Error;
}

type APIResponse_<T> = {
  data?: T[];
  error?: Error;
};

const studentResponse: APIResponse<Student> = {
  data: [{ last: 'last', first: 'f', name: 'n' }],
};
//if (studentResponse.data?.[0]) { // type narrowing
const firstStudent = studentResponse.data?.[0];
firstStudent?.first;
//}

type ResponseType = 'success' | 'error';

// Descriminated unions
type Response<T> =
  | { type: 'success'; data: T[] }
  | { type: 'error'; error: Error };

const studentResponse_: Response<Student> = {
  type: 'success',
  data: [{ last: 'last', first: 'f', name: 'n' }],
};

function displayResponse(response: Response<T>) {
  switch (response.type) {
    case 'success':
      console.log(response.data);
      break;
    case 'error':
      console.log(response.error);
      break;
  }
}
