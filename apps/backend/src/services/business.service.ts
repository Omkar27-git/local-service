import Business from "../models/business.model";

/**
 * Create a new business for a user
 */
export const createBusiness = async (
  ownerId: string,
  data: any
) => {
  const business = await Business.create({
    owner: ownerId,
    ...data
  });

  return business;
};

/**
 * Get all businesses created by a user
 */
export const getMyBusinesses = async (ownerId: string) => {
  return Business.find({ owner: ownerId });
};


/**
 * Approve business (admin)
 */
export const approveBusiness = async (
  businessId: string
) => {
  return Business.findByIdAndUpdate(
    businessId,
    { isApproved: true },
    { new: true }
  );
};
