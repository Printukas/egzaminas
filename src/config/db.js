import { connect } from "mongoose";

const dbConnect = async () => {
  try {
    await connect(process.env.MONGODB_URI);
    console.log("Prisijungta prie MongoDB");
  } catch (err) {
    console.error("Nepavyko prisijungti prie DB:", err.message);
    process.exit(1);
  }
};

export default dbConnect;
