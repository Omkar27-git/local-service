import Business from "../models/business.model";

interface CreateBusinessInput {
  name: string;
  category: string;
  description: string;
}

export const createBusiness = async (
  ownerId: string,
  data: CreateBusinessInput
) => {
  if (!ownerId) {
    throw new Error("Owner is required");
  }

  const { name, category, description } = data;

  if (!name || !category || !description) {
    throw new Error("All business fields are required");
  }

  return Business.create({
    owner: ownerId,
    name,
    category,
    description,
    isApproved: true // can change later to admin approval
  });
};

export const getAllBusinesses = async () => {
  return Business.find({ isApproved: true })
    .sort({ createdAt: -1 });
};

export const getMyBusinesses = async (ownerId: string) => {
  return Business.find({ owner: ownerId })
    .sort({ createdAt: -1 });
};

export const approveBusiness = async (businessId: string) => {
  return Business.findByIdAndUpdate(
    businessId,
    { isApproved: true },
    { new: true }
  );
};
