console.log('the bot is starting');

var Twit = require('twit');
var config = require('./config.json'); // to import the tw account info
var t = new Twit(config); //better t because is an object not a class (Twit is a class t is an object of Twit class)


// Tweet something cada rato
//setInterval(tweetSomething, 1000*20); //20s
//streamFollow();
streamFavorite();


function tweetSomething(tweetMsg){
	//tweetMsg = 'hello world '+Math.floor(Math.random()*100);

  var tweet = {
    status: tweetMsg
  };

  t.post('statuses/update', tweet, function(err, data, response){
    if (err){
			console.log('Something went wrong');
		} else{
			//console.log(data);
			console.log("tweeted ;)");
		}
  });
}

function getTweets(){
	// parameters: dev.twitter.com/rest/reference/get/search/tweets
	var params = {
		q: 'jovi', //query
		count: 5 //num of tweets
  };

  t.get('search/tweets', params, function (err, data, response){
    var tweets = data.statuses;
		//console.log(data); // all tweets and its info
		for (var i=0; i<tweets.length; i++){
			console.log(tweets[i].text); //only text of a tweet
		}
  });
}


function streamFollow(){
	var stream = t.stream('user');

	//Anytime someone follows me
  stream.on('follow', function(event) {
    var name = event.source.name;
		var screenName = event.source.screen_name;
		tweetSomething('@'+screenName + " thanks for the follow");
  });
}

function streamFavorite(){
	var stream = t.stream('user');

	//Anytime someone favs a tweet of mine
  stream.on('favorite', function(event){
    var name = event.source.name;
		var screenName = event.source.screen_name;
		tweetSomething('@'+screenName + " thanks for the fav");
  });
}
