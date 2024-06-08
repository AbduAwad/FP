NAME: Abdulrahman Awad

INSTALL INSTRUCTIONS: 

1. Because we already have our package.json and package-lock.json files including the express and
other helper required modules, The required modules are specified in the dependencies section of 
the package.json file. To install those modules cd into the src folder and  run the command

>cd src
>npm install

LAUNCH INSTRUCTIONS:

1. Open terminal
2. Navigate to the directory containing the server.js file (src folder)
3. Run the following command in the terminal: `node server.js`

- Expected Terminal Output:
The Server is running on Port: 3000
To Test:
http://localhost:3000
--Connected to MongoDB database--


TESTING INSTRUCTIONS: http://localhost:3000

1. Open a browser at http://localhost:3000

2. To test the signUp functionality, enter a unique username and password and press the signUp button.
   - Expected Result: A new user is created and added to the database. The user is redirected to the login page.

3. To test the login functionality, enter the username and password of a user that exists in the database and 
press the login button.
   - Expected Result: The user is redirected to the home page. (However, if the user who logs in is the admin
     then the user is redirected to the users page, where the admin can view all the users in the database) and
     then return to the home page.

4. To test the api weather data functionality, enter a one-word city in the homepage search box and 
press the search 
button, then press the weather button.
   - Expected Result: The weather data for the city is displayed on the page.

TO TEST ADMIN PRIVILEGES:

1. To login as the admin:
user: abdu
pass: 1234

once you log in as admine you will be redirected to the users page where you can view all the users in the database. An you can also go back
to the home page by clicking the home button at the bottom.

YOUTUBE VIDEO LINK: https://youtu.be/jzIieRL1MCU


