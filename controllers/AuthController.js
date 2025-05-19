import { generateToken } from "../utils/jwt.js";
import { AppError } from "../errors/errors.js";


const fakeUsers = [
    {
        id: 1, username: 'admin', password: 'hejhej',
    },
];


export const logIn = (req, res, next) => {
    const { username, password} = req.body;

    const user = fakeUsers.find(u => u.username === username && u.password === password);

    if (!user) return next(new AppError("invalid credentials", 401));

    const token = generateToken({id: user.id, username: user.username});

    res.cookie('token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 1000 * 60 * 60,
    }). json({ sucess: true, message: 'Logged in successfull'});
};

export const logOut = (req, res) => {
    res.clearCookie('token').json({sucess: true, message: 'logged out'});
};

