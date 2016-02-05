/* global module*/
module.exports = {

  description: 'Installs the animation-frame polyfill for IE9',

  normalizeEntityName: function() {},

  afterInstall: function() {
    return this.addBowerPackagesToProject([
      { name: 'animation-frame', target: '~0.2.4' }
    ]);
  }
};
