import { Document, Model, model, Types, Schema, Query } from "mongoose"

// Schema
const DepartmentSchema = new Schema({
    departmentName: {
        type: String,
        required: true
    },
    departmentCode: {
        type: String,
        unique: true,
        required: true,
        lowercase: true
    },
    email: {
        type: String
    },
    phone: {
        type: String
    },
    fax: {
        type: String
    },
    taxCode: {
        type: String
    }
})

// DO NOT export this
export interface IDepartment extends Document {
    departmentName: string;
    departmentCode: string;
    email?: string;
    phone: string;
    fax: string;
    taxCode: string;
    // leave the company field out
}

// Default export
export default model<IDepartment>("Department", DepartmentSchema)