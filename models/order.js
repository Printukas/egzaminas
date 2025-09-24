import mongoose from "mongoose";


const orderSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    equipment: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Equipment",
      required: true,
    },
    fromDate: {
      type: Date,
      required: [true, "Pradžios data yra privaloma"],
      validate: {
        validator: function (value) {
          return value >= new Date().setHours(0, 0, 0, 0); // tik nuo šiandien
        },
        message: "Negalima rezervuoti praeities datos",
      },
    },
    toDate: {
      type: Date,
      required: [true, "Pabaigos data yra privaloma"],
      validate: {
        validator: function (value) {
          return !this.fromDate || value > this.fromDate;
        },
        message: "Pabaigos data turi būti vėlesnė už pradžios datą",
      },
    },
    status: {
  type: String,
  enum: ["laukianti", "patvirtinta", "atmesta", "vykdoma"],
  default: "laukianti",
},
  },
  { timestamps: true }
);

export default mongoose.model("Order", orderSchema);
