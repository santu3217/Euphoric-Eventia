import userAccounts from '../app/models/userAccounts.js';


export const getUser = async (userEnteredEmail) => {
    const user = await userAccounts.findOne({userEmail: userEnteredEmail}).exec();
    return user;
}