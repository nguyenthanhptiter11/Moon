
import mongoose, { Schema, Document } from 'mongoose';
import { IMSMoon } from './msmoon.model';

export interface IPet extends Document {
  name: string;
  owner: IMSMoon['_id'];
}

const PetSchema: Schema = new Schema({
  name: { type: String, required: true },
  owner: { type: Schema.Types.ObjectId, required: true }
});

export default mongoose.model<IPet>('Pet', PetSchema);