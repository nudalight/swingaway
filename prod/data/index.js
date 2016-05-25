'use strict';

let p = './tpl/';
let ext = '.js';

module.exports = {
  home: {
      test: 111,
      iconGrid: require(p + 'icon-grid' + ext),
      iconList: require(p + 'icon-list' + ext),
      mainMenu: require(p + 'main-menu' + ext),
      socials: require(p + 'socials' + ext)
  }
};