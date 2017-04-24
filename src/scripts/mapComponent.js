"use strict";

/*  This component is for handling everything related to the map.
 *  It is a singleton with public and private methods/attributes.
 *  The unusual pattern is the result of my studies/experiments in patterns and modularisation.
 *  The public interface gets returned at the end of the file.
 */
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
            marker.addListener('click', function() {
                showInfoWindow(marker);
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

    function getWikipediaData(queryString, marker) { // marker in signature to avoid showing old content in infoWindow for short time
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
            },
            complete: function() {
                infoWindow.open(map, marker);
            }
        });
    }

    function showInfoWindow(marker) {
        getWikipediaData(marker.title, marker);
        marker.setAnimation(google.maps.Animation.BOUNCE);
        window.setTimeout(function () {
            marker.setAnimation(null);
        }, 1420);
    }

    return (function(){ //makes a closure
        return {
            initialize: function () {
                createAndDisplayMap();
                infoWindow = new google.maps.InfoWindow();
                createMarkersOnMap();
                this.displayMarkers(markers);
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
            },
            showInfoWindow: showInfoWindow
        }
    })();
});