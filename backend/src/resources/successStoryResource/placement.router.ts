import { Router } from "express";
import { addPlacement, getAllPlacements } from "./placement.controller";
import { respond } from '../../middlewares/respond';
const placementRouter = Router()
placementRouter.post('/add', addPlacement, respond)
placementRouter.get('/', getAllPlacements, respond)
export default placementRouter