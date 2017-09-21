//by Alec Bielanos, please don't steal my things
 
'use strict';

//IIFE Begins here - Globals need not apply!
(function(){

	//init event listeners
	function init() {
		document.querySelector("#send").onclick = sendAjax;
	}
  
	//sends request
	function sendAjax(e) {
		
		//get data from the forms
		var pageObj = document.querySelector('#page');
		var typeObj = document.querySelector('#type');
		var page = pageObj.options[pageObj.selectedIndex].value;
		var type = typeObj.options[typeObj.selectedIndex].value;

		//set up ajax request
		var query = "bName=" + encodeURIComponent(artist) + "&sName=" + encodeURIComponent(song);
		var url = action + "?" + query;

		//open a GET request and prevent default
		$.ajax({
		headers: {
			Accept: type + "; charset=utf-8",
			"Content-Type": type + "; charset=utf-8;"
		},
		type: "GET",
		data: null,
		url: url,
		success: function(xhr) { printMessage('Success', $(xhr).find('message')); },
		error: function(xhr, options, err){ printMessage(err, xhr.responseText); }
	});

	e.preventDefault();
	return false;
	}
	
	//print some data to the HTML
	//accepts: textual portion of Status Code & Verbose Message Returned
	function printMessage(code, msg){
		console.log(code);
		console.log(msg);
		
		var title = document.createElement('h1');
		title.textContent = code;
		var message = document.createElement('p');
		message.textContent = msg;
		
		//clear and push new stuff to content section
		document.querySelector('#content').innerHTML = "";
		document.querySelector('#content').appendChild(title).appendChild(message);	
	}
  
	//calls init once the window has loaded
	window.addEventListener("load",init);
	
	//end of IIFE
  })();
  