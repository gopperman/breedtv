/* Author: Greg Opperman

*/
var f, url, status;
google.load("swfobject", "2.1");

//Youtube Events
function onPlayerStateChange(newState) {
	console.log(newState);
	if (newState == 0) {
		loadVideo(jQuery);
		console.log("done");
	}
}

function onYouTubePlayerReady(playerId) {
        ytplayer = document.getElementById("player");
        ytplayer.addEventListener("onStateChange", "onPlayerStateChange");
}

//Vimeo Events
// Listen for messages from the player
if (window.addEventListener){
    window.addEventListener('message', onMessageReceived, false);
}
else {
    window.attachEvent('onmessage', onMessageReceived, false);
}

// Handle messages received from the player
function onMessageReceived(e) {
    var data = JSON.parse(e.data);
    
    switch (data.event) {
        case 'ready':
	    post('addEventListener', 'pause');
    	    post('addEventListener', 'finish');
            break;
                       
        case 'pause':
            break;
           
        case 'finish':
		loadVideo(jQuery);
            break;
    }
}

// Helper function for sending a message to the player
function post(action, value) {
    var data = { method: action };
    
    if (value) {
        data.value = value;
    }
    
    f[0].contentWindow.postMessage(JSON.stringify(data), url);
}


function loadVideo(jQuery) {
	var vid = [];
	jQuery.getJSON('/random', function(data) {
		console.log(data);
		vid['id'] = data.id;
		vid['src'] = data.src;
		vid['title'] = data.title;
//	vid['id'] = '5003279';
//	vid['src'] = 'vimeo';
//	vid['title'] = 'Nerds Are The Biggest Danger In America';
	}).done(function() {
		console.log(vid);
		$('#player').remove();
		$('#video').remove();
		$('body').append( $('<div id="video"></div>'));
		if (vid['src'] == 'youtube') {
        		var params = { allowScriptAccess: "always", wmode:"opaque" };
		        var atts = { id: "player" };			
		        swfobject.embedSWF("http://www.youtube.com/v/" + vid['id'] + 
                           "?version=3&enablejsapi=1&playerapiid=player1&iv_load_policy=3&autoplay=1&controls=0&wmode=opaque", 
                           "video", "100%", "100%", "9", null, null, params, atts);
		} else {
			var iframe = '<iframe id="player" src="http://player.vimeo.com/video/'+vid['id']+'?api=1&autoplay=1" width="100%" frameborder="0" webkitAllowFullScreen mozallowfullscreen allowFullScreen></iframe>';
			$('#video').html(iframe);
			f = $('iframe');
    			url = f.attr('src').split('?')[0];
    			status = $('.status');
		}
	});
}
jQuery(document).ready(loadVideo);

