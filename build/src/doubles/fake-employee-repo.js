"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FakeEmployeeRepo = void 0;
const crypto_1 = __importDefault(require("crypto"));
class FakeEmployeeRepo {
    employees = [];
    async find(email) {
        return this.employees.find((employee) => employee.email === email);
    }
    async add(employee) {
        const newId = crypto_1.default.randomUUID();
        employee.id = newId;
        this.employees.push(employee);
        return newId;
    }
    async delete(id) {
        const employeeIndex = this.employees.findIndex((employee) => employee.id === id);
        if (employeeIndex != -1)
            this.employees.splice(employeeIndex, 1);
    }
    async list() {
        return this.employees;
    }
}
exports.FakeEmployeeRepo = FakeEmployeeRepo;
