import {Router} from "express"
import {protect} from "../middlewares/auth.middleware"
import {approveBusinessHandler, createBusinessHandler,getMyBusinessesHandler} from "../controllers/business.controller"
import { upload } from "../middlewares/upload.middleware"; 
import {uploadBusinessImage} from "../controllers/business.controller"

const router = Router();


//Business protected routes 
router.post("/",protect,createBusinessHandler);


//Get logged in user's businesses
router.get("/me",protect,getMyBusinessesHandler);

//Image upload routes
router.post("/:id/image",protect,upload.single("image"),uploadBusinessImage)

/**
 * Admin approves business
 */
router.patch(
  "/:id/approve",
  protect,
  approveBusinessHandler
);

export default router