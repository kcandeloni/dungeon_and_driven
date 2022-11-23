import { QueryResult } from "pg";
import connection from "../database/database.js";
import { Equipament } from '../protocols/equipament.protocol.js'

async function getElementId(name:string): Promise<QueryResult>{
  return connection.query(`
    SELECT id FROM elements WHERE name ILIKE $1;
  `, [name]);
}

async function getTypeEquipamentId(name:string): Promise<QueryResult>{
  return connection.query(`
    SELECT id FROM "typesEquipament" WHERE name ILIKE $1;
  `, [name]);
}

async function createEquipament({ name, description="", atk, def, price, typeEquipamentId, elementId, userId }): Promise<QueryResult<Equipament>>{
  return connection.query(
    `INSERT INTO equipament
      (name, description, atk, def, price, "typeEquipamentId", "elementId", owner, "creatorId")
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $8) RETURNING id;
    `, [name, description, atk, def, price, typeEquipamentId, elementId, userId]);
}

async function deleteEquipament(id: number): Promise<QueryResult>{
  return connection.query(`
    DELETE FROM equipament WHERE id = $1;
  `, [id]);
}

async function getEquipament(equipamentId: number): Promise<QueryResult<Equipament>>{
  return connection.query(`
    SELECT e.*,
      te.name as "typeEquipament", el.name as "element" 
        FROM equipament e
        JOIN users u ON u.id = e.owner
        JOIN "typesEquipament" te ON te.id = e."typeEquipamentId"
        JOIN elements el ON el.id = e."elementId"
        WHERE e.id = $1;
  `, [equipamentId]);
}

async function listEquipament(): Promise<QueryResult<Equipament>>{
  return connection.query(`
    SELECT e.id as id, e.name as name, e.description as description, e.atk as "Attack",
      e.def as "Defense", e.price as "Price", u.name as "Owner",
	    te.name as "typeEquipament", el.name as "element" 
      FROM equipament e
      JOIN users u ON u.id = e.owner
	    JOIN "typesEquipament" te ON te.id = e."typeEquipamentId"
	    JOIN elements el ON el.id = e."elementId"
      ORDER BY e."createdAt" DESC;
  `);
}

async function getEquipped(equipamentId: number): Promise<QueryResult<Equipament>>{
  return connection.query(`
    SELECT * FROM user_equipament
      WHERE "helmetId" = $1
        OR "armorId" = $1
        OR "rightHandId" = $1
        OR "leftHandId" = $1
        OR "amuletId" = $1
        OR "bootsId" = $1;
  `, [equipamentId]);
}

async function updateEquipament({id, name, description, atk, def, price, elementId}): Promise<QueryResult<Equipament>>{
  return connection.query(`
  UPDATE equipament
    SET 
      name = $2,
      description = $3,
      atk = $4,
      def = $5,
      price = $6,
      "elementId" = $7
    WHERE id = $1;
  `, [id, name, description, atk, def, price, elementId]);
}


async function getUserEquipped(userId: number): Promise<QueryResult<Equipament>>{
  return connection.query(`
  SELECT e.*, ue."userId", ue."powerAmount" 
    FROM equipament e
    JOIN user_equipament ue ON ue."userId" = $1
      WHERE ue."helmetId" = e.id
      OR ue."armorId" = e.id
      OR ue."leftHandId" = e.id
      OR ue."rightHandId" = e.id
      OR ue."amuletId" = e.id
      OR ue."bootsId" = e.id;
  `, [userId]);
}

const equipamentRepository = {
  getElementId,
  getTypeEquipamentId,
  createEquipament,
  deleteEquipament,
  getEquipament,
  listEquipament,
  getEquipped,
  updateEquipament,
  getUserEquipped,
}

export default equipamentRepository;