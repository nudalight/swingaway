'use strict';

let p = './tpl/';
let ext = '.js';

let tplData = {

};

module.exports = {
    home: {
        foo: '24234234',
        bar: 666,
        iconGrid: require(p + 'icon-grid' + ext),
        iconList: require(p + 'icon-list' + ext)


    },
    mainMenu: require(p + 'main-menu' + ext),
    socials: require(p + 'socials' + ext),

};



