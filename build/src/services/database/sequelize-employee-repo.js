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
exports.employeeInstanceToObj = exports.SequelizeEmployeeRepo = void 0;
const crypto = __importStar(require("crypto"));
const models_1 = require("./models");
const employee_1 = require("../../entities/employee");
class SequelizeEmployeeRepo {
    async add(employee) {
        const newId = crypto.randomUUID();
        await models_1.Employees.create({
            employeeName: employee.name,
            employeeEmail: employee.email,
            employeeRole: employee.role,
            employeePassword: employee.password,
            employeeId: newId,
        });
        employee.id = newId;
        return newId;
    }
    async find(email) {
        const employee = await models_1.Employees.findOne({
            where: { employeeEmail: email },
        });
        return employee ? employeeInstanceToObj(employee) : undefined;
    }
    async delete(id) {
        await models_1.Employees.destroy({ where: { employeeId: id } });
    }
    async list() {
        return (await models_1.Employees.findAll()).map(employeeInstanceToObj);
    }
}
exports.SequelizeEmployeeRepo = SequelizeEmployeeRepo;
function employeeInstanceToObj(instance) {
    return new employee_1.Employee(instance.dataValues.employeeName, instance.dataValues.employeeEmail, instance.dataValues.employeeRole, instance.dataValues.employeePassword, instance.dataValues.employeeId);
}
exports.employeeInstanceToObj = employeeInstanceToObj;
