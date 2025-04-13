import jwt from 'jsonwebtoken';
import User from '../models/user.js';
import HttpError from '../helpers/HttpError.js';
import dotenv from 'dotenv';

dotenv.config();

const { JWT_SECRET } = process.env;

const authenticate = async (req, res, next) => {
    try {
        const { authorization = "" } = req.headers;
        const [bearer, token] = authorization.split(" ");

        if (bearer !== "Bearer" || !token) {
            throw HttpError(401, "Not authorized");
        }

        try {
            const { id } = jwt.verify(token, JWT_SECRET);
            const user = await User.findByPk(id);

            if (!user || user.token !== token) {
                throw HttpError(401, "Not authorized");
            }

            req.user = user;
            next();
        } catch (error) {
            throw HttpError(401, "Not authorized");
        }
    } catch (error) {
        next(error);
    }
};

export default authenticate;