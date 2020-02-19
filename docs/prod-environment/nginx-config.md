# Nginx reverse proxy configuration

Use these steps to create a Nginx reverse proxy on a ubuntuvirtual machine.

Nginx initial config:

sudo apt install nginx
sudo systemctl status nginx
sudo systemctl enable nginx
sudo systemctl status nginx
sudo ufw status

if ufw status is active:

sudo ufw allow 80/tcp (← http port)
sudo ufw allow 443/tcp (← https port)
sudo ufw reload

Virtual host config:

sudo nano /etc/nginx/sites-available/{NEW_DOMAIN}

Paste in the following config:

```
server {

        server_name {NEW_DOMAIN};

        location /subscriptions {

                proxy_http_version 1.1;

                proxy_set_header Upgrade $http_upgrade;
                proxy_set_header Connection "upgrade";

                proxy_pass      http://localhost:{NODE_PORT}/subscriptions;

        }

        location / {


                proxy_pass         http://localhost:{NODE_PORT};
        }

}

```

sudo ln -s /etc/nginx/sites-available/{NEW_DOMAIN} /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx

sudo certbot --nginx -d {DOMAIN_NAME}

When asked about redirects, select redirect all **if the application fully supports https**. (also websocket connection needs to be secure!)

Below is an example config that the certbot will create in the site configuration.

```

    listen [::]:443 ssl ipv6only=on; # managed by Certbot
    listen 443 ssl; # managed by Certbot
    ssl_certificate /etc/letsencrypt/live/demo.kooditaiturit.fi/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/demo.kooditaiturit.fi/privkey.pem;
    include /etc/letsencrypt/options-ssl-nginx.conf; # managed by Certbot
    ssl_dhparam /etc/letsencrypt/ssl-dhparams.pem; # managed by Certbot

}

server {
    if ($host = {NEW_DOMAIN}) {
        return 301 https://$host$request_uri;
    } # managed by Certbot


        listen 80;
        listen [::]:80;

        server_name {NEW_DOMAIN};
        return 404; # managed by Certbot

}

```
