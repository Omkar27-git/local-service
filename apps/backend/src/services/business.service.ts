import Business from "../models/business.model";

export const createBusiness = async (
  ownerId: string,
  data: any
) => {
  return Business.create({
    owner: ownerId,
    ...data
  });
};

export const getAllBusinesses = async () => {
  return Business.find({ isApproved: true }).sort({ createdAt: -1 });
};

export const getMyBusinesses = async (ownerId: string) => {
  return Business.find({ owner: ownerId });
};

export const approveBusiness = async (businessId: string) => {
  return Business.findByIdAndUpdate(
    businessId,
    { isApproved: true },
    { new: true }
  );
};
