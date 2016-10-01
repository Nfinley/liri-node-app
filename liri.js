// Liri node comand app that pulls in data from twitter, spotify and omdb movie database. Author: Nigel Finley. UT BOOTCAMP.

// Pulls the key information from keys.js
var keys = require ('./keys.js');

var myTwitterKeys = keys.twitterKeys;

// console.log(myTwitterKeys);
// console.log("--------------------------");
// console.log(keys.twitterKeys);
// console.log("--------------------------");
// console.log(keys.twitterKeys.consumer_key);

var action = process.argv[2];
var userInput = process.argv[3];

// swtich statement to handle the user action and input
switch (action){

}


// var request = require('request');
// request('http://www.google.com', function (error, response, body) {
//   if (!error && response.statusCode == 200) {
//     console.log(body) // Show the HTML for the Google homepage. 
//   }
// })


// // ======== Twitter Require =========
// var Twitter = require('twitter');
 
// var client = new Twitter({
//   consumer_key: '',
//   consumer_secret: '',
//   access_token_key: '',
//   access_token_secret: ''
// });
 
// var params = {screen_name: 'nodejs'};
// client.get('statuses/user_timeline', params, function(error, tweets, response) {
//   if (!error) {
//     console.log(tweets);
//   }
// });

// // =============== Spotify Require =================
// var spotify = require('spotify');
 
// spotify.search({ type: 'track', query: 'dancing in the moonlight' }, function(err, data) {
//     if ( err ) {
//         console.log('Error occurred: ' + err);
//         return;
//     }
 
//     // Do something with 'data' 
// });
