import assert from 'assert';

// const assert = (predicate: boolean, message: string): void => {
//   // if the condition holds, dont do anything,
//   // else cry foul, or SHOUT with message passed and halt the execution!!
//   if (!predicate) {
//     // console.warn(message);
//     // throw new Error(message);
//   }
//   console.assert(predicate, message);
// };

function isPrime(number: number) {
  if (number < 0) {
    return false;
  }
  if (number === 0) {
    return false;
  } else if (number === 1) {
    return false;
  }

  // loop through 2 to number -1 and check if there is a divisor
  for (let i = 2; i <= Math.sqrt(number); i++) {
    if (number % i === 0) {
      return false;
    }
  }
  return true;
}

// 0 is not prime
assert(isPrime(0) === false, '0 is not a prime');
// 1 is not prime
assert(isPrime(1) === false, '1 is not a prime');
// 2 is a prime
assert(isPrime(2) === true, '2 is  a prime');

// 3 is a prime
assert(isPrime(3) === true, '3 is a prime');
// 4 is not a prime
assert(isPrime(4) === false, '4 is not a prime');
// 5 is a prime
assert(isPrime(5) === true, '5 is  a prime');

// 6 is not prime
assert(isPrime(6) === false, '6 is  not a prime');
// 7 is prime
assert(isPrime(7) === true, '7 is a prime');

assert(isPrime(29) === true, '29 is a prime');

assert(isPrime(1000) === false, '1000 is not a prime');

assert(isPrime(7877) === true, '7877 is a prime'); // input from user

assert(isPrime(-1) === false, '-1 is not prime'); // input from user
// call the function
// output the result

// for await (const chunk of Bun.stdin.stream()) {
//   // chunk is Uint8Array
//   // this converts it to text (assumes ASCII encoding)
//   console.log('Please enter the number:');
//   const numberText = Buffer.from(chunk).toString();
//   const number = Number(numberText);
//   const result = isPrime(number);
//   console.log(number, ':', result);
// }

// computing prime series numbers in a range
// 0 to 20, get me the list of primes.

function range(start: number, end: number): number[] {
  const rangeNums = [];
  for (let i = start; i <= end; i++) {
    rangeNums.push(i);
  }
  return rangeNums;
}

const getPrimesInRange = (start: number, end: number): number[] => {
  const result = [];
  for (let i = start; i <= end; i++) {
    if (isPrime(i)) {
      result.push(i);
    }
  }

  return result;
  // return range(start, end).filter((num) => isPrime(num));
};

assert.deepEqual(
  getPrimesInRange(0, 5),
  [2, 3, 5],
  'In range(0,5), we expect [2, 3, 5'
);
