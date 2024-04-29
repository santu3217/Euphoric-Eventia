// Importing bcrypt for password hashing and util for promisifying callback-based functions.
import bcrypt from 'bcrypt';
import { promisify } from 'util';

// Setting the number of rounds for salt generation in bcrypt.
const saltRounds = 5;

// Promisifying bcrypt's genSalt and hash methods to use async/await syntax.
const genSaltAsync = promisify(bcrypt.genSalt);
const hashAsync = promisify(bcrypt.hash);

// Function to encode (hash) a password.
export const encodePassword = async (password) => {
    try {
        // Generating a salt using bcrypt with predefined rounds.
        const salt = await genSaltAsync(saltRounds);

        // Hashing the password with the generated salt.
        const hashedPassword = await hashAsync(password, salt);

        // Returning the hashed password and the salt.
        return [hashedPassword, salt];
    } catch (error) {
        // Throwing an error if something goes wrong.
        throw error;
    }
};

// Function to verify a password against its hash.
export const verifyPassword = async (enteredPassword, correctPassword, salt) => {
    try {
        // Hashing the entered password with the original salt.
        const enteredPasswordHash = await hashAsync(enteredPassword, salt);

        // Comparing the hashed entered password with the correct hashed password.
        if (enteredPasswordHash == correctPassword){
            return true; // If they match, return true.
        }
        return false; // If they don't match, return false.
    } catch (error) {
        // Throwing an error if something goes wrong.
        throw error
    }
}
