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
 listen 80;
 listen [::]:80;

server_name {NEW_DOMAIN_NAME};

location / {

proxy_set_header X-Forwarded-For $remote_addr;
                proxy_set_header   Host $http_host;
 proxy_pass http://localhost:{NODE_APP_PORT};
 }

}

```

sudo ln -s /etc/nginx/sites-available/{NEW_DOMAIN} /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx
