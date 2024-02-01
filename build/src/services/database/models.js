"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Warnings = exports.Verifications = exports.Transactions = exports.Maintenances = exports.Medications = exports.Feedings = exports.Treatments = exports.Foods = exports.Tanks = exports.FishSpecies = exports.Equipments = exports.Employees = exports.BusinessPartners = void 0;
const sequelize_1 = require("sequelize");
const sequelize_2 = require("./sequelize");
exports.BusinessPartners = sequelize_2.sequelize.define("BusinessPartner", {
    partnerEin: { type: sequelize_1.DataTypes.STRING, unique: true, allowNull: false },
    partnerEmail: { type: sequelize_1.DataTypes.STRING, allowNull: false },
    partnerName: { type: sequelize_1.DataTypes.STRING, allowNull: false },
    partnerAddress: { type: sequelize_1.DataTypes.STRING, allowNull: false },
    partnerId: { type: sequelize_1.DataTypes.STRING, primaryKey: true },
});
exports.Employees = sequelize_2.sequelize.define("Employee", {
    employeeName: { type: sequelize_1.DataTypes.STRING, allowNull: false },
    employeeEmail: { type: sequelize_1.DataTypes.STRING, unique: true, allowNull: false },
    employeeRole: { type: sequelize_1.DataTypes.STRING, allowNull: false },
    employeePassword: { type: sequelize_1.DataTypes.STRING, allowNull: false },
    employeeId: { type: sequelize_1.DataTypes.STRING, primaryKey: true },
});
exports.Equipments = sequelize_2.sequelize.define("Equipment", {
    equipmentType: { type: sequelize_1.DataTypes.STRING, allowNull: false },
    equipmentStatus: { type: sequelize_1.DataTypes.STRING, allowNull: false },
    equipmentLocation: { type: sequelize_1.DataTypes.STRING, allowNull: false },
    equipmentSellerId: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        references: {
            model: exports.BusinessPartners,
            key: "partnerId",
        },
    },
    equipmentMaintenanceCost: { type: sequelize_1.DataTypes.FLOAT, allowNull: false },
    equipmentCost: { type: sequelize_1.DataTypes.FLOAT, allowNull: false },
    equipmentQuantity: { type: sequelize_1.DataTypes.INTEGER, allowNull: false },
    equipmentId: { type: sequelize_1.DataTypes.STRING, primaryKey: true },
});
// BusinessPartners.hasMany(Equipments);
// Equipments.belongsTo(BusinessPartners);
exports.FishSpecies = sequelize_2.sequelize.define("FishSpecie", {
    specieName: { type: sequelize_1.DataTypes.STRING, unique: true, allowNull: false },
    specieFoodType: { type: sequelize_1.DataTypes.STRING, allowNull: false },
    specieMinTemperature: { type: sequelize_1.DataTypes.FLOAT, allowNull: false },
    specieMaxTemperature: { type: sequelize_1.DataTypes.FLOAT, allowNull: false },
    specieMinOxygen: { type: sequelize_1.DataTypes.FLOAT, allowNull: false },
    specieMaxOxygen: { type: sequelize_1.DataTypes.FLOAT, allowNull: false },
    specieMinPh: { type: sequelize_1.DataTypes.FLOAT, allowNull: false },
    specieMaxPh: { type: sequelize_1.DataTypes.FLOAT, allowNull: false },
    specieId: { type: sequelize_1.DataTypes.STRING, primaryKey: true },
});
exports.Tanks = sequelize_2.sequelize.define("Tank", {
    tankSpecieId: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        references: { model: exports.FishSpecies, key: "specieId" },
    },
    tankType: { type: sequelize_1.DataTypes.STRING, allowNull: false },
    tankLocation: { type: sequelize_1.DataTypes.STRING, allowNull: false },
    tankStatus: { type: sequelize_1.DataTypes.FLOAT, allowNull: false },
    tankCapacity: { type: sequelize_1.DataTypes.INTEGER, allowNull: false },
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
        allowNull: false,
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
    treatmentName: { type: sequelize_1.DataTypes.STRING, allowNull: false },
    treatmentQuantity: { type: sequelize_1.DataTypes.FLOAT, allowNull: false },
    treatmentCost: { type: sequelize_1.DataTypes.FLOAT, allowNull: false },
    treatmentExpirationDate: { type: sequelize_1.DataTypes.DATE, allowNull: false },
    treatmentSellerId: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
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
        allowNull: false,
        references: { model: exports.Employees, key: "employeeId" },
    },
    feedingTankId: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        references: { model: exports.Tanks, key: "tankId" },
    },
    feedingFoodId: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        references: { model: exports.Foods, key: "foodId" },
    },
    feedingQuantity: { type: sequelize_1.DataTypes.FLOAT, allowNull: false },
    feedingDate: { type: sequelize_1.DataTypes.DATE, allowNull: false },
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
        allowNull: false,
        references: { model: exports.Employees, key: "employeeId" },
    },
    medicationTankId: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        references: { model: exports.Tanks, key: "tankId" },
    },
    medicationTreatmentId: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        references: { model: exports.Treatments, key: "treatmentId" },
    },
    medicationQuantity: { type: sequelize_1.DataTypes.FLOAT, allowNull: false },
    medicationDate: { type: sequelize_1.DataTypes.DATE, allowNull: false },
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
        allowNull: false,
        references: { model: exports.Employees, key: "employeeId" },
    },
    maintenanceEquipmentId: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        references: { model: exports.Equipments, key: "equipmentId" },
    },
    maintenanceDate: { type: sequelize_1.DataTypes.DATE, allowNull: false },
    maintenanceCost: { type: sequelize_1.DataTypes.FLOAT, allowNull: false },
    maintenanceId: { type: sequelize_1.DataTypes.STRING, primaryKey: true },
});
// Employees.hasMany(Maintenances);
// Equipments.hasMany(Maintenances);
// Maintenances.belongsTo(Employees);
// Maintenances.belongsTo(Equipments);
exports.Transactions = sequelize_2.sequelize.define("Transaction", {
    transactionType: { type: sequelize_1.DataTypes.STRING, allowNull: false },
    transactionValue: { type: sequelize_1.DataTypes.FLOAT, allowNull: false },
    transactionPartnerId: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        references: {
            model: exports.BusinessPartners,
            key: "partnerId",
        },
    },
    transactionEmployeeId: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
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
    transactionDate: { type: sequelize_1.DataTypes.DATE, allowNull: false },
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
        allowNull: false,
        references: { model: exports.Employees, key: "employeeId" },
    },
    verificationTankId: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        references: { model: exports.Tanks, key: "tankId" },
    },
    verificationTemperature: { type: sequelize_1.DataTypes.FLOAT, allowNull: false },
    verificationOxygen: { type: sequelize_1.DataTypes.FLOAT, allowNull: false },
    verificationPh: { type: sequelize_1.DataTypes.FLOAT, allowNull: false },
    verificationDate: { type: sequelize_1.DataTypes.DATE, allowNull: false },
    verificationId: { type: sequelize_1.DataTypes.STRING, primaryKey: true },
});
// Employees.hasMany(Verifications);
// Verifications.belongsTo(Employees);
// Tanks.hasMany(Verifications);
// Verifications.belongsTo(Tanks);
exports.Warnings = sequelize_2.sequelize.define("Warning", {
    warningTankId: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        references: { model: exports.Tanks, key: "tankId" },
    },
    warningMsg: { type: sequelize_1.DataTypes.STRING, allowNull: false },
    warningTemperature: { type: sequelize_1.DataTypes.BOOLEAN, allowNull: false },
    warningOxygen: { type: sequelize_1.DataTypes.BOOLEAN, allowNull: false },
    warningPh: { type: sequelize_1.DataTypes.BOOLEAN, allowNull: false },
    warningId: { type: sequelize_1.DataTypes.STRING, primaryKey: true },
});
// Tanks.hasMany(Warnings);
// Warnings.belongsTo(Tanks);
// async function sync(): Promise<void> {
//   await sequelize.sync({ force: true });
// }
// sync();
