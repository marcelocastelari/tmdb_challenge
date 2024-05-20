import jwt from 'jsonwebtoken';

const secretKey = 'secretKey';

export function generateToken(payload: any): string {
    return jwt.sign(payload, secretKey, { expiresIn: '1h' });
}

export function verifyToken(token: string): any {
    try {
        return jwt.verify(token, secretKey);
    } catch (error) {
        return null;
    }
}