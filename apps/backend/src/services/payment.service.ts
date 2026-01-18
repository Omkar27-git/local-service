import { razorpay } from "../config/razorpay";
import Payment from "../models/payment.model";
import crypto from "crypto";


//Create Razorpay Order

export const createPaymentOrder = async (
    bookingId: string,
    amount: number
) => {
    const order = await razorpay.orders.create({
        amount: amount * 100, //razorpay works in paise
        currency: "INR"
    });

    const payment = await Payment.create({
        booking: bookingId,
        amount,
        razorpayOrderId: order.id,
        status: "created"
    });

    return {
        orderId: order.id,
        amount: order.amount,
        currency: order.currency,
        paymentId: payment._id
    };
}





/**
 * Verify Razorpay payment
 */
export const verifyPayment = async (
  razorpayOrderId: string,
  razorpayPaymentId: string,
  razorpaySignature: string
) => {
  const body = `${razorpayOrderId}|${razorpayPaymentId}`;

  const expectedSignature = crypto
    .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET!)
    .update(body)
    .digest("hex");

  if (expectedSignature !== razorpaySignature) {
    throw new Error("Invalid payment signature");
  }

  const payment = await Payment.findOneAndUpdate(
    { razorpayOrderId },
    {
      razorpayPaymentId,
      status: "paid"
    },
    { new: true }
  );

  return payment;
};
