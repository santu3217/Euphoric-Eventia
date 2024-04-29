// Importing mongoose to interact with MongoDB.
import mongoose from 'mongoose';

// Using the Schema constructor from mongoose to create a new schema.
const Schema = mongoose.Schema;

// Defining a new schema for user accounts.
const userAccountsSchema = new Schema({
    userName: {
        type: String, // Setting the data type for userName as String.
        require: true  // userName is a required field.
    },
    userEmail: {
        type: String,  // Setting the data type for userEmail as String.
        required: true, // userEmail is a required field.
        unique: true   // userEmail must be unique across all documents.
    },
    userPassword: {
        encryptedPassword: {
            type: String, // Setting the data type for encryptedPassword as String.
            required: true // encryptedPassword is a required field.
        },
        userSalt: {
            type: String, // Setting the data type for userSalt as String.
            required: true // userSalt is a required field.
        }
    }
});

// Creating a model from the schema to interface with the 'userAccounts' collection in the database.
const userAccountsModel = mongoose.model('userAccounts', userAccountsSchema);

// Exporting the userAccountsModel for use in other parts of the application.
export default userAccountsModel;
