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
exports.SequelizeTankVerificationRepo = void 0;
var tankVerification_1 = require("../../entities/tankVerification");
var crypto = require("crypto");
var models_1 = require("./models");
var sequelize_tank_repo_1 = require("./sequelize-tank-repo");
var sequelize_employee_repo_1 = require("./sequelize-employee-repo");
var sequelize_1 = require("sequelize");
var SequelizeTankVerificationRepo = /** @class */ (function () {
    function SequelizeTankVerificationRepo() {
    }
    SequelizeTankVerificationRepo.prototype.add = function (tankVerification) {
        return __awaiter(this, void 0, void 0, function () {
            var newId;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        newId = crypto.randomUUID();
                        return [4 /*yield*/, models_1.Verifications.create({
                                verificationEmployeeId: tankVerification.employee.id,
                                verificationTankId: tankVerification.tank.id,
                                verificationTemperature: tankVerification.temperature,
                                verificationOxygen: tankVerification.oxygen,
                                verificationPh: tankVerification.ph,
                                verificationDate: tankVerification.date,
                                verificationId: newId,
                            })];
                    case 1:
                        _a.sent();
                        tankVerification.id = newId;
                        return [2 /*return*/, newId];
                }
            });
        });
    };
    SequelizeTankVerificationRepo.prototype.find = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var verification, _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, models_1.Verifications.findOne({
                            where: { verificationId: id },
                        })];
                    case 1:
                        verification = _b.sent();
                        if (!verification) return [3 /*break*/, 3];
                        return [4 /*yield*/, verificationInstanceToObj(verification)];
                    case 2:
                        _a = _b.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        _a = undefined;
                        _b.label = 4;
                    case 4: return [2 /*return*/, _a];
                }
            });
        });
    };
    SequelizeTankVerificationRepo.prototype.findByEmployee = function (attribute, value) {
        return __awaiter(this, void 0, void 0, function () {
            var employeeIds, verificationObjects, _a, verificationInstances, i, _b, _c;
            var _d;
            return __generator(this, function (_e) {
                switch (_e.label) {
                    case 0:
                        employeeIds = [];
                        verificationObjects = [];
                        _a = attribute;
                        switch (_a) {
                            case "email": return [3 /*break*/, 1];
                            case "name": return [3 /*break*/, 3];
                            case "role": return [3 /*break*/, 5];
                        }
                        return [3 /*break*/, 7];
                    case 1: return [4 /*yield*/, models_1.Employees.findAll({ where: { employeeEmail: value } })];
                    case 2:
                        employeeIds = (_e.sent())
                            .map(sequelize_employee_repo_1.employeeInstanceToObj)
                            .map(function (employee) { return employee.id; });
                        return [3 /*break*/, 7];
                    case 3: return [4 /*yield*/, models_1.Employees.findAll({ where: { employeeName: value } })];
                    case 4:
                        employeeIds = (_e.sent())
                            .map(sequelize_employee_repo_1.employeeInstanceToObj)
                            .map(function (employee) { return employee.id; });
                        return [3 /*break*/, 7];
                    case 5: return [4 /*yield*/, models_1.Employees.findAll({ where: { employeeRole: value } })];
                    case 6:
                        employeeIds = (_e.sent())
                            .map(sequelize_employee_repo_1.employeeInstanceToObj)
                            .map(function (employee) { return employee.id; });
                        return [3 /*break*/, 7];
                    case 7: return [4 /*yield*/, models_1.Verifications.findAll({
                            where: {
                                verificationEmployeeId: (_d = {},
                                    _d[sequelize_1.Op.in] = employeeIds,
                                    _d),
                            },
                        })];
                    case 8:
                        verificationInstances = _e.sent();
                        i = 0;
                        _e.label = 9;
                    case 9:
                        if (!(i < verificationInstances.length)) return [3 /*break*/, 12];
                        _c = (_b = verificationObjects).push;
                        return [4 /*yield*/, verificationInstanceToObj(verificationInstances[i])];
                    case 10:
                        _c.apply(_b, [_e.sent()]);
                        _e.label = 11;
                    case 11:
                        i++;
                        return [3 /*break*/, 9];
                    case 12: return [2 /*return*/, verificationObjects];
                }
            });
        });
    };
    SequelizeTankVerificationRepo.prototype.delete = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, models_1.Verifications.destroy({ where: { verificationId: id } })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    SequelizeTankVerificationRepo.prototype.list = function () {
        return __awaiter(this, void 0, void 0, function () {
            var allVerificationInstances, allVerificationObjects, i, _a, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0: return [4 /*yield*/, models_1.Verifications.findAll()];
                    case 1:
                        allVerificationInstances = _c.sent();
                        allVerificationObjects = [];
                        i = 0;
                        _c.label = 2;
                    case 2:
                        if (!(i < allVerificationInstances.length)) return [3 /*break*/, 5];
                        _b = (_a = allVerificationObjects).push;
                        return [4 /*yield*/, verificationInstanceToObj(allVerificationInstances[i])];
                    case 3:
                        _b.apply(_a, [_c.sent()]);
                        _c.label = 4;
                    case 4:
                        i++;
                        return [3 /*break*/, 2];
                    case 5: return [2 /*return*/, allVerificationObjects];
                }
            });
        });
    };
    return SequelizeTankVerificationRepo;
}());
exports.SequelizeTankVerificationRepo = SequelizeTankVerificationRepo;
function verificationInstanceToObj(instance) {
    return __awaiter(this, void 0, void 0, function () {
        var _a, _b, _c, _d;
        return __generator(this, function (_e) {
            switch (_e.label) {
                case 0:
                    _a = tankVerification_1.TankVerification.bind;
                    _b = sequelize_tank_repo_1.tankInstanceToObj;
                    return [4 /*yield*/, models_1.Tanks.findOne({
                            where: { tankId: instance.dataValues.verificationTankId },
                        })];
                case 1: return [4 /*yield*/, _b.apply(void 0, [_e.sent()])];
                case 2:
                    _c = [void 0, _e.sent()];
                    _d = sequelize_employee_repo_1.employeeInstanceToObj;
                    return [4 /*yield*/, models_1.Employees.findOne({
                            where: { employeeId: instance.dataValues.verificationEmployeeId },
                        })];
                case 3: return [2 /*return*/, new (_a.apply(tankVerification_1.TankVerification, _c.concat([_d.apply(void 0, [_e.sent()]),
                        instance.dataValues.verificationTemperature,
                        instance.dataValues.verificationOxygen,
                        instance.dataValues.verificationPh,
                        instance.dataValues.verificationDate,
                        instance.dataValues.verificationId])))()];
            }
        });
    });
}
