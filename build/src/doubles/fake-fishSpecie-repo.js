"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FakeFishSpecieRepo = void 0;
const crypto_1 = __importDefault(require("crypto"));
class FakeFishSpecieRepo {
    species = [];
    async add(specie) {
        const newId = crypto_1.default.randomUUID();
        specie.id = newId;
        this.species.push(specie);
        return newId;
    }
    async delete(id) {
        const specieIndex = this.species.findIndex((specie) => specie.id === id);
        if (specieIndex != -1)
            this.species.splice(specieIndex, 1);
    }
}
exports.FakeFishSpecieRepo = FakeFishSpecieRepo;
