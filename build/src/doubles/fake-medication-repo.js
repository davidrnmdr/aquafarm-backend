"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FakeMedicationRepo = void 0;
const crypto_1 = __importDefault(require("crypto"));
class FakeMedicationRepo {
    medications = [];
    async add(medication) {
        const newId = crypto_1.default.randomUUID();
        medication.id = newId;
        this.medications.push(medication);
        return newId;
    }
    async find(id) {
        return this.medications.find((medication) => medication.id === id);
    }
    async findByEmployee(attribute, value) {
        return this.medications.filter((medication) => medication.employee[attribute] === value);
    }
    async delete(id) {
        const medicationIndex = this.medications.findIndex((medication) => medication.id === id);
        if (medicationIndex != -1)
            this.medications.splice(medicationIndex, 1);
    }
    async list() {
        return this.medications;
    }
}
exports.FakeMedicationRepo = FakeMedicationRepo;
