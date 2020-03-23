//src/models/msmoon.model.ts

import mongoose from "mongoose";

export interface IMSMoonInput {
    id: IMSMoon['_id'],
    name: string,
    gender: string,
    isSingle: boolean,
    age: number,
    height: number,
    weight: number,
    photo: string
}
export interface IMSMoonOutput extends Document{
    id: string,
    name: string,
    gender: string,
    isSingle: boolean,
    age: number,
    height: number,
    weight: number,
    photo: string
}
export interface IMSMoon extends mongoose.Document {
    _doc: any,
    name: string,
    gender: string,
    isSingle: boolean,
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
export const MSMoon = mongoose.model<IMSMoon>("MSMoon", MSMoonSchema);