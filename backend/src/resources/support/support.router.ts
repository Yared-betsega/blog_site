import { respond } from '../../middlewares/respond';

import { Router } from 'express';
import { deleteSupport, getAllSupports, getSupportById, postSupportData, updateSupport } from './support.controller';

const supportRouter = Router();

supportRouter.get('/getAllSupport', getAllSupports, respond);
supportRouter.get('/getSupportById/:id', getSupportById, respond);
supportRouter.post('/postSupport', postSupportData, respond);
supportRouter.patch('/updateSupport/:id', updateSupport, respond);
supportRouter.delete('/deleteSupport/:id', deleteSupport, respond);

export default supportRouter;
