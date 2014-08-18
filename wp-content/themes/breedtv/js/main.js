/* Author: Greg Opperman */
String.prototype.decodeHTML = function() {
    var map = {"gt":">" /* , … */};
    return this.replace(/&(#(?:x[0-9a-f]+|\d+)|[a-z]+);?/gi, function($0, $1) {
        if ($1[0] === "#") {
            return String.fromCharCode($1[1].toLowerCase() === "x" ? parseInt($1.substr(2), 16)  : parseInt($1.substr(1), 10));
        } else {
            return map.hasOwnProperty($1) ? map[$1] : $0;
        }
    });
};

var f, vimurl, status;
var title = $('#title'), link = $('.permalink'), fbshare = $('.fbshare'), tweet = $('.tweet'), tags = $('#tags'); 

/*** breedTV singleton ***/
function breedTV() {
	this.queue = [];
	this.tag = "";
	this.cat = "";

	//Check for single, tag, category
	var reqURI = document.URL;
	reqURI = reqURI.replace('http://breedtv.com/', '');
	if ((reqURI.indexOf('channel/') < 0) && (reqURI.indexOf('tag/') < 0) && reqURI.length > 1) {
		reqURI = reqURI.replace('/', '');
		jQuery.getJSON('/api/single?slug='+reqURI, function(data) {
			var i = data.length;
			while (i--) {
				btv.queue.push(data[i]);
			}
    }).done(function() {
   	});

	} else {
		if (reqURI.indexOf('tag/') > -1) {
			reqURI = reqURI.replace('tag/', '');
			reqURI = reqURI.replace('/', '');
			this.tag = reqURI;
		} else {
			if (reqURI.indexOf('channel/') > -1) {
				reqURI = reqURI.replace('channel/', '');
				reqURI = reqURI.replace('/', '');
				this.cat = reqURI;
			}
		}
	}
	//Embeds a video in the DOM
	this.play = function(vid) {
		console.log(vid);
		jQuery('#player').remove();
		jQuery('#video').remove();
		jQuery('main').append( jQuery('<div id="video"></div>'));
		if (vid['src'] == 'youtube') {
			player = new YT.Player('video', {
          width: '100%',
          videoId: vid['id'],
					playerVars: { 
						'autoplay': 1, 
						'controls': 0,
						'showinfo': 0,
						'enablejsapi': 1,
						'rel': 0,
						'iv_load_policy': 3,
						'wmode': 'opaque',
						'origin': 'http://breedtv.com'
					},
          events: {
            'onStateChange': onPlayerStateChange
      		}
			});
		} else {
			var iframe = '<iframe class="vimeo" id="player" src="http://player.vimeo.com/video/'+vid['id']+'?api=1&autoplay=1" width="100%" frameborder="0" webkitAllowFullScreen mozallowfullscreen allowFullScreen></iframe>';
			jQuery('#video').html(iframe);
			f = jQuery('.vimeo');
    			vimurl = f.attr('src').split('?')[0];
    			status = jQuery('.status');
		}
		//Update sidebar and history
		var permalink = "http://breedtv.com/" + vid['slug'];
		if (window.history.state != "true" && btv.tag.length == 0 && btv.cat.length == 0) {
			history.pushState({url: permalink, visited: "true"}, vid['title'], '/' + vid['slug']);
		}
		title.html('<a class="permalink">' + vid['title'] + "</a>");
		document.title = vid['title'].decodeHTML() + " | BreedTV";
		link.attr('href', permalink);
		fbshare.attr('href', "https://www.facebook.com/sharer/sharer.php?u=" + encodeURIComponent(permalink));
		tweet.attr('href', "http://twitter.com/intent/tweet?via=breedtv&url=" + encodeURIComponent(permalink) + "&text=" + encodeURI(vid['title']));

		tags.html('');
		vid['tags'].forEach(function(tag) {
			var markup = '<a class="tag" href="/tag/' + tag['slug'] + '">' + tag['name'] + '</a>';
			tags.append(markup);
		});
	};
	//Plays the next video or queues up random ones
	this.next = function() {
		if (this.queue.length > 0) {
			var vid = this.queue.shift();
			btv.play(vid);
		} else { 
				var getURI = '/api/random?n=20';
				if (btv.tag.length > 0) {
					getURI += '&tag='+btv.tag;
				}
				if (btv.cat.length > 0) {
					getURI += '&cat='+btv.cat;
				}
				jQuery.getJSON(getURI, function(data) {
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
    
    f[0].contentWindow.postMessage(JSON.stringify(data), vimurl);
}


jQuery(document).ready(function () {
	//Loads youtube API asynchronously
	var tag = document.createElement('script');

  tag.src = "http://www.youtube.com/iframe_api";
  var firstScriptTag = document.getElementsByTagName('script')[0];
  firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);	

	$('#close-sidebar').click(function() {
		$('header').fadeOut(0);
		$('main').css('left', '0');
	});
	$('#open-sidebar').click(function() {
		$('header').fadeIn(0);
		$('main').css('left', '200px');
	});
	$(window).bind("popstate", function(e) {
    var state = e.originalEvent.state;
    if(state.url) {
			window.location.href = state.url;
    }
	});
	//Shortcut Key
	$( "body" ).keypress(function( event ) {
  	if (event.charCode == 107) {
    	 btv.next();
    }
  });
});

function onYouTubeIframeAPIReady() {
	btv.next();
}
