// Liri node comand app that pulls in data from twitter, spotify and omdb movie database. Author: Nigel Finley. UT BOOTCAMP.

// ASK: About the rotten tomatoes scores

// Pulls the key information from keys.js
var keys = require('./keys.js');

var myTwitterKeys = keys.twitterKeys;

// console.log(myTwitterKeys);
// console.log("--------------------------");
// console.log(keys.twitterKeys);
// console.log("--------------------------");
// console.log(keys.twitterKeys.consumer_key);

var action = process.argv[2];
var userInput = process.argv[3];
var request = require('request');
var spotify = require('spotify');
var Twitter = require('twitter');
var inquirer = require('inquirer');
var spotifyData;
var tweets; 

var client = new Twitter({
    consumer_key: myTwitterKeys.consumer_key,
    consumer_secret: myTwitterKeys.consumer_secret,
    access_token_key: myTwitterKeys.access_token_key,
    access_token_secret: myTwitterKeys.access_token_secret
});

// console.log("Twitter Test: " , client.options.consumer_key);
// console.log("Twitter Test: " , client);

// swtich statement to handle the user action and input
switch (action) {
    // This will show your last 20 tweets and when they were created at in your terminal/bash window.
    case "my-tweets":
        getTweets();
        break;

        // For Spotify this will show Artist, song name, preview of link from spotify, and the album in the terminal/bash window
    case "spotify-this-song":
        getSong(userInput);
        break;

        // This will output  information about the user inputted movie in the terminal/bash window:
    case "movie-this":
        getMovie(userInput);
        break;

    case "do-what-it-says":
        break;
    default:
        console.log("Please enter a valid search request!");
}



// // ======== Twitter Function to Get Tweets =========

function getTweets() {

    var params = { screen_name: 'MoodMedia_Nigel', count: 10 };
    client.get('statuses/user_timeline', params, function(error, tweets, response) {
        if (!error) {
        	populateTweets(tweets);

        }
    });
}

function populateTweets(tweets) {


    for (var i = 0; i < tweets.length; i++) {
        var resultNumber = i + 1;
        console.log("");
        console.log("Tweet: " + resultNumber);
        console.log("--------------------------------------");
        // Tweet text 
        console.log("Tweet Text: " + tweets[i]["text"]);
        // Date tweet was created
        console.log("Date of Tweet: " + tweets[i].created_at);
        console.log("--------------------------------------");

    }
}


// =============== Spotify require function =================


function getSong(userInput) {
    spotify.search({ type: 'track', query: userInput }, function(err, spotifyData) {
        if (err) {
            console.log('Error occurred: ' + err);
            return;
        } else {
            populateSongResults(spotifyData);
        }
    });
}

function populateSongResults(spotifyData) {

    for (var i = 0; i < spotifyData.tracks.items.length; i++) {
        var resultNumber = i + 1;
        console.log("");
        console.log("Search Result: " + resultNumber);
        console.log("--------------------------------------");
        // Artist Name
        console.log("Artist Name: " + spotifyData.tracks.items[i].artists[0].name);
        // Track Name
        console.log("Track Title: " + spotifyData.tracks.items[i].name);
        // URL
        console.log("URL: " + spotifyData.tracks.items[i].external_urls.spotify);
        // Album names
        console.log("Album: " + spotifyData.tracks.items[i].album.name);
        console.log("--------------------------------------");


    }
    // Using a forEach to get the same result as for loop
    // 	spotifyData.tracks.items.forEach(function(obj, index, array){
    // 		var resultNumber = this.index + 1;
    // 		console.log("");
    // 		console.log("Search Result: " + resultNumber);
    // 		console.log("--------------------------------------");
    // 		// Artist Name
    // 		console.log(obj[index].artists[index].name);
    // 		// Track Name
    // 		console.log(obj[index].name);
    // 		// URL
    // 		console.log(obj[index].external_urls.spotify);
    // 		// Album names
    // 		console.log(obj[index].album.name);
    // 		console.log("--------------------------------------");
    // });
}

// ============ END SPOTIFY ====================

// ======== SORT FUNCTION ================
// Need to add a sort function to sort the music and tweet data
// function sortData(a, b){ 
// 	if(action === "my-tweets"){ 
// 		return (a-b); 

// 	}

// 	if(action === "spotify-this-song"){ 

// 	}

// ======== OMDB FUNCTION ===============

// Function to pull the movie information 
function getMovie(userInput) {
    // Runs a request to the OMDB API with the movie specified by the user
    request('http://www.omdbapi.com/?t=' + userInput + '&y=&plot=short&r=json', function(error, response, body) {

        // If the request is successful (i.e. if the response status code is 200)
        if (!error && response.statusCode == 200) {

            // Parse the body of the site and recover what is needed
            // (Note: The syntax below for parsing isn't obvious. Just spend a few moments dissecting it). 
            console.log("");
            console.log("Search Results");
            console.log("--------------------------------------");
            console.log("Title: " + JSON.parse(body)["Title"]);
            console.log("Year Movie Released: " + JSON.parse(body)["Released"]);
            console.log("IMDB Rating: " + JSON.parse(body)["imdbRating"]);
            console.log("Country Where Film Was Produced: " + JSON.parse(body)["Country"]);
            console.log("Language of movie: " + JSON.parse(body)["Language"]);
            console.log("Plot: " + JSON.parse(body)["Plot"]);
            console.log("Actors: " + JSON.parse(body)["Actors"]);
            console.log("--------------------------------------");
        }
    });
}
