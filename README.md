# Today's emoji

祝日や記念日にちなんだ絵文字をTwitterの名前に挿入することで、自宅にいながら季節を感じようという試み。

## Run locally

```sh
git clone https://github.com/basd4g/todays-emoji.git
cd todays-emoji
npm i
sed -i 's/やんまー/yourname/' index.js
# Need Twitter API keys
consumer_key=xxxxxx consumer_secret=xxxxxx access_token_key=xxxxxx access_token_secret=xxxxxx npm start
```

## Run on GitHub Actions

GitHub Actions を使って、日本時間の0時にその日の絵文字を設定している。
([run.yml](.github/workflows/run.yml))
