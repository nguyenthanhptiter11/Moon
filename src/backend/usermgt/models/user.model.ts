import { Document, Model, model, Types, Schema, Query } from 'mongoose'
import { ICompany } from './company.model'
import { CustomeValidTypeRegExp } from '../../common/utils.function';
import { IDepartment } from './department.model'

// Schema
const UserSchema = new Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: String,
    username: {
        type: String,
        unique: true,
        required: true,
        lowercase: true
    },
    _password: {
        type: String,
        required: true
    },
    company: {
        type: Schema.Types.ObjectId,
        ref: 'Company'
    },
    department: {
        type: Schema.Types.ObjectId,
        ref: 'Department'
    },
    gender: {
        type: Number,
        enum: [0, 1, 2],
        default: 0,
        required: true
    },
    email: {
        type: String,
        trim: true,
        lowercase: true,
        unique: true,
        required: 'Email address is required',
        match: [CustomeValidTypeRegExp.VALIDATE_EMAIL, 'Please fill a valid email address']
    },
    friends: [{
        type: String,
    }],
    creditCards: {
        type: Map,
        of: String
    },
    profile: {
        type: Map,
        of: String
    }
})

enum Gender {
    Male = 0,
    Female = 1,
    Unknow = 2
}

// DO NOT export this
interface IUserSchema extends Document {
    firstName: string;
    lastName?: string;
    username: string;
    _password: string;
    // leave the company field out
    gender: Gender;
    friends: Types.Array<string>;
    creditCards?: Types.Map<string>;
    profile?: Types.Map<string>;
}

// Virtuals
UserSchema.virtual('fullName').get(function (this: { firstName: string, lastName: string }) {
    return `${this.firstName} ${this.lastName}`;
});

// Validate
UserSchema.path('email').validate(function (email: string) {
    var emailRegex = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
    return emailRegex.test(email); // Assuming email has a text attribute
}, 'The e-mail field cannot be empty.')

// Methods
UserSchema.methods.getGender = function () {
    return this.gender === 0 ? 'Male' : this.gender === 1 ? 'Female' : 'Unknow'
}

// DO NOT export
interface IUserBase extends IUserSchema {
    fullName: string;
    getGender(): string;
}

// Export this for strong typing
export interface IUser extends IUserBase {
    company: ICompany['_id'];
    department: IDepartment['_id'];
}

// Export this for strong typing
export interface IUser_populated extends IUserBase {
    company: ICompany;
    department: IDepartment;
}

// Static methods
UserSchema.statics.findMyCompany = async function (id: String) {
    return this.findById(id).populate('company').exec()
}

UserSchema.statics.findMyDepartment = async function (id: String) {
    return this.findById(id).populate('department').exec()
}

// For model
export interface IUserModel extends Model<IUser> {
    findMyCompany(id: string): Promise<IUser_populated>
    findMyDepartment(id: string): Promise<IUser_populated>
}

export const User = model<IUser, IUserModel>('User', UserSchema)
