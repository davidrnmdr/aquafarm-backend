"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.App = void 0;
const feeding_1 = require("./entities/feeding");
const maintenance_1 = require("./entities/maintenance");
const medication_1 = require("./entities/medication");
const purchase_1 = require("./entities/purchase");
const sale_1 = require("./entities/sale");
const tankVerification_1 = require("./entities/tankVerification");
const duplicate_employee_error_1 = require("./errors/duplicate-employee-error");
const duplicate_partner_error_1 = require("./errors/duplicate-partner-error");
const employee_not_found_error_1 = require("./errors/employee-not-found-error");
const equipment_not_found_error_1 = require("./errors/equipment-not-found-error");
const expired_food_error_1 = require("./errors/expired-food-error");
const expired_treatment_error_1 = require("./errors/expired-treatment-error");
const feeding_not_found_error_1 = require("./errors/feeding-not-found-error");
const food_not_found_error_1 = require("./errors/food-not-found-error");
const insuficient_food_error_1 = require("./errors/insuficient-food-error");
const insuficient_permission_error_1 = require("./errors/insuficient-permission-error");
const insuficient_treatment_error_1 = require("./errors/insuficient-treatment-error");
const invalid_input_error_1 = require("./errors/invalid-input-error");
const partner_not_found_error_1 = require("./errors/partner-not-found-error");
const tank_not_found_error_1 = require("./errors/tank-not-found-error");
const unable_to_find_error_1 = require("./errors/unable-to-find-error");
const wrong_type_error_1 = require("./errors/wrong-type-error");
const crypt_1 = require("./services/crypt");
const warning_1 = require("./entities/warning");
const treatment_not_found_error_1 = require("./errors/treatment-not-found-error");
const superRoles = new Set(["president", "manager"]);
class App {
    businessPartnerRepo;
    employeeRepo;
    equipmentRepo;
    feedingRepo;
    foodRepo;
    maintenanceRepo;
    tankRepo;
    tankVerificationRepo;
    transactionRepo;
    treatmentRepo;
    medicationRepo;
    warningRepo;
    fishSpecieRepo;
    crypt = new crypt_1.Crypt();
    constructor(businessPartnerRepo, employeeRepo, equipmentRepo, feedingRepo, foodRepo, maintenanceRepo, tankRepo, tankVerificationRepo, transactionRepo, treatmentRepo, medicationRepo, warningRepo, fishSpecieRepo) {
        this.businessPartnerRepo = businessPartnerRepo;
        this.employeeRepo = employeeRepo;
        this.equipmentRepo = equipmentRepo;
        this.feedingRepo = feedingRepo;
        this.foodRepo = foodRepo;
        this.maintenanceRepo = maintenanceRepo;
        this.tankRepo = tankRepo;
        this.tankVerificationRepo = tankVerificationRepo;
        this.transactionRepo = transactionRepo;
        this.treatmentRepo = treatmentRepo;
        this.medicationRepo = medicationRepo;
        this.warningRepo = warningRepo;
        this.fishSpecieRepo = fishSpecieRepo;
    }
    async registerEmployee(employee) {
        if (await this.employeeRepo.find(employee.email)) {
            throw new duplicate_employee_error_1.DuplicatedEmployeeError();
        }
        const encryptedPassword = await this.crypt.encrypt(employee.password);
        employee.password = encryptedPassword;
        return await this.employeeRepo.add(employee);
    }
    async findEmployee(email) {
        const retrievedEmployee = await this.employeeRepo.find(email);
        if (!retrievedEmployee)
            throw new employee_not_found_error_1.EmployeeNotFoundError();
        return retrievedEmployee;
    }
    async registerSpecie(specie) {
        return await this.fishSpecieRepo.add(specie);
    }
    async registerTank(tank) {
        if (tank.capacity <= 0 || tank.status <= 0)
            throw new invalid_input_error_1.InvalidInputError();
        return await this.tankRepo.add(tank);
    }
    async findTank(id) {
        const retrievedTank = await this.tankRepo.find(id);
        if (!retrievedTank)
            throw new tank_not_found_error_1.TankNotFoundError();
        return retrievedTank;
    }
    async findTanksBy(attribute, attributeValue) {
        if ((["type", "location"].includes(attribute) &&
            typeof attributeValue === "number") ||
            (["status", "capacity"].includes(attribute) &&
                typeof attributeValue === "string")) {
            throw new wrong_type_error_1.WrongTypeError();
        }
        return await this.tankRepo.findBy(attribute, attributeValue);
    }
    async registerEquipment(equipment) {
        const seller = await this.businessPartnerRepo.find(equipment.seller.ein);
        if (!seller)
            throw new partner_not_found_error_1.PartnerNotFoundError();
        if (equipment.quantity <= 0 ||
            equipment.cost <= 0 ||
            equipment.totalMaintenanceCost != 0)
            throw new invalid_input_error_1.InvalidInputError();
        return await this.equipmentRepo.add(equipment);
    }
    async findEquipment(id) {
        if (!id)
            throw new invalid_input_error_1.InvalidInputError();
        const retrievedEquipment = await this.equipmentRepo.find(id);
        if (!retrievedEquipment)
            throw new equipment_not_found_error_1.EquipmentNotFoundError();
        return retrievedEquipment;
    }
    async registerFood(food) {
        const seller = await this.businessPartnerRepo.find(food.seller.ein);
        if (!seller)
            throw new partner_not_found_error_1.PartnerNotFoundError();
        const today = new Date();
        if (food.quantity <= 0 || food.cost <= 0 || food.expirationDate < today)
            throw new invalid_input_error_1.InvalidInputError();
        return this.foodRepo.add(food);
    }
    async findFood(id) {
        if (!id)
            throw new invalid_input_error_1.InvalidInputError();
        const retrievedFood = await this.foodRepo.find(id);
        if (!retrievedFood)
            throw new food_not_found_error_1.FoodNotFoundError();
        return retrievedFood;
    }
    async removeFood(id) {
        await this.findFood(id);
        await this.foodRepo.delete(id);
    }
    async registerTreatment(treatment) {
        const seller = await this.businessPartnerRepo.find(treatment.seller.ein);
        if (!seller)
            throw new partner_not_found_error_1.PartnerNotFoundError();
        if (treatment.quantity <= 0 || treatment.cost <= 0)
            throw new invalid_input_error_1.InvalidInputError();
        return this.treatmentRepo.add(treatment);
    }
    async findTreatment(id) {
        if (!id)
            throw new invalid_input_error_1.InvalidInputError();
        const retrievedTreatment = await this.treatmentRepo.find(id);
        if (!retrievedTreatment)
            throw new treatment_not_found_error_1.TreatmentNotFoundError();
        return retrievedTreatment;
    }
    async removeTreatment(id) {
        await this.findTreatment(id);
        await this.treatmentRepo.delete(id);
    }
    async registerBusinessPartner(partner) {
        if (await this.businessPartnerRepo.find(partner.ein)) {
            throw new duplicate_partner_error_1.DuplicatePartnerError();
        }
        return this.businessPartnerRepo.add(partner);
    }
    async findBusinessPartner(ein) {
        const retrievedPartner = await this.businessPartnerRepo.find(ein);
        if (!retrievedPartner)
            throw new partner_not_found_error_1.PartnerNotFoundError();
        return retrievedPartner;
    }
    async registerVerification(tankId, employeeEmail, temperature, oxygen, ph) {
        if (!(oxygen > 0 && isInRange(ph, 0, 14)))
            throw new invalid_input_error_1.InvalidInputError();
        const today = new Date();
        const tank = await this.findTank(tankId);
        const employee = await this.findEmployee(employeeEmail);
        const oldWarnings = await this.findWarningsByTank(tankId);
        const details = {
            verification: {
                temperatureOutOfRange: !isIn(temperature, tank.fishSpecie.temperatureRange),
                oxygenOutOfRange: !isIn(oxygen, tank.fishSpecie.oxygenRange),
                phOutOfRange: !isIn(ph, tank.fishSpecie.phRange),
            },
        };
        if (details.verification?.temperatureOutOfRange ||
            details.verification?.oxygenOutOfRange ||
            details.verification?.phOutOfRange) {
            this.warningRepo.add(new warning_1.Warning(tank, `Verified Metric Out Of Range in Tank ${tankId}`, details));
        }
        else {
            oldWarnings.forEach(async (warning) => await this.warningRepo.delete(warning.id));
        }
        return await this.tankVerificationRepo.add(new tankVerification_1.TankVerification(tank, employee, temperature, oxygen, ph, today));
    }
    async findVerificationsByEmployee(attribute, value) {
        const retrievedVerifications = await this.tankVerificationRepo.findByEmployee(attribute, value);
        if (retrievedVerifications.length === 0)
            throw new unable_to_find_error_1.UnableToFindError();
        return retrievedVerifications;
    }
    async registerFeeding(tankId, employeeEmail, foodId, quantity) {
        if (quantity < 0)
            throw new invalid_input_error_1.InvalidInputError();
        const tank = await this.findTank(tankId);
        const employee = await this.findEmployee(employeeEmail);
        const food = await this.findFood(foodId);
        const today = new Date();
        if (food.quantity < quantity)
            throw new insuficient_food_error_1.InsuficientFoodError();
        if (food.expirationDate < today)
            throw new expired_food_error_1.ExpiredFoodError();
        await this.foodRepo.updateStorage(foodId, food.quantity - quantity);
        return this.feedingRepo.add(new feeding_1.Feeding(employee, tank, food, quantity, today));
    }
    async findFeeding(id) {
        const retrievedFeeding = await this.feedingRepo.find(id);
        if (!retrievedFeeding)
            throw new feeding_not_found_error_1.FeedingNotFoundError();
        return retrievedFeeding;
    }
    async findFeedingsByEmployee(attribute, value) {
        const retrievedFeedings = await this.feedingRepo.findByEmployee(attribute, value);
        if (retrievedFeedings.length === 0)
            throw new unable_to_find_error_1.UnableToFindError();
        return retrievedFeedings;
    }
    async registerSale(value, partnerEin, quantity, employeeEmail) {
        if (value < 0 || quantity < 0)
            throw new invalid_input_error_1.InvalidInputError();
        const partner = await this.findBusinessPartner(partnerEin);
        const employee = await this.findEmployee(employeeEmail);
        const today = new Date();
        return await this.transactionRepo.add(new sale_1.Sale(value, partner, today, quantity, employee));
    }
    async findSalesByEmployee(attribute, value) {
        const retrievedSales = await this.transactionRepo.findByEmployee("sale", attribute, value);
        if (retrievedSales.length === 0)
            throw new unable_to_find_error_1.UnableToFindError();
        return retrievedSales;
    }
    async registerPurchase(value, partnerEin, foodId, treatmentId, equipmentId, employeeEmail) {
        let totalValue = 0;
        let food = null;
        let foodQuantity = 0;
        let treatment = null;
        let treatmentQuantity = 0;
        let equipment = null;
        let equipmentQuantity = 0;
        if (equipmentId) {
            totalValue =
                equipmentId &&
                    (equipmentQuantity = (equipment = await this.findEquipment(equipmentId))
                        .quantity) > 0
                    ? totalValue + equipment.cost
                    : totalValue;
        }
        if (foodId) {
            totalValue =
                foodId &&
                    (foodQuantity = (food = await this.findFood(foodId)).quantity) > 0
                    ? totalValue + food.cost
                    : totalValue;
        }
        if (treatmentId) {
            totalValue =
                treatmentId &&
                    (treatmentQuantity = (treatment = await this.findTreatment(treatmentId))
                        .quantity) > 0
                    ? totalValue + treatment.cost
                    : totalValue;
        }
        if (value < 0 ||
            foodQuantity < 0 ||
            treatmentQuantity < 0 ||
            equipmentQuantity < 0 ||
            (foodQuantity === 0 && treatmentQuantity === 0 && equipmentQuantity == 0))
            throw new invalid_input_error_1.InvalidInputError();
        const partner = await this.findBusinessPartner(partnerEin);
        const employee = await this.findEmployee(employeeEmail);
        if (totalValue != value && !superRoles.has(employee.role)) {
            throw new insuficient_permission_error_1.InsuficientPermissionError();
        }
        return await this.transactionRepo.add(new purchase_1.Purchase(value, partner, new Date(), food, treatment, equipment, employee));
    }
    async findPurchasesByEmployee(attribute, value) {
        const retrievedPurchases = await this.transactionRepo.findByEmployee("purchase", attribute, value);
        if (retrievedPurchases.length === 0)
            throw new unable_to_find_error_1.UnableToFindError();
        return retrievedPurchases;
    }
    async registerMedication(tankId, employeeEmail, treatmentId, quantity) {
        if (quantity < 0)
            throw new invalid_input_error_1.InvalidInputError();
        const tank = await this.findTank(tankId);
        const employee = await this.findEmployee(employeeEmail);
        const treatment = await this.findTreatment(treatmentId);
        const today = new Date();
        if (treatment.quantity < quantity)
            throw new insuficient_treatment_error_1.InsuficientTreatmentError();
        if (treatment.expirationDate < today)
            throw new expired_treatment_error_1.ExpiredTreatmentError();
        await this.treatmentRepo.updateStorage(treatmentId, treatment.quantity - quantity);
        return this.medicationRepo.add(new medication_1.Medication(employee, tank, treatment, quantity, today));
    }
    async findMedication(id) {
        const retrievedMedication = await this.medicationRepo.find(id);
        if (!retrievedMedication)
            throw new feeding_not_found_error_1.FeedingNotFoundError();
        return retrievedMedication;
    }
    async findMedicationsByEmployee(attribute, value) {
        const retrievedMedications = await this.medicationRepo.findByEmployee(attribute, value);
        if (retrievedMedications.length === 0)
            throw new unable_to_find_error_1.UnableToFindError();
        return retrievedMedications;
    }
    async registerMaintenance(equipmentId, employeeEmail, cost) {
        if (cost < 0)
            throw new invalid_input_error_1.InvalidInputError();
        const equipment = await this.findEquipment(equipmentId);
        const employee = await this.findEmployee(employeeEmail);
        const today = new Date();
        await this.equipmentRepo.updateMaintenanceCost(equipmentId, equipment.totalMaintenanceCost + cost);
        return await this.maintenanceRepo.add(new maintenance_1.Maintenance(equipment, employee, today, cost));
    }
    async findMaintenancesByEmployee(attribute, value) {
        const retrievedMaintenances = await this.maintenanceRepo.findByEmployee(attribute, value);
        if (retrievedMaintenances.length === 0)
            throw new unable_to_find_error_1.UnableToFindError();
        return retrievedMaintenances;
    }
    async filterSales(filter) {
        const allSales = (await this.transactionRepo.list("sale"));
        const filteredSales = allSales.filter((sale) => {
            if (filter.value &&
                !isInRange(sale.value, filter.value.min, filter.value.max))
                return false;
            if (filter.date &&
                !isInRange(sale.date, filter.date.min, filter.date.max))
                return false;
            if (filter.quantity &&
                !isInRange(sale.quantity, filter.quantity.min, filter.quantity.max))
                return false;
            if (filter.partner && sale.partner.ein !== filter.partner.ein)
                return false;
            return true;
        });
        return filteredSales;
    }
    async filterPurchases(filter) {
        const allPurchases = (await this.transactionRepo.list("purchase"));
        const filteredPurchases = allPurchases.filter((purchase) => {
            if (filter.value &&
                !isInRange(purchase.value, filter.value.min, filter.value.max))
                return false;
            if (filter.date &&
                !isInRange(purchase.date, filter.date.min, filter.date.max))
                return false;
            if (filter.partner && purchase.partner.ein !== filter.partner.ein)
                return false;
            if ((!filter.food && purchase.food) || (filter.food && !purchase.food))
                return false;
            if ((!filter.treatment && purchase.treatment) ||
                (filter.treatment && !purchase.treatment))
                return false;
            if ((!filter.equipment && purchase.equipment) ||
                (filter.equipment && !purchase.equipment))
                return false;
            return true;
        });
        return filteredPurchases;
    }
    async listWarnings() {
        return await this.warningRepo.list();
    }
    async findWarningsByTank(tankId) {
        const allWarnings = await this.warningRepo.list();
        return allWarnings.filter((warning) => warning.tank.id === tankId);
    }
}
exports.App = App;
function isInRange(value, min, max = Infinity) {
    return value <= max && value >= min;
}
function isIn(value, range) {
    return value <= range.max && value >= range.min;
}
