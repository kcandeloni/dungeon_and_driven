import { QueryResult } from "pg";
import connection from "../database/database.js";
import { User, Session, UserEquip } from "../protocols/user.protocol.js";

async function createUser({
  name,
  email,
  password,
  description = "",
}): Promise<QueryResult<any>> {
  return connection.query(
    `
    INSERT INTO users 
    	(name, email, password, description) 
    	VALUES ($1, $2, $3, $4) RETURNING id;`,
    [name, email, password, description]
  );
}

async function getUser(userId: number): Promise<QueryResult<User>> {
  return connection.query(`
  SElECT u.*,
    ARRAY(
      SELECT json_build_object(e.name, e.description, e.atk, e.def, e.price, e."typeEquipamentId", ue."userId", ue."powerAmount") 
        FROM equipament e
        JOIN user_equipament ue ON ue."userId" = $1
          WHERE ue."helmetId" = e.id
          OR ue."armorId" = e.id
          OR ue."leftHandId" = e.id
          OR ue."rightHandId" = e.id
          OR ue."amuletId" = e.id
          OR ue."bootsId" = e.id
          ) AS "equipped"
      FROM users u WHERE u.id = $1;
  `, [userId]);
}

async function getUserbyEmail(email: string): Promise<QueryResult<User>> {
  return connection.query(`SElECT * FROM users WHERE email = $1;`, [email]);
}

async function createSession({userId, token}: {userId: number, token: string}): Promise<QueryResult> {
  return connection.query(`INSERT INTO SESSIONS ("userId", token) VALUES ($1, $2);`,
    [userId, token]);
}

async function deleteSession(token: string): Promise<QueryResult<any>> {
  return connection.query(`DELETE FROM sessions WHERE token = $1);`, [token]);
}

async function getSession(token: string): Promise<QueryResult<Session>> {
  return connection.query(`SELECT * FROM sessions WHERE token = $1;`, [token]);
}

async function updateGold({userId, gold}): Promise<QueryResult> {
  return connection.query(`
    UPDATE users SET gold = $2 WHERE id = $1;
  `, [userId, gold]);
}

async function createUserEquip(userId: number): Promise<QueryResult>{
  return connection.query(`
    INSERT INTO user_equipament ("userId") VALUES ($1);
  `, [userId]);
}

async function getUserEquip(userId: number): Promise<QueryResult<UserEquip>>{
  return connection.query(`
    SELECT * FROM user_equipament WHERE "userId" = $1;
  `, [userId]);
}

async function healingUser({userId, gold}): Promise<QueryResult> {
  return connection.query(`
    UPDATE users SET gold = $2, hp = 100 WHERE id = $1 RETURNING *;
  `, [userId, gold]);
}

async function reborn(userId: number): Promise<QueryResult> {
  return connection.query(`
    UPDATE users SET active = TRUE, hp = 100 WHERE id = $1 RETURNING *;
  `, [userId]);
}

async function die(userId: number): Promise<QueryResult> {
  return connection.query(`
    UPDATE users SET active = FALSE, hp = 0 WHERE id = $1 RETURNING *;
  `, [userId]);
}

async function updateUserEquip({
  userId,
  helmetId = 0,
  armorId = 0,
  rightHandId = 0,
  leftHandId = 0,
  amuletId = 0,
  bootsId = 0
  }: UserEquip): Promise<QueryResult>{
  return connection.query(`
    UPDATE user_equipament 
    SET
    "helmetId" = $2,
    "armorId" = $3,
    "rightHandId" = $4,
    "leftHandId" = $5,
    "amuletId" = $6,
    "bootsId" = $7
    WHERE "userId" = $1;
  `,[userId, helmetId, armorId, rightHandId, leftHandId, amuletId, bootsId]);
}

const userRepository = {
  getUser,
  createUser,
  getUserbyEmail,
  createSession,
  deleteSession,
  getSession,
  updateGold,
  createUserEquip,
  getUserEquip,
  updateUserEquip,
  healingUser,
  reborn, die
};

export default userRepository;
