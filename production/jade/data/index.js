'use strict';

let ext = '.js';

module.exports = {
    rootPath: '/root/',
    currencySymbol: '$',
    mainMenu: require('./main-menu' + ext),
    socials: require('./socials' + ext),
    productImages: [
        'https://c.o0bg.com/rf/image_960w/Boston/2011-2020/2015/05/06/BostonGlobe.com/Sports/Images/fd2490f5565a481998dde52d81d2ff72-fd2490f5565a481998dde52d81d2ff72-0.jpg',
        'http://cdn3.volusion.com/rscwy.wjxvq/v/vspfiles/photos/SA100SBG-2.jpg?1449670576',
        'http://image.cdnllnwnl.xosnetwork.com/pics32/800/WL/WLQWGXSVCDLEBLM.20120619185624.jpg',
        'http://sportsdaydfw.imgix.net/1463716815-hsbaseballrup_0520spo-9.jpg?q=50&auto=format&w=700',
        'http://static.seattletimes.com/wp-content/uploads/2015/08/f2bc68ded9f54ec9b896bdbeda18bed6-780x545.jpg',
        'http://i.turner.ncaa.com/sites/default/files/styles/640x360/public/media/hunt_no_hitter.jpg?itok=9grR4MvX'
    ],
    products: require('./products' + ext),
    banners: [
        {
            title: 'Hitting Systems',
            url: '#',
            image: 'https://baseballracks.net/images/d02b297d99/cache/images/d02b297d99/site/products/proportion/B243514+-+Batting+Tunnel+Net+-+Indoor_3_w378_h252/B243514+-+Batting+Tunnel+Net+-+Indoor_3_08151157.jpg'
        },
        {
            title: 'Pro Traveler',
            url: '#',
            image: 'https://baseballracks.net/images/d02b297d99/cache/images/d02b297d99/site/products/proportion/Pro%20Practice%20mound%203_w378_h252/Pro%20Practice%20mound%203_08250309.jpg'
        },
        {
            title: 'Combo Specials',
            url: '#',
            image: 'https://baseballracks.net/images/d02b297d99/cache/images/d02b297d99/site/products/proportion/Insider%20Bat%204_w378_h252/Insider%20Bat%204_08250309.jpg'
        },
        {
            title: 'Zone In',
            url: '#',
            image: 'http://www.wvtm13.com/image/view/-/21634836/medRes/1/-/h/252/maxh/252/maxw/378/w/378/-/fdswu/-/Baseball-Generic.jpg'
        },
        {
            title: 'New products',
            url: '#',
            image: 'https://angelsphotosmlb.files.wordpress.com/2013/08/aps_w_130819_0152.jpg?w=378&h=252&crop=1'
        },
        {
            title: 'Replacement Parts',
            url: '#',
            image: 'http://www.wdsu.com/image/view/-/4877390/medRes/6/-/h/252/maxh/92/maxw/138/w/378/-/14ngi79z/-/Passwords---17-jpg.jpg'
        }
    ],
    manuals: [
        {
            id: 1,
            title: 'Pro Traveler with Bottom boom',
            image: 'path-to-image.png',
            description: 'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident',
            link: 'path-to-manual.pdf'
        },
        {
            id: 2,
            title: 'Pro Traveler with Home Plate',
            image: 'path-to-image.png',
            description: 'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident',
            link: 'path-to-manual.pdf'
        },
        {
            id: 3,
            title: 'MVP, Pro and XXL',
            image: 'path-to-image.png',
            description: 'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident',
            link: 'path-to-manual.pdf'
        },
        {
            id: 4,
            title: 'Future manual',
            image: 'path-to-image.png',
            description: 'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident',
            link: 'path-to-manual.pdf'
        }
    ]

};

 