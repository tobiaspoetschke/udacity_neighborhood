'use strict';
//todo integrate with requirejs, not working now, because never loaded
$(document).ready(function() {
    $('[data-toggle=offcanvas]').click(function() {
        $('#sidebar').toggleClass('shown');
    });
});