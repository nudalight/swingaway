'use strict';

let ext = '.js';

module.exports = {
    rootPath: '/root/',
    currencySymbol: '$',
    dealers: require('./dealers' + ext),
    banners: require('./banners' + ext),
    manuals: require('./manuals' + ext),
    menu: require('./menu' + ext),
    products: require('./products' + ext),
    reviews: require('./reviews' + ext),
    socials: require('./socials' + ext),
    plh: require('./plh' + ext)
};

