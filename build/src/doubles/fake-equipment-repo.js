"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FakeEquipmentRepo = void 0;
const crypto_1 = __importDefault(require("crypto"));
class FakeEquipmentRepo {
    equipments = [];
    async add(equipment) {
        const newId = crypto_1.default.randomUUID();
        equipment.id = newId;
        this.equipments.push(equipment);
        return newId;
    }
    async find(id) {
        return this.equipments.find((equipment) => (equipment.id = id));
    }
    async updateStatus(id, status) {
        const equipmentIndex = this.equipments.findIndex((equipment) => equipment.id === id);
        this.equipments[equipmentIndex].status = status;
    }
    async updateMaintenanceCost(id, cost) {
        const equipmentIndex = this.equipments.findIndex((equipment) => equipment.id === id);
        this.equipments[equipmentIndex].totalMaintenanceCost += cost;
    }
    async delete(id) {
        const equipmentIndex = this.equipments.findIndex((equipment) => equipment.id === id);
        if (equipmentIndex != -1)
            this.equipments.splice(equipmentIndex, 1);
    }
    async list() {
        return this.equipments;
    }
}
exports.FakeEquipmentRepo = FakeEquipmentRepo;
