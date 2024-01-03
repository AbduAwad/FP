mongoDB = require('mongoose'); // mongoose is a library that helps us connect to the mongoDB database

databaseUserSchema = new mongoDB.Schema({ // this is the schema for the login information in the database

    name:{ // we have a name parameter, which is the username
        type: String, // the type is a string
        required: true, // a name is required in the database for the user to login
        min : 1, // the minimum length of the username is 1 character
    },

    password:{ // password is hashed
        type: String, // the type is a string
        required: true, // a password is required in the database for the user to login
        min : 1, // the minimum length of the password is 1 character
    },

    userPrivilege:{ // userPrivilege is a boolean, true = admin, false = guest
        type: Boolean, // true = admin, false = guest
        default: false, // one usr so the default is false (a guest), the only way it gets changed to true
        // is if the admin changes it , in the mongoDB database, to set someone as an admin.
    },
});

usersInDataBase = new mongoDB.model("users", databaseUserSchema); // this is the collection that we are using in the database, collection is set to users and the schema is the databaseUserSchema.
module.exports = usersInDataBase; // export the collection so we can use it in other files