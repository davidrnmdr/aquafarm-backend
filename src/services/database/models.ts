import { DataTypes } from "sequelize";
import { sequelize } from "./sequelize";

export const BusinessPartners = sequelize.define("BusinessPartner", {
  partnerEin: { type: DataTypes.STRING, unique: true },
  partnerEmail: { type: DataTypes.STRING },
  partnerName: { type: DataTypes.STRING },
  partnerAddress: { type: DataTypes.STRING },
  partnerId: { type: DataTypes.STRING, primaryKey: true },
});

const Employees = sequelize.define("Employee", {
  employeeName: { type: DataTypes.STRING },
  employeeEmail: { type: DataTypes.STRING },
  employeeRole: { type: DataTypes.STRING },
  employeePassword: { type: DataTypes.STRING },
  employeeId: { type: DataTypes.STRING, primaryKey: true },
});

const Equipments = sequelize.define("Equipment", {
  equipmentType: { type: DataTypes.STRING },
  equipmentStatus: { type: DataTypes.STRING },
  equipmentLocation: { type: DataTypes.STRING },
  equipmentSellerId: {
    type: DataTypes.STRING,
    references: {
      model: BusinessPartners,
      key: "partnerId",
    },
  },
  equipmentMaintenanceCost: { type: DataTypes.FLOAT },
  equipmentCost: { type: DataTypes.FLOAT },
  equipmentQuantity: { type: DataTypes.INTEGER },
  equipmentId: { type: DataTypes.STRING, primaryKey: true },
});
BusinessPartners.hasMany(Equipments);
Equipments.belongsTo(BusinessPartners);

const Tanks = sequelize.define("Tank", {
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

const Foods = sequelize.define("Food", {
  foodType: { type: DataTypes.STRING },
  foodQuantity: { type: DataTypes.FLOAT },
  foodCost: { type: DataTypes.FLOAT },
  foodExpirationDate: { type: DataTypes.DATE },
  foodSellerId: {
    type: DataTypes.STRING,
    references: {
      model: BusinessPartners,
      key: "partnerId",
    },
  },
  foodId: { type: DataTypes.STRING, primaryKey: true },
});
BusinessPartners.hasMany(Foods);
Foods.belongsTo(BusinessPartners);

const Treatments = sequelize.define("Treatment", {
  treatmentName: { type: DataTypes.STRING },
  treatmentQuantity: { type: DataTypes.FLOAT },
  treatmentCost: { type: DataTypes.FLOAT },
  treatmentExpirationDate: { type: DataTypes.DATE },
  treatmentSellerId: {
    type: DataTypes.STRING,
    references: {
      model: BusinessPartners,
      key: "partnerId",
    },
  },
  treatmentId: { type: DataTypes.STRING, primaryKey: true },
});
BusinessPartners.hasMany(Treatments);
Treatments.belongsTo(BusinessPartners);

const Feedings = sequelize.define("Feeding", {
  feedingEmployeeId: {
    type: DataTypes.STRING,
    references: { model: Employees, key: "employeeId" },
  },
  feedingTankId: {
    type: DataTypes.STRING,
    references: { model: Tanks, key: "tankId" },
  },
  feedingFoodId: {
    type: DataTypes.STRING,
    references: { model: Foods, key: "foodId" },
  },
  feedingQuantity: { type: DataTypes.FLOAT },
  feedingDate: { type: DataTypes.DATE },
  feedingId: { type: DataTypes.STRING, primaryKey: true },
});
Employees.hasMany(Feedings);
Tanks.hasMany(Feedings);
Foods.hasMany(Feedings);
Feedings.belongsTo(Employees);
Feedings.belongsTo(Tanks);
Feedings.belongsTo(Foods);

const Medications = sequelize.define("Medication", {
  medicationEmployeeId: {
    type: DataTypes.STRING,
    references: { model: Employees, key: "employeeId" },
  },
  medicationTankId: {
    type: DataTypes.STRING,
    references: { model: Tanks, key: "tankId" },
  },
  medicationTreatmentId: {
    type: DataTypes.STRING,
    references: { model: Treatments, key: "treatmentId" },
  },
  medicationQuantity: { type: DataTypes.FLOAT },
  medicationDate: { type: DataTypes.DATE },
  medicationId: { type: DataTypes.STRING, primaryKey: true },
});
Employees.hasMany(Medications);
Tanks.hasMany(Medications);
Treatments.hasMany(Medications);
Medications.belongsTo(Employees);
Medications.belongsTo(Tanks);
Medications.belongsTo(Treatments);

const Maintenances = sequelize.define("Maintenance", {
  maintenanceEmployeeId: {
    type: DataTypes.STRING,
    references: { model: Employees, key: "employeeId" },
  },
  maintenanceEquipmentId: {
    type: DataTypes.STRING,
    references: { model: Equipments, key: "equipmentId" },
  },
  maintenanceDate: { type: DataTypes.DATE },
  maintenanceCost: { type: DataTypes.FLOAT },
  maintenanceId: { type: DataTypes.STRING, primaryKey: true },
});
Employees.hasMany(Maintenances);
Equipments.hasMany(Maintenances);
Maintenances.belongsTo(Employees);
Maintenances.belongsTo(Equipments);

const Transactions = sequelize.define("Transaction", {
  transactionType: { type: DataTypes.STRING },
  transactionValue: { type: DataTypes.FLOAT },
  transactionPartnerId: {
    type: DataTypes.STRING,
    references: {
      model: BusinessPartners,
      key: "partnerId",
    },
  },
  transactionEmployeeId: {
    type: DataTypes.STRING,
    references: {
      model: Employees,
      key: "employeeId",
    },
  },
  transactionSaleQuantity: { type: DataTypes.INTEGER },
  transactionPurchaseFoodId: {
    type: DataTypes.STRING,
    references: {
      model: Foods,
      key: "foodId",
    },
  },
  transactionPurchaseTreatmentId: {
    type: DataTypes.STRING,
    references: {
      model: Treatments,
      key: "treatmentId",
    },
  },
  transactionPurchaseEquipmentId: {
    type: DataTypes.STRING,
    references: {
      model: Equipments,
      key: "equipmentId",
    },
  },
  transactionId: { type: DataTypes.STRING, primaryKey: true },
});
BusinessPartners.hasMany(Transactions);
Transactions.belongsTo(BusinessPartners);
Employees.hasMany(Transactions);
Transactions.belongsTo(Employees);
Foods.hasOne(Transactions);
Treatments.hasOne(Transactions);
Equipments.hasOne(Transactions);

const Verifications = sequelize.define("Verification", {
  verificationEmployeeId: {
    type: DataTypes.STRING,
    references: { model: Employees, key: "employeeId" },
  },
  verificationTankId: {
    type: DataTypes.STRING,
    references: { model: Tanks, key: "tankId" },
  },
  verificationTemperature: { type: DataTypes.FLOAT },
  verificationOxygen: { type: DataTypes.FLOAT },
  verificationPh: { type: DataTypes.FLOAT },
  veriricationDate: { type: DataTypes.DATE },
  verificationId: { type: DataTypes.STRING, primaryKey: true },
});
Employees.hasMany(Verifications);
Verifications.belongsTo(Employees);
Tanks.hasMany(Verifications);
Verifications.belongsTo(Tanks);

const Warnings = sequelize.define("Warning", {
  warningTankId: {
    type: DataTypes.STRING,
    references: { model: Tanks, key: "tankId" },
  },
  warningMsg: { type: DataTypes.STRING },
  warningTemperature: { type: DataTypes.BOOLEAN },
  warningOxygen: { type: DataTypes.BOOLEAN },
  warningPh: { type: DataTypes.BOOLEAN },
  warningId: { type: DataTypes.STRING, primaryKey: true },
});
Tanks.hasMany(Warnings);
Warnings.belongsTo(Tanks);

// async function sync(): Promise<void> {
//   await sequelize.sync({ force: true });
// }

// sync();
