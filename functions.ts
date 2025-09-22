import assert from 'node:assert';

let name = 'John';
let address = {
  street: 'x street',
  pin: 5393900,
};

const student = {
  name: name,
  address: address,
};

// when key and value are denoted using same name, we can omit, explit specifying value.
const studentConcise = { name, address };

// Shallow copy is created like so.
const postGradStudent = { ...student }; //, guide: "Prof X"}; //{name: student.name, address: student.address, guide:"Some guide"}

// assert.strictEqual(student, postGradStudent);
assert.strictEqual(student.address, postGradStudent.address);

const numbers = [1, 2, 3];
const numbers1 = [...numbers];

assert.notStrictEqual(numbers, numbers1);

interface FlightInfo {
  //conform
  name: string;
  from: string;
  to: string;
  num?: string; // optional
}

const flight: FlightInfo = {
  name: 'Indiego',
  from: 'mangalore',
  to: 'Bangalore',
  //  num: '178B',
};

const { name: flightName, num = '123' } = flight; // Destructure operation

assert.equal(flightName, 'Indiego');

function diaplyFlight({ from, name, to, num = '10' }: FlightInfo) {
  //const { name, from, to } = flight;
  console.log(name);
  console.log(from);
  console.log(to);
}

add(1, 2, 3, 4, 5, 6, 7, 5);

function add(first: number, ...rest: number[]) {
  // arguments
  // assert.equal(arguments[0], first);
  return rest.reduce((sum, current) => sum + current, 0) + first;
}

function add1([first, ...rest]: number[]) {
  return rest.reduce((sum, current) => sum + current, 0) + first;
}

add1([1, 2, 3, 4]);

const [, first, , second] = [1, 2, 3, 4, 5, 6];

assert.equal(first, 2);
assert.equal(second, 4);

// Function.prototype
// Function.prototype > Object.prototype

// Functions are first class
const myFunc = () => console.log('my function is called');

myFunc();

type FunctionZeroArg = () => void;
type FunctionTwoArg = (x: number, y: number) => void;
function callAfter(func: FunctionZeroArg) {
  setTimeout(func, 1000);
}

// Similarly a function can return another function

function getFunction(x?: number): (num: number, num2: number) => number {
  return (firstArg: number) => {
    console.log('Function returned!');
    return 0;
  };
}

const aFunc = getFunction();
aFunc(12, 10);

const greeter = (person: string) => {
  let secret = 'Secret!';
  return (message: string) => {
    console.log(`Hey ${person}: ${message}: ${secret}`);
    secret = message;
  };
};

const greetYuktha = greeter('Yuktha');
greetYuktha('Welcome to JS world!');

const greetMani = greeter('Mani');
greetMani('Welcome to JS world!');

const greetPrajeet = greeter('Prajeet');
greetPrajeet('Welcome to JS world!');

const greetShreesha = greeter('Shreesha');
greetShreesha('Welcome to JS world!');
greetShreesha('Also to typescript world!');

const greetAmrutha = greeter('Amrtha');
greetAmrutha('Welcome to JS world!');

// const greeter1 = (person: string, message: string) => {
//   const secret = 'Secret!';

//   console.log(`Hey ${person}: ${message}: ${secret}`);
// };

// greeter1('Shreesha', 'Welcome to JS world!');
// greeter1('Shreesha', 'Also to typescript world!');

// const greeShreesha1 = (message: string) => {
//   greeter1('Shreesha', message);
// };

// CreateCounter < will recieve the number to count from.
// will return another function that will receive the step to increment.
// whenever this inner function is called, it should display next value in the sequence.

function createCounter(start: number) {
  let countValue = start;
  return (step: number) => {
    countValue += step;
    setTimeout(() => console.log('I had started from:', start), 4000);
    return countValue;
  };
}

const doCount = createCounter(10);
assert.equal(doCount(10), 20);
assert.equal(doCount(2), 22);
assert.equal(doCount(-3), 19);
