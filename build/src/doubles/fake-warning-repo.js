"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FakeWarningRepo = void 0;
const crypto_1 = __importDefault(require("crypto"));
class FakeWarningRepo {
    warnings = [];
    async add(warning) {
        const newId = crypto_1.default.randomUUID();
        warning.id = newId;
        this.warnings.push(warning);
        return newId;
    }
    async delete(id) {
        const warningIndex = this.warnings.findIndex((warning) => warning.id === id);
        if (warningIndex != -1)
            this.warnings.splice(warningIndex, 1);
    }
    async list() {
        return this.warnings;
    }
}
exports.FakeWarningRepo = FakeWarningRepo;
