// Liri node comand app that pulls in data from twitter, spotify and omdb movie database. Author: Nigel Finley. UT BOOTCAMP.


// ============= Declaring variables=================
// var action = process.argv[2];
// var userInput = process.argv[3];
var keys = require('./keys.js');
var myTwitterKeys = keys.twitterKeys;
var request = require('request');
var spotify = require('spotify');
var Twitter = require('twitter');
var inquirer = require('inquirer');
var fs = require('fs');
var spotifyData;
var tweets;
var userInput;
var dataArray = [];
var userData;
var input;
var split;

var client = new Twitter({
    consumer_key: myTwitterKeys.consumer_key,
    consumer_secret: myTwitterKeys.consumer_secret,
    access_token_key: myTwitterKeys.access_token_key,
    access_token_secret: myTwitterKeys.access_token_secret
});


// ======= Begining Inquirer ===========
inquirer.prompt([{
    name: "welcome",
    type: "list",
    message: "Welcome to LIRI, the Language Interpretation and Recognition Interface. \nPlease choose from the following: ",
    choices: ["Find Tweets", "Find a Song", "Find a Movie"]

}]).then(function(answers) {

    // Handles the input if user selects Tweets
    if (answers.welcome === "Find Tweets") {

        inquirer.prompt([{
            name: "chooseUser",
            type: "input",
            message: "Type user twitter handle to read their tweets: "

        }]).then(function(answer) {
            input = answers.welcome;
            logUserInput(input);
            userInput = answer.chooseUser;
            // console.log(userInput);
            if (userInput !== "") {
                getTweets(userInput, getTweetsCallback);

	 		// Else statment is the user doesn't select anything and hits enter 
            } else {
                fs.readFile("random.txt", "utf8", function(err, data) {
                    split = data.split(',');
                    userInput = split[3];
                    // console.log(split[3]);


                    if (split[2] === "Find Tweets") {
                        getTweets(userInput, getTweetsCallback);
                    } else {
                        console.log("You Broke It!");
                    }
                });
            }

        });
    }

    // Handles the input if user selects a Song
    else if (answers.welcome === "Find a Song") {


        inquirer.prompt([{
            name: "chooseSong",
            type: "input",
            message: "Type your song title to search"

        }]).then(function(answer) {
            input = answers.welcome;
            logUserInput(input);

            userInput = answer.chooseSong;
            // console.log(userInput);
            if (userInput !== "") {
                getSong(userInput, getSongCallback);

                // Else statment is the user doesn't select anything and hits enter 
            } else {
                fs.readFile("random.txt", "utf8", function(err, data) {
                    split = data.split(',');
                    userInput = split[1];

                    if (split[0] === "Find Song") {
                        getSong(userInput, getSongCallback);
                    } else {
                        console.log("You Broke It!");
                    }
                });
            }

        });
    }

    // Handles the input if user selects a Movie
    else if (answers.welcome === "Find a Movie") {
        inquirer.prompt([{
            name: "chooseMovie",
            type: "input",
            message: "Type the movie name to search"

        }]).then(function(answer) {

            userInput = answer.chooseMovie;
            // console.log(userInput);
            if (userInput !== "") {
                getMovie(userInput, getMovieCallback);

            // Else statment is the user doesn't select anything and hits enter 
            } else {
                fs.readFile("random.txt", "utf8", function(err, data) {
                    split = data.split(',');
                    userInput = split[5];
                    // console.log(split[4])
                    if (split[4] === "Find Movie") {
                        getMovie(userInput, getMovieCallback);
                    } else {
                        console.log("You Broke It!")
                    }
                });
            }
        });

    } else {
        console.log("Please enter a valid search request!");
    }
});



// // ======== TWITTER FUNCTIONS=========
function getTweetsCallback(err, userInput, tweets, resultType) {
    if (err) {
        return console.log(err)
    }

    populateTweets(tweets);
    logResults(userInput, tweets, resultType);
}

function getTweets(userInput, callback) {

    var params = { screen_name: userInput, count: 20 };
    client.get('statuses/user_timeline', params, function(err, tweets, response) {
        if (err) {
            return callback(err)
        }
        callback(null, userInput, tweets, 'tweets')
    });
}

function formatTweets(tweets) {
    var returnTweets = "";
    for (var i = 0; i < tweets.length; i++) {
        // var resultNumber = i + 1;
        returnTweets += "Tweet: " + (i + 1) + "\n" +
            "--------------------------------------\n" +
            // Tweet text 
            "Tweet Text: " + tweets[i]["text"] + "\n" +
            // Date tweet was created
            "Date of Tweet: " + tweets[i].created_at + "\n" +
            "--------------------------------------\n";
    }
    return returnTweets;

}

function populateTweets(tweets) {
    console.log(formatTweets(tweets));

}

// =============== SPOTIFY FUNCTIONS AND CALLBACKS =================
function getSongCallback(err, userInput, spotifyData, resultType) {
    if (err) {
        return console.log(err)
    }

    populateSongResults(spotifyData);
    logResults(userInput, spotifyData, resultType);
}

function getSong(userInput, callback) {
    spotify.search({ type: 'track', query: userInput }, function(err, spotifyData) {
        if (err) {
            console.log('Error occurred: ' + err);
            callback(err);
        } else {
            callback(null, userInput, spotifyData, 'song');
            // populateSongResults(spotifyData);
            // logResults(userInput, spotifyData);
        }
    });
}

function formatSongResults(spotifyData) {
    var returnString = "";

    for (var i = 0; i < spotifyData.tracks.items.length; i++) {
        returnString += ("Song Result: " + (i + 1) + "\n" +
            "--------------------------------------" + "\n" +
            // Artist Name
            "Artist Name: " + spotifyData.tracks.items[i].artists[0].name + "\n" +
            // Track Name
            "Track Title: " + spotifyData.tracks.items[i].name + "\n" +
            // URL
            "URL: " + spotifyData.tracks.items[i].external_urls.spotify + "\n" +
            // Album names
            "Album: " + spotifyData.tracks.items[i].album.name + "\n" +
            "--------------------------------------" + "\n")
    }

    return returnString;
}

function populateSongResults(spotifyData) {
    console.log(formatSongResults(spotifyData))
};



// ============ END SPOTIFY ====================



// ======== OMDB FUNCTION ===============
function getMovieCallback(err, userInput, body, resultType) {
    if (err) {
        return console.log(err)
    }

    populateMovieResults(body);
    logResults(userInput, body, resultType);
}

function populateMovieResults(body) {
    console.log(formatMovieResults(body))
};
// Function to pull the movie information 
function getMovie(userInput, callback) {
    // Runs a request to the OMDB API with the movie specified by the user
    request('http://www.omdbapi.com/?t=' + userInput + '&tomatoes=true&y=&plot=short&r=json', function(err, response, body) {

        // If the request is successful (i.e. if the response status code is 200)
        if (!err && response.statusCode == 200) {
            callback(null, userInput, body, 'movie');


        } else {
            console.log("Sorry there was a problem, please try again later!")
            return;
        }
    });
}

function formatMovieResults(body) {
    var returnMovies = "";

    // for (var i = 0; i < spotifyData.tracks.items.length; i++) {
    returnMovies += ("Movie Result " + "\n" +
        "--------------------------------------" + "\n" +
        "Title: " + JSON.parse(body)["Title"] + "\n" +
        "Year Movie Released: " + JSON.parse(body)["Released"] + "\n" +
        "IMDB Rating: " + JSON.parse(body)["imdbRating"] + "\n" +
        "Country Where Film Was Produced: " + JSON.parse(body)["Country"] + "\n" +
        "Language of movie: " + JSON.parse(body)["Language"] + "\n" +
        "Plot: " + JSON.parse(body)["Plot"] + "\n" +
        "Actors: " + JSON.parse(body)["Actors"] + "\n" +
        "Rotten Tomatoes Rating: " + JSON.parse(body)["tomatoRating"] + "\n" +
        "Rotten Tomatoes URL: " + JSON.parse(body)["tomatoURL"] + "\n" +
        "--------------------------------------\n");


    return returnMovies;

}

// ======= LOG FUNCTIONS that add text to the log.txt file ========

// this function will log the results of the query
function logResults(userInput, results, resultType) {
    // userData = getSong(userInput);
    var data;
    if (resultType === 'song') {
        data = formatSongResults(results);
    }
    if (resultType === 'tweets') {
        data = formatTweets(results);
    } else if (resultType === 'movie') {
        data = formatMovieResults(results);
    }

    fs.appendFile("log.txt", userInput + "\n" + data + "\n" + "---------", function(err) {
        // If an error was experienced we say it.
        if (err) {
            console.log(err);
        }

        // If no error is experienced, we'll log the phrase "Content Added" to our node console. 
        else {

            console.log("Content Added!");
        }

    });
}

// This function will just log the first response to the question and the user input 
function logUserInput(userInput) {
    // userData = answer.welcome+": ";

    fs.appendFile("log.txt", "----------" + "\n" + userInput + ": ", function(err) {
        // If an error was experienced we say it.
        if (err) {
            console.log(err);
        }

        // If no error is experienced, we'll log the phrase "Content Added" to our node console. 
        else {

            console.log("Content Added!");
        }

    });
}



// ======== SORT FUNCTION ================
// Need to add a sort function to sort the music and tweet data
// function sortData(a, b){ 
// 	if(action === "my-tweets"){ 
// 		return (a-b); 

// 	}

// 	if(action === "spotify-this-song"){ 

// 	}
