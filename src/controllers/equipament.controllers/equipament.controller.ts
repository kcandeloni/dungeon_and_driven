import { Request ,Response } from "express";
import { Equipament } from "../../protocols/equipament.protocol.js";
import equipamentRepository from "../../repositories/equipament.repository.js";
import userRepository from "../../repositories/user.repository.js";
import { User, UserEquip } from "../../protocols/user.protocol.js";


async function calcPower(userId: number, level: number){
  const userEquip = await equipamentRepository.getUserEquipped(userId);
  let multipliElement = [];
  let calcAtk = 0;
  let calcDef = 0;
  userEquip.rows.map( e => {
    calcAtk += e.atk;
    calcDef += e.def;
    multipliElement.push(multipliElement);
  });
  let contElement = 0;
  let biggerMult = 0;
  multipliElement.map(element => {
    contElement = 0;
    multipliElement.map(equalElement => {
      if(element === equalElement){
        contElement++;
      }})
  if(contElement > biggerMult){
    biggerMult = contElement;
  }
  });
  const powerAmount = Math.round(
      level*100 + ((calcAtk+calcDef)/2)*biggerMult*level );
      console.log(powerAmount)
}

async function equip(userId: number, equipamentId: number, level: number){

  const userEquip = await userRepository.getUserEquip(userId);

  let {
    helmetId,
    armorId,
    rightHandId,
    leftHandId,
    amuletId,
    bootsId,
    } = userEquip.rows[0] as UserEquip;
  const equipament = await equipamentRepository.getEquipament(equipamentId);
  const {owner, typeEquipamentId} = equipament.rows[0];

  if(owner !== userId || !owner){
    return false;
  }

  switch (typeEquipamentId) {
    case 1:
      if(helmetId === equipamentId){
        helmetId = 0;
      }else{
        helmetId = equipamentId;
      }
      break;
    case 2:
      armorId = equipamentId;
      break;
    case 3:
      amuletId = equipamentId;
      break;
    case 8:
      bootsId = equipamentId;
      break;
    
    default:
      if(!!rightHandId){
        leftHandId = rightHandId;
      }
      rightHandId = equipamentId;
      break;
  }
  await userRepository.updateUserEquip({
    userId,
    helmetId, 
    armorId,
    rightHandId,
    leftHandId,
    amuletId,
    bootsId});
  
  calcPower(userId, level);
  return true;
}

async function createEquipament( req: Request, res: Response) {
  const newEquipament: Equipament = req.body;
  const { typeEquipamentId, elementId } = res.locals;
  let {id: userId, gold, autoEquip, level } = res.locals.user as User;
  gold = gold - 20;

  if(gold < 0){
    return res.send("Gold insufficient!").status(401);
  }

  try {
    const equipamentId = await equipamentRepository.createEquipament({userId, typeEquipamentId, elementId, ...newEquipament });
    await userRepository.updateGold({userId, gold});

    if(autoEquip){
      equip(userId, equipamentId.rows[0].id, level);
    }
    return res.sendStatus(201);
  } catch (error) {
    console.error(error);
    return res.sendStatus(500);
  }
}

async function deleteEquipament( req:Request, res: Response){
  const id: number = Number(req.params.equipamentId);
  const userId: number = res.locals.user.id;
  const gold: number = Number(res.locals.user.gold) + 10;

  if(isNaN(id) || id < 1){
    return res.sendStatus(404);
  }

  try {
    const equipament = await equipamentRepository.getEquipament(id);
    if(equipament.rows[0]?.owner !== userId){
      return res.sendStatus(403);
    }
    const equipped = await equipamentRepository.getEquipped(id);
    if(equipped.rowCount > 0){
      return res.sendStatus(403);
    }
    await equipamentRepository.deleteEquipament(id);
    await userRepository.updateGold({userId, gold});

    res.sendStatus(202);
  } catch (error) {
    console.error(error);
    return res.sendStatus(500);
  }
}

async function updateEquipament( req:Request, res: Response){
  const id: number = Number(req.params.equipamentId);
  const userId: number = res.locals.user.id;
  const gold: number = Number(res.locals.user.gold) - 20;
  const level: number = res.locals.user.level;
  const { elementId } = res.locals;
  const {name, description, atk, def, price} = req.body;
  
  if(isNaN(id) || id < 1){
    return res.sendStatus(404);
  }

  try {
    const equipament = await equipamentRepository.getEquipament(id);
    if(equipament.rows[0]?.owner !== userId){
      return res.sendStatus(403);
    }
    
    await equipamentRepository.updateEquipament({id, name, description, atk, def, price, elementId});

    await userRepository.updateGold({userId, gold});

    calcPower(userId, level);

    res.sendStatus(202);

  } catch (error) {
    console.error(error);
    return res.sendStatus(500);
  }
}

async function listEquipament(req: Request, res: Response){
  const list = await equipamentRepository.listEquipament();
  return res.send(list.rows).status(200);
}

async function getEquipamentbyId(req: Request, res: Response){
  const id: number = Number(req.params.equipamentId);
  if(isNaN(id) || id < 1){
    return res.sendStatus(404);
  }
  const equipament = await equipamentRepository.getEquipament(id);
  return res.send(equipament.rows[0]).status(200);
}

export {
  createEquipament,
  deleteEquipament,
  equip,
  listEquipament,
  updateEquipament,
  getEquipamentbyId,
  calcPower,
};