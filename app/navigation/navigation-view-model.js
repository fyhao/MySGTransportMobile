'use strict';
var menuItems,
    observable = require('data/observable'),
    navigationViewModel = new observable.Observable();

menuItems = [
    {
        "title": "Use Me",
        "moduleName": "components/browseView/browseView",
        "icon": "\ue903"
    }

];

navigationViewModel.set('menuItems', menuItems);
navigationViewModel.set('backButtonHidden', true);

module.exports = navigationViewModel;