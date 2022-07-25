function memoize(func) {
  const res = func();

  return () => res;
}

const m = memoize(() => Math.random());

console.log(m());
console.log(m());
