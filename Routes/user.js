import express from 'express';
import { register,login } from '../Controllers/user.js';

const router = express.Router();

// user register route
// @api dsc :- user register
// @api method :- post
// @api endpoint :- /api/user/register
router.post('/register',register)

// user register login
// @api dsc :- user login
// @api method :- get
// @api endpoint :- /api/user/login
router.get('/login',login)

export default router;