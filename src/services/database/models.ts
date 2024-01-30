import { DataTypes, Model } from "sequelize";
import { sequelize } from "./sequelize";

export const BusinessPartners = sequelize.define("BusinessPartner", {
  partnerEin: { type: DataTypes.STRING, unique: true, allowNull: false },
  partnerEmail: { type: DataTypes.STRING, allowNull: false },
  partnerName: { type: DataTypes.STRING, allowNull: false },
  partnerAddress: { type: DataTypes.STRING, allowNull: false },
  partnerId: { type: DataTypes.STRING, primaryKey: true },
});

export const Employees = sequelize.define("Employee", {
  employeeName: { type: DataTypes.STRING, allowNull: false },
  employeeEmail: { type: DataTypes.STRING, unique: true, allowNull: false },
  employeeRole: { type: DataTypes.STRING, allowNull: false },
  employeePassword: { type: DataTypes.STRING, allowNull: false },
  employeeId: { type: DataTypes.STRING, primaryKey: true },
});

export const Equipments = sequelize.define("Equipment", {
  equipmentType: { type: DataTypes.STRING, allowNull: false },
  equipmentStatus: { type: DataTypes.STRING, allowNull: false },
  equipmentLocation: { type: DataTypes.STRING, allowNull: false },
  equipmentSellerId: {
    type: DataTypes.STRING,
    allowNull: false,
    references: {
      model: BusinessPartners,
      key: "partnerId",
    },
  },
  equipmentMaintenanceCost: { type: DataTypes.FLOAT, allowNull: false },
  equipmentCost: { type: DataTypes.FLOAT, allowNull: false },
  equipmentQuantity: { type: DataTypes.INTEGER, allowNull: false },
  equipmentId: { type: DataTypes.STRING, primaryKey: true },
});
// BusinessPartners.hasMany(Equipments);
// Equipments.belongsTo(BusinessPartners);

export const FishSpecies = sequelize.define("FishSpecie", {
  specieName: { type: DataTypes.STRING, unique: true, allowNull: false },
  specieFoodType: { type: DataTypes.STRING, allowNull: false },
  specieMinTemperature: { type: DataTypes.FLOAT, allowNull: false },
  specieMaxTemperature: { type: DataTypes.FLOAT, allowNull: false },
  specieMinOxygen: { type: DataTypes.FLOAT, allowNull: false },
  specieMaxOxygen: { type: DataTypes.FLOAT, allowNull: false },
  specieMinPh: { type: DataTypes.FLOAT, allowNull: false },
  specieMaxPh: { type: DataTypes.FLOAT, allowNull: false },
  specieId: { type: DataTypes.STRING, primaryKey: true },
});

export const Tanks = sequelize.define("Tank", {
  tankSpecieId: {
    type: DataTypes.STRING,
    allowNull: false,
    references: { model: FishSpecies, key: "specieId" },
  },
  tankType: { type: DataTypes.STRING, allowNull: false },
  tankLocation: { type: DataTypes.STRING, allowNull: false },
  tankStatus: { type: DataTypes.FLOAT, allowNull: false },
  tankCapacity: { type: DataTypes.INTEGER, allowNull: false },
  tankId: { type: DataTypes.STRING, primaryKey: true },
});
//FishSpecies.hasMany(Tanks);
//Tanks.belongsTo(FishSpecies);

export const Foods = sequelize.define("Food", {
  foodType: { type: DataTypes.STRING },
  foodQuantity: { type: DataTypes.FLOAT },
  foodCost: { type: DataTypes.FLOAT },
  foodExpirationDate: { type: DataTypes.DATE },
  foodSellerId: {
    type: DataTypes.STRING,
    allowNull: false,
    references: {
      model: BusinessPartners,
      key: "partnerId",
    },
  },
  foodId: { type: DataTypes.STRING, primaryKey: true },
});
// BusinessPartners.hasMany(Foods);
// Foods.belongsTo(BusinessPartners);

export const Treatments = sequelize.define("Treatment", {
  treatmentName: { type: DataTypes.STRING, allowNull: false },
  treatmentQuantity: { type: DataTypes.FLOAT, allowNull: false },
  treatmentCost: { type: DataTypes.FLOAT, allowNull: false },
  treatmentExpirationDate: { type: DataTypes.DATE, allowNull: false },
  treatmentSellerId: {
    type: DataTypes.STRING,
    allowNull: false,
    references: {
      model: BusinessPartners,
      key: "partnerId",
    },
  },
  treatmentId: { type: DataTypes.STRING, primaryKey: true },
});
// BusinessPartners.hasMany(Treatments);
// Treatments.belongsTo(BusinessPartners);

export const Feedings = sequelize.define("Feeding", {
  feedingEmployeeId: {
    type: DataTypes.STRING,
    allowNull: false,
    references: { model: Employees, key: "employeeId" },
  },
  feedingTankId: {
    type: DataTypes.STRING,
    allowNull: false,
    references: { model: Tanks, key: "tankId" },
  },
  feedingFoodId: {
    type: DataTypes.STRING,
    allowNull: false,
    references: { model: Foods, key: "foodId" },
  },
  feedingQuantity: { type: DataTypes.FLOAT, allowNull: false },
  feedingDate: { type: DataTypes.DATE, allowNull: false },
  feedingId: { type: DataTypes.STRING, primaryKey: true },
});
// Employees.hasMany(Feedings);
// Tanks.hasMany(Feedings);
// Foods.hasMany(Feedings);
// Feedings.belongsTo(Employees);
// Feedings.belongsTo(Tanks);
// Feedings.belongsTo(Foods);

export const Medications = sequelize.define("Medication", {
  medicationEmployeeId: {
    type: DataTypes.STRING,
    allowNull: false,
    references: { model: Employees, key: "employeeId" },
  },
  medicationTankId: {
    type: DataTypes.STRING,
    allowNull: false,
    references: { model: Tanks, key: "tankId" },
  },
  medicationTreatmentId: {
    type: DataTypes.STRING,
    allowNull: false,
    references: { model: Treatments, key: "treatmentId" },
  },
  medicationQuantity: { type: DataTypes.FLOAT, allowNull: false },
  medicationDate: { type: DataTypes.DATE, allowNull: false },
  medicationId: { type: DataTypes.STRING, primaryKey: true },
});
// Employees.hasMany(Medications);
// Tanks.hasMany(Medications);
// Treatments.hasMany(Medications);
// Medications.belongsTo(Employees);
// Medications.belongsTo(Tanks);
// Medications.belongsTo(Treatments);

export const Maintenances = sequelize.define("Maintenance", {
  maintenanceEmployeeId: {
    type: DataTypes.STRING,
    allowNull: false,
    references: { model: Employees, key: "employeeId" },
  },
  maintenanceEquipmentId: {
    type: DataTypes.STRING,
    allowNull: false,
    references: { model: Equipments, key: "equipmentId" },
  },
  maintenanceDate: { type: DataTypes.DATE, allowNull: false },
  maintenanceCost: { type: DataTypes.FLOAT, allowNull: false },
  maintenanceId: { type: DataTypes.STRING, primaryKey: true },
});
// Employees.hasMany(Maintenances);
// Equipments.hasMany(Maintenances);
// Maintenances.belongsTo(Employees);
// Maintenances.belongsTo(Equipments);

export const Transactions = sequelize.define("Transaction", {
  transactionType: { type: DataTypes.STRING, allowNull: false },
  transactionValue: { type: DataTypes.FLOAT, allowNull: false },
  transactionPartnerId: {
    type: DataTypes.STRING,
    allowNull: false,
    references: {
      model: BusinessPartners,
      key: "partnerId",
    },
  },
  transactionEmployeeId: {
    type: DataTypes.STRING,
    allowNull: false,
    references: {
      model: Employees,
      key: "employeeId",
    },
  },
  transactionSaleQuantity: { type: DataTypes.INTEGER, allowNull: true },
  transactionPurchaseFoodId: {
    type: DataTypes.STRING,
    allowNull: true,
    references: {
      model: Foods,
      key: "foodId",
    },
  },
  transactionPurchaseTreatmentId: {
    type: DataTypes.STRING,
    allowNull: true,
    references: {
      model: Treatments,
      key: "treatmentId",
    },
  },
  transactionPurchaseEquipmentId: {
    type: DataTypes.STRING,
    allowNull: true,
    references: {
      model: Equipments,
      key: "equipmentId",
    },
  },
  transactionDate: { type: DataTypes.DATE, allowNull: false },
  transactionId: { type: DataTypes.STRING, primaryKey: true },
});
// BusinessPartners.hasMany(Transactions);
// Transactions.belongsTo(BusinessPartners);
// Employees.hasMany(Transactions);
// Transactions.belongsTo(Employees);
// Foods.hasOne(Transactions);
// Treatments.hasOne(Transactions);
// Equipments.hasOne(Transactions);

export const Verifications = sequelize.define("Verification", {
  verificationEmployeeId: {
    type: DataTypes.STRING,
    allowNull: false,
    references: { model: Employees, key: "employeeId" },
  },
  verificationTankId: {
    type: DataTypes.STRING,
    allowNull: false,
    references: { model: Tanks, key: "tankId" },
  },
  verificationTemperature: { type: DataTypes.FLOAT, allowNull: false },
  verificationOxygen: { type: DataTypes.FLOAT, allowNull: false },
  verificationPh: { type: DataTypes.FLOAT, allowNull: false },
  verificationDate: { type: DataTypes.DATE, allowNull: false },
  verificationId: { type: DataTypes.STRING, primaryKey: true },
});
// Employees.hasMany(Verifications);
// Verifications.belongsTo(Employees);
// Tanks.hasMany(Verifications);
// Verifications.belongsTo(Tanks);

export const Warnings = sequelize.define("Warning", {
  warningTankId: {
    type: DataTypes.STRING,
    allowNull: false,
    references: { model: Tanks, key: "tankId" },
  },
  warningMsg: { type: DataTypes.STRING, allowNull: false },
  warningTemperature: { type: DataTypes.BOOLEAN, allowNull: false },
  warningOxygen: { type: DataTypes.BOOLEAN, allowNull: false },
  warningPh: { type: DataTypes.BOOLEAN, allowNull: false },
  warningId: { type: DataTypes.STRING, primaryKey: true },
});
// Tanks.hasMany(Warnings);
// Warnings.belongsTo(Tanks);

// async function sync(): Promise<void> {
//   await sequelize.sync({ force: true });
// }

// sync();
