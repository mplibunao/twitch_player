$(document).ready(function(){

	//hide sidenav items initially
	var isClose = true;

	$('.show-nav-button').on('click', function(){
		if (isClose === true){
			$('.sidenav').animate({width: '+=250px'}, 'fast');
			$('.main-container').animate({marginLeft: '+=250px'}, 'slow');
			//show list of streamers
			$('.streamer-row').show(200);
			$('.streamer-row').contents().show(600);
			isClose = false;
		} else if (isClose === false){
			$('.sidenav').animate({width: '-=250px'}, 'fast');
			$('.main-container').animate({marginLeft: '-=250px'}, 'slow');
			$('.streamer-row').hide(200);
			$('.streamer-row').contents().hide(600);
			isClose = true;
		}
	});

	//load Twitch javascript sdk to perform authentication /login your users for additional permissions
	//Twitch.init({clientId: 'i0bm039u6j4dr1ifl1t3v2s16srrhq'}, function(error,status){
		//the sdk is now loaded
	//	console.log('Twitch javacript sdk now loaded');
	//});

	var myChannels = ["WagamamaTV", "ODPixel", "Starladder1", "ESL_SC2", "dotastarladder_en", "EternaLEnVyy", "BeyondtheSummit_ES", "Freecodecamp", "OgamingSC2", "cretetion"];
	var game = ["Dota 2"];
	
	getDefaultChannels(myChannels);

	//console.log(myChannels[1]);
	//getChannelInfo(myChannels[1]);
	//fetchChannelList(myChannels[1]);

	//add event handlder for the viewMoreDetails button in the sidenav
	$('.sidenav-item-container').on('click', '.streamer-more-info', function(){
		//if hidden then unhide
		if ($(this).closest('.streamer-row').next('.streamer-details').css("display") == "none"){
			//go up the parent (streamer-row) => next sibling (streamer-details) => select all children and itself 
			$(this).closest('.streamer-row').next('.streamer-details').contents().addBack().show(400);
			//switch to up
			$(this).children().removeClass('fa-chevron-down').addClass('fa-chevron-up');
			//else if display is block then hide
		} else if ($(this).closest('.streamer-row').next('.streamer-details').css("display") == "block"){
			$(this).closest('.streamer-row').next('.streamer-details').contents().addBack().hide(400);
			//switch to up
			$(this).children().removeClass('fa-chevron-up').addClass('fa-chevron-down');
		}
	});





})//close document ready

/*
   Get information about the channel using ajax call
 @ channel is name of the channel
 @ callbackFunction is a function passed to the function
   to be called on success 
*/
var getChannelInfo = function(channels, callbackFunction){
	var url = "https://api.twitch.tv/kraken/streams/"+channels;
	$.ajax({
		url: url,
		type: "GET",
		dataType: "json",
		headers: {
			'Client-ID': 'i0bm039u6j4dr1ifl1t3v2s16srrhq'
		},
		success: function(json){
			//console.log(json);
			callbackFunction(json);
		},
		error: function(jqXHR, exception){
			console.log("jqXHR: "+jqXHR +"; exception: "+exception);
		}
	});
}

var getDefaultChannels = function(channelArray){
	var logo;
	var displayName;
	var url;
	var status;
	var game;
	var language;
	var viewers;

	channelArray.forEach(function(channel){
		//call function on success
		getChannelInfo(channel, function(json){
			console.log(json);
			if (json.stream !== null){
				logo = json.stream.channel.logo;
				displayName = json.stream.channel.display_name;
				url = json.stream.channel.url;
				status = json.stream.channel.status;
				game = json.stream.channel.game;
				language = json.stream.channel.broadcaster_language;
				viewers = json.stream.viewers;
				setStreamerNav(logo, displayName, url, status, game, language, viewers);
			} else{
				//offline
			}

		});
	});
}
	

var setStreamerNav = function(logo, displayName, url, status, game, language, viewers){
	//store the markup in a jquery so you can use jquery like hide
	var htmlJquery;
	var detailsJquery;

	var html = '<div class="row streamer-row">';
	html+= '<img class="streamer-logo" src="'+ logo +'" alt="' + displayName + '"/>';
	html+= '<a class="sidenav-items" href="' + url + '">' + displayName + '</a>';
	html+= '<a href="#" class="streamer-more-info"><i class="fa fa-chevron-down" aria-hidden="true"></i></a>';
	html+= '</div>';

	var details = '<div class="row streamer-details">';
	details+= '<p class="details-status">' + status + '</p>';
	details+= '<p class="details-game">Game : ' + game + '</p>';
	details+= '<p class="details-language">' + language + '</p>';
	details+= '<p class="details-viewers">' + viewers + ' people currently watching!</p>';
	details+= '<a href="' + url + '"><button class="btn btn-block">Watch</button></a>';
	details+= '</div>';

	htmlJquery = $(html).hide();
	detailsJquery = $(details).hide();
	//append in sidenav container
	$('.sidenav-item-container').append(htmlJquery);
	$('.sidenav-item-container').append(detailsJquery);
	//show only htmlJquery
	//htmlJquery.show();

}




var fetchChannelList = function(channels){
	var url = "https://api.twitch.tv/kraken/streams/";
	$.ajax({
		url: url,
		type: "GET",
		dataType: "json",
		data: {
			"channel": channels,
			"stream_type": "all"
		},
		headers: {
			'Client-ID': 'i0bm039u6j4dr1ifl1t3v2s16srrhq'
		},
		success: function(json){
			console.log("hi");
			console.log(json);
		},
		error: function(jqXHR, exception){
			console.log("jqXHR: "+jqXHR +"; exception: "+exception);
		}
	});
}