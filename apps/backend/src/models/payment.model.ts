import mongoose from "mongoose"

const paymentSchema = new mongoose.Schema({
    booking:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Booking",
        required:true
    },

    amount:{
        type:Number,
        required:true
    },

    currency:{
        type:String,
        default:"INR"
    },

    status:{
        type:String,
        enum:["created","paid","failed"],
        default:"created"
    },

    razorpayOrderId:{
        type:String
    },

    razorpayPaymentId:{
        type:String
    }
},{timestamps:true})


export default mongoose.model("Payment",paymentSchema);