'use strict';

define(function() {

    //toggle navbar for small devices
    var button = document.getElementById('btn-toggle-navbar');
    button.addEventListener('click', function() {
        var sidebar = document.getElementById('sidebar');
        sidebar.classList.toggle('shown');
    });
});