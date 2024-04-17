import mongoose from "mongoose";

const RestaurantSchema = new mongoose.Schema({
  email: { type: String, required: true, trim: true },
  password: { type: String, required: true, trim: true },
  confirmPassword: { type: String, required: true, trim: true },
  restaurantName: { type: String, required: true, trim: true },
  city: { type: String, required: true, trim: true },
  mobile: { type: String, required: true, trim: true },
  address: { type: String, required: true, trim: true },
});

export default mongoose.models.restaurants || mongoose.model("restaurants", RestaurantSchema)