"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FakeTankRepo = void 0;
const crypto_1 = __importDefault(require("crypto"));
class FakeTankRepo {
    tanks = [];
    async add(tank) {
        const newId = crypto_1.default.randomUUID();
        tank.id = newId;
        this.tanks.push(tank);
        return newId;
    }
    async find(id) {
        return this.tanks.find((tank) => tank.id === id);
    }
    async findBy(attribute, attributeValue) {
        return this.tanks.filter((tank) => tank[attribute] === attributeValue);
    }
    async updateStatus(id, status) {
        const tankIndex = this.tanks.findIndex((tank) => tank.id === id);
        if (tankIndex != -1)
            this.tanks[tankIndex].status = status;
    }
    async delete(id) {
        const tankIndex = this.tanks.findIndex((tank) => tank.id === id);
        if (tankIndex != -1)
            this.tanks.splice(tankIndex, 1);
    }
    async list() {
        return this.tanks;
    }
}
exports.FakeTankRepo = FakeTankRepo;
