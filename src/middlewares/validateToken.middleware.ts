import { Request, Response, NextFunction } from 'express';
import userRepository from '../repositories/user.repository.js'

async function validateToken (req: Request, res: Response, next: NextFunction) {
    const authorization = req.headers.authorization;
    const token = authorization?.replace('Bearer ', '');
    if (!token) {
        return res.sendStatus(401);
    }
    try {
        const session = await userRepository.getSession(token);
        if (session.rowCount === 0) {
            return res.sendStatus(401);
        }

        const user = await userRepository.getUser(session.rows[0].userId);

        if (user.rowCount === 0) {
            return res.sendStatus(404);
        }

        res.locals.user = user.rows[0];
        res.locals.token = token;
    } catch (err) {
        console.error(err);
        return res.sendStatus(500);
    }

    next();
}

export default validateToken;