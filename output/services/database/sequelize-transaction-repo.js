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
exports.SequelizeTransactionRepo = void 0;
var purchase_1 = require("../../entities/purchase");
var sale_1 = require("../../entities/sale");
var crypto = require("crypto");
var models_1 = require("./models");
var sequelize_businessPartner_repo_1 = require("./sequelize-businessPartner-repo");
var sequelize_employee_repo_1 = require("./sequelize-employee-repo");
var sequelize_food_repo_1 = require("./sequelize-food-repo");
var sequelize_equipment_repo_1 = require("./sequelize-equipment-repo");
var sequelize_treatment_repo_1 = require("./sequelize-treatment-repo");
var sequelize_1 = require("sequelize");
var SequelizeTransactionRepo = /** @class */ (function () {
    function SequelizeTransactionRepo() {
    }
    SequelizeTransactionRepo.prototype.add = function (transaction) {
        var _a, _b, _c;
        return __awaiter(this, void 0, void 0, function () {
            var transactionType, newId;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        transactionType = transaction instanceof sale_1.Sale ? "sale" : "purchase";
                        newId = crypto.randomUUID();
                        if (!(transaction instanceof sale_1.Sale)) return [3 /*break*/, 2];
                        return [4 /*yield*/, models_1.Transactions.create({
                                transactionType: transactionType.toLowerCase(),
                                transactionValue: transaction.value,
                                transactionPartnerId: transaction.partner.id,
                                transactionEmployeeId: transaction.employee.id,
                                transactionSaleQuantity: transaction.quantity,
                                transactionDate: transaction.date,
                                transactionId: newId,
                            })];
                    case 1:
                        _d.sent();
                        return [3 /*break*/, 4];
                    case 2: return [4 /*yield*/, models_1.Transactions.create({
                            transactionType: transactionType.toLowerCase(),
                            transactionValue: transaction.value,
                            transactionPartnerId: transaction.partner.id,
                            transactionEmployeeId: transaction.employee.id,
                            transactionPurchaseFoodId: (_a = transaction.food) === null || _a === void 0 ? void 0 : _a.id,
                            transactionPurchaseTreatmentId: (_b = transaction.treatment) === null || _b === void 0 ? void 0 : _b.id,
                            transactionPurchaseEquipmentId: (_c = transaction.equipment) === null || _c === void 0 ? void 0 : _c.id,
                            transactionDate: transaction.date,
                            transactionId: newId,
                        })];
                    case 3:
                        _d.sent();
                        _d.label = 4;
                    case 4:
                        transaction.id = newId;
                        return [2 /*return*/, newId];
                }
            });
        });
    };
    SequelizeTransactionRepo.prototype.find = function (type, id) {
        return __awaiter(this, void 0, void 0, function () {
            var transaction, _a, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0: return [4 /*yield*/, models_1.Transactions.findOne({
                            where: { transactionId: id },
                        })];
                    case 1:
                        transaction = _c.sent();
                        if (!transaction) return [3 /*break*/, 6];
                        if (!(type === "sale")) return [3 /*break*/, 3];
                        return [4 /*yield*/, saleInstanceToObj(transaction)];
                    case 2:
                        _b = _c.sent();
                        return [3 /*break*/, 5];
                    case 3: return [4 /*yield*/, purchaseInstanceToObj(transaction)];
                    case 4:
                        _b = _c.sent();
                        _c.label = 5;
                    case 5:
                        _a = _b;
                        return [3 /*break*/, 7];
                    case 6:
                        _a = undefined;
                        _c.label = 7;
                    case 7: return [2 /*return*/, _a];
                }
            });
        });
    };
    SequelizeTransactionRepo.prototype.findByEmployee = function (type, attribute, value) {
        return __awaiter(this, void 0, void 0, function () {
            var employeeIds, saleObjects, purchaseObjects, _a, transactionInstances, i, _b, _c, i, _d, _e;
            var _f;
            return __generator(this, function (_g) {
                switch (_g.label) {
                    case 0:
                        employeeIds = [];
                        saleObjects = [];
                        purchaseObjects = [];
                        _a = attribute;
                        switch (_a) {
                            case "email": return [3 /*break*/, 1];
                            case "name": return [3 /*break*/, 3];
                            case "role": return [3 /*break*/, 5];
                        }
                        return [3 /*break*/, 7];
                    case 1: return [4 /*yield*/, models_1.Employees.findAll({ where: { employeeEmail: value } })];
                    case 2:
                        employeeIds = (_g.sent())
                            .map(sequelize_employee_repo_1.employeeInstanceToObj)
                            .map(function (employee) { return employee.id; });
                        return [3 /*break*/, 7];
                    case 3: return [4 /*yield*/, models_1.Employees.findAll({ where: { employeeName: value } })];
                    case 4:
                        employeeIds = (_g.sent())
                            .map(sequelize_employee_repo_1.employeeInstanceToObj)
                            .map(function (employee) { return employee.id; });
                        return [3 /*break*/, 7];
                    case 5: return [4 /*yield*/, models_1.Employees.findAll({ where: { employeeRole: value } })];
                    case 6:
                        employeeIds = (_g.sent())
                            .map(sequelize_employee_repo_1.employeeInstanceToObj)
                            .map(function (employee) { return employee.id; });
                        return [3 /*break*/, 7];
                    case 7: return [4 /*yield*/, models_1.Transactions.findAll({
                            where: {
                                transactionEmployeeId: (_f = {},
                                    _f[sequelize_1.Op.in] = employeeIds,
                                    _f),
                                transactionType: type,
                            },
                        })];
                    case 8:
                        transactionInstances = _g.sent();
                        if (!(type === "sale")) return [3 /*break*/, 13];
                        i = 0;
                        _g.label = 9;
                    case 9:
                        if (!(i < transactionInstances.length)) return [3 /*break*/, 12];
                        _c = (_b = saleObjects).push;
                        return [4 /*yield*/, saleInstanceToObj(transactionInstances[i])];
                    case 10:
                        _c.apply(_b, [_g.sent()]);
                        _g.label = 11;
                    case 11:
                        i++;
                        return [3 /*break*/, 9];
                    case 12: return [2 /*return*/, saleObjects];
                    case 13:
                        i = 0;
                        _g.label = 14;
                    case 14:
                        if (!(i < transactionInstances.length)) return [3 /*break*/, 17];
                        _e = (_d = purchaseObjects).push;
                        return [4 /*yield*/, purchaseInstanceToObj(transactionInstances[i])];
                    case 15:
                        _e.apply(_d, [_g.sent()]);
                        _g.label = 16;
                    case 16:
                        i++;
                        return [3 /*break*/, 14];
                    case 17: return [2 /*return*/, purchaseObjects];
                }
            });
        });
    };
    SequelizeTransactionRepo.prototype.list = function (type) {
        return __awaiter(this, void 0, void 0, function () {
            var allTransactionInstances, saleObjects, purchaseObjects, i, _a, _b, i, _c, _d;
            return __generator(this, function (_e) {
                switch (_e.label) {
                    case 0: return [4 /*yield*/, models_1.Transactions.findAll({
                            where: { transactionType: type },
                        })];
                    case 1:
                        allTransactionInstances = _e.sent();
                        saleObjects = [];
                        purchaseObjects = [];
                        if (!(type === "sale")) return [3 /*break*/, 6];
                        i = 0;
                        _e.label = 2;
                    case 2:
                        if (!(i < allTransactionInstances.length)) return [3 /*break*/, 5];
                        _b = (_a = saleObjects).push;
                        return [4 /*yield*/, saleInstanceToObj(allTransactionInstances[i])];
                    case 3:
                        _b.apply(_a, [_e.sent()]);
                        _e.label = 4;
                    case 4:
                        i++;
                        return [3 /*break*/, 2];
                    case 5: return [2 /*return*/, saleObjects];
                    case 6:
                        i = 0;
                        _e.label = 7;
                    case 7:
                        if (!(i < allTransactionInstances.length)) return [3 /*break*/, 10];
                        _d = (_c = purchaseObjects).push;
                        return [4 /*yield*/, purchaseInstanceToObj(allTransactionInstances[i])];
                    case 8:
                        _d.apply(_c, [_e.sent()]);
                        _e.label = 9;
                    case 9:
                        i++;
                        return [3 /*break*/, 7];
                    case 10: return [2 /*return*/, purchaseObjects];
                }
            });
        });
    };
    return SequelizeTransactionRepo;
}());
exports.SequelizeTransactionRepo = SequelizeTransactionRepo;
function saleInstanceToObj(instance) {
    return __awaiter(this, void 0, void 0, function () {
        var _a, _b, _c, _d;
        return __generator(this, function (_e) {
            switch (_e.label) {
                case 0:
                    _a = sale_1.Sale.bind;
                    _b = [void 0, instance.dataValues.transactionValue];
                    _c = sequelize_businessPartner_repo_1.partnerInstanceToObj;
                    return [4 /*yield*/, models_1.BusinessPartners.findOne({
                            where: { partnerId: instance.dataValues.transactionPartnerId },
                        })];
                case 1:
                    _b = _b.concat([_c.apply(void 0, [_e.sent()]),
                        instance.dataValues.transactionDate,
                        instance.dataValues.transactionSaleQuantity]);
                    _d = sequelize_employee_repo_1.employeeInstanceToObj;
                    return [4 /*yield*/, models_1.Employees.findOne({
                            where: { employeeId: instance.dataValues.transactionEmployeeId },
                        })];
                case 2: return [2 /*return*/, new (_a.apply(sale_1.Sale, _b.concat([_d.apply(void 0, [_e.sent()]),
                        instance.dataValues.transactionId])))()];
            }
        });
    });
}
function purchaseInstanceToObj(instance) {
    return __awaiter(this, void 0, void 0, function () {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k;
        return __generator(this, function (_l) {
            switch (_l.label) {
                case 0:
                    _a = purchase_1.Purchase.bind;
                    _b = [void 0, instance.dataValues.transactionValue];
                    _c = sequelize_businessPartner_repo_1.partnerInstanceToObj;
                    return [4 /*yield*/, models_1.BusinessPartners.findOne({
                            where: { partnerId: instance.dataValues.transactionPartnerId },
                        })];
                case 1:
                    _b = _b.concat([_c.apply(void 0, [_l.sent()]),
                        instance.dataValues.transactionDate]);
                    if (!instance.dataValues.transactionPurchaseFoodId) return [3 /*break*/, 4];
                    _e = sequelize_food_repo_1.foodInstanceToObj;
                    return [4 /*yield*/, models_1.Foods.findOne({
                            where: { foodId: instance.dataValues.transactionPurchaseFoodId },
                        })];
                case 2: return [4 /*yield*/, _e.apply(void 0, [_l.sent()])];
                case 3:
                    _d = _l.sent();
                    return [3 /*break*/, 5];
                case 4:
                    _d = null;
                    _l.label = 5;
                case 5:
                    _b = _b.concat([_d]);
                    if (!instance.dataValues.transactionPurchaseTreatmentId) return [3 /*break*/, 8];
                    _g = sequelize_treatment_repo_1.treatmentInstanceToObj;
                    return [4 /*yield*/, models_1.Treatments.findOne({
                            where: {
                                treatmentId: instance.dataValues.transactionPurchaseTreatmentId,
                            },
                        })];
                case 6: return [4 /*yield*/, _g.apply(void 0, [_l.sent()])];
                case 7:
                    _f = _l.sent();
                    return [3 /*break*/, 9];
                case 8:
                    _f = null;
                    _l.label = 9;
                case 9:
                    _b = _b.concat([_f]);
                    if (!instance.dataValues.transactionPurchaseEquipmentId) return [3 /*break*/, 12];
                    _j = sequelize_equipment_repo_1.equipmentInstanceToObj;
                    return [4 /*yield*/, models_1.Equipments.findOne({
                            where: {
                                equipmentId: instance.dataValues.transactionPurchaseEquipmentId,
                            },
                        })];
                case 10: return [4 /*yield*/, _j.apply(void 0, [_l.sent()])];
                case 11:
                    _h = _l.sent();
                    return [3 /*break*/, 13];
                case 12:
                    _h = null;
                    _l.label = 13;
                case 13:
                    _b = _b.concat([_h]);
                    _k = sequelize_employee_repo_1.employeeInstanceToObj;
                    return [4 /*yield*/, models_1.Employees.findOne({
                            where: { employeeId: instance.dataValues.transactionEmployeeId },
                        })];
                case 14: return [2 /*return*/, new (_a.apply(purchase_1.Purchase, _b.concat([_k.apply(void 0, [_l.sent()]),
                        instance.dataValues.transactionId])))()];
            }
        });
    });
}
