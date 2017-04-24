"use strict";

define(['knockout', 'mapComponent'], function (ko, mapComponent) {

    function appViewModel() {
        var self = this;
        this.searchQuery = ko.observable('');
        this.places = ko.computed(function () {
            mapComponent.removeMarkersFromMap();
            var tmpMarkers = filterMarkers();
            mapComponent.displayMarkers(tmpMarkers);
            return tmpMarkers;
        });
        this.showInfoWindow = function() {
            mapComponent.showInfoWindow(this); // this is a marker
        };

        function filterMarkers() {
            if(mapComponent.getMarkers().length !== 0) {
                return mapComponent.getMarkers().filter(function (item) {
                    return item.title.toLowerCase().indexOf(self.searchQuery().toLowerCase()) >= 0;
                });
            }
            return mapComponent.getMarkers();
        }
    }
    return appViewModel;
});