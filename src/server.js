const port = process.env.PORT || 3000; // set the port for the server

const usersInDataBase = require("./config.js"); // import the usersInDataBase from config.js
const bcrypt = require('bcrypt'); // import bcrypt
const path = require('path'); // import path
const express = require('express'); // import express
const app = express(); // create express app

const { fetchWeatherData } = require('./helpers'); // import fetchWeatherData function from helpers.js
const { signupUser } = require('./helpers'); // import signupUser function from helpers.js
const { getUsersFromDatabase } = require('./helpers'); // import getUsersFromDatabase function from helpers.js

app.use(express.json()); // use express json middleware
app.use(express.urlencoded({ extended: false })); // use express urlencoded middleware

const mongoDb = require('mongoose'); // import mongoose for the database to connect to mongoDB

mongoDb // connect to the mongoDB database
  .connect("mongodb+srv://abdulrahmanawad:Com55Com!@cluster0.pwihncw.mongodb.net/FinalProject") // connect to the mongoDB database,
  .then(() => { console.log("--Connected to MongoDB database--"); }) // if the connection is successful, log that the connection is successful, in the console
  .catch((err) => { console.log(err); }); // if the connection is unsuccessful, log the error, in the console

app.set('public', path.join(__dirname, '..', 'public')); // set the public folder
app.set('view engine', 'ejs'); // set the view engine to ejs

app.set('views', path.join(__dirname, '..', 'views')); // set the views folder
app.use(express.static(path.join(__dirname, '..', 'public'))); // use the public folder

//below is the code for the routes to the different templates:
app.get('/', (req, res) => { // get request for the signup page
    res.render("signUp"); // render the signup page
});

app.get('/signup', (req, res) => { // get request for the signup page
    res.render("signup"); // render the signup page
});

app.get('/login', (req, res) => { // get request for the login page
    data = {
      isPasswordMatch: "",
    }
    res.render("login", data); // render the login page
});

app.post('/signup', async (req, res) => { // post request for the signup page
  const userData = { // create a userData object
      name: req.body.username, // set the name to the username that the user entered
      password: req.body.password, // set the password to the password that the user entered
  };

  const signupResult = await signupUser(usersInDataBase, userData); // call the signupUser function from helpers.js and pass in the usersInDataBase and userData
  if (signupResult.success) { // if the signupResult is successful
      res.redirect('/login?signUpSuccessful=true'); // redirect to the login page
  } else {
      res.redirect(`/signup?signUpSuccess=false&message=${signupResult.message}`); // redirect to the signup page
  }
});

//Login User
app.post('/login', async (req, res) => { // post request for the login page

    isUserExists = await usersInDataBase.findOne({ name:req.body.username }); // check if the user exists in the database
    if (!isUserExists) { // if the user does not exist
        data = { // set the data object
          isPasswordMatch: "Username does not exist in our database... Try Again or Sign up", // set the isPasswordMatch to Username does not exist... Try Again
        }
       // break out of here and go to signUp page
       res.render("login", data); // render the login page and pass in the data object that the username does not exist in the database
    }
    if (isUserExists) { // if the user exists
      isPasswordMatch = await bcrypt.compare(req.body.password, isUserExists.password); // check if the password matches the password in the database
      if (isPasswordMatch) { // if the password matches
        const userPrivilege = isUserExists.userPrivilege; // set the userPrivilege to the userPrivilege in the database
        if (userPrivilege) { // if the userPrivilege is true
            userDataArr = await getUsersFromDatabase(usersInDataBase); // call the getUsersFromDatabase function from helpers.js and pass in the usersInDataBase
            res.render("users", userDataArr); // render the users template and pass in the userDataArr
        } else { // if the userPrivilege is false
            weatherData = { // Let city be a initial value str value when Home Page is loaded
              weather: "",
            }
            res.render("homePage", weatherData); // render the homePage template and pass in the weatherData which is an empty string to start
        }
      } else { // if the password does not match, have the user try again
          data = { // create a data object
            isPasswordMatch: "Password does not match... Try Again", // set the isPasswordMatch to Password does not match... Try Again
          }
          res.render("login", data); // render the login page and pass in the data object that the password does not match
      }
    }
});

app.post('/homePage', async (req, res) => { // post request for the homePage

  let city = req.body.search; // set the city to the city that the user entered
  const weather = await fetchWeatherData(city); // set the weather to the fetchWeatherData function from helpers.js which makes an api call to the weather api and pass in the city.
  weatherData = { // set the weather data object
    weather: JSON.stringify(weather), // set the weather to the weather that was returned from the api call
  }
  res.render("homePage", weatherData); // render the homePage template and pass in the weatherData
});

app.listen(port,() => { // listen on the port 3000, which is the port that the server is running on
  console.log(`The Server is running on Port: ${port}`); // log that the server is running on the port
  console.log("To Test:") // log to test
  console.log(`http://localhost:${port}`); // log the url to test
});