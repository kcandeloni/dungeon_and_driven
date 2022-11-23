type User = {
  id?: number,
  name: string,
  email: string,
  password: string,
  description?: string,
  gold?: number,
  hp?: number,
  xp?: number,
  level?: number,
  autoEquip?: boolean,
  active?: boolean,
  createdAt?: string | Date,
};

type Session = {
  id?: number,
  userId: number,
  token: string,
  createdAt?: string | Date,
}

type UserEquip = {
  id?: number,
  userId: number,
  helmetId?: number,
  armorId?: number,
  rightHandId?: number,
  leftHandId?: number,
  amuletId?: number,
  bootsId?: number,
  powerAmount?: number,
  createdAt?: string | Date,
};

export { User, Session, UserEquip };
