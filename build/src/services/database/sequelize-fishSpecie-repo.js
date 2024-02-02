"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.specieInstanceToObj = exports.SequelizeFishSpecieRepo = void 0;
const fishSpecie_1 = require("../../entities/fishSpecie");
const crypto = __importStar(require("crypto"));
const models_1 = require("./models");
class SequelizeFishSpecieRepo {
    async add(specie) {
        const newId = crypto.randomUUID();
        await models_1.FishSpecies.create({
            specieName: specie.name,
            specieFoodType: specie.foodType,
            specieMinTemperature: specie.temperatureRange.min,
            specieMaxTemperature: specie.temperatureRange.max,
            specieMinOxygen: specie.oxygenRange.min,
            specieMaxOxygen: specie.oxygenRange.max,
            specieMinPh: specie.phRange.min,
            specieMaxPh: specie.phRange.max,
            specieId: newId,
        });
        specie.id = newId;
        return newId;
    }
    async delete(id) { }
}
exports.SequelizeFishSpecieRepo = SequelizeFishSpecieRepo;
function specieInstanceToObj(instance) {
    return new fishSpecie_1.FishSpecie(instance.dataValues.specieName, instance.dataValues.specieFoodType, {
        min: instance.dataValues.specieMinTemperature,
        max: instance.dataValues.specieMaxTemperature,
    }, {
        min: instance.dataValues.specieMinOxygen,
        max: instance.dataValues.specieMaxOxygen,
    }, {
        min: instance.dataValues.specieMinPh,
        max: instance.dataValues.specieMaxPh,
    }, instance.dataValues.specieId);
}
exports.specieInstanceToObj = specieInstanceToObj;
