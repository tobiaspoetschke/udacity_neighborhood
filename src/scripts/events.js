'use strict';

/*  This was meant to be the module for all events, but this idea got in conflict with knockout and google-maps.
 *  It will probably be refactored into another component in the future.
 */
define(function() {

    //toggle navbar for small devices
    var button = document.getElementById('btn-toggle-navbar');
    button.addEventListener('click', function() {
        var sidebar = document.getElementById('sidebar');
        sidebar.classList.toggle('shown');
    });
});