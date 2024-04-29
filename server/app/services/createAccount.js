import userAccounts from '../models/userAccounts.js';
import { encodePassword } from '../../helper/encryption.js';
import CustomError from '../../helper/error-handlers.js';

export const createAccount = async (userAccountDetails) => {
    try {
        const [hashedPassword, salt] = await encodePassword(userAccountDetails.userPassword.encryptedPassword);

        userAccountDetails.userPassword.encryptedPassword = hashedPassword;
        userAccountDetails.userPassword.userSalt = salt;

        const user = new userAccounts(userAccountDetails);

        // Wait for the save operation to complete
        await user.save();
        return user;

    } catch (error) {
        if (error.code === 11000) {
            // Rethrow a custom error for duplicate key violation
            throw new CustomError("Account already exists!", 11000);
        } else {
            throw error;
        }
    }
};
