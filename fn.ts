const Box = <T>(x: T) => ({
  map: <U>(f: (s: T) => U) => Box(f(x)),
  value: () => x,
  tap: (f: (s: T) => void) => {
    f(x);
    return Box(x);
  },
});

// The problem is to find the next character of the given char code as a string
// '   65 ' => '65' => 'A' => 'B'
// trim > convert to a number > increment the number > create character from number
// imperative approach

function nextCharOf(numString: string) {
  const trimmed = numString.trim();
  const num = Number(trimmed);
  const nextNum = num + 1;
  const nextChar = String.fromCharCode(nextNum);
  return nextChar;
}

function nextCharOfFn(numString: string) {
  return Box(numString)
    .map((str) => str.trim())
    .tap((str) => console.log('The trimmed string:', str))
    .map((s) => Number(s as string))
    .map((num) => num + 1)
    .map((num) => String.fromCharCode(num))
    .value();
}

console.log(nextCharOfFn('  65 '));

const halfOfFirstLargeNum = (xs) => {
  const largeNums = xs.filter((x) => x > 20);
  const firstNum = largeNums[0] ?? 0;
  const half = firstNum / 2;
  return 'The answer is ${half}';
};

const halfOfFirstLargeNumDecl = (xs: number[]) => {
  Box(xs)
    .map((xs) => xs.filter((x) => x > 20))
    .map((nums) => nums[0] ?? 0)
    .map((n) => n / 2)
    .map((h) => 'The answer is ${half}')
    .value();
};
