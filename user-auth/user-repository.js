import crypto from "node:crypto";

import DBLocal from "db-local";
import bcrypt from "bcrypt";

import { SALT_ROUNDS } from "./config.js";

const { Schema } = new DBLocal({ path: './db' });

const User = Schema('User', {
    _id: { type: String, required: true },
    username: { type: String, required: true },
    password: { type: String, required: true }
})

export class UserRepository {
    static async create({ username, password }) {
        //1. Username validations (ZOD optional)
        Validation.username(username);
        Validation.password(password);
        //2. Create User
        const user = User.findOne({ username });
        if (user) throw new Error('User already exists');

        const id = crypto.randomUUID();
        const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS); // hashSync blocks principal thread

        User.create({
            _id: id,
            username,
            password: hashedPassword
        }).save();

        return id;
    }
    static async login({ username, password }) {
        console.log('👉 Login attempt:', { username, password });

        Validation.username(username);
        Validation.password(password);

        const user = User.findOne({ username });
        console.log('👉 Found user:', user);

        if (!user) throw new Error('User not found');

        const isValid = await bcrypt.compare(password, user.password);
        console.log('👉 Password valid?', isValid);

        if (!isValid) throw new Error('Invalid password');

        const { password: _, ...publicUser } = user;
        return publicUser;
    }

}

class Validation {
    static username(username) {
        if (typeof username !== 'string') throw new Error('Username is not a string');
        if (username.length < 3) throw new Error('Username is too short');
    }
    static password(password) {
        if (typeof password !== 'string') throw new Error('Password is not a string');
        if (password.length < 6) throw new Error('Password is too short');
    }
}