"use strict";

define(['gmaps', 'jquery'], function (gmaps, $) {

    var map = {},
        markers = [],
        infoWindow = {},
        placesData = [
            {title: 'Völkerschlachtdenkmal', location: {lat: 51.312367, lng: 12.413267}},
            {title: 'Universitätsbibliothek Leipzig(Albertina)', location: {lat: 51.332507, lng: 12.368144}},
            {title: 'Universität Leipzig', location: {lat: 51.339774, lng: 12.378320}},
            {title: 'Zoo Leipzig', location: {lat: 51.351319, lng: 12.368010}},
            {title: 'Red Bull Arena', location: {lat: 51.345951, lng: 12.348522}}
        ];

    function createAndDisplayMap() {
        map = new google.maps.Map(document.getElementById('map'), {
            center: {lat: 51.343479, lng: 12.387772},
            zoom: 12
        });
    }

    function createMarkersOnMap() {
        placesData.forEach(function(place) {
            var marker = new google.maps.Marker({
                position: place.location,
                title: place.title
            });
            markers.push(marker);
            marker.addListener('click', function () {
                getWikipediaData(marker.title);
                marker.setAnimation(google.maps.Animation.BOUNCE);
                infoWindow.open(map, marker);
                window.setTimeout(function() {
                    marker.setAnimation(null);
                }, 1420);
            });
        });
    }

    function createMarkerContentString(title, wikipediaData) {
        var contentString = '<h3>' +  title + '</h3>';
        if(wikipediaData) {
            contentString += wikipediaData.query.search[0].snippet;
            contentString += ' ...'
        } else {
            contentString += 'Sorry, but the wikipedia-data could not be loaded';
        }
        return contentString;
    }

    function getWikipediaData(queryString) {
        $.ajax( {
            url: 'https://de.wikipedia.org/w/api.php?',
            data: {
                action: 'query',
                list: 'search',
                srsearch: queryString,
                format: 'json' },
            dataType: 'jsonp',
            success: function(data) {
                infoWindow.setContent(createMarkerContentString(queryString, data));
            },
            error: function() {
                infoWindow.setContent(createMarkerContentString(queryString));
            }
        });
    }

    return (function(){ //makes a closure
        return {
            initialize: function () {
                createAndDisplayMap();
                createMarkersOnMap();
                this.displayMarkers(markers);
                infoWindow = new google.maps.InfoWindow();
            },
            getMarkers: function() {
                return markers;
            },
            removeMarkersFromMap: function() {
                markers.forEach(function(marker) {
                    marker.setMap(null);
                });
            },
            displayMarkers: function(filteredMarkers) {
                filteredMarkers.forEach(function(marker) {
                    marker.setMap(map);
                });
            }
        }
    })();
});