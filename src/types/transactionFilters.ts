export type SaleFilter = {
  value?: { min: number; max: number };
  partner?: { ein: number };
  date?: { min: Date; max: Date };
  quantity?: { min: number; max: number };
};

export type PurchaseFilter = {
  value?: { min: number; max: number };
  partner?: { ein: number };
  date?: { min: Date; max: Date };
  food: boolean;
  treatment: boolean;
  equipment: boolean;
};
