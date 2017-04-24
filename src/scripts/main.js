"use strict";

require.config({
    baseUrl: "scripts",
    paths: {
        "knockout": [
            "https://cdnjs.cloudflare.com/ajax/libs/knockout/3.4.2/knockout-min",
            "../libs/knockout/dist/knockout"
        ],
        "gmaps": [
            "https://maps.googleapis.com/maps/api/js?v=3&key=AIzaSyBpdJY2tYrSbm60O2bZULYlS1IRnHxAgZ4"
            //getting the fallback working was to difficult/time-consuming, therefore it will be handled by requirejs.onError
        ],
        "jquery": [
            "https://cdnjs.cloudflare.com/ajax/libs/jquery/3.2.1/jquery.min"
        ]
    }
});

/*
 *  error-handling in the requirejs-context
 */
requirejs.onError = function(error) {

    //this should only happen, when the google-maps-api is unavailable
    if(error.requireType === 'scripterror') {
        window.alert("Sorry, but the google maps api is unavailable.");
    } else if(error) {
        window.alert("Sorry, something went wrong:\n" + error);
    }
};

//main-entry-point for the app
require(["mapComponent", "appViewModel", "knockout", "events"], function(mapComponent, appViewModel, ko, events){
    mapComponent.initialize();
    ko.applyBindings(new appViewModel());
});