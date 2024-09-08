import mongoose from "mongoose";

export async function connect() {
  try {
    mongoose.connect(process.env.MONGODB_URI!);

    const connection = mongoose.connection;

    connection.on("connected", () => {
      console.log("mongoDB connected successfully");
    });

    connection.on("error", (error) => {
      console.error("Error connecting to mongoDB:", error);
      process.exit(1);
    });
  } catch (error) {
    console.log(error);
    console.log("something went wrong");
  }
}
