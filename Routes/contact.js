
import express from 'express';
import { deleteContactById, getallContact, getContactbyId, getContactByUserId, newContact ,updateContactById } from '../Controllers/contact.js';
import { isAuthenticated } from '../Middlewares/auth.js';


const router =  express.Router();

// new contact
// @api dsc:- create new contact
// @api method :- post
// @api endpoint :- /api/contact/new

router.post('/new',isAuthenticated,newContact);

// get all contact
router.get('/',getallContact)

// get contact by id
router.get('/:id',getContactbyId)

// update contact
router.put('/:id',isAuthenticated,updateContactById);

//delete contact by id
router.delete('/:id',isAuthenticated,deleteContactById)

// get contact by user id
router.get('/userid/:id',getContactByUserId) 


export default router;

