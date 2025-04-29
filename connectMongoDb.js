import mongoose from "mongoose";

const connectDB = async () => {
  try {
<<<<<<< HEAD
    const conn = await mongoose.connect(process.env.CONNECTION_URL, {
=======
    const conn = await mongoose.connect(process.env.CONNECTION_URL, {
>>>>>>> d5424bc97b8a1bc5c3c1dc96843d842885b92a40
      useUnifiedTopology: true,
      useNewUrlParser: true,
    });
    console.log(`MongoDB connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

export default connectDB;
  
