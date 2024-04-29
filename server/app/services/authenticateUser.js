import userAccounts from '../models/userAccounts.js';
import { verifyPassword } from '../../helper/encryption.js';
import { getUser } from '../../helper/helpers.js';
import CustomError from '../../helper/error-handlers.js';

export const authenticateUser = async (userAccountDetails) => {
    try {
        const userEnteredPassword = userAccountDetails.userPassword;
        const userEmail = userAccountDetails.userEmail;
        const user = await getUser(userEmail);
      
        const userPassword = user.userPassword.encryptedPassword;
        const userSalt = user.userPassword.userSalt;
        const verify =  verifyPassword(userEnteredPassword, userPassword, userSalt);

        if(verify){
            return verify;
        } else {
            throw new CustomError("Invalid Email or Password", 401);
        }
    } catch (err) {
       throw err;
    }
}