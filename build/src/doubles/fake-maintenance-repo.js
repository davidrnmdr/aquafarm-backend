"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FakeMaintenanceRepo = void 0;
const crypto_1 = __importDefault(require("crypto"));
class FakeMaintenanceRepo {
    maintenances = [];
    async add(maintenance) {
        const newId = crypto_1.default.randomUUID();
        maintenance.id = newId;
        this.maintenances.push(maintenance);
        return newId;
    }
    async find(id) {
        return this.maintenances.find((maintenance) => maintenance.id === id);
    }
    async findByEmployee(attribute, value) {
        return this.maintenances.filter((maintenance) => maintenance.employee[attribute] === value);
    }
    async delete(id) {
        const maintenanceIndex = this.maintenances.findIndex((maintenance) => maintenance.id === id);
        if (maintenanceIndex != -1)
            this.maintenances.splice(maintenanceIndex, 1);
    }
    async list() {
        return this.maintenances;
    }
}
exports.FakeMaintenanceRepo = FakeMaintenanceRepo;
