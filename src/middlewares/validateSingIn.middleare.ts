import { Request, Response, NextFunction } from 'express';
import { signInSchema } from '../schemas/user.schema.js';
import userRepository from '../repositories/user.repository.js';

async function validateSignIn(req: Request, res: Response, next: NextFunction) {
  const { email } = req.body;

  const { error } = signInSchema.validate(req.body, { abortEarly: false });

  if (error) {
    return res.status(422).send({
      message: error.details.map(err => err.message),
    });
  }

    try {
        const getUser = await userRepository.getUserbyEmail(email);
        if(getUser.rowCount === 0){
            return res.sendStatus(401);
        }
        res.locals.user = getUser.rows[0];
    } catch (err) {
        console.error(err);
        return res.sendStatus(500);
    }

    next();
}

export default validateSignIn;