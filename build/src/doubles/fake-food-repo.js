"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FakeFoodRepo = void 0;
const crypto_1 = __importDefault(require("crypto"));
class FakeFoodRepo {
    foods = [];
    async add(food) {
        const newId = crypto_1.default.randomUUID();
        food.id = newId;
        this.foods.push(food);
        return newId;
    }
    async find(id) {
        return this.foods.find((food) => food.id == id);
    }
    async delete(id) {
        const foodIndex = this.foods.findIndex((food) => food.id === id);
        if (foodIndex != -1)
            this.foods.splice(foodIndex, 1);
    }
    async updateStorage(id, quantity) {
        const foodIndex = this.foods.findIndex((food) => food.id === id);
        if (foodIndex != -1)
            this.foods[foodIndex].quantity = quantity;
    }
    async list() {
        return this.foods;
    }
}
exports.FakeFoodRepo = FakeFoodRepo;
