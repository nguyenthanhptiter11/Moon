//src/models/msmoon.model.ts

import mongoose from "mongoose";

const MSMoonSchema = new mongoose.Schema({
    name: String,
    gender: String,
    isSingle: Boolean,
    age: Number,
    height: Number,
    weight: Number,
    photo: String
});

//Creating our model
export const MSMoon = mongoose.model("MSMoon", MSMoonSchema);