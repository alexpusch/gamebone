import _ from 'lodash';

let typeMap = new Map();

function mixin(target, toMix) {
  let prototype = target.__proto__;

  if (typeMap.has(prototype)) {
    target.__proto__ = typeMap.get(prototype);
  } else {
    let newPrototype = cloneDescriptors(toMix);
    newPrototype.__proto__ = prototype;
    target.__proto__ = newPrototype;

    typeMap.set(prototype, newPrototype);
  }
}

function cloneDescriptors(source) {
  let keys = Object.getOwnPropertyNames(source);
  let clone = _.transform(keys, function(result, key) {
    let descriptor = Object.getOwnPropertyDescriptor(source, key);
    if (descriptor.value !== undefined)
      result[key] = descriptor.value;
    else
      Object.defineProperty(result, key, descriptor);
  });

  return clone;
}

export default mixin;
