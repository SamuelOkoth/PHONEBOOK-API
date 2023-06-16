import { assignGroup, deleteContact, getContact, getContacts, newContact, updateContact } from "../controllers/contact.controllers.js"
import { verifyToken } from "../middlewares/verifytoken.js"
import {Router} from "express"

export const contactRouter = Router()


contactRouter.get("/",verifyToken, getContacts)
contactRouter.get("/:id",verifyToken,getContact)
contactRouter.post("/new", verifyToken,newContact)
contactRouter.put("/:id/update",verifyToken, updateContact)
contactRouter.delete("/:id/delete",verifyToken, deleteContact)
contactRouter.patch("/:contactid/assigngroup/:groupname",verifyToken, assignGroup)


