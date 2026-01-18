import { Request, Response } from "express";
import { createPaymentOrder } from "../services/payment.service";
import { verifyPayment } from "../services/payment.service";




/**
 * Create payment order
 */
export const createPaymentOrderHandler = async (
  req: Request,
  res: Response
) => {
  const { bookingId, amount } = req.body;

  const payment = await createPaymentOrder(
    bookingId,
    amount
  );

  res.status(201).json(payment);
};


/**
 * Verify payment
 */
export const verifyPaymentHandler = async (
  req: Request,
  res: Response
) => {
  const {
    razorpayOrderId,
    razorpayPaymentId,
    razorpaySignature
  } = req.body;

  const payment = await verifyPayment(
    razorpayOrderId,
    razorpayPaymentId,
    razorpaySignature
  );

  res.json({
    message: "Payment verified successfully",
    payment
  });
};

