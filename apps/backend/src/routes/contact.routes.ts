import { Router } from "express";
import { contactHandler } from "../controllers/contact.controller";

const router = Router();
router.post("/contact",contactHandler);

export default router;


