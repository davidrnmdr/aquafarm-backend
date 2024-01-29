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
exports.foodInstanceToObj = exports.SequelizeFoodRepo = void 0;
var crypto = require("crypto");
var models_1 = require("./models");
var food_1 = require("../../entities/food");
var sequelize_businessPartner_repo_1 = require("./sequelize-businessPartner-repo");
var SequelizeFoodRepo = /** @class */ (function () {
    function SequelizeFoodRepo() {
    }
    SequelizeFoodRepo.prototype.add = function (food) {
        return __awaiter(this, void 0, void 0, function () {
            var newId;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        newId = crypto.randomUUID();
                        return [4 /*yield*/, models_1.Foods.create({
                                foodType: food.type,
                                foodQuantity: food.quantity,
                                foodCost: food.cost,
                                foodExpirationDate: food.expirationDate,
                                foodSellerId: food.seller.id,
                                foodId: newId,
                            })];
                    case 1:
                        _a.sent();
                        food.id = newId;
                        return [2 /*return*/, newId];
                }
            });
        });
    };
    SequelizeFoodRepo.prototype.find = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var food, _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, models_1.Foods.findOne({ where: { foodId: id } })];
                    case 1:
                        food = _b.sent();
                        if (!food) return [3 /*break*/, 3];
                        return [4 /*yield*/, foodInstanceToObj(food)];
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
    SequelizeFoodRepo.prototype.updateStorage = function (id, quantity) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, models_1.Foods.update({ foodQuantity: quantity }, { where: { foodId: id } })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    SequelizeFoodRepo.prototype.delete = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, models_1.Foods.destroy({ where: { foodId: id } })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    SequelizeFoodRepo.prototype.list = function () {
        return __awaiter(this, void 0, void 0, function () {
            var allFoodInstances, allFoodObjects, i, _a, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0: return [4 /*yield*/, models_1.Foods.findAll()];
                    case 1:
                        allFoodInstances = _c.sent();
                        allFoodObjects = [];
                        i = 0;
                        _c.label = 2;
                    case 2:
                        if (!(i < allFoodInstances.length)) return [3 /*break*/, 5];
                        _b = (_a = allFoodObjects).push;
                        return [4 /*yield*/, foodInstanceToObj(allFoodInstances[i])];
                    case 3:
                        _b.apply(_a, [_c.sent()]);
                        _c.label = 4;
                    case 4:
                        i++;
                        return [3 /*break*/, 2];
                    case 5: return [2 /*return*/, allFoodObjects];
                }
            });
        });
    };
    return SequelizeFoodRepo;
}());
exports.SequelizeFoodRepo = SequelizeFoodRepo;
function foodInstanceToObj(instance) {
    return __awaiter(this, void 0, void 0, function () {
        var _a, _b, _c;
        return __generator(this, function (_d) {
            switch (_d.label) {
                case 0:
                    _a = food_1.Food.bind;
                    _b = [void 0, instance.dataValues.foodType,
                        instance.dataValues.foodQuantity,
                        instance.dataValues.foodCost,
                        instance.dataValues.foodExpirationDate];
                    _c = sequelize_businessPartner_repo_1.partnerInstanceToObj;
                    return [4 /*yield*/, models_1.BusinessPartners.findOne({
                            where: { partnerId: instance.dataValues.foodSellerId },
                        })];
                case 1: return [2 /*return*/, new (_a.apply(food_1.Food, _b.concat([_c.apply(void 0, [_d.sent()]),
                        instance.dataValues.foodId])))()];
            }
        });
    });
}
exports.foodInstanceToObj = foodInstanceToObj;
