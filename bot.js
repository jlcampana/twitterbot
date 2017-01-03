console.log('the bot is starting');

//import the package/library...
var Twit = require('twit');
//https://github.com/ttezel/twit

//1)Twitter account:
//https://dev.twitter.com/ -> Tools: Manage My Apps -> new app / click on current app

/* OPTION 1
var T = new Twit({
	consumer_key: 'CAzZwqJtDtLB3iZHUjwMp3v4A',
	consumer_secret: 'gblD6yXIBtyX7x2JAqAr5oq5GOX8zV22mddZeR8FOx73oFtMSJ',
	access_token: '	3231068890-yKL9LFPTjZVBcJJX1BdurHf8bcNgx2OFPhS9Waq',
	access_token_secret:
})
*/

//OPTION 2
//since keys and tokens are personal, if later we share or upload
//this code to a sever, anybody would see it.
//Solution: put it in another file (config.js) and import it
var config = require('./config'); // to import the tw account info

var T = new Twit(config);


// Tweet something cada rato
//setInterval(tweetSomething, 1000*20); //20s
//streamFollow();
streamFavorite();



function tweetSomething(tweetMsg){
	//tweetMsg = 'hello world '+Math.floor(Math.random()*100);
	
	var tweet = {
		status: tweetMsg
	}

	T.post('statuses/update', tweet, tweeted);

	function tweeted(err, data, response){
		if (err){
			console.log('Something went wrong');
		} else{
			//console.log(data);
			console.log("tweeted ;)");
		}
	}
}

function getTweets(){
	// parameters: dev.twitter.com/rest/reference/get/search/tweets
	var params = {
		q: 'jovi', //query
		count: 5 //num of tweets
	};
	T.get('search/tweets', params, gotData);

	function gotData(err, data, response) {
		var tweets = data.statuses;
		//console.log(data); // all tweets and its info
		for (var i=0; i<tweets.length; i++){
			console.log(tweets[i].text); //only text of a tweet
		}
	}
}


function streamFollow(){
	var stream = T.stream('user');

	//Anytime someone follows me
	stream.on('follow', followed);

	function followed(event){ //event can be called as u want
		var name = event.source.name;
		var screenName = event.source.screen_name;
		tweetSomething('@'+screenName + " thanks for the follow");
	}
}

function streamFavorite(){
	var stream = T.stream('user');

	//Anytime someone favs a tweet of mine
	stream.on('favorite', favorited);

	function favorited(event){ //event can be called as u want
		var name = event.source.name;
		var screenName = event.source.screen_name;
		tweetSomething('@'+screenName + " thanks for the fav");
	}
}
