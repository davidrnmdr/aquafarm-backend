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
exports.tankInstanceToObj = exports.SequelizeTankRepo = void 0;
var tank_1 = require("../../entities/tank");
var models_1 = require("./models");
var sequelize_fishSpecie_repo_1 = require("./sequelize-fishSpecie-repo");
var crypto = require("crypto");
var SequelizeTankRepo = /** @class */ (function () {
    function SequelizeTankRepo() {
    }
    SequelizeTankRepo.prototype.add = function (tank) {
        return __awaiter(this, void 0, void 0, function () {
            var newId;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        newId = crypto.randomUUID();
                        return [4 /*yield*/, models_1.Tanks.create({
                                tankSpecieId: tank.fishSpecie.id,
                                tankType: tank.type,
                                tankLocation: tank.location,
                                tankStatus: tank.status,
                                tankCapacity: tank.capacity,
                                tankId: newId,
                            })];
                    case 1:
                        _a.sent();
                        tank.id = newId;
                        return [2 /*return*/, newId];
                }
            });
        });
    };
    SequelizeTankRepo.prototype.find = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var tank, _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, models_1.Tanks.findOne({ where: { tankId: id } })];
                    case 1:
                        tank = _b.sent();
                        if (!tank) return [3 /*break*/, 3];
                        return [4 /*yield*/, tankInstanceToObj(tank)];
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
    SequelizeTankRepo.prototype.findBy = function (attribute, attributeValue) {
        return __awaiter(this, void 0, void 0, function () {
            var tankInstances, tankObjects, _a, i, _b, _c;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        tankObjects = [];
                        _a = attribute;
                        switch (_a) {
                            case "type": return [3 /*break*/, 1];
                            case "capacity": return [3 /*break*/, 3];
                            case "location": return [3 /*break*/, 5];
                            case "status": return [3 /*break*/, 7];
                        }
                        return [3 /*break*/, 9];
                    case 1: return [4 /*yield*/, models_1.Tanks.findAll({
                            where: { tankType: attributeValue },
                        })];
                    case 2:
                        tankInstances = _d.sent();
                        return [3 /*break*/, 9];
                    case 3: return [4 /*yield*/, models_1.Tanks.findAll({
                            where: { tankCapacity: attributeValue },
                        })];
                    case 4:
                        tankInstances = _d.sent();
                        return [3 /*break*/, 9];
                    case 5: return [4 /*yield*/, models_1.Tanks.findAll({
                            where: { tankLocation: attributeValue },
                        })];
                    case 6:
                        tankInstances = _d.sent();
                        return [3 /*break*/, 9];
                    case 7: return [4 /*yield*/, models_1.Tanks.findAll({
                            where: { tankStatus: attributeValue },
                        })];
                    case 8:
                        tankInstances = _d.sent();
                        return [3 /*break*/, 9];
                    case 9:
                        i = 0;
                        _d.label = 10;
                    case 10:
                        if (!(i < tankInstances.length)) return [3 /*break*/, 13];
                        _c = (_b = tankObjects).push;
                        return [4 /*yield*/, tankInstanceToObj(tankInstances[i])];
                    case 11:
                        _c.apply(_b, [_d.sent()]);
                        _d.label = 12;
                    case 12:
                        i++;
                        return [3 /*break*/, 10];
                    case 13: return [2 /*return*/, tankObjects];
                }
            });
        });
    };
    SequelizeTankRepo.prototype.updateStatus = function (id, status) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, models_1.Tanks.update({ tankStatus: status }, { where: { tankId: id } })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    SequelizeTankRepo.prototype.delete = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, models_1.Tanks.destroy({ where: { tankId: id } })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    SequelizeTankRepo.prototype.list = function () {
        return __awaiter(this, void 0, void 0, function () {
            var allTankInstances, allTankObjects, i, _a, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0: return [4 /*yield*/, models_1.Tanks.findAll()];
                    case 1:
                        allTankInstances = _c.sent();
                        allTankObjects = [];
                        i = 0;
                        _c.label = 2;
                    case 2:
                        if (!(i < allTankInstances.length)) return [3 /*break*/, 5];
                        _b = (_a = allTankObjects).push;
                        return [4 /*yield*/, tankInstanceToObj(allTankInstances[i])];
                    case 3:
                        _b.apply(_a, [_c.sent()]);
                        _c.label = 4;
                    case 4:
                        i++;
                        return [3 /*break*/, 2];
                    case 5: return [2 /*return*/, allTankObjects];
                }
            });
        });
    };
    return SequelizeTankRepo;
}());
exports.SequelizeTankRepo = SequelizeTankRepo;
function tankInstanceToObj(instance) {
    return __awaiter(this, void 0, void 0, function () {
        var _a, _b;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    _a = tank_1.Tank.bind;
                    _b = sequelize_fishSpecie_repo_1.specieInstanceToObj;
                    return [4 /*yield*/, models_1.FishSpecies.findOne({
                            where: { specieId: instance.dataValues.tankSpecieId },
                        })];
                case 1: return [2 /*return*/, new (_a.apply(tank_1.Tank, [void 0, _b.apply(void 0, [_c.sent()]),
                        instance.dataValues.tankType,
                        instance.dataValues.tankLocation,
                        instance.dataValues.tankStatus,
                        instance.dataValues.tankCapacity,
                        instance.dataValues.tankId]))()];
            }
        });
    });
}
exports.tankInstanceToObj = tankInstanceToObj;
