import { DataTypes } from "sequelize";
import { sequelize } from "./sequelize";

const BusinessPartner = sequelize.define("BusinessPartner", {
  partnerEin: { type: DataTypes.STRING, unique: true },
  partnerEmail: { type: DataTypes.STRING },
  partnerName: { type: DataTypes.STRING },
  partnerAddress: { type: DataTypes.STRING },
  partnerId: { type: DataTypes.STRING, primaryKey: true },
});

const Employee = sequelize.define("Employee", {
  employeeName: { type: DataTypes.STRING },
  employeeEmail: { type: DataTypes.STRING },
  employeeRole: { type: DataTypes.STRING },
  employeePassword: { type: DataTypes.STRING },
  employeeId: { type: DataTypes.STRING, primaryKey: true },
});

const Equipment = sequelize.define("Equipment", {
  equipmentType: { type: DataTypes.STRING },
  equipmentStatus: { type: DataTypes.STRING },
  equipmentLocation: { type: DataTypes.STRING },
  equipmentSellerId: {
    type: DataTypes.STRING,
    references: {
      model: BusinessPartner,
      key: "partnerId",
    },
  },
  equipmentMaintenanceCost: { type: DataTypes.FLOAT },
  equipmentCost: { type: DataTypes.FLOAT },
  equipmentQuantity: { type: DataTypes.INTEGER },
  equipmentId: { type: DataTypes.STRING, primaryKey: true },
});
BusinessPartner.hasMany(Equipment);
Equipment.belongsTo(BusinessPartner);

const Tank = sequelize.define("Tank", {
  tankSpecieName: { type: DataTypes.STRING },
  tankSpecieFoodType: { type: DataTypes.STRING },
  tankMinTemperature: { type: DataTypes.FLOAT },
  tankMaxTemperature: { type: DataTypes.FLOAT },
  tankMinOxygen: { type: DataTypes.FLOAT },
  tankMaxOxygen: { type: DataTypes.FLOAT },
  tankMinPh: { type: DataTypes.FLOAT },
  tankMaxPh: { type: DataTypes.FLOAT },
  tankType: { type: DataTypes.STRING },
  tankLocation: { type: DataTypes.STRING },
  tankStatus: { type: DataTypes.FLOAT },
  tankCapacity: { type: DataTypes.INTEGER },
  tankId: { type: DataTypes.STRING, primaryKey: true },
});

const Food = sequelize.define("Food", {
  foodType: { type: DataTypes.STRING },
  foodQuantity: { type: DataTypes.FLOAT },
  foodCost: { type: DataTypes.FLOAT },
  foodExpirationDate: { type: DataTypes.DATE },
  foodSellerId: {
    type: DataTypes.STRING,
    references: {
      model: BusinessPartner,
      key: "partnerId",
    },
  },
  foodId: { type: DataTypes.STRING, primaryKey: true },
});
BusinessPartner.hasMany(Food);
Food.belongsTo(BusinessPartner);

const Treatment = sequelize.define("Treatment", {
  treatmentName: { type: DataTypes.STRING },
  treatmentQuantity: { type: DataTypes.FLOAT },
  treatmentCost: { type: DataTypes.FLOAT },
  treatmentExpirationDate: { type: DataTypes.DATE },
  treatmentSellerId: {
    type: DataTypes.STRING,
    references: {
      model: BusinessPartner,
      key: "partnerId",
    },
  },
  treatmentId: { type: DataTypes.STRING, primaryKey: true },
});
BusinessPartner.hasMany(Treatment);
Treatment.belongsTo(BusinessPartner);

const Feeding = sequelize.define("Feeding", {
  feedingEmployeeId: {
    type: DataTypes.STRING,
    references: { model: Employee, key: "employeeId" },
  },
  feedingTankId: {
    type: DataTypes.STRING,
    references: { model: Tank, key: "tankId" },
  },
  feedingFoodId: {
    type: DataTypes.STRING,
    references: { model: Food, key: "foodId" },
  },
  feedingQuantity: { type: DataTypes.FLOAT },
  feedingDate: { type: DataTypes.DATE },
  feedingId: { type: DataTypes.STRING, primaryKey: true },
});
Employee.hasMany(Feeding);
Tank.hasMany(Feeding);
Food.hasMany(Feeding);
Feeding.belongsTo(Employee);
Feeding.belongsTo(Tank);
Feeding.belongsTo(Food);

const Medication = sequelize.define("Medication", {
  medicationEmployeeId: {
    type: DataTypes.STRING,
    references: { model: Employee, key: "employeeId" },
  },
  medicationTankId: {
    type: DataTypes.STRING,
    references: { model: Tank, key: "tankId" },
  },
  medicationTreatmentId: {
    type: DataTypes.STRING,
    references: { model: Treatment, key: "treatmentId" },
  },
  medicationQuantity: { type: DataTypes.FLOAT },
  medicationDate: { type: DataTypes.DATE },
  medicationId: { type: DataTypes.STRING, primaryKey: true },
});
Employee.hasMany(Medication);
Tank.hasMany(Medication);
Treatment.hasMany(Medication);
Medication.belongsTo(Employee);
Medication.belongsTo(Tank);
Medication.belongsTo(Treatment);

const Maintenance = sequelize.define("Maintenance", {
  maintenanceEmployeeId: {
    type: DataTypes.STRING,
    references: { model: Employee, key: "employeeId" },
  },
  maintenanceEquipmentId: {
    type: DataTypes.STRING,
    references: { model: Equipment, key: "equipmentId" },
  },
  maintenanceDate: { type: DataTypes.DATE },
  maintenanceCost: { type: DataTypes.FLOAT },
  maintenanceId: { type: DataTypes.STRING, primaryKey: true },
});
Employee.hasMany(Maintenance);
Equipment.hasMany(Maintenance);
Maintenance.belongsTo(Employee);
Maintenance.belongsTo(Equipment);

const Transaction = sequelize.define("Transaction", {
  transactionType: { type: DataTypes.STRING },
  transactionValue: { type: DataTypes.FLOAT },
  transactionPartnerId: {
    type: DataTypes.STRING,
    references: {
      model: BusinessPartner,
      key: "partnerId",
    },
  },
  transactionEmployeeId: {
    type: DataTypes.STRING,
    references: {
      model: Employee,
      key: "employeeId",
    },
  },
  transactionSaleQuantity: { type: DataTypes.INTEGER },
  transactionPurchaseFoodId: {
    type: DataTypes.STRING,
    references: {
      model: Food,
      key: "foodId",
    },
  },
  transactionPurchaseTreatmentId: {
    type: DataTypes.STRING,
    references: {
      model: Treatment,
      key: "treatmentId",
    },
  },
  transactionPurchaseEquipmentId: {
    type: DataTypes.STRING,
    references: {
      model: Equipment,
      key: "equipmentId",
    },
  },
  transactionId: { type: DataTypes.STRING, primaryKey: true },
});
BusinessPartner.hasMany(Transaction);
Transaction.belongsTo(BusinessPartner);
Employee.hasMany(Transaction);
Transaction.belongsTo(Employee);
Food.hasOne(Transaction);
Treatment.hasOne(Transaction);
Equipment.hasOne(Transaction);

const Verification = sequelize.define("Verification", {
  verificationEmployeeId: {
    type: DataTypes.STRING,
    references: { model: Employee, key: "employeeId" },
  },
  verificationTankId: {
    type: DataTypes.STRING,
    references: { model: Tank, key: "tankId" },
  },
  verificationTemperature: { type: DataTypes.FLOAT },
  verificationOxygen: { type: DataTypes.FLOAT },
  verificationPh: { type: DataTypes.FLOAT },
  veriricationDate: { type: DataTypes.DATE },
  verificationId: { type: DataTypes.STRING, primaryKey: true },
});
Employee.hasMany(Verification);
Verification.belongsTo(Employee);
Tank.hasMany(Verification);
Verification.belongsTo(Tank);

const Warning = sequelize.define("Warning", {
  warningTankId: {
    type: DataTypes.STRING,
    references: { model: Tank, key: "tankId" },
  },
  warningMsg: { type: DataTypes.STRING },
  warningTemperature: { type: DataTypes.BOOLEAN },
  warningOxygen: { type: DataTypes.BOOLEAN },
  warningPh: { type: DataTypes.BOOLEAN },
  warningId: { type: DataTypes.STRING, primaryKey: true },
});
Tank.hasMany(Warning);
Warning.belongsTo(Tank);

async function sync(): Promise<void> {
  await sequelize.sync({ force: true });
}

sync();
