import { Request, Response, NextFunction } from 'express';
import { userSchema } from "../schemas/user.schema.js";
import userRepository from '../repositories/user.repository.js';

async function validateUser(req: Request, res: Response, next: NextFunction) {
    const { email } = req.body;

    const { error } = userSchema.validate(req.body, { abortEarly: false });

    if (error) {
      return res.status(422).send({
        message: error.details.map(err => err.message),
      });
    }

    try {
      const uniqueEmail = await userRepository.getUserbyEmail(email);
      if(uniqueEmail.rowCount !== 0){
          return res.sendStatus(409);
      }
    } catch (err) {
        console.error(err);
        return res.sendStatus(500);
    }

    next();
}

export default validateUser;