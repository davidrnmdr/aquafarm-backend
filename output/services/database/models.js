"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Warnings = exports.Verifications = exports.Transactions = exports.Maintenances = exports.Medications = exports.Feedings = exports.Treatments = exports.Foods = exports.Tanks = exports.FishSpecies = exports.Equipments = exports.Employees = exports.BusinessPartners = void 0;
var sequelize_1 = require("sequelize");
var sequelize_2 = require("./sequelize");
exports.BusinessPartners = sequelize_2.sequelize.define("BusinessPartner", {
    partnerEin: { type: sequelize_1.DataTypes.STRING, unique: true },
    partnerEmail: { type: sequelize_1.DataTypes.STRING },
    partnerName: { type: sequelize_1.DataTypes.STRING },
    partnerAddress: { type: sequelize_1.DataTypes.STRING },
    partnerId: { type: sequelize_1.DataTypes.STRING, primaryKey: true },
});
exports.Employees = sequelize_2.sequelize.define("Employee", {
    employeeName: { type: sequelize_1.DataTypes.STRING },
    employeeEmail: { type: sequelize_1.DataTypes.STRING, unique: true },
    employeeRole: { type: sequelize_1.DataTypes.STRING },
    employeePassword: { type: sequelize_1.DataTypes.STRING },
    employeeId: { type: sequelize_1.DataTypes.STRING, primaryKey: true },
});
exports.Equipments = sequelize_2.sequelize.define("Equipment", {
    equipmentType: { type: sequelize_1.DataTypes.STRING },
    equipmentStatus: { type: sequelize_1.DataTypes.STRING },
    equipmentLocation: { type: sequelize_1.DataTypes.STRING },
    equipmentSellerId: {
        type: sequelize_1.DataTypes.STRING,
        references: {
            model: exports.BusinessPartners,
            key: "partnerId",
        },
    },
    equipmentMaintenanceCost: { type: sequelize_1.DataTypes.FLOAT },
    equipmentCost: { type: sequelize_1.DataTypes.FLOAT },
    equipmentQuantity: { type: sequelize_1.DataTypes.INTEGER },
    equipmentId: { type: sequelize_1.DataTypes.STRING, primaryKey: true },
});
// BusinessPartners.hasMany(Equipments);
// Equipments.belongsTo(BusinessPartners);
exports.FishSpecies = sequelize_2.sequelize.define("FishSpecie", {
    specieName: { type: sequelize_1.DataTypes.STRING, unique: true },
    specieFoodType: { type: sequelize_1.DataTypes.STRING },
    specieMinTemperature: { type: sequelize_1.DataTypes.FLOAT },
    specieMaxTemperature: { type: sequelize_1.DataTypes.FLOAT },
    specieMinOxygen: { type: sequelize_1.DataTypes.FLOAT },
    specieMaxOxygen: { type: sequelize_1.DataTypes.FLOAT },
    specieMinPh: { type: sequelize_1.DataTypes.FLOAT },
    specieMaxPh: { type: sequelize_1.DataTypes.FLOAT },
    specieId: { type: sequelize_1.DataTypes.STRING, primaryKey: true },
});
exports.Tanks = sequelize_2.sequelize.define("Tank", {
    tankSpecieId: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        references: { model: exports.FishSpecies, key: "specieId" },
    },
    tankType: { type: sequelize_1.DataTypes.STRING },
    tankLocation: { type: sequelize_1.DataTypes.STRING },
    tankStatus: { type: sequelize_1.DataTypes.FLOAT },
    tankCapacity: { type: sequelize_1.DataTypes.INTEGER },
    tankId: { type: sequelize_1.DataTypes.STRING, primaryKey: true },
});
//FishSpecies.hasMany(Tanks);
//Tanks.belongsTo(FishSpecies);
exports.Foods = sequelize_2.sequelize.define("Food", {
    foodType: { type: sequelize_1.DataTypes.STRING },
    foodQuantity: { type: sequelize_1.DataTypes.FLOAT },
    foodCost: { type: sequelize_1.DataTypes.FLOAT },
    foodExpirationDate: { type: sequelize_1.DataTypes.DATE },
    foodSellerId: {
        type: sequelize_1.DataTypes.STRING,
        references: {
            model: exports.BusinessPartners,
            key: "partnerId",
        },
    },
    foodId: { type: sequelize_1.DataTypes.STRING, primaryKey: true },
});
// BusinessPartners.hasMany(Foods);
// Foods.belongsTo(BusinessPartners);
exports.Treatments = sequelize_2.sequelize.define("Treatment", {
    treatmentName: { type: sequelize_1.DataTypes.STRING },
    treatmentQuantity: { type: sequelize_1.DataTypes.FLOAT },
    treatmentCost: { type: sequelize_1.DataTypes.FLOAT },
    treatmentExpirationDate: { type: sequelize_1.DataTypes.DATE },
    treatmentSellerId: {
        type: sequelize_1.DataTypes.STRING,
        references: {
            model: exports.BusinessPartners,
            key: "partnerId",
        },
    },
    treatmentId: { type: sequelize_1.DataTypes.STRING, primaryKey: true },
});
// BusinessPartners.hasMany(Treatments);
// Treatments.belongsTo(BusinessPartners);
exports.Feedings = sequelize_2.sequelize.define("Feeding", {
    feedingEmployeeId: {
        type: sequelize_1.DataTypes.STRING,
        references: { model: exports.Employees, key: "employeeId" },
    },
    feedingTankId: {
        type: sequelize_1.DataTypes.STRING,
        references: { model: exports.Tanks, key: "tankId" },
    },
    feedingFoodId: {
        type: sequelize_1.DataTypes.STRING,
        references: { model: exports.Foods, key: "foodId" },
    },
    feedingQuantity: { type: sequelize_1.DataTypes.FLOAT },
    feedingDate: { type: sequelize_1.DataTypes.DATE },
    feedingId: { type: sequelize_1.DataTypes.STRING, primaryKey: true },
});
// Employees.hasMany(Feedings);
// Tanks.hasMany(Feedings);
// Foods.hasMany(Feedings);
// Feedings.belongsTo(Employees);
// Feedings.belongsTo(Tanks);
// Feedings.belongsTo(Foods);
exports.Medications = sequelize_2.sequelize.define("Medication", {
    medicationEmployeeId: {
        type: sequelize_1.DataTypes.STRING,
        references: { model: exports.Employees, key: "employeeId" },
    },
    medicationTankId: {
        type: sequelize_1.DataTypes.STRING,
        references: { model: exports.Tanks, key: "tankId" },
    },
    medicationTreatmentId: {
        type: sequelize_1.DataTypes.STRING,
        references: { model: exports.Treatments, key: "treatmentId" },
    },
    medicationQuantity: { type: sequelize_1.DataTypes.FLOAT },
    medicationDate: { type: sequelize_1.DataTypes.DATE },
    medicationId: { type: sequelize_1.DataTypes.STRING, primaryKey: true },
});
// Employees.hasMany(Medications);
// Tanks.hasMany(Medications);
// Treatments.hasMany(Medications);
// Medications.belongsTo(Employees);
// Medications.belongsTo(Tanks);
// Medications.belongsTo(Treatments);
exports.Maintenances = sequelize_2.sequelize.define("Maintenance", {
    maintenanceEmployeeId: {
        type: sequelize_1.DataTypes.STRING,
        references: { model: exports.Employees, key: "employeeId" },
    },
    maintenanceEquipmentId: {
        type: sequelize_1.DataTypes.STRING,
        references: { model: exports.Equipments, key: "equipmentId" },
    },
    maintenanceDate: { type: sequelize_1.DataTypes.DATE },
    maintenanceCost: { type: sequelize_1.DataTypes.FLOAT },
    maintenanceId: { type: sequelize_1.DataTypes.STRING, primaryKey: true },
});
// Employees.hasMany(Maintenances);
// Equipments.hasMany(Maintenances);
// Maintenances.belongsTo(Employees);
// Maintenances.belongsTo(Equipments);
exports.Transactions = sequelize_2.sequelize.define("Transaction", {
    transactionType: { type: sequelize_1.DataTypes.STRING },
    transactionValue: { type: sequelize_1.DataTypes.FLOAT },
    transactionPartnerId: {
        type: sequelize_1.DataTypes.STRING,
        references: {
            model: exports.BusinessPartners,
            key: "partnerId",
        },
    },
    transactionEmployeeId: {
        type: sequelize_1.DataTypes.STRING,
        references: {
            model: exports.Employees,
            key: "employeeId",
        },
    },
    transactionSaleQuantity: { type: sequelize_1.DataTypes.INTEGER, allowNull: true },
    transactionPurchaseFoodId: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
        references: {
            model: exports.Foods,
            key: "foodId",
        },
    },
    transactionPurchaseTreatmentId: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
        references: {
            model: exports.Treatments,
            key: "treatmentId",
        },
    },
    transactionPurchaseEquipmentId: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
        references: {
            model: exports.Equipments,
            key: "equipmentId",
        },
    },
    transactionDate: { type: sequelize_1.DataTypes.DATE },
    transactionId: { type: sequelize_1.DataTypes.STRING, primaryKey: true },
});
// BusinessPartners.hasMany(Transactions);
// Transactions.belongsTo(BusinessPartners);
// Employees.hasMany(Transactions);
// Transactions.belongsTo(Employees);
// Foods.hasOne(Transactions);
// Treatments.hasOne(Transactions);
// Equipments.hasOne(Transactions);
exports.Verifications = sequelize_2.sequelize.define("Verification", {
    verificationEmployeeId: {
        type: sequelize_1.DataTypes.STRING,
        references: { model: exports.Employees, key: "employeeId" },
    },
    verificationTankId: {
        type: sequelize_1.DataTypes.STRING,
        references: { model: exports.Tanks, key: "tankId" },
    },
    verificationTemperature: { type: sequelize_1.DataTypes.FLOAT },
    verificationOxygen: { type: sequelize_1.DataTypes.FLOAT },
    verificationPh: { type: sequelize_1.DataTypes.FLOAT },
    verificationDate: { type: sequelize_1.DataTypes.DATE },
    verificationId: { type: sequelize_1.DataTypes.STRING, primaryKey: true },
});
// Employees.hasMany(Verifications);
// Verifications.belongsTo(Employees);
// Tanks.hasMany(Verifications);
// Verifications.belongsTo(Tanks);
exports.Warnings = sequelize_2.sequelize.define("Warning", {
    warningTankId: {
        type: sequelize_1.DataTypes.STRING,
        references: { model: exports.Tanks, key: "tankId" },
    },
    warningMsg: { type: sequelize_1.DataTypes.STRING },
    warningTemperature: { type: sequelize_1.DataTypes.BOOLEAN },
    warningOxygen: { type: sequelize_1.DataTypes.BOOLEAN },
    warningPh: { type: sequelize_1.DataTypes.BOOLEAN },
    warningId: { type: sequelize_1.DataTypes.STRING, primaryKey: true },
});
// Tanks.hasMany(Warnings);
// Warnings.belongsTo(Tanks);
// async function sync(): Promise<void> {
//   await sequelize.sync({ force: true });
// }
// sync();
