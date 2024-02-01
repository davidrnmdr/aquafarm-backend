"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FakeTankVerificationRepo = void 0;
const crypto_1 = __importDefault(require("crypto"));
class FakeTankVerificationRepo {
    verifications = [];
    async add(tankVerification) {
        const newId = crypto_1.default.randomUUID();
        tankVerification.id = newId;
        this.verifications.push(tankVerification);
        return newId;
    }
    async find(id) {
        return this.verifications.find((verification) => verification.id === id);
    }
    async findByEmployee(attribute, value) {
        return this.verifications.filter((verification) => verification.employee[attribute] === value);
    }
    async delete(id) {
        const verificationIndex = this.verifications.findIndex((verification) => verification.id === id);
        if (verificationIndex != -1)
            this.verifications.splice(verificationIndex, 1);
    }
    async list() {
        return this.verifications;
    }
}
exports.FakeTankVerificationRepo = FakeTankVerificationRepo;
