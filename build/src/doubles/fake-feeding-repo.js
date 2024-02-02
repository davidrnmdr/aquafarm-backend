"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FakeFeedingRepo = void 0;
const crypto_1 = __importDefault(require("crypto"));
class FakeFeedingRepo {
    feedings = [];
    async add(feeding) {
        const newId = crypto_1.default.randomUUID();
        feeding.id = newId;
        this.feedings.push(feeding);
        return newId;
    }
    async find(id) {
        return this.feedings.find((feeding) => feeding.id === id);
    }
    async findByEmployee(attribute, value) {
        return this.feedings.filter((feeding) => feeding.employee[attribute] === value);
    }
    async delete(id) {
        const feedingIndex = this.feedings.findIndex((feeding) => feeding.id === id);
        if (feedingIndex != -1)
            this.feedings.splice(feedingIndex, 1);
    }
    async list() {
        return this.feedings;
    }
}
exports.FakeFeedingRepo = FakeFeedingRepo;
