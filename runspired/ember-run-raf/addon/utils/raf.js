import globalScope from './global-scope';
import nativeSetTimeout from './set-timeout';

let addToFrame = globalScope.requestAnimationFrame;
if (!addToFrame) {
  addToFrame = function(method) {
    return nativeSetTimeout(() => {
      method(new Date().getTime());
    }, 0);
  };
}

export default addToFrame;
