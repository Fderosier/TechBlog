# TechBlog
**Description**
This repository comprises JavaScript code, executed via Node.js, which generates an application resembling WordPress for technology blogs. The project leverages npm packages such as express.js, mysql, sequelize, and handlebars, and adheres to the MVC file structure.

MySQL is employed to create databases for storing user credentials, posts, and comments. Sequelize, in tandem with Node.js, handles functions and object-related mapping of data stored in the databases. Handlebars serves as the HTML templating library for the project.

The application hosts community blog posts concerning technology and coding topics. Upon logging in or signing up, users gain access to view all posts shared by others and can leave comments on these posts. Logged-in users can access their personal dashboard, displaying posts they've contributed to the site, with the ability to edit or delete any of these posts.


**Installation**
Install the necessary npm packages for this app by running npm install in your terminal.
**Credits**
For this project I referenced the UNH Bootcamp repository's 13.18 exercise when coding the hooks in the User model. I also referenced this challenge's README.md examples for seeding the Post and Comment models. I also perdiodically referenced the documentation from Bootstrap when creating cards as well as Modzilla's documentation on the difference between reload() and replace(). LAstly, I would like to thank Lucky from AskBCS Learning Assitants who helped me troubleshoot an issue I was experiencing with some of my event handlers. With his help I learned that I had a conflict between the middleware function associated with my 'public' directory and some of my file paths.

**Links**

https://git.heroku.com/tech-blog-application1.git

https://tech-blog-application1-4c0420d792f9.herokuapp.com/