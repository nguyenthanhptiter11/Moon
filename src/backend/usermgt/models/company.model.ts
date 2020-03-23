import { Document, Model, model, Types, Schema, Query } from "mongoose"

// Schema
const CompanySchema = new Schema({
    companyName: {
        type: String,
        required: true
    },
    companyCode: {
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
export interface ICompany extends Document {
    companyName: string;
    companyCode: string;
    email?: string;
    phone: string;
    fax: string;
    taxCode: string;
}

// Default export
export default model<ICompany>("Company", CompanySchema)