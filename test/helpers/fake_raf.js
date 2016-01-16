function createFakeRaf() {
  let callbacks = [];

  let fakeRaf = function(callback) {
    callbacks.push(callback);
  };

  fakeRaf.invoke = function() {
    callbacks.forEach((callback) => {
      callback();
    });
  };

  return fakeRaf;
}

let _requestAnimationFrame = requestAnimationFrame;

export function useFakeRaf() {
  window.requestAnimationFrame = createFakeRaf();
}

export function restore() {
  window.requestAnimationFrame = _requestAnimationFrame;
}

