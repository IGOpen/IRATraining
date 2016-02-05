import raf from './raf';

/**!
 * schedule a task to be run during the next animation frame.  This is similar to calling
 * `Ember.run.next`, more similar to `Ember.run.later(context, method, ...params, 1000 / 16)`,
 * but uses `requestAnimationFrame` if available.
 *
 * If used with the setTimeout shim, this is basically a non-order guaranteed "run.join"
 */
export default function scheduleIntoAnimationFrame(context, method) {
  let args = new Array(arguments.length);
  for(var i = 0; i < args.length; ++i) {
    //i is always valid index in the arguments object
    args[i] = arguments[i];
  }

  let restArgs = args.slice(2);

  // make requestAnimationFrame support contexts and params
  var frameCallback = function scheduledFrameTask(method, orgRestArgs/*, granularity*/) {
    //orgRestArgs.unshift(granularity);
    return method.apply(this, orgRestArgs);
  }.bind(context, method, restArgs);

  return raf(frameCallback);
}
