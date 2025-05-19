import { verifyToken } from "../utils/jwt.js";
import { AppError } from "../errors/errors.js";

export const authenticate = (req, res, next) => {
    const token = req.cookies?.token;

    if(!token) return next(new AppError('Not authenticated', 401));

    try {
        const payload = verifyToken(token);
        req.user = payload;
        next();
        
    } catch (error) {
        next(err);
    }
};

