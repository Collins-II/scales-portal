// models/Category.ts
import mongoose, { Schema, Document, Types } from "mongoose";


export interface ICategory extends Document {
name: string;
slug: string;
description?: string;
parent?: Types.ObjectId | null;
products: Types.ObjectId[]; // product / scale IDs
}


const CategorySchema = new Schema<ICategory>(
{
name: { type: String, required: true },
slug: { type: String, required: true, unique: true },
description: String,
parent: { type: Schema.Types.ObjectId, ref: "Category", default: null },
products: [{ type: Schema.Types.ObjectId, ref: "Product" }]
},
{ timestamps: true }
);


CategorySchema.index({ parent: 1 });


export default mongoose.models.Category || mongoose.model<ICategory>("Category", CategorySchema);