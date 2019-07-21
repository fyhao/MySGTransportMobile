'use strict';
var helpers = require('../utils/widgets/helper'),
    navigationViewModel = require('./navigation-view-model'),
	modBrowse = require('../lib/modBrowse/modBrowse.js');
	
function pageLoaded(args) {
    var page = args.object;

    helpers.platformInit(page);
    page.bindingContext = navigationViewModel;
    navigationViewModel.set('pageTitle', 'My SG Transport App');
}

function menuItemTap(args) {
    var url = 'https://raw.githubusercontent.com/fyhao/MySGTransportMobile/master/landing.json';
	modBrowse.browseURL(url);
}

exports.pageLoaded = pageLoaded;
exports.menuItemTap = menuItemTap;