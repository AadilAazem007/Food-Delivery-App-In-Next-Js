import mongoose from "mongoose";
const {username,password} = process.env
//const connectionStr="mongodb+srv://"+username+":"+password+"@cluster0.r3vpuhg.mongodb.net/restroDB?retryWrites=true&w=majority&appName=Cluster0"
const MONGO_URI:string = process.env.MONGOURI;

export async function connectToDatabase(): Promise<void> {
    if (!MONGO_URI) {
      throw new Error("Missing environment variable MONGO_URI");
    }

    const DB_OPTION = {
        dbName:"foodDeliverApp"
    }
  
    await mongoose.connect(MONGO_URI,DB_OPTION) // No useNewUrlParser needed
  }