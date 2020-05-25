rm -rf dist
npm run build
proxychains4 rsync -arz --delete ./dist web_server@bjpg-rs66.yz02::files/front-backend-project
proxychains4 rsync -arz --delete ./package.json web_server@bjpg-rs66.yz02::files/front-backend-project
proxychains4 rsync -arz --delete ./pm2.config.json web_server@bjpg-rs66.yz02::files/front-backend-project/dist/server

cd ../