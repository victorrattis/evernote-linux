'use strict'

module.exports = function AutoSave (callback, delay) {
  let timer = 0;

  this.save = function() {
    // Cancel the action of the timeout to this function that was not executed.
    clearTimeout(timer);

    // Start the new timeout action to call the callack function in (delay) miliseconds.
    timer = setTimeout(function() {
        callback();
    }, delay);
  };

  // Call the callback function, It is an action to add the callback function to event list.
  this.next = function () {
    clearTimeout(timer);
    timer = setTimeout(function() {
        callback();
    }, 0);
  };
};
