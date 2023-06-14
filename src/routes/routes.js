import {Router} from "express"
import { assignGroup, deleteContact, getContact, getContacts, newContact, updateContact } from "../controllers/controllers.js"

export const contactRouter = Router()


contactRouter.get("/",getContacts)
contactRouter.get("/:id",getContact)
contactRouter.post("/new", newContact)
contactRouter.put("/update", updateContact)
contactRouter.delete("/delete", deleteContact)
contactRouter.patch("/group", assignGroup)


