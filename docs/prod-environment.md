# Production Environment Configuration

## Requirements for the prod envinroment to run the theme-base application in production:

Linux-based virtual machine
Node.js (version 10)
Npm (latest version)
PM2 (install globally via NPM)
Nginx web-server

For example an AWS EC2 instance with newest Ubuntu Server is a good choice. After initializing the virtual machine, check the following things:

Firewall should allow traffic to ports 80, 443 to everyone. (HTTP, HTTPS traffic).
The actual Node.js ports should not be publicly open. Instead a Nginx reverse proxy is used to route the traffic.
