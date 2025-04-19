import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/user.js';
import dotenv from 'dotenv';
import gravatar from 'gravatar';

dotenv.config();

const { JWT_SECRET } = process.env;

export const registerUser = async (email, password) => {
    const user = await User.findOne({ where: { email } });
    if (user) {
        return null;
    }

    const avatarURL = gravatar.url(email, { s: '250', d: 'identicon' }, true);

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({
        email,
        password: hashedPassword,
        avatarURL
    });

    return newUser;
};

export const loginUser = async (email, password) => {
    const user = await User.findOne({ where: { email } });
    if (!user) {
        return null;
    }

    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
        return null;
    }

    const payload = { id: user.id };
    const token = jwt.sign(payload, JWT_SECRET, { expiresIn: '24h' });

    await user.update({ token });

    return { user, token };
};

export const logoutUser = async (id) => {
    const user = await User.findByPk(id);
    if (!user) {
        return null;
    }

    await user.update({ token: null });
    return true;
};

export const getCurrentUser = async (id) => {
    const user = await User.findByPk(id);
    return user;
};