import express from "express"
import { respond } from "../../middlewares/respond"
import {addEvent, fetchAllEvents, fetchEventByID, updateEvent, addEventLink, deleteEvent} from "./event.controller"

const eventRouter = express.Router()
eventRouter.get('/', fetchAllEvents, respond)
eventRouter.get('/:id', fetchEventByID, respond)
eventRouter.post('/', addEvent, respond)
eventRouter.put('/:id', updateEvent, respond)
eventRouter.put('/:id/links', addEventLink, respond)
eventRouter.delete('/:id', deleteEvent, respond)

export default eventRouter