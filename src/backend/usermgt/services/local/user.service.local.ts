//src/services/user.service.local.ts

import { User, IUser } from '../../models/user.model';

export class UserServiceLocal {

    public async getAllUser() {

        try {

            const users = User.find()
            return users;
        } catch (err) {

            throw err
        }
    }

    public async addNewUser(user: IUser) {

        try {

            const newUser = new User(user);
            await newUser.save();
            return newUser

        } catch (err) {

            throw err
        }
    }

    public async detailUser(userID: String) {

        try {

            const newUser = User.findById(userID);
            return newUser

        } catch (err) {

            throw err
        }
    }

    public async deleteUser(userID: String) {
        try {

            const deletedUser = await User.findByIdAndDelete(userID);
            return deletedUser

        } catch (err) {

            throw err
        }
    }

    //Updating a user

    public async updateUser(user: IUser) {

        try {

            const updatedUser: IUser | null = await User.findByIdAndUpdate(
                user['id'],
                user
            );
            return updatedUser
        } catch (err) {

            throw err
        }
    }
}