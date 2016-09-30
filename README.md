# liri-node-app

LIRI is a command line node app that takes in parameters and gives you back data. It is a project completed as part of the UT Bootcamp.   

#The parameters that you can pass to retrieve data are: 

1. `node liri.js my-tweets`
		
	* This will show your last 20 tweets and when they were created at in your terminal/bash window.

2. `node liri.js spotify-this-song '<song name here>'`

	* This will show the following information about the song in your terminal/bash window
		* Artist(s)
		* The song's name
		* A preview link of the song from Spotify
		* The album that the song is from

	* if no song is provided then your program will default to
		* "The Sign" by Ace of Base

3. `node liri.js movie-this '<movie name here>'`

	* This will output the following information to your terminal/bash window:

		* Title of the movie.
		* Year the movie came out.
		* IMDB Rating of the movie.
		* Country where the movie was produced.
		* Language of the movie.
		* Plot of the movie.
		* Actors in the movie.
		* Rotten Tomatoes Rating.
		* Rotten Tomatoes URL.

	* If the user doesn't type a movie in, the program will output data for the movie 'Mr. Nobody.'
		* If you haven't watched "Mr. Nobody," then you should: http://www.imdb.com/title/tt0485947/
		* It's on Netflix!

4. `node liri.js do-what-it-says`
	* Using the `fs` Node package, LIRI will take the text inside of random.txt and then use it to call one of LIRI's commands.
		* It will run `spotify-this-song` for "I Want it That Way," and follows the text in `random.txt`.
