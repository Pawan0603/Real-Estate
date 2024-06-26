import mongoose from "mongoose";

const connectDb = handler => async (req, res) => {
  if (mongoose.connections[0].readyState) {
    return handler(req, res)
  }
  // await mongoose.connect(process.env.MONGO_URI)
  await mongoose.connect("mongodb+srv://Pawanthakre:pawanthakre@propertydatabase.zlayvoj.mongodb.net/?retryWrites=true&w=majority")
  return handler(req, res);
}

export default connectDb;
