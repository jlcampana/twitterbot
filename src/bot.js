console.log('the bot is starting');

const Twit = require('twit');
const config = require('./config.json'); // to import the tw account info
const t = new Twit(config); //better t because is an object not a class (Twit is a class t is an object of Twit class)

const PUBLISH = 'statuses/update';
const SEARCH = 'search/tweets';
const FAVORIZED = 'favorite';
const FOLLOWED = 'follow';

function tweetSomething(tweetMsg) {
  //tweetMsg = 'hello world '+Math.floor(Math.random()*100);

  const tweet = {
    status: tweetMsg
  };

  t.post(PUBLISH, tweet, (err, data, response) => {
    if (err) {
      console.log('Something went wrong');
    } else {
      //console.log(data);
      console.log("tweeted ;)");
    }
  });
}

//Default values for query and nTweets
function getTweets(query = 'jovi', nTweets = 5) {
  // parameters: dev.twitter.com/rest/reference/get/search/tweets
  const params = {
    q: query,
    count: nTweets
  };

  t.get(SEARCH, params, (err, data, response) => {
    const tweets = data.statuses;

    tweets.forEach((tweet) => {
      console.log(tweet.text);
    }, this);

  });
}


function streamFollow() {
  const stream = t.stream('user');

  //Anytime someone follows me
  stream.on(FOLLOWED, (event) => {
    const user = event.source;
    tweetSomething(`@${user.screen_name} thanks for the follow`);
  });
}

function streamFavorite() {
  const stream = t.stream('user');

  //Anytime someone favs a tweet of mine
  stream.on(FAVORIZED, (event) => {
    const user = event.source;
    tweetSomething(`@${user.screen_name} thanks for the fav`);
  });
}

streamFavorite();