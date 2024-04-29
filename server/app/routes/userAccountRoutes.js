import express from 'express';
import { createUserAccount } from '../controllers/createAccount.js';
import { authenticateUserCredentials } from '../controllers/authenticateUser.js';


const router = express.Router();

router.route('/createAccount')
    .post(createUserAccount)

router.route('/login')
    .post(authenticateUserCredentials);

export default router;