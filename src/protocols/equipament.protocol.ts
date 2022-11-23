type Equipament = {
  id?: number,
  name: string,
  description?: string,
  atk: number,
  def: number,
  price: number,
  typeEquipamentId: number,
  elementId: number,
  owner?: number,
  creatorId?: number,
  createdAt?: string | Date,
};

export {
  Equipament,
};