import { respond } from '../../middlewares/respond';

import { Router } from 'express';
import { deleteContact, getAllContacts, getContactById, postContactData, updateContact } from './contact.controller';

const contactRouter = Router();

contactRouter.get('/getAllContacts', getAllContacts, respond);
contactRouter.get('/getContactById/:id', getContactById, respond);
contactRouter.post('/postContact', postContactData, respond);
contactRouter.patch('/updateContact/:id', updateContact, respond);
contactRouter.delete('/deleteContact/:id', deleteContact, respond);

export default contactRouter;
