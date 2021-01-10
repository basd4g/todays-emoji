#!/usr/bin/env node
// baseName の後ろに database.json 内の今日の絵文字 (該当するものがなければ空文字列) をつなげて Twitter の名前に設定する

const database = require("./database.json");

// 名前を取得
const baseName = "やんまー";

function todaysEmoji(nowMiliSeconds) {
  const today = database.find( day => {
    const diffMiliSeconds = new Date(day.date_ISO8601).getTime() - nowMiliSeconds;
    const diffDays = diffMiliSeconds / 1000 / 60 / 60 / 24;
    return ( -0.5 <= diffDays && diffDays <= 0.5);
  });
  return today?.emoji ?? "";
}

function todaysScreenName(baseName, now) {
  return baseName + todaysEmoji(now);
}

const name = todaysScreenName(baseName, Date.now());
console.error(`Today's screen name: ${name}`);


// Twitter に反映
const Twitter = require('twitter');
const twitter = new Twitter(process.env);
// { consumer_key, consumer_secret, access_token_key, access_token_secret, }

const twitterPost = () => new Promise( (fulfill, reject) => {
  twitter.post('account/update_profile', { name }, (err, account, res) => {
    if (err) {
      reject(err);
      return;
    }
    fulfill(account);
  });
});

twitterPost().then(account => {
  console.error("Success!");
}).catch(e => {
  console.error(e);
  console.error("Failed...");
  process.exit(1);
});
