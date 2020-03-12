//src/models/msmoon.model.ts

import mongoose from "mongoose";

export interface IMSMoon extends Document {
    _id: string,
    name: string,
    gender: string,
    isSingle: string,
    age: number,
    height: number,
    weight: number,
    photo: string
}

const MSMoonSchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true },
    gender: String,
    isSingle: Boolean,
    age: Number,
    height: Number,
    weight: Number,
    photo: String
});

//Creating our model
export const MSMoon = mongoose.model("MSMoon", MSMoonSchema);