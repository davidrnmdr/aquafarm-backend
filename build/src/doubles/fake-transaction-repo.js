"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FakeTransactionRepo = void 0;
const sale_1 = require("../entities/sale");
const crypto_1 = __importDefault(require("crypto"));
class FakeTransactionRepo {
    sales = [];
    purchases = [];
    async add(transaction) {
        const newId = crypto_1.default.randomUUID();
        transaction.id = newId;
        if (transaction instanceof sale_1.Sale) {
            this.sales.push(transaction);
        }
        else
            this.purchases.push(transaction);
        return newId;
    }
    async find(type, id) {
        if (type === "sale") {
            return this.sales.find((sale) => sale.id === id);
        }
        else
            return this.purchases.find((purchase) => purchase.id === id);
    }
    async findByEmployee(type, attribute, value) {
        if (type === "sale") {
            return this.sales.filter((sale) => sale.employee[attribute] === value);
        }
        return this.purchases.filter((purchase) => purchase.employee[attribute] === value);
    }
    async list(type) {
        if (type === "sale") {
            return this.sales;
        }
        else
            return this.purchases;
    }
}
exports.FakeTransactionRepo = FakeTransactionRepo;
