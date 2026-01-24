import { Router } from "express"
import authRoutes from "./auth.routes"
import businessRoutes from "./business.routes"
import bookingRoutes from "./booking.routes"
import contactRoutes from "./contact.routes";



const router = Router();


router.use("/auth", authRoutes)
router.use("/business", businessRoutes)
router.use("/bookings", bookingRoutes)
router.use("/",contactRoutes)



export default router