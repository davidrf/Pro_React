const throttle = (func, wait) => {
  let previousArgs,
      result,
      previous = 0;

  return function() {
    let now, remaining, argsChanged;
    if (wait) {
      now = Date.now();
      remaining = wait - (now - previous);
    }
    argsChanged = JSON.stringify(arguments) != JSON.stringify(previousArgs);
    previousArgs = Object.assign({}, arguments);
    if (argsChanged || (wait && (remaining <= 0 || remaining > wait))) {
      if (wait) {
        previous = now;
      }
      result = func.apply(this, arguments);
    }
    return result;
  };
};

export { throttle };
