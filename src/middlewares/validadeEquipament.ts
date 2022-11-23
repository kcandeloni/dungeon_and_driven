import { Request, Response, NextFunction } from 'express';
import equipamentRepository from '../repositories/equipament.repository.js';
import { equipamentSchema, updateEquipamentSchema } from '../schemas/equipament.schema.js';

async function validateEquipament(req: Request, res: Response, next: NextFunction) {
  const { typeEquipament, element } = req.body;

  const { error } = equipamentSchema.validate(req.body, { abortEarly: false });

  if (error) {
    return res.status(422).send({
      message: error.details.map(err => err.message),
    });
  }

  try {
    const typeEquipamentId = await equipamentRepository.getTypeEquipamentId(typeEquipament);
    const elementId = await equipamentRepository.getElementId(element);
    if(!typeEquipamentId.rowCount || !elementId.rowCount ){
      return res.sendStatus(400);
    }
    res.locals.typeEquipamentId = typeEquipamentId.rows[0].id;
    res.locals.elementId = elementId.rows[0].id;
  } catch (err) {
    console.error(err);
    return res.sendStatus(500);
  }

    next();
}

async function validateUpdateEquipament(req: Request, res: Response, next: NextFunction) {
  const { element } = req.body;
  const { error } = updateEquipamentSchema.validate(req.body, { abortEarly: false });

  if (error) {
    return res.status(422).send({
      message: error.details.map(err => err.message),
    });
  }

  try {
    const elementId = await equipamentRepository.getElementId(element);
    if( !elementId.rowCount ){
      return res.sendStatus(400);
    }
    res.locals.elementId = elementId.rows[0].id;
  } catch (err) {
    console.error(err);
    return res.sendStatus(500);
  }

    next();
}

export { 
  validateEquipament,
  validateUpdateEquipament,
};