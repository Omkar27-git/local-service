import { Router } from "express";
import {
  getBusinessesHandler,
  createBusinessHandler,
  getMyBusinessesHandler,
  approveBusinessHandler
} from "../controllers/business.controller";

const router = Router();

router.get("/", getBusinessesHandler);
router.post("/", createBusinessHandler);
router.get("/me", getMyBusinessesHandler);
router.put("/:id/approve", approveBusinessHandler);

export default router;
