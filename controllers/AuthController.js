import { generateToken } from "../utils/jwt.js";
import bcrypt from "bcrypt";
import { AppError } from "../errors/errors.js";
import { registerSchema, loginSchema } from '../validators/authValidator.js';
import pool from '../config/postgres.js';


export const register = async (req, res, next) => {
    try {
        registerSchema.parse(req.body);

        const { username, password, email} = req.body;

        const exists = await pool.query('SELECT 1 FROM profile WHERE username = $1', [username]);

        if (exists.rows.length > 0 ) {
            return next(new AppError('username already taken', 409));

        }


        const saltRounds = 10;
        const password_hash = await bcrypt.hash(password, saltRounds);
    
        const result = await pool.query(
        'INSERT INTO profile (username, password_hash, email) VALUES ($1, $2, $3) RETURNING id, username',
        [username, password_hash, email]
    );

        const user = result.rows[0];
        res.status(201).json({ success: true, message: 'User registered', user: { id: user.id, username: user.username } });
    
    } catch (error) {
        next(error)
    }
};

export const logIn = async (req, res, next) => {
    try {
        loginSchema.parse(req.body);

        const { username, password } = req.body;


        const result = await pool.query(
            'SELECT id, username, password_hash FROM profile WHERE username = $1',
            [username]
        );

        const user = result.rows[0];

        if (!user) {
            return next(new AppError("Invalid credentials", 401));
        }


        const isMatch = await bcrypt.compare(password, user.password_hash);
        if (!isMatch) {
            return next(new AppError("Invalid credentials", 401));
        }

        const token = generateToken({ id: user.id, username: user.username });

        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 1000 * 60 * 60, 
        }).json({ success: true, message: 'Logged in successfully' });

    } catch (error) {
        next(error);
    }
};

export const logOut = (req, res) => {
    res.clearCookie('token').json({sucess: true, message: 'logged out'});
};

