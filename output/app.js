"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.App = void 0;
var feeding_1 = require("./entities/feeding");
var maintenance_1 = require("./entities/maintenance");
var medication_1 = require("./entities/medication");
var purchase_1 = require("./entities/purchase");
var sale_1 = require("./entities/sale");
var tankVerification_1 = require("./entities/tankVerification");
var duplicate_employee_error_1 = require("./errors/duplicate-employee-error");
var duplicate_partner_error_1 = require("./errors/duplicate-partner-error");
var employee_not_found_error_1 = require("./errors/employee-not-found-error");
var equipment_not_found_error_1 = require("./errors/equipment-not-found-error");
var expired_food_error_1 = require("./errors/expired-food-error");
var expired_treatment_error_1 = require("./errors/expired-treatment-error");
var feeding_not_found_error_1 = require("./errors/feeding-not-found-error");
var food_not_found_error_1 = require("./errors/food-not-found-error");
var insuficient_food_error_1 = require("./errors/insuficient-food-error");
var insuficient_permission_error_1 = require("./errors/insuficient-permission-error");
var insuficient_treatment_error_1 = require("./errors/insuficient-treatment-error");
var invalid_input_error_1 = require("./errors/invalid-input-error");
var partner_not_found_error_1 = require("./errors/partner-not-found-error");
var tank_not_found_error_1 = require("./errors/tank-not-found-error");
var unable_to_find_error_1 = require("./errors/unable-to-find-error");
var wrong_type_error_1 = require("./errors/wrong-type-error");
var crypt_1 = require("./services/crypt");
var warning_1 = require("./entities/warning");
var superRoles = new Set(["president", "manager"]);
var App = /** @class */ (function () {
    function App(businessPartnerRepo, employeeRepo, equipmentRepo, feedingRepo, foodRepo, maintenanceRepo, tankRepo, tankVerificationRepo, transactionRepo, treatmentRepo, medicationRepo, warningRepo, fishSpecieRepo) {
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
        this.crypt = new crypt_1.Crypt();
    }
    App.prototype.registerEmployee = function (employee) {
        return __awaiter(this, void 0, void 0, function () {
            var encryptedPassword;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.employeeRepo.find(employee.email)];
                    case 1:
                        if (_a.sent()) {
                            throw new duplicate_employee_error_1.DuplicatedEmployeeError();
                        }
                        return [4 /*yield*/, this.crypt.encrypt(employee.password)];
                    case 2:
                        encryptedPassword = _a.sent();
                        employee.password = encryptedPassword;
                        return [4 /*yield*/, this.employeeRepo.add(employee)];
                    case 3: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    App.prototype.findEmployee = function (email) {
        return __awaiter(this, void 0, void 0, function () {
            var retrievedEmployee;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.employeeRepo.find(email)];
                    case 1:
                        retrievedEmployee = _a.sent();
                        if (!retrievedEmployee)
                            throw new employee_not_found_error_1.EmployeeNotFoundError();
                        return [2 /*return*/, retrievedEmployee];
                }
            });
        });
    };
    App.prototype.registerSpecie = function (specie) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.fishSpecieRepo.add(specie)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    App.prototype.registerTank = function (tank) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (tank.capacity <= 0 || tank.status <= 0)
                            throw new invalid_input_error_1.InvalidInputError();
                        return [4 /*yield*/, this.tankRepo.add(tank)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    App.prototype.findTank = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var retrievedTank;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.tankRepo.find(id)];
                    case 1:
                        retrievedTank = _a.sent();
                        if (!retrievedTank)
                            throw new tank_not_found_error_1.TankNotFoundError();
                        return [2 /*return*/, retrievedTank];
                }
            });
        });
    };
    App.prototype.findTanksBy = function (attribute, attributeValue) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if ((["type", "location"].includes(attribute) &&
                            typeof attributeValue === "number") ||
                            (["status", "capacity"].includes(attribute) &&
                                typeof attributeValue === "string")) {
                            throw new wrong_type_error_1.WrongTypeError();
                        }
                        return [4 /*yield*/, this.tankRepo.findBy(attribute, attributeValue)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    App.prototype.registerEquipment = function (equipment) {
        return __awaiter(this, void 0, void 0, function () {
            var seller;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.businessPartnerRepo.find(equipment.seller.ein)];
                    case 1:
                        seller = _a.sent();
                        if (!seller)
                            throw new partner_not_found_error_1.PartnerNotFoundError();
                        if (equipment.quantity <= 0 ||
                            equipment.cost <= 0 ||
                            equipment.totalMaintenanceCost != 0)
                            throw new invalid_input_error_1.InvalidInputError();
                        return [4 /*yield*/, this.equipmentRepo.add(equipment)];
                    case 2: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    App.prototype.findEquipment = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var retrievedEquipment;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!id)
                            throw new invalid_input_error_1.InvalidInputError();
                        return [4 /*yield*/, this.equipmentRepo.find(id)];
                    case 1:
                        retrievedEquipment = _a.sent();
                        if (!retrievedEquipment)
                            throw new equipment_not_found_error_1.EquipmentNotFoundError();
                        return [2 /*return*/, retrievedEquipment];
                }
            });
        });
    };
    App.prototype.registerFood = function (food) {
        return __awaiter(this, void 0, void 0, function () {
            var seller, today;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.businessPartnerRepo.find(food.seller.ein)];
                    case 1:
                        seller = _a.sent();
                        if (!seller)
                            throw new partner_not_found_error_1.PartnerNotFoundError();
                        today = new Date();
                        if (food.quantity <= 0 || food.cost <= 0 || food.expirationDate < today)
                            throw new invalid_input_error_1.InvalidInputError();
                        return [2 /*return*/, this.foodRepo.add(food)];
                }
            });
        });
    };
    App.prototype.findFood = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var retrievedFood;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!id)
                            throw new invalid_input_error_1.InvalidInputError();
                        return [4 /*yield*/, this.foodRepo.find(id)];
                    case 1:
                        retrievedFood = _a.sent();
                        if (!retrievedFood)
                            throw new food_not_found_error_1.FoodNotFoundError();
                        return [2 /*return*/, retrievedFood];
                }
            });
        });
    };
    App.prototype.removeFood = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.findFood(id)];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, this.foodRepo.delete(id)];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    App.prototype.registerTreatment = function (treatment) {
        return __awaiter(this, void 0, void 0, function () {
            var seller;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.businessPartnerRepo.find(treatment.seller.ein)];
                    case 1:
                        seller = _a.sent();
                        if (!seller)
                            throw new partner_not_found_error_1.PartnerNotFoundError();
                        if (treatment.quantity <= 0 || treatment.cost <= 0)
                            throw new invalid_input_error_1.InvalidInputError();
                        return [2 /*return*/, this.treatmentRepo.add(treatment)];
                }
            });
        });
    };
    App.prototype.findTreatment = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var retrievedTreatment;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!id)
                            throw new invalid_input_error_1.InvalidInputError();
                        return [4 /*yield*/, this.treatmentRepo.find(id)];
                    case 1:
                        retrievedTreatment = _a.sent();
                        if (!retrievedTreatment)
                            throw new food_not_found_error_1.FoodNotFoundError();
                        return [2 /*return*/, retrievedTreatment];
                }
            });
        });
    };
    App.prototype.removeTreatment = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.findTreatment(id)];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, this.treatmentRepo.delete(id)];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    App.prototype.registerBusinessPartner = function (partner) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.businessPartnerRepo.find(partner.ein)];
                    case 1:
                        if (_a.sent()) {
                            throw new duplicate_partner_error_1.DuplicatePartnerError();
                        }
                        return [2 /*return*/, this.businessPartnerRepo.add(partner)];
                }
            });
        });
    };
    App.prototype.findBusinessPartner = function (ein) {
        return __awaiter(this, void 0, void 0, function () {
            var retrievedPartner;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.businessPartnerRepo.find(ein)];
                    case 1:
                        retrievedPartner = _a.sent();
                        if (!retrievedPartner)
                            throw new partner_not_found_error_1.PartnerNotFoundError();
                        return [2 /*return*/, retrievedPartner];
                }
            });
        });
    };
    App.prototype.registerVerification = function (tankId, employeeEmail, temperature, oxygen, ph) {
        var _a, _b, _c;
        return __awaiter(this, void 0, void 0, function () {
            var today, tank, employee, oldWarnings, details;
            var _this = this;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        if (!(oxygen > 0 && isInRange(ph, 0, 14)))
                            throw new invalid_input_error_1.InvalidInputError();
                        today = new Date();
                        return [4 /*yield*/, this.findTank(tankId)];
                    case 1:
                        tank = _d.sent();
                        return [4 /*yield*/, this.findEmployee(employeeEmail)];
                    case 2:
                        employee = _d.sent();
                        return [4 /*yield*/, this.findWarningsByTank(tankId)];
                    case 3:
                        oldWarnings = _d.sent();
                        details = {
                            verification: {
                                temperatureOutOfRange: !isIn(temperature, tank.fishSpecie.temperatureRange),
                                oxygenOutOfRange: !isIn(oxygen, tank.fishSpecie.oxygenRange),
                                phOutOfRange: !isIn(ph, tank.fishSpecie.phRange),
                            },
                        };
                        if (((_a = details.verification) === null || _a === void 0 ? void 0 : _a.temperatureOutOfRange) ||
                            ((_b = details.verification) === null || _b === void 0 ? void 0 : _b.oxygenOutOfRange) ||
                            ((_c = details.verification) === null || _c === void 0 ? void 0 : _c.phOutOfRange)) {
                            this.warningRepo.add(new warning_1.Warning(tank, "Verified Metric Out Of Range in Tank ".concat(tankId), details));
                        }
                        else {
                            oldWarnings.forEach(function (warning) { return __awaiter(_this, void 0, void 0, function () { return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0: return [4 /*yield*/, this.warningRepo.delete(warning.id)];
                                    case 1: return [2 /*return*/, _a.sent()];
                                }
                            }); }); });
                        }
                        return [4 /*yield*/, this.tankVerificationRepo.add(new tankVerification_1.TankVerification(tank, employee, temperature, oxygen, ph, today))];
                    case 4: return [2 /*return*/, _d.sent()];
                }
            });
        });
    };
    App.prototype.findVerificationsByEmployee = function (attribute, value) {
        return __awaiter(this, void 0, void 0, function () {
            var retrievedVerifications;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.tankVerificationRepo.findByEmployee(attribute, value)];
                    case 1:
                        retrievedVerifications = _a.sent();
                        if (retrievedVerifications.length === 0)
                            throw new unable_to_find_error_1.UnableToFindError();
                        return [2 /*return*/, retrievedVerifications];
                }
            });
        });
    };
    App.prototype.registerFeeding = function (tankId, employeeEmail, foodId, quantity) {
        return __awaiter(this, void 0, void 0, function () {
            var tank, employee, food, today;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (quantity < 0)
                            throw new invalid_input_error_1.InvalidInputError();
                        return [4 /*yield*/, this.findTank(tankId)];
                    case 1:
                        tank = _a.sent();
                        return [4 /*yield*/, this.findEmployee(employeeEmail)];
                    case 2:
                        employee = _a.sent();
                        return [4 /*yield*/, this.findFood(foodId)];
                    case 3:
                        food = _a.sent();
                        today = new Date();
                        if (food.quantity < quantity)
                            throw new insuficient_food_error_1.InsuficientFoodError();
                        if (food.expirationDate < today)
                            throw new expired_food_error_1.ExpiredFoodError();
                        return [4 /*yield*/, this.foodRepo.updateStorage(foodId, food.quantity - quantity)];
                    case 4:
                        _a.sent();
                        return [2 /*return*/, this.feedingRepo.add(new feeding_1.Feeding(employee, tank, food, quantity, today))];
                }
            });
        });
    };
    App.prototype.findFeeding = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var retrievedFeeding;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.feedingRepo.find(id)];
                    case 1:
                        retrievedFeeding = _a.sent();
                        if (!retrievedFeeding)
                            throw new feeding_not_found_error_1.FeedingNotFoundError();
                        return [2 /*return*/, retrievedFeeding];
                }
            });
        });
    };
    App.prototype.findFeedingsByEmployee = function (attribute, value) {
        return __awaiter(this, void 0, void 0, function () {
            var retrievedFeedings;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.feedingRepo.findByEmployee(attribute, value)];
                    case 1:
                        retrievedFeedings = _a.sent();
                        if (retrievedFeedings.length === 0)
                            throw new unable_to_find_error_1.UnableToFindError();
                        return [2 /*return*/, retrievedFeedings];
                }
            });
        });
    };
    App.prototype.registerSale = function (value, partnerEin, quantity, employeeEmail) {
        return __awaiter(this, void 0, void 0, function () {
            var partner, employee, today;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (value < 0 || quantity < 0)
                            throw new invalid_input_error_1.InvalidInputError();
                        return [4 /*yield*/, this.findBusinessPartner(partnerEin)];
                    case 1:
                        partner = _a.sent();
                        return [4 /*yield*/, this.findEmployee(employeeEmail)];
                    case 2:
                        employee = _a.sent();
                        today = new Date();
                        return [4 /*yield*/, this.transactionRepo.add(new sale_1.Sale(value, partner, today, quantity, employee))];
                    case 3: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    App.prototype.findSalesByEmployee = function (attribute, value) {
        return __awaiter(this, void 0, void 0, function () {
            var retrievedSales;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.transactionRepo.findByEmployee("sale", attribute, value)];
                    case 1:
                        retrievedSales = _a.sent();
                        if (retrievedSales.length === 0)
                            throw new unable_to_find_error_1.UnableToFindError();
                        return [2 /*return*/, retrievedSales];
                }
            });
        });
    };
    App.prototype.registerPurchase = function (value, partnerEin, foodId, treatmentId, equipmentId, employeeEmail) {
        return __awaiter(this, void 0, void 0, function () {
            var totalValue, food, foodQuantity, treatment, treatmentQuantity, equipment, equipmentQuantity, _a, _b, _c, partner, employee;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        totalValue = 0;
                        food = null;
                        foodQuantity = 0;
                        treatment = null;
                        treatmentQuantity = 0;
                        equipment = null;
                        equipmentQuantity = 0;
                        if (!equipmentId) return [3 /*break*/, 3];
                        _a = equipmentId;
                        if (!_a) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.findEquipment(equipmentId)];
                    case 1:
                        _a = (equipmentQuantity = (equipment = _d.sent())
                            .quantity) > 0;
                        _d.label = 2;
                    case 2:
                        totalValue =
                            _a ? totalValue + equipment.cost
                                : totalValue;
                        _d.label = 3;
                    case 3:
                        if (!foodId) return [3 /*break*/, 6];
                        _b = foodId;
                        if (!_b) return [3 /*break*/, 5];
                        return [4 /*yield*/, this.findFood(foodId)];
                    case 4:
                        _b = (foodQuantity = (food = _d.sent()).quantity) > 0;
                        _d.label = 5;
                    case 5:
                        totalValue =
                            _b ? totalValue + food.cost
                                : totalValue;
                        _d.label = 6;
                    case 6:
                        if (!treatmentId) return [3 /*break*/, 9];
                        _c = treatmentId;
                        if (!_c) return [3 /*break*/, 8];
                        return [4 /*yield*/, this.findTreatment(treatmentId)];
                    case 7:
                        _c = (treatmentQuantity = (treatment = _d.sent())
                            .quantity) > 0;
                        _d.label = 8;
                    case 8:
                        totalValue =
                            _c ? totalValue + treatment.cost
                                : totalValue;
                        _d.label = 9;
                    case 9:
                        if (value < 0 ||
                            foodQuantity < 0 ||
                            treatmentQuantity < 0 ||
                            equipmentQuantity < 0 ||
                            (foodQuantity === 0 && treatmentQuantity === 0 && equipmentQuantity == 0))
                            throw new invalid_input_error_1.InvalidInputError();
                        return [4 /*yield*/, this.findBusinessPartner(partnerEin)];
                    case 10:
                        partner = _d.sent();
                        return [4 /*yield*/, this.findEmployee(employeeEmail)];
                    case 11:
                        employee = _d.sent();
                        if (totalValue != value && !superRoles.has(employee.role)) {
                            throw new insuficient_permission_error_1.InsuficientPermissionError();
                        }
                        return [4 /*yield*/, this.transactionRepo.add(new purchase_1.Purchase(value, partner, new Date(), food, treatment, equipment, employee))];
                    case 12: return [2 /*return*/, _d.sent()];
                }
            });
        });
    };
    App.prototype.findPurchasesByEmployee = function (attribute, value) {
        return __awaiter(this, void 0, void 0, function () {
            var retrievedPurchases;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.transactionRepo.findByEmployee("purchase", attribute, value)];
                    case 1:
                        retrievedPurchases = _a.sent();
                        if (retrievedPurchases.length === 0)
                            throw new unable_to_find_error_1.UnableToFindError();
                        return [2 /*return*/, retrievedPurchases];
                }
            });
        });
    };
    App.prototype.registerMedication = function (tankId, employeeEmail, treatmentId, quantity) {
        return __awaiter(this, void 0, void 0, function () {
            var tank, employee, treatment, today;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (quantity < 0)
                            throw new invalid_input_error_1.InvalidInputError();
                        return [4 /*yield*/, this.findTank(tankId)];
                    case 1:
                        tank = _a.sent();
                        return [4 /*yield*/, this.findEmployee(employeeEmail)];
                    case 2:
                        employee = _a.sent();
                        return [4 /*yield*/, this.findTreatment(treatmentId)];
                    case 3:
                        treatment = _a.sent();
                        today = new Date();
                        if (treatment.quantity < quantity)
                            throw new insuficient_treatment_error_1.InsuficientTreatmentError();
                        if (treatment.expirationDate < today)
                            throw new expired_treatment_error_1.ExpiredTreatmentError();
                        return [4 /*yield*/, this.treatmentRepo.updateStorage(treatmentId, treatment.quantity - quantity)];
                    case 4:
                        _a.sent();
                        return [2 /*return*/, this.medicationRepo.add(new medication_1.Medication(employee, tank, treatment, quantity, today))];
                }
            });
        });
    };
    App.prototype.findMedication = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var retrievedMedication;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.medicationRepo.find(id)];
                    case 1:
                        retrievedMedication = _a.sent();
                        if (!retrievedMedication)
                            throw new feeding_not_found_error_1.FeedingNotFoundError();
                        return [2 /*return*/, retrievedMedication];
                }
            });
        });
    };
    App.prototype.findMedicationsByEmployee = function (attribute, value) {
        return __awaiter(this, void 0, void 0, function () {
            var retrievedMedications;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.medicationRepo.findByEmployee(attribute, value)];
                    case 1:
                        retrievedMedications = _a.sent();
                        if (retrievedMedications.length === 0)
                            throw new unable_to_find_error_1.UnableToFindError();
                        return [2 /*return*/, retrievedMedications];
                }
            });
        });
    };
    App.prototype.registerMaintenance = function (equipmentId, employeeEmail, cost) {
        return __awaiter(this, void 0, void 0, function () {
            var equipment, employee, today;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (cost < 0)
                            throw new invalid_input_error_1.InvalidInputError();
                        return [4 /*yield*/, this.findEquipment(equipmentId)];
                    case 1:
                        equipment = _a.sent();
                        return [4 /*yield*/, this.findEmployee(employeeEmail)];
                    case 2:
                        employee = _a.sent();
                        today = new Date();
                        return [4 /*yield*/, this.equipmentRepo.updateMaintenanceCost(equipmentId, equipment.totalMaintenanceCost + cost)];
                    case 3:
                        _a.sent();
                        return [4 /*yield*/, this.maintenanceRepo.add(new maintenance_1.Maintenance(equipment, employee, today, cost))];
                    case 4: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    App.prototype.findMaintenancesByEmployee = function (attribute, value) {
        return __awaiter(this, void 0, void 0, function () {
            var retrievedMaintenances;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.maintenanceRepo.findByEmployee(attribute, value)];
                    case 1:
                        retrievedMaintenances = _a.sent();
                        if (retrievedMaintenances.length === 0)
                            throw new unable_to_find_error_1.UnableToFindError();
                        return [2 /*return*/, retrievedMaintenances];
                }
            });
        });
    };
    App.prototype.filterSales = function (filter) {
        return __awaiter(this, void 0, void 0, function () {
            var allSales, filteredSales;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.transactionRepo.list("sale")];
                    case 1:
                        allSales = (_a.sent());
                        filteredSales = allSales.filter(function (sale) {
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
                        return [2 /*return*/, filteredSales];
                }
            });
        });
    };
    App.prototype.filterPurchases = function (filter) {
        return __awaiter(this, void 0, void 0, function () {
            var allPurchases, filteredPurchases;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.transactionRepo.list("purchase")];
                    case 1:
                        allPurchases = (_a.sent());
                        filteredPurchases = allPurchases.filter(function (purchase) {
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
                        return [2 /*return*/, filteredPurchases];
                }
            });
        });
    };
    App.prototype.listWarnings = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.warningRepo.list()];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    App.prototype.findWarningsByTank = function (tankId) {
        return __awaiter(this, void 0, void 0, function () {
            var allWarnings;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.warningRepo.list()];
                    case 1:
                        allWarnings = _a.sent();
                        return [2 /*return*/, allWarnings.filter(function (warning) { return warning.tank.id === tankId; })];
                }
            });
        });
    };
    return App;
}());
exports.App = App;
function isInRange(value, min, max) {
    if (max === void 0) { max = Infinity; }
    return value <= max && value >= min;
}
function isIn(value, range) {
    return value <= range.max && value >= range.min;
}
