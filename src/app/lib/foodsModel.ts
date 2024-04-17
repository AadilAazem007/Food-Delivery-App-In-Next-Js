import mongoose from "mongoose";

const foodSchema = new mongoose.Schema({
    name:{ type: String, required: true, trim: true },
    price:{ type: String, required: true, trim: true },
    path: { type: String, required: true, trim: true },
    description:{ type: String, required: true, trim: true },
    restro_id: mongoose.Schema.Types.ObjectId
})


export default mongoose.models.foods || mongoose.model("foods", foodSchema)