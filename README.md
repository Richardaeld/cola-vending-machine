# Welcome to ColaCo's Virtual Vending Machine!

# Table Of Contents
[Introduction]

[UX](#ux)
+ [User Stories](#user-stories)
    + [Clients](#clients)
    + [Admin](#admin)
+ [Design Choices](#design-choices)
    + [API](#api)
        + [Database Tables](#database-tables)
        + [Routes](#routes)
    + [React](#react)
        + [Home](#home)
        + [Product Details](#product-details)
+ [Wireframes and Live Application](#wireframes-and-live-application)
    + [Database Wireframes](#database-wireframes)
    + [API Wireframes](#api-wireframes)
    + [Application Wireframes](#application-wireframes)
    + [Live Application](#live-application)
+ [Scalability](#scalability)

[Assumptions](#assumptions)

[Technology](#technology)

[Testing](#testing)
+ [Developer Testing Specifications](#developer-testing-specifications)
+ [Developer Testing Systems](#developer-testing-systems)
+ [Developer Testing Methods](#developer-testing-methods)

[Bugs and Other Problems](#bugs-and-other-problems)
+ [Bugs](#bugs)
+ [Other Problems](#other-problems)

[Deployment](#deployment)
+ [Stripe](#stripe)
+ [GitHub](#github)
    + [API Repo](#api-repo)
    + [React Repo](#react-repo)
+ [Heroku](#heroku)
    + [API App](#api-app)
    + [React App](#react-app)
    + [Heroku Notes](#heroku-notes)

[Tools](#tools)

[Acknowledgements](#Acknowledgements)

## Introduction


# UX
## User Stories
### Clients
#### General
+ As a client, I want to be able to view the vending machine’s entire selection of cola.
+ As a client, I want to be able to view a detailed description of a cola.
#### Auth
+ As a client, I am a repeat customer and I want to save my purchase information.
+ As a client, I want to be able to purchase a cola. **Scalability** (Not implemented on the front end)
+ As a client, I want to be able to view my login name. **Scalability** (Not implemented)
+ As a client, I want to be able to update my name. **Scalability** (Not implemented)
+ As a client, I want to be able to change my password. **Scalability** (Not implemented)
+ As a client, I want to be able to view my purchase history. **Scalability** (Not implemented)

### Admin
#### General
+ As an admin, I want to add a new cola to the vending machine.
+ As an admin, I want to be able to change the name of a cola.
+ As an admin, I want to be able to update the price of a cola.
+ As an admin, I want to be able to change the amount currently stocked in the vending machine.
+ As an admin, I want to be able to change the max available of a cola.
+ As an admin, I want to be able to update the description of a cola.
+ As an admin, I want to be able to view all products including id and description.
+ As an admin, I want to be able to view all basic cola information minus the description while I refill the vending machine.
+ As an admin, I want to view a customers purchase history. **Scalability** (Not implemented)
#### Auth
+ As an admin, I need to be able to login to preform my duties.
+ As an admin, I want to be able to update my name. **Scalability** (Not implemented)
+ As an admin, I want to be able to change my password. **Scalability** (Not implemented)
+ As an admin, I want to be able to change a client’s status to admin.
+ As an admin, I want to be able to view my login name. **Scalability** (Not implemented)
+ As an admin, I want to see all the admins.
+ As an admin, I want to see all the customers.


## Design Choices
### API
#### Database Tables
##### users
+ 5 columns
    + id (int) - PostgreSQL automatically tracks this number.
    + name (string) - Name of the user.
    + password (string) - password for the user.
    + is_admin (boolean) - Determines if the user is a admin.
    + purchases (string) - A stringified JSON object that remembers purchase history of a user.  **Scalability** (Not implemented)

##### cola
+ 6 columns:
    + id (int) - PostgreSQL automatically tracks this number.
    + name (string) - Name of the cola.
    + price (float) - US dollar amount to purchase this item.
    + amount (int) - The 'physical' count within the vending machine.
    + max_amount (int) - The maximum 'physical' count a vending machine can hold (due to production rarity).
    + description (string) - A basic description of a cola.

#### Routes
##### Route Notes
+ In order to keep the site more secure multiple routes for updating user information will be used rather than one update route as was used in cola table.
+ There are two levels of middleware restriction, admin (restricted_admin_middleware.js) and user(restricted_middleware.js).
+ All paths start on the root of the api or `https://colaco-vending-machine.herokuapp.com/` for this application.
+ There currently is no front-end ability to pass a restricted point. In order to access the API with restricted middleware reinforcement a api request program like insomnia or postman must be used.
    + Additionally the header must have `authorization: <webtoken>` within it. The webtoken can be found as a return from logging in. Details of this can be found below.
    + In order to receive a admin token an accurate `admin_secret: <secret>` must be submitted with login information when creating a user. Details of this can be found below.
    + These middleware tokens only last a total of 1 hour after login. This could easily be shortened (to improve security) or extended depending upon preference.
+ All params are entered in the address bar in place of `:id`.

##### Restricted Admin Routes
+ **Restockers cola view**
    + Request:
        + GET
    + Requires:
        + --
    + Returns:
        + Object->array->objects
        + All colas as:
            + `{`
                + `"message":<string>`
                + `"cola": [`
                    + `{`
                        + `"id": <int>,`
                        + `"name": <string>,`
                        + `"amount": <int>,`
                        + `"max_amount": <int>,`
                        + `"price": <float>`
                    + `}`
                + `]`
            + `}`

    + Restricted:
        + Yes, admin
    + Path:
        + `/admin/cola/restockerView`

+ **Create new cola(s)**
    + Request:
        + POST
    + Requires:
        + Object -- or -- array->objects
        + Cola as:
            + `[`
                + `{`
                    + `"name": <string>,`
                    + `"price": <float>,`
                    + `"amount": <int>,`
                    + `"max_amount": <int>,`
                    + `"description": <string>`
                + `}`
            + `]`
    + Returns:
        + Object -- or -- array->objects
        + Same number of cola(s) entered and their values
            + `{`
                + `"message":<string>`
                + `"cola": [`
                    + `{`
                        + `"id": <int>,`
                        + `"name": <string>,`
                        + `"price": <float>,`
                        + `"amount": <int>,`
                        + `"max_amount": <int>,`
                        + `"description": <string>`
                    + `}`
                + `]`
            + `}`
    + Restricted:
        + Yes, admin
    + Path:
        + `/admin/cola/addCola`

+ **Update cola with single or multiple changes**
    + Request:
        + PATCH
    + Requires:
        + Object
        + Any single change or multiple changes to cola.
        + Cola as:
            + `{`
                + `"price": <float>,`
                + `"max_amount": <int>`
            + `}`
        + Cola with:
            + id (params)
    + Returns:
        + Object->object
        + The entire cola object that was modified.
        + Cola as:
            + `{`
                + `"message":<string>`
                + `"cola": {`
                    + `"id": <int>,`
                    + `"name": <string>,`
                    + `"price": <float>,`
                    + `"amount": <int>,`
                    + `"max_amount": <int>,`
                    + `"description": <string>`
                + `}`
            + `}`
    + Restricted:
        + Yes, admin
    + Path:
        + `/admin/cola/patch/:id`

+ **Delete Cola**
    + Request:
        + Delete
    + Requires:
        + User with:
            + id (params)
    + Returns:
        + Object
        + Id of the deleted user in a string.
        + User message as:
            + `{`
                + `"message":<string>`
            + `}`
    + Restricted:
        + Yes, admin
    + Path:
        + `/admin/user/delete/:id`

+ **View all users**
    + Request:
        + GET
    + Requires:
        + --
    + Returns:
        + Object->array->objects
        + All users that are not of admin status.
        + Users as:
            + `{`
                + `"users": [`
                    + `{`
                        + `"id": <int>,`
                        + `"username": <string>`
                    + `}`
                + `]`
            + `}`
    + Restricted:
        + Yes, admin
    + Path:
        `/admin/user/getAll/user`

+ **View all admin**
    + Request:
        + GET
    + Requires:
        + --
    + Returns:
        + Object->array->objects
        + All users that are of admin status.
        + Users as:
            + `{`
                + `"users": [`
                    + `{`
                        + `"id": <int>,`
                        + `"username": <string>`
                    + `}`
                + `]`
            + `}`
    + Restricted:
        + Yes, admin
    + Path:
        `admin/user/getAll/admin`

+ **View all admin and users**
    + Request:
        + GET
    + Requires:
        + --
    + Returns:
        + Object->array->objects
        + All users.
        + Users as:
            + `{`
                + `"users": [`
                    + `{`
                        + `"id": <int>,`
                        + `"username": <string>`
                    + `}`
                + `]`
            + `}`
    + Restricted:
        + Yes, admin
    + Path:
        + `admin/user/getAll/adminAndUser`

+ **Update user to admin**
    + Request:
        + UPDATE
    + Requires:
        + Object
        + User as:
            + `{`
                + `"is_admin": <boolean>`
            + `}`
        + User with:
            + id (params)
    + Returns:
        + Object->object
        + All user information in object.
        + This includes the users hashed password.
        + User as:
            + `{`
                + `"message":<string>,`
                + `"user": {`
                    + `"id": <int>,`
                    + `"username": <string>,`
                    + `"password": <string>,`
                    + `"is_admin": <boolean>`
                + `}`
            + `}`
    + Restricted:
        + Yes, admin
    + Path:
        + `admin/user/patch/:id`

+ **Delete user**
    + Request:
        + DELETE
    + Requires:
        + User with:
            + id (params)
    + Returns:
        + Object
        + The id of the deleted user in a string.
        + Message as:
            + `{`
                + `"message": <string>`
            + `}`
    + Restricted:
        + Yes, admin
    + Path:
        + `admin/user/delete/:id`

##### Restricted Admin/User Routes
+ **Remove single cola after purchase**
    + Request:
        + POST
    + Requires:
        + Cola with:
             + id (params)
    + Returns:
        + Object
        + The amount of colas left in a string.
        + Message as:
            + `{`
                + `"message": <string>`
            + `}`
    + Restricted:
        + Yes, user
    + Path:
        + `restrict/user/getOne/:id`

+ **Update user name.**
    + Not implemented, commented out
+ **Update user password.**
    + Not implemented, commented out
+ **View single user by name.**
    + Not implemented, commented out

##### Admin/User Routes
+ **Get all colas**
    + Request:
        + GET
    + Requires:
        + --
    + Returns:
        + Object->array->object
        + Cola as:
            + `{`
                + `"cola": [`
                    + `{`
                        + `"id": <int>,`
                        + `"name": <string>,`
                        + `"price": <float>,`
                        + `"amount": <int>,`
                        + `"max_amount": <int>,`
                        + `"description": <string>`
                    + `}`
                + `]`
            + `}`
    + Restricted:
        + no
    + Path:
        + `cola/getAll`

+ **Get single cola**
    + Request:
        + GET
    + Requires:
        + Cola with:
             + id (params)
    + Returns:
        + Object->object
        + Cola as:
            + `{`
                + `"cola": {`
                    + `"id": <int>,`
                    + `"name": <string>,`
                    + `"price": <float>,`
                    + `"amount": <int>,`
                    + `"max_amount": <int>,`
                    + `"description": <string>`
                + `}`
            + `}`
    + Restricted:
        + no
    + Path:
        + `cola/getOne/:id`

##### Authentication Routes
+ **Register admin/user**
    + Request:
        + POST
    + Requires:
        + Object
        + In order to create a admin account the user must know and accurately enter the admin_secret. If this is correctly done the return message will welcome you to the Colaco family.
        + User as:
            + `{`
                + `"username": <string>,`
                + `"password": <string>,`
                + `"admin_secret": <string>`
            + `}`
    + Returns:
        + Object
        + A string welcomeing the user with the user name
        + Message as:
            + `{`
                + `"message": <string>`
            + `}`
    + Restricted:
        + no
    + Path:
        + `user/auth/register`

+ **Login admin/user**
    + Request:
        + POST
    + Requires:
        + Object
        + User as:
            + `{`
                + `"username": <string>,`
                + `"password": <string>`
            + `}`
    + Returns:
        + Object
        + Welcome message string and token string
        + Message as:
            + `{`
                + `"message": <string>,`
                + `"token": <string>`
            + `}`
    + Restricted:
        + no
    + Path:
        + `user/auth/login`



### React
#### Home
+ A generic and colorful linear gradient was used as a backgroud.
+ Each cola product gets its own template which includes:
    + The Cola's name, which is displayed on a blank can png. This effect gives the appearance of colas being displayed in a vending machine.
    + Each cola displays its price and if it is in stock or not.
+ A footer with ColaCo's name on it. **Scalability** (Not fully implemented)


#### Product Details
+ Each detailed products page gives additional information about the product:
    + The cola's description.
    + A way to purchase the cola.
    + A return to the home screen.
+ The buy button uses Stripes API to give a secure connection for uses to purchase cola(s). **Scalability** (Not fully implemented)
    + Stripes base import was left unhidden for development purposes.

## Wireframes and Live Application
### Database Wireframes
+ Wireframe for Cola table
![Database Table Cola wireframe](readme/db/db_table_cola.jpg)
+ Wireframe for Users table
![Database Table Users wireframe](readme/db/db_table_users.jpg)
### API Wireframes
+ Wireframe for RESTful API
![Api wireframe](readme/db/api_requests.jpg)
### Application Wireframes
+ Concept wireframes
![Home concept drawing](readme/front-end/home-wireframe.jpg)
![Details concept drawing](readme/front-end/details-wireframe.jpg)
### Live Application
+ Live app
![live application](readme/front-end/responsive.jpg)

## Scalability
+ Numerous parts of this application were left unfinished and documentation was added to help describe what their purpose was supposed to be.
+ Finalizing a way for users to login, and update their username and password.
+ Creating a way for a user to delete their own account.
+ Stripe was chosen as a payment API and its integration process was not finished.

# Assumptions
+ The vending machine will only dispense one cola at a time.
+ Frequent users will want to have a login to remember their card information. **Scalability** (Not fully implemented)
+ ColaCo will want to track who is buying their cola for ‘reasons’. **Scalability** (Not fully implemented)
+ Users will want a method of payment that does not require logging in. **Scalability** (Not fully implemented)
+ Users will only use credit or debit cards. **Scalability** (Not fully implemented)


# Technology
+ Node.js – Runtime application that allows JS to be used outside of a browser.
+ JavaScript - Allows for user interaction and dynamic function on the application. This also allows all the backend functions to work because of the runtime application Node.js.
+ Express.js – Backend web framework used with Node.js for server framework.
+ Knex.js – ORM (object-relational mapper) used to make SQL queries easier and faster to write.
+ PostgreSQL – Relational Database used.
+ React.js - JavaScript Library for front-end development.
+ Stripe - API that accepts payment information.
+ HTML - Skeleton frame of the application.
+ CSS - Beautifies the skeleton (HTML).

# Testing
## Developer Testing Specifications
### Developer Testing Systems
### Developer Testing Methods

# Bugs and Other Problems
## Bugs
### API
+ When a user tries to create a login with a existing username PostgreSQL does not return a error number. So the user visible error is a 500.
    + Caused by:
        + PostgreSQL's normal functions.
    + Fix:
        + PostgreSQL returns a undefined instead of a error number so an additional error catch was added to catch a undefined error. Then it tells the user that they need to select a different username.
    + Thought(s):
        + Given more time this should be more accurately handled with determining why PostgreSQL isnt giving an error code; or find a more certain way of detecting a unique key error.

## Other Problems
### React
+ After a successful deployment of React, Heroku wouldn't run the application.
	+ Caused by:
		+ Location of the React content. (Due to the nature of using a single git repo for tracking the application build process numerous problems were created.)
	+ Fix:
		+ A Second git repo was created with the sole purpose to receive a copy and paste of the entire application at deployment intervals. This was necessary because it allowed control over where the files were located. Unlike the node.js server for this project, React did not play nice with its nonstandard root directory.
	+ Thoughts:
		+ Provided with additional time, a prettier solution should be devised. Considering the limited development time, this inelegant solution was chosen.

# Deployment
## Stripe
+ Go to **Stripe.com** and click **Start Now**.
+ Create a new account.
+ Click **Developer** tab and **Documentation** button.
+ Click **Payments** button
+ Click **Accept online payments**
<!-- + Click **API Keys** to find **Publishable Key** and **Secret Key**.
+ Click **Webhooks** tab.
+ click **Add Endpoint** and enter the new apps Heroku address with **/invoice/wh/** at the end of the address.
+ Stripe will now provide you with a **Signing Secret Key**. -->
 **Scalability** (Not fully implemented)

## GitHub
+ This will require two separate github repos to deploy properly to Heroku.
    + Due to deployment bugs this inelegant solution was chosen in order to save time.

### API Repo
+ Go to the location of the original repository in GitHub, [https://github.com/Richardaeld/cola-vending-machine](https://github.com/Richardaeld/cola-vending-machine).
+ Click on the **Code** button to get the drop-down menu.
+ Copy the HTTPS address provided.
+ Create a new project in GitHub and VSCode (to house the new clone) and then open this new project.
+ Go to the Bash and type, `git clone <HTTPS>`, paste the HTTPS address found in the GitHub page and press enter.
+ A clone will be created within a new folder called "cola-vending-machine" (name of the original repository).
+ Unpack everything from this new folder to the root of the project tree and the foundation of the project will be setup.
+ (Optional) The **react_app** folder can be deleted anlong with the **cola-vending-machine** folder (after it has been emptied).
+ Go to the Bash and type, `npm install`.
+ All the needed packages will be installed.
+ Open **Source Control** in VSCode and click on the **Remote** tab.
+ Click on the **+** icon and enter the name of the new GitHub repo and click enter.
+ Enter the http address of this same repo.
+ Now VSCode should be connected to your GitHub repo.

### React Repo
+ Go to the location of the original repository in GitHub, [https://github.com/Richardaeld/cola-vending-machine](https://github.com/Richardaeld/cola-vending-machine).
+ Click on the **Code** button to get the drop-down menu.
+ Copy the HTTPS address provided.
+ Create a new project in GitHub and VSCode (to house the new clone) and then open this new project.
+ Go to the Bash and type, `git clone <HTTPS>`, paste the HTTPS address found in the GitHub page and press enter.
+ A clone will be created within a new folder called "cola-vending-machine" (name of the original repository).
+ Unpack everything within **react_app** to the root of the project tree and delete the imported folder, "cola-vending-machine".
+ Go to the Bash and type, `npm install`.
+ All the needed packages will be installed.
+ Open **Source Control** in VSCode and click on the **Remote** tab.
+ Click on the **+** icon and enter the name of the new GitHub repo and click enter.
+ Enter the http address of this same repo.
+ Now VSCode should be connected to your GitHub repo.

## Heroku
+ This will require two separate heroku apps to deploy properly and function.
+ The IDE refered to here is VSCode and you will need to install the extensions: Heroku and GitLens -- Git Supercharged

### API App
+ Log into Heroku.
+ Create a new app on Heroku by clicking **New** and following the directions.

#### Create a Postgres SQL Server.
+ From your new apps base page, click on **Resources**.
+ Click on **Find More Add-Ons**.
+ Select **Postgres**.
+ Finish setup.

#### Use Heroku cli Or Link Heroku and GitHub:
##### Use Heroku cli
+ Download and install the Heroku cli (https://devcenter.heroku.com/articles/heroku-cli)
+ Restart your IDE if it was on.
+ Go to the Bash and type, `heroku login`
+ Follow instructions to login.
+ Connect your IDE to your heroku app by:
    + Going to the Bash and typing, `heroku git:remote -a <heroku app name>`
    + `<heroku app name>` is the name of the app created just after logging into heroku.
+ Now your app is connected to your IDE.
+ As long as you stay on you master branch:
    + You can push up to heroku by typing, `git push heroku` into the bash.
    + *You will need to have a git version to push, which looks like:
        + `git add .`
        + `git commit -m <comment>`
        + `git push`
        + `git push heroku`

##### Link Heroku and GitHub
+ (This method my still be disabled by Heroku)
+ Log into the Heroku web page.
+ From the **Personal Apps** page, click on the new app that was just created in Heroku.
+ Click on **Deploy**.
+ Click on **GitHub** from **Deployment Method** section.
+ Enter your GitHub information and the name of the cloned repository into the "Connect to GitHub" section.

#### Heroku Variables For API
+ Share `env.py` information with Heroku.
    + Click on **Settings**.
    + Click on **Reveal Config Vars** from **Config Vars** section.
    + Add all of the `env.py` key and value pairs without their quotations.
        + Ex. (key) = (value)
        + COOKIESECURE = false
        + DATABASE_URL = (key provided from Postgres server)
        + DB_ENVIRONMENT = production
        + PGSSLMODE = no-verify
        + SAVEUNITITIALIZED = true
        + SECRET = *Any string you come up with*
        + ADMIN_SECRET = *Any string you come up with*
        <!-- + STRIPE_PUBLIC_KEY == (provided by **Stripe** as **Publishable key**) -->
        <!-- + STRIPE_SECRET_KEY == (provided by **Stripe** as **Secret Key**) -->
        <!-- + STRIPE_WH_SECRET == (provided by **Stripe** as **Webhook Signing Secret**) -->

### React App
+ Log into Heroku.
+ Create a new app on Heroku by clicking **New** and following the directions.

#### Use Heroku cli Or Link Heroku and GitHub:
##### Use Heroku cli
+ Go to the Bash and type, `heroku login`
+ Follow instructions to login.
+ Connect your IDE to your heroku app by:
    + Going to the Bash and typing, `heroku git:remote -a <heroku app name>`
    + `<heroku app name>` is the name of the app created just after logging into heroku.
+ Now your app is connected to your IDE.
+ As long as you stay on you master branch:
    + You can push up to heroku by typing, `git push heroku` into the bash.
    + *You will need to have a git version to push, which looks like:
        + `git add .`
        + `git commit -m <comment>`
        + `git push`
        + `git push heroku`

### Link Heroku and GitHub:
+ (This method my still be disabled by Heroku)
+ Log into the Heroku web page.
+ From the **Personal Apps** page, click on the new app that was just created in Heroku.
+ Click on **Deploy**.
+ Click on **GitHub** from **Deployment Method** section.
+ Enter your GitHub information and the name of the cloned repository into the "Connect to GitHub" section.

### Heroku Notes
+ Postgres requires a secure connection by default. This can cause numerous problems.
    + The work around is:
        + Add a config to heroku config vars: (PGSSLMODE=no-verify)
        + Add an additional line to knexfile.js under the production object:
            + `ssl: { rejectUnauthorized: false },`
+ Due to the requirements of this project (api and user interface sharing a single github repo) the migrations for the PostgreSQL database must be done at deployment.
    + The migration string can be found in the scripts of package.json
    + Potientially forward AND backwards migrations can be made here but each will be made at the end of a successful herou build and careful attention must be paid to the process.
        + 2 additional scripts are required for this and they are **heroku-postbuild** and **install-api**.
        + **heroku-postbuild** will be the first script called and will force heroku to call **install-api**. This will allow a non-root dir installation to heroku.
+ Due to the requirements of this project (api and user interface sharing single github repo) React.js would not deploy from the repo it was build in.
    + In order to deploy the React app the entire project needs to be copied to a new repo and extracted from its react_app folder to the root of the repo.
    + With this step completed the new repo can be successfully deployed.
    + This is detailed under **Deployment** and **Other Problems**.

# Tools
+ [Adobe Color Wheel](https://color.adobe.com/create/color-wheel)
    + Used to help pick color schemes.
+ [Bootstrap](https://getbootstrap.com/)
    + Used as framework.
+ [Font Awesome](https://fontawesome.com/)
    + Imported icons are from here.
+ [GitHub](https://github.com/)
    + Used for version control and deploys application information to Heroku.
+ [Google Fonts](https://fonts.google.com/)
    + Imported font families found here.
+ [Heroku](https://www.heroku.com/)
    + Site where application is deployed.
+ [Insomnia](https://insomnia.rest/)
    + Used as a interface to send requests to RESTFUL API.
+ [Jigsaw (Validation Service)](https://jigsaw.w3.org/css-validator/)
    + Used to identify errors in CSS.
+ [JSHint](https://jshint.com/)
    + Used to identify errors in JavaScript.
+ [JSON formatter](https://jsonformatter.org/)
    + Used to read long strings of JSON
+ [Lighthouse](https://developers.google.com/web/tools/lighthouse)
    + Used to check for performance, accessibility, best practices, and SEO.
+ [Stripe](https://stripe.com/)
    + Used to allow users to make payments with credit cards.
+ [Techsini](https://techsini.com/multi-mockup/)
    + Used for their viewable responsiveness PNG.
+ [TinyPNG](https://tinypng.com/)
    + Used to Minimize KB load per image.
+ [VSCode](https://code.visualstudio.com/)
    + Integrated development environment used.
+ [W3C Validator](https://validator.w3.org/)
    + Used to identify errors in markup.

# Acknowledgements
+ [Bootstrap](https://getbootstrap.com/)
    + A framework used to help speed up development and provide a better overall UX.
+ [Heroku Dev Center](https://devcenter.heroku.com/)
    + A great source of information about Heroku, its addions, and errors that can happen.
+ [Knex.js](http://knexjs.org/)
    + An overwhelming amount of documentation about knex.
+ [MDN Web Docs](https://developer.mozilla.org/en-US/)
    + Invaluable source of information about JavaScript, HTML, and CSS.
+ [Stack Overflow](https://stackoverflow.com/)
    + A great source of information to find a starting place for research.
+ [Stripe api docs](https://stripe.com/docs)
    + Detailed instructions on how to use their api.
+ [React](https://reactjs.org/)
    + The source for everything about React.js.
+ [W3Schools](https://www.w3schools.com/)
    + Extremely helpful for explaining base HTML, CSS, and JavaScript principles.
+ [World Wide Web Consortium (W3C)](https://www.w3.org/)
    + Used to understand basic standardization practices for web-based apps.
+ [Upsplash](https://unsplash.com/)
    + A great place to find free high quality images
    + The image: https://unsplash.com/photos/nbrvUKkWP0Q -- unbranded_can.jpg was used as a background default image for the cola cans.


