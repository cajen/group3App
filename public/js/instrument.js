'use strict';

// Call this function when the page loads (the "ready" event)
$(document).ready(function() {
	initializePage();
})

/*
 * Function that is called when the document is ready.
 */
function initializePage() {
	// $("#testjs").click(function(e) {
	// 	// $('.jumbotron h1').text("Javascript is connected");
	// 	$("#testjs").text("Please wait...");
	// 	$("#testjs").addClass("active");
	// 	$(".jumbotron p").addClass("active");
	// });

    $("button").click(btnClick);
    //$('a').click(thumbClick);
	// $("a.thumbnail").click(projectClick);

	// Add any additional listeners here
	// example: $("#div-id").click(functionToCall);
}

function thumbClick(e) {
    window.location.href = '/instPage';
}

function btnClick(e) {
    
    var btnName = $(this).data('name');

    switch(btnName) {
        case 0:
            window.history.back();
            break;
        case 1: 
            window.location.href = '/home';
            break;
        case 2:
            window.location.href = '/recordings';
            break;
        case 3:
            window.location.href = '/profile';
            break;
        case 4:
            window.alert("Search doesn't work yet. Please enjoy the instruments available on this sceen.");
            break;
        case 20:
            window.location.href = "/help";
            break;
    }
}

function instInfo() {
    var x = document.getElementById("infoDisplay");
    if (x.style.display === "block") {
        x.style.display = "none";
    } else {
        x.style.display = "block";
    }
}

// function projectClick(e) { 
//     // prevent the page from reloading      
//     e.preventDefault();
//     // In an event handler, $(this) refers to      
//     // the object that triggered the event      
//     $(this).css("background-color", "#7fff00");
//     // var containingProject = $(this).closest(".project");
//     // containingProject.append("<div class='project-description'><p>Description of the project.</p></div>");

//     var containingProject = $(this).closest(".project");
//     var description = $(containingProject).find(".project-description");
//     if (description.length == 0) {
//        $(containingProject).append("<div class='project-description'><p>Description of the project.</p></div>");
//     } else {
//     	$(containingProject).fadeOut();
//        // description.html("<p>Stop clicking on me! You just did it at " + (new Date()) + "</p>");
//     }
// }