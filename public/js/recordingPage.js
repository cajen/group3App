'use strict';

// Call this function when the page loads (the "ready" event)
$(document).ready(function () {
    initializePage();
});

/*
 * Function that is called when the document is ready.
 */
function initializePage() {

    $("button").click(btnClick);
};

function btnClick(e) {
    var btnName = $(this).data('name');

    switch (btnName) {
        case 0:
            window.history.back();
            break;
        case 1:
            window.location.href = '/';
            break;
        case 2:
            window.location.href = '/recordings';
            break;
        case 3:
            window.location.href = '/profile';
            break;
        case 4:
            $("#startButton").hide();
            $("#stopButton").show();
            break;
        case 5:
            $("#stopButton").hide();
            $("#startButton").show();
            break;
    };
};
