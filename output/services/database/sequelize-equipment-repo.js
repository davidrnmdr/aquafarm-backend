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
exports.equipmentInstanceToObj = exports.SequelizeEquipmentRepo = void 0;
var crypto = require("crypto");
var models_1 = require("./models");
var equipment_1 = require("../../entities/equipment");
var sequelize_businessPartner_repo_1 = require("./sequelize-businessPartner-repo");
var SequelizeEquipmentRepo = /** @class */ (function () {
    function SequelizeEquipmentRepo() {
    }
    SequelizeEquipmentRepo.prototype.add = function (equipment) {
        return __awaiter(this, void 0, void 0, function () {
            var newId;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        newId = crypto.randomUUID();
                        return [4 /*yield*/, models_1.Equipments.create({
                                equipmentType: equipment.type,
                                equipmentStatus: equipment.status,
                                equipmentLocation: equipment.location,
                                equipmentSellerId: equipment.seller.id,
                                equipmentMaintenanceCost: equipment.totalMaintenanceCost,
                                equipmentCost: equipment.cost,
                                equipmentQuantity: equipment.quantity,
                                equipmentId: newId,
                            })];
                    case 1:
                        _a.sent();
                        equipment.id = newId;
                        return [2 /*return*/, newId];
                }
            });
        });
    };
    SequelizeEquipmentRepo.prototype.find = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var equipment;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, models_1.Equipments.findOne({ where: { equipmentId: id } })];
                    case 1:
                        equipment = _a.sent();
                        return [2 /*return*/, equipment ? equipmentInstanceToObj(equipment) : undefined];
                }
            });
        });
    };
    SequelizeEquipmentRepo.prototype.updateStatus = function (id, status) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, models_1.Equipments.update({ equipmentStatus: status }, { where: { equipmentId: id } })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    SequelizeEquipmentRepo.prototype.updateMaintenanceCost = function (id, cost) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, models_1.Equipments.increment({ equipmentMaintenanceCost: cost }, { where: { equipmentId: id } })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    SequelizeEquipmentRepo.prototype.delete = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, models_1.Equipments.destroy({ where: { equipmentId: id } })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    SequelizeEquipmentRepo.prototype.list = function () {
        return __awaiter(this, void 0, void 0, function () {
            var allEquipmentInstances, allEquipmentObjects, i, _a, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0: return [4 /*yield*/, models_1.Equipments.findAll()];
                    case 1:
                        allEquipmentInstances = _c.sent();
                        allEquipmentObjects = [];
                        i = 0;
                        _c.label = 2;
                    case 2:
                        if (!(i < allEquipmentInstances.length)) return [3 /*break*/, 5];
                        _b = (_a = allEquipmentObjects).push;
                        return [4 /*yield*/, equipmentInstanceToObj(allEquipmentInstances[i])];
                    case 3:
                        _b.apply(_a, [_c.sent()]);
                        _c.label = 4;
                    case 4:
                        i++;
                        return [3 /*break*/, 2];
                    case 5: return [2 /*return*/, allEquipmentObjects];
                }
            });
        });
    };
    return SequelizeEquipmentRepo;
}());
exports.SequelizeEquipmentRepo = SequelizeEquipmentRepo;
function equipmentInstanceToObj(instance) {
    return __awaiter(this, void 0, void 0, function () {
        var _a, _b, _c;
        return __generator(this, function (_d) {
            switch (_d.label) {
                case 0:
                    _a = equipment_1.Equipment.bind;
                    _b = [void 0, instance.dataValues.equipmentType,
                        instance.dataValues.equipmentStatus,
                        instance.dataValues.equipmentLocation];
                    _c = sequelize_businessPartner_repo_1.partnerInstanceToObj;
                    return [4 /*yield*/, models_1.BusinessPartners.findOne({
                            where: { partnerId: instance.dataValues.equipmentSellerId },
                        })];
                case 1: return [2 /*return*/, new (_a.apply(equipment_1.Equipment, _b.concat([_c.apply(void 0, [_d.sent()]),
                        instance.dataValues.equipmentMaintenanceCost,
                        instance.dataValues.equipmentCost,
                        instance.dataValues.equipmentQuantity,
                        instance.dataValues.equipmentId])))()];
            }
        });
    });
}
exports.equipmentInstanceToObj = equipmentInstanceToObj;
