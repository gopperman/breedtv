/* Author: Greg Opperman*/

/*** breedTV singleton ***/
function breedTV() {
	this.queue = [];
	//Embeds a video in the DOM
	this.play = function(vid) {
		console.log(vid);
		jQuery('#player').remove();
		jQuery('#video').remove();
		jQuery('body').append( jQuery('<div id="video"></div>'));
		if (vid['src'] == 'youtube') {
			//var iframe = '<iframe id="player" type="text/html" src="http://www.youtube.com/embed/'+ vid['id'] + '?enablejsapi=1&rel=0&playerapiid=player1&iv_load_policy=3&autoplay=1&controls=0&wmode=opaque" width="100%" frameborder="0" webkitAllowFullScreen mozallowfullscreen allowFullScreen></iframe>';
			//jQuery('#video').html(iframe);
			player = new YT.Player('video', {
          width: '100%',
          videoId: vid['id'],
					playerVars: { 
						'autoplay': 1, 
						'controls': 0,
						'enablejsapi': 1,
						'rel': 0,
						'iv_load_policy': 3,
						'wmode': 'opaque'
					},
          events: {
            'onStateChange': onPlayerStateChange
      		}
			});
		} else {
			var iframe = '<iframe id="player" src="http://player.vimeo.com/video/'+vid['id']+'?api=1&autoplay=1" width="100%" frameborder="0" webkitAllowFullScreen mozallowfullscreen allowFullScreen></iframe>';
			jQuery('#video').html(iframe);
			f = jQuery('iframe');
    			url = f.attr('src').split('?')[0];
    			status = jQuery('.status');
		}

	};
	//Plays the next video or queues up random ones
	this.next = function() {
		if (this.queue.length > 0) {
			var vid = this.queue.shift();
			btv.play(vid);
		} else { 
				jQuery.getJSON('/api/random?n=20', function(data) {
					var i = data.length;
					while (i--) {
						btv.queue.push(data[i]);
					} 
				}).done(function() {
					var vid = btv.queue.shift();
					btv.play(vid);
			});
		}
	}
}

var btv = btv || new breedTV();

/*** End breedTV ***/
var f, url, status;

//Youtube Events
function onPlayerStateChange(newState) {
	if (newState['data'] == 0) {
		btv.next();
	}
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
					btv.next();
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


jQuery(document).ready(function () {
	//Loads youtube API asynchronously
	var tag = document.createElement('script');

  tag.src = "http://www.youtube.com/iframe_api";
  var firstScriptTag = document.getElementsByTagName('script')[0];
  firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);	
});

function onYouTubeIframeAPIReady() {
	btv.next();
}
