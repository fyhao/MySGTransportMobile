'use strict';
var isInit = true,
    helpers = require('../../utils/widgets/helper'),
    navigationProperty = require('../../utils/widgets/navigation-property'),
    // additional requires
    viewModel = require('./browseView-view-model'),
    modBrowse = require('../../lib/modBrowse/modBrowse.js'),
    modBrowser = require('../../lib/modBrowser/modBrowser.js'),
	scanner = require('../../utils/nativeBarcodeScanner.js')
	;

// additional functions
function pageLoaded(args) {
    var page = args.object;

    helpers.platformInit(page);
    page.bindingContext = viewModel;
    // additional pageLoaded

    if (isInit) {
        isInit = false;

        // additional pageInit
    }
}

// START_CUSTOM_CODE_homeView
// Add custom code here. For more information about custom code, see http://docs.telerik.com/platform/screenbuilder/troubleshooting/how-to-keep-custom-code-changes
var url = 'https://raw.githubusercontent.com/fyhao/MySGTransportMobile/master/landing.json';
modBrowse.browseURL(url);
// END_CUSTOM_CODE_homeView
exports.pageLoaded = pageLoaded;