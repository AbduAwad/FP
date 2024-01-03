let API_KEY = '32c30f51e35127937f974835b4f4baca' // API KEY for the weather api 
const http = require('http'); // import http
const bcrypt = require('bcrypt'); // import bcrypt

async function fetchWeatherData(city) { // Function to fetch weather data from the API
    
    return await new Promise((resolve, reject) => { // return a promise
      let options = { // set the options for the api call
        host: 'api.openweathermap.org', // host is the weather api
        path: '/data/2.5/weather?q=' + city + '&appid=' + API_KEY // path is the city that the user entered and the api key
      };
      http.request(options, function (apiResponse) { // make the api call with an http request 
        let weatherData = ''; // set the weatherData to an empty string
        apiResponse.on('data', function (chunk) { // on data from the api response, add the chunk to the weatherData
          weatherData += chunk; // add the chunk to the weatherData 
        });
        apiResponse.on('end', function () { // on end of the api response
            const parsedData = JSON.parse(weatherData); // parse the weatherData
            resolve(parsedData); // resolve the parsedData
        });
      }).end(); // end the api call
    });
  }

async function hashPassword(password) { // Function to hash the password
    const numHashed = 15; // set the number of times to hash the password, the more times the more secure the encryption
    return await bcrypt.hash(password, numHashed); // return the hashed password
}

async function signupUser(usersInDataBase, userData) { // Function to signup the user

    const isExistingUser = await usersInDataBase.findOne({ name: userData.name }); // check if the user exists in the database

    if (isExistingUser) { // if the user exists
        return { success: false, message: 'Username taken' }; // return a message that the username is taken
    } else {
        const hashedPassword = await hashPassword(userData.password); // hash the password
        userData.password = hashedPassword; // set the password to the hashed password
        const userAccount = await usersInDataBase.insertMany(userData); // insert the user into the database// 
        return { success: true }; // return a message that the user was successfully created as a guest
    }
} 

function initUserDataObject() { // Function to initialize the userData object
    data = {
        _id: null,
        name: null,
        password: null,
        userPrivilege: null,
    }
    return data; // return the data object
}

async function getUsersFromDatabase(usersInDataBase) { // Function to get the users from the database, for the users page that only the admin can see

    userData = await usersInDataBase.find(); // find all the users in the database

    data = initUserDataObject(); // initialize the data object
    userDataArr = [] // initialize the userDataArr
    for (i = 0; i < userData.length; i++) { // loop through the users in the database
        data._id = userData[i]._id; // set the data object to the user data
        data.name = userData[i].name; // set the data object to the user data
        data.password = userData[i].password; // set the data object to the user data
        data.userPrivilege = userData[i].userPrivilege; // set the data object to the user data
        userDataArr.push(data); // push the data object to the userDataArr
        data = initUserDataObject(); // initialize the data object
    }
    return userDataArr; // return the userDataArr
}
    
// export the necessary functions used in server.js:
module.exports = {
    fetchWeatherData,
    hashPassword,
    signupUser,
    getUsersFromDatabase,
}