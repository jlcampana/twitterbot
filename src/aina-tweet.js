
const PUBLISH = 'statuses/update';
const SEARCH = 'search/tweets';
const FAVORIZED = 'favorite';
const FOLLOWED = 'follow';
const Twit = require('twit');

class AinaTweet{
   constructor(config){
        t = new Twit(config);
    }
   
    /*
     * Send a tweet
     */
    tweetSomething(tweetMsg) {
        //tweetMsg = 'hello world '+Math.floor(Math.random()*100);
        const tweet = {
            status: tweetMsg
        };

        this.t.post(PUBLISH, tweet, (err, data, response) => {
            if (err) {
                console.log('Something went wrong');
            } else {
                //console.log(data);
                console.log("tweeted ;)");
            }
        });
    }

    /*
     * Prints the nTweets with the query specified
     */
    getTweets(query = 'jovi', nTweets = 5) {
        // parameters: dev.twitter.com/rest/reference/get/search/tweets
        const params = {
            q: query,
            count: nTweets
        };

        this.t.get(SEARCH, params, (err, data, response) => {
            const tweets = data.statuses;

            tweets.forEach((tweet) => {
                console.log(tweet.text);
            }, this);

        });
    }

    /*
     * Will tell you when somebody follows you
     */
    streamFollow() {
        const stream = this.t.stream('user');

        //Anytime someone follows me
        stream.on(FOLLOWED, (event) => {
            const user = event.source;
            //this.tweetSomething(`@${user.screen_name} thanks for the follow`);
            console.log(`@${user.screen_name} followed you`);
        });
    }

    /*
     * Will tell you when somebody favs any of your tweets
     */
    streamFavorite() {
        const stream = this.t.stream('user');

        //Anytime someone favs a tweet of mine
        stream.on(FAVORIZED, (event) => {
            const user = event.source;
            //this.tweetSomething(`@${user.screen_name} thanks for the fav`);
             console.log(`@${user.screen_name} faved your tweet`);
        });
    }


}