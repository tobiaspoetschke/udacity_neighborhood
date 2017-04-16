requirejs.config({
    baseUrl: 'scripts',
    paths: {
        'jquery': 'https://cdnjs.cloudflare.com/ajax/libs/jquery/3.2.1/jquery.min.js',
        'knockout': 'https://cdnjs.cloudflare.com/ajax/libs/knockout/3.4.2/knockout-min.js',
        'maps': 'https://maps.googleapis.com/maps/api/js?v=3&key=AIzaSyBpdJY2tYrSbm60O2bZULYlS1IRnHxAgZ4&callback=initMap'
    }
});
define("main", function(){});

