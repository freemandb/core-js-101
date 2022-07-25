function isBracketsBalanced(expr) {
  const stack = [];
  const openB = ['[', '(', '{', '<'];
  const closeB = [']', ')', '}', '>'];

  for (let i = 0; i < expr.length; i += 1) {
    if (openB.indexOf(expr[i]) > -1) {
      stack.push(expr[i]);
    } else if (closeB.indexOf(expr[i]) > -1) {
      if (stack.length > 0 && openB.indexOf(stack[stack.length - 1]) === closeB.indexOf(expr[i])) {
        stack.pop();
      } else {
        return false;
      }
    }
  }
  return stack.length === 0;
}

console.log(isBracketsBalanced('[]'));
