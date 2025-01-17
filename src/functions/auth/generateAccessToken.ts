import UserType from "../../types/database/User.type";
import jwt from 'jsonwebtoken';

function generateAccessToken(user: UserType): string {
    const SECRET_KEY = process.env.JWT_KEY || "";
    return jwt.sign({ id: user._id, username: user.username, type: user.type }, SECRET_KEY, { expiresIn: '24h' });
}

export default generateAccessToken;