export default {
  bind(obj, type, fn) {
    if (obj.attachEvent) {
      obj['e' + type + fn] = fn;
      obj[type + fn] = function() {
        return obj['e' + type + fn](window.event);
      };
      return obj.attachEvent('on' + type, obj[type + fn]);
    } else {
      return obj.addEventListener(type, fn, false);
    }
  },

  unbind(obj, type, fn) {
    if (obj.detachEvent) {
      obj.detachEvent('on' + type, obj[type + fn]);
      return obj[type + fn] = null;
    } else {
      return obj.removeEventListener(type, fn, false);
    }
  }
}