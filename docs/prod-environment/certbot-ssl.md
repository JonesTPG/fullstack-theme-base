# SSL with Reverse Proxy

sudo add-apt-repository ppa:certbot/certbot
sudo apt install python-certbot-nginx
sudo certbot --nginx -d {DOMAIN_NAME}

When asked about redirects, select redirect all **if the application fully supports https**. (also websocket connection needs to be secure!)
