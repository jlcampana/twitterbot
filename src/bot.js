import {AinaTweet} from 'aina-tweet.js';

console.log('the bot is starting');

//const AinaTweet = require('./aina-tweet.js');
const config = require('./config.json'); // to import the tw account info

var ainaTweet = new AinaTweet(config);

ainaTweet.streamFavorite();
