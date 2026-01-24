import { Request, Response } from "express";
import {
  createBusiness,
  getAllBusinesses,
  getMyBusinesses,
  approveBusiness
} from "../services/business.service";

/**
 * Public: get all approved businesses
 */
export const getBusinessesHandler = async (
  _req: Request,
  res: Response
) => {
  const businesses = await getAllBusinesses();
  res.json(businesses);
};

/**
 * Create business
 */
export const createBusinessHandler = async (
  req: Request,
  res: Response
) => {
  const userId = (req as any).userId;

  if (!userId) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const business = await createBusiness(userId, req.body);
  res.status(201).json(business);
};

/**
 * Get logged-in user's businesses
 */
export const getMyBusinessesHandler = async (
  req: Request,
  res: Response
) => {
  const userId = (req as any).userId;

  if (!userId) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const businesses = await getMyBusinesses(userId);
  res.json(businesses);
};

/**
 * Admin approve business
 */
export const approveBusinessHandler = async (
  req: Request,
  res: Response
) => {
  const businessId = req.params.id;
  const business = await approveBusiness(businessId);
  res.json(business);
};
