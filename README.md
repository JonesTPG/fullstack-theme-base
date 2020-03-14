# Production environment information

## Database

Full Stack Theme Base uses [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) as its database service.
The application connects to the database via Node.js environment variables. The production environment runs the Node.js
application with environment variables defined in the **GitLab CI/CD pipeline variables**. In case the database address
changes, it must be updated in the GitLab.com UI.

## Web Server Configuration

The application runs inside an AWS EC2 instance.


# Instructions for use

## Features

From the homepage, the user can navigate between different provided views (found from the side-nav in the upper left corner).
Everything works without creating an account but you may want to create a user to save your theme preference. 

**Homepage:**
Shows information about the application and the team behind it. After that, a short explanation of key technologies and features used in the project is provided.

**Contact:**
A way to contact us by filling a form. We'll try to get back to you as soon as possible.

**Feedback:**
A simple way to quickly give some feedback on the page.

**Restaurants:**


**Map:**
An interactive map of Finland. Users can apply different layouts from the upper right corner. The different locations used in timetables are marked on the map.

**Timetables:**
Shows the next five route options from one point to another. Users can change direction and refresh the data by clicking the buttons at the bottom. The destination can also be changed between the provided options at the top of the page.


## Users

Visitors can create an account by clicking the "log in" -button. If one does not have an account, one can sign up by following the directions on the screen. After creating an user, the visitor will be redirected to the login page where he/she can log in immediately. 
Admin users have access to the admin view which offers real-time information about users, feedback, contact requests, etc.
**Admin users cannot currently be created from the application.**
