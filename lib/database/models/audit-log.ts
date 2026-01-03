// models/AuditLog.ts
import mongoose, { Schema, Document } from "mongoose";


export interface IAuditLog extends Document {
adminId: string;
action: "CREATE" | "UPDATE" | "DELETE";
entity: "CATEGORY" | "PRODUCT";
entityId: string;
before?: any;
after?: any;
}


const AuditLogSchema = new Schema<IAuditLog>(
{
adminId: { type: String, required: true },
action: { type: String, required: true },
entity: { type: String, required: true },
entityId: { type: String, required: true },
before: Schema.Types.Mixed,
after: Schema.Types.Mixed
},
{ timestamps: true }
);


export default mongoose.models.AuditLog || mongoose.model<IAuditLog>("AuditLog", AuditLogSchema);