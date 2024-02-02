"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FakeTreatmentRepo = void 0;
const crypto_1 = __importDefault(require("crypto"));
class FakeTreatmentRepo {
    treatments = [];
    async add(treatment) {
        const newId = crypto_1.default.randomUUID();
        treatment.id = newId;
        this.treatments.push(treatment);
        return newId;
    }
    async find(id) {
        return this.treatments.find((treatment) => treatment.id === id);
    }
    async updateStorage(id, storage) {
        const treatmentIndex = this.treatments.findIndex((treatment) => treatment.id === id);
        if (treatmentIndex != -1)
            this.treatments[treatmentIndex].quantity = storage;
    }
    async delete(id) {
        const treatmentIndex = this.treatments.findIndex((treatment) => treatment.id === id);
        if (treatmentIndex != -1)
            this.treatments.splice(treatmentIndex, 1);
    }
    async list() {
        return this.treatments;
    }
}
exports.FakeTreatmentRepo = FakeTreatmentRepo;
