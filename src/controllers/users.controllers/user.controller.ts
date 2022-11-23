import { Request, Response } from "express";
import bcrypt from 'bcrypt';
import { v4 as uuid } from 'uuid';
import userRepository from "../../repositories/user.repository.js";
import { User } from "../../protocols/user.protocol.js";

async function getUser(req: Request, res: Response) {
  const userId: number = Number(req.params.id);
  try {
    const user = await userRepository.getUser(userId);
    delete user.rows[0]?.password;
    delete user.rows[0]?.createdAt;
    return res.send(user.rows[0]).status(200);
  } catch (error) {
    console.error(error);
    return res.sendStatus(500);
  }
}

async function createUser(req: Request, res: Response) {
  const newUser = req.body as User;

  newUser.password = bcrypt.hashSync(newUser.password, 10);

  try {
    const getUser = await userRepository.createUser({ ...newUser });
    await userRepository.createUserEquip(getUser.rows[0].id);
    return res.sendStatus(200);
    } catch (error) {
      console.error(error);
      return res.sendStatus(500);
    }
}

async function singIn(req: Request, res: Response) {
  const { password } = req.body;
  const user = res.locals.user as User;

  if (bcrypt.compareSync(password, user.password)) {
      
    const token: string = uuid();
    
    try {
      const newSession = await userRepository.createSession({userId: user.id, token});
      if(newSession.rowCount === 0){
        return res.sendStatus(500);
      }
      return res.status(200).send({token:token});
    } catch (error) {
      console.error(error);
      return res.sendStatus(500);
    }

  } else {
    res.sendStatus(401);
  }
}

async function logout(req: Request, res: Response) {
  const token: string = res.locals.token;

  try {
    const newSession = await userRepository.deleteSession(token);
    if(newSession.rowCount === 0){
      return res.sendStatus(500);
    }
    return res.sendStatus(200);
  } catch (error) {
    console.error(error);
    return res.sendStatus(500);
  }
}

async function home(req: Request, res: Response) {
  const userId: number = res.locals.user.id;
  try {
    const user = await userRepository.getUser(userId);
    delete user.rows[0]?.password;
    delete user.rows[0]?.createdAt;
    return res.send(user.rows[0]).status(200);
  } catch (error) {
    console.error(error);
    return res.sendStatus(500);
  }
}

async function healingUser(req: Request, res: Response) {
  const userId: number = res.locals.user.id;
  const gold: number = res.locals.user.gold - 20;
  if(gold < 0){
    return res.send("Gold insufficient!").status(401);
  }
  try {
    const user = await userRepository.healingUser({userId, gold});
    delete user.rows[0]?.password;
    delete user.rows[0]?.createdAt;
    return res.send(user.rows[0]).status(204);
  } catch (error) {
    console.error(error);
    return res.sendStatus(500);
  }
}

export { getUser, createUser, singIn, logout, home, healingUser };
