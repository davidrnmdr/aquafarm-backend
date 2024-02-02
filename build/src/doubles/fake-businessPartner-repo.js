"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FakeBusinessPartnerRepo = void 0;
const crypto_1 = __importDefault(require("crypto"));
class FakeBusinessPartnerRepo {
    businessPartners = [];
    async find(ein) {
        return this.businessPartners.find((partner) => partner.ein === ein);
    }
    async add(businessPartner) {
        const newId = crypto_1.default.randomUUID();
        businessPartner.id = newId;
        this.businessPartners.push(businessPartner);
        return newId;
    }
    async updateEmail(id, email) {
        const partnerIndex = this.businessPartners.findIndex((partner) => partner.id === id);
        if (partnerIndex != -1)
            this.businessPartners[partnerIndex].email = email;
    }
    async delete(id) {
        const partnerIndex = this.businessPartners.findIndex((partner) => partner.id === id);
        if (partnerIndex != -1)
            this.businessPartners.splice(partnerIndex, 1);
    }
    async list() {
        return this.businessPartners;
    }
}
exports.FakeBusinessPartnerRepo = FakeBusinessPartnerRepo;
