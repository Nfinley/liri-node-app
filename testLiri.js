// Require the http request module
var request = require('request');

// Require the spotify module
var spotify = require('spotify');

// Require the twitter module
var Twitter = require('twitter');

// Require the keys file
var keys = require('./keys.js');

var myKey = keys.twitterKeys;

var client = new Twitter({
  	consumer_key: 		 myKey.consumer_key,
  	consumer_secret: 	 myKey.consumer_secret,
  	access_token_key:    myKey.access_token_key,
  	access_token_secret: myKey.access_token_secret
});

// Capture the user input
var requestType = process.argv[2];
var userQuery   = process.argv[3];

// Establish queryUrl string
var queryUrl = "";

// Query the specified API based on user input
switch(requestType) {
	case 'my-tweets':
		tweetIt();
		break;
	case 'spotify-this-song':
		spotifyIt(userQuery);
		break;
	case 'movie-this':
		queryUrl = 'http://www.omdbapi.com/?t=' + userQuery +'&y=&plot=short&r=json';
		omdbIt(queryUrl);
		break;
} 

function tweetIt() {
var params = {screen_name: 'trooperandz'};
	client.get('statuses/user_timeline', params, function(error, tweets, response) {
	  	if (!error) {
	    	console.log(tweets);
	  	}
	});
}

function omdbIt(queryUrl) {
	// Get the ombapi response
	request(queryUrl, function(error, response, obj) {
		// If request is successful, log ...
		if(!error && response.statusCode == 200) {
			console.log("obj: " , JSON.parse(obj));
		} else {
			console.log("There was an error!");
		}
	});
}

// Get the spotify response
function spotifyIt(userQuery) {
	spotify.search({ type: 'track', query: userQuery }, function(err, data) {
	    if (err) {
	        console.log('Error occurred: ' + err);
	        return;
	    }
	    console.log("Data: " , data);
	});
}