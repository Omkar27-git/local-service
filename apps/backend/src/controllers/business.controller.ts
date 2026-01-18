import { Request, Response } from "express"
import { createBusiness, getMyBusinesses } from "../services/business.service"
import Business from "../models/business.model"
import {uploadToS3} from "../utils/s3Upload"
import { approveBusiness } from "../services/business.service";


//Create a new business
export const createBusinessHandler = async (req: Request, res: Response) => {
  const userId = (req as any).userId;

  const business = await createBusiness(userId, req.body);
  res.status(201).json(business);

};

//Get logged in user's businesses

export const getMyBusinessesHandler = async (req: Request, res: Response) => {
  const userId = (req as any).userId;

  const businesses = await getMyBusinesses(userId);

  res.status(201).json(businesses)
}


//Upload business image(temporary)
export const uploadBusinessImage = async (req: Request, res: Response) => {
  const businessId = req.params.id;

  //Multer puts file on req.file
  if (!req.file) {
    return res.status(401).json({
      message: "No image file uploaded"
    })
  }


  //Upload to S3
  const imageUrl = await uploadToS3(req.file);

  //Save image url to business
  const business = await Business.findByIdAndUpdate(
    businessId,
    {$push:{images:imageUrl}},
    {new:true}
  );


  res.json({
     message: "Image uploaded successfully",
    imageUrl,
    business
  })

};
 

/**
 * Admin approves business
 */
export const approveBusinessHandler = async (
  req: Request,
  res: Response
) => {
  const businessId = req.params.id;

  const business = await approveBusiness(businessId);

  res.json(business);
};