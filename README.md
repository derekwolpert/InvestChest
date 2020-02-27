<a href="https://investchest.herokuapp.com">
    <img src="./readme_images/logo.png" alt="InvestChest Logo" title="InvestChest" align="right" height="60" />
</a>

# InvestChest

## Overview

InvestChest was completed as a part of the Winter 2020 assessment for the New York Tech Talent Pipeline. The given instructions were to build a full-stack web-based stock portfolio application where users can purchase stock based on values fetched from a third-party API. 
The specifics of the functionality for the app (user registration, sign-in, purchase forms, portfolio and transaction page, etc.) were given ahead of time, as were rough design and styling guidelines (including the wireframe mockups included below).

Technologies used include <b>MERN (MongoDB, Express.js, React, Node.js) stack, Redux, Webpack, Sass, CSS3, HTML5</b> and the third-party <b>IEX Cloud</b> finance API.

### [This project is currently hosted at investchest.herokuapp.com - CLICK HERE to visit the live version of this project](https://investchest.herokuapp.com/#/)

<p align="middle">
    <img src="./readme_images/final_splash.png" width="430" />
    <img src="./readme_images/dark_portfolio.png" width="430" />
</p>

## Architecture & Technologies

- <b>React</b>, a JavaScript library used to assist with efficient management of rapidly changing data and maintaining a single-page web application structure.
- <b>Redux</b>, a JavaScript library used in coordination with React to create a centralized store for organizing and accessing data.
- <b>Express.js</b>, a web application framework, used with Node.js, to provide server-side structure for querying and retrieval of API data.
- <b>Node.js</b>, a runtime environment used to execute JavaScript for server-side scripting.
- <b>JavaScript</b>, the project's front and backend programing language.
- <b>MongoDB</b>, a document-oriented (NoSQL) database system used for storage and management of information.
- <b>Webpack</b>, a JavaScript bundler to assist with development and production builds.
- <b>Sass, CSS3 and HTML5</b>, used to manage the presentation and styling of the project.
- <b>IEX Cloud</b>, a third-party finance API used to query and receive real-time stock prices.

## Functionality

- Comprehensive registration/authentication behavior for management of user sessions, and keeping track of user information (e.g. available cash, trades association, etc.).
- Error handling for input fields to prevent invalid entries along with appropriate error messages (e.g. prevents users from signing in with incorrect credentials, stops a user from registering an account under a previously used email address, prevent purchase of a stocks that cost more than a user's available cash, etc.).
- Separate Portfolio and Transaction pages. Portfolio page displays an aggregated list of all stocks a user has purchased, and lists in alphabetical order based on stock ticker. If a stock was purchased in two separate transactions then the transactions are grouped together. Transaction page displays a list of each individual trade in reverse-chronological order.
- Color indicators for the pricing information on the Portfolio page to indicate if a user has gained (green) or lost (red) money when comparing how much they've spent on the stock verses it's current price.
- Dynamic and auto-detecting light/dark mode in conjunction with a theme switch in the webpage's header.
- A polished, intuitive, responsive user interface/experience.

![Dark/Light Theme Gif](./readme_images/dark_light.gif)

## Folder Structure

    # Backend Directory

    .
    ├── config          # includes access keys, and user auth config
    ├── frontend        # see the frontend directory below
    |   └── ...
    ├── models          # defines the structure of db schema
    ├── readme_images   # images used on this page
    ├── routes
    |   └── api         # set connection btw frontend, backend
    |                       # and db interactions
    └── validation      # checks an instances details before registering
                            # or modifying a db entry   

    # Frontend Directory

    frontend
    ├── dist                    # compiled js and css files
    ├── public                  # publicly accessible files
    |                               # including primary html   
    ├── src
    |   |── actions 
    |   |── components          # react components
    |   |   |── footer
    |   |   |── header
    |   |   |── modal
    |   |   |── portfolio
    |   |   |── purchase
    |   |   |── session
    |   |   |── splash
    |   |   |── theme_switch
    |   |   └── transactions
    |   |── middleware          # includes a thunk middleware definition
    |   |── reducers            # organizes information for the
    |   |                           # global redux store
    |   |── store               # defines the redux store
    |   └── util                # set api calls to access backend
    └── styles                  # design/styling files

## Wireframe vs. Final Design

<p align="middle">
    <img src="./readme_images/wireframe_signin.jpg" width="430" />
    <img src="./readme_images/final_signin.png" width="430" />
</p>
<p align="middle">
    <img src="./readme_images/wireframe_register.jpg" width="430" />
    <img src="./readme_images/final_register.png" width="430" />
</p>
<p align="middle">
    <img src="./readme_images/wireframe_portfolio.jpg" width="430" />
    <img src="./readme_images/final_portfolio.png" width="430" />
</p>
<p align="middle">
    <img src="./readme_images/wireframe_transactions.jpg" width="430" />
    <img src="./readme_images/final_transactions.png" width="430" />
</p>

## Potential Future Features

- Enhanced ticker symbol field in the purchase form with predictive values based on valid inputs, allow querying based on company name
- Enhanced responsiveness for various screen sizes, and mobile optimization
- Implement selling of stocks within a user's portfolio, which would be included as their own separate entries on the Transaction page

## Resources

- The background image for the splash page was taken by Verne Ho, and was feature on Unsplash: https://unsplash.com/photos/0LAJfSNa-xQ
- The basis for the styling of the loading spinner adapted from Loading.io: https://loading.io/css
- The CSS reset used in this project: https://meyerweb.com/eric/tools/css/reset
- Color selection variables inspired by Base16 default colors: http://chriskempson.com/projects/base16/
