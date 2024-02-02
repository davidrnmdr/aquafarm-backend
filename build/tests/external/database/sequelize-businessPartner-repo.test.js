"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const businessPartner_1 = require("../../../src/entities/businessPartner");
const sequelize_businessPartner_repo_1 = require("../../../src/services/database/sequelize-businessPartner-repo");
const models_1 = require("../../../src/services/database/models");
describe("sequelize business partner repository", () => {
    const sequelizeBusinessPartnerRepo = new sequelize_businessPartner_repo_1.SequelizeBusinessPartnerRepo();
    let newId;
    let newId2;
    const partner = new businessPartner_1.BusinessPartner(123, "company@mail.com", "company llc", "street 2, 987");
    const partner2 = new businessPartner_1.BusinessPartner(321, "shop@mail.com", "shop llc", "street 5, 342");
    beforeEach(async () => {
        await models_1.BusinessPartners.sync({ force: true });
        newId = await sequelizeBusinessPartnerRepo.add(partner);
        newId2 = await sequelizeBusinessPartnerRepo.add(partner2);
    }, 20000);
    afterAll(async () => {
        await models_1.BusinessPartners.sync({ force: true });
    }, 20000);
    it("adds a partner to the repository", async () => {
        expect(newId).toBeTruthy();
    });
    it("finds a partner by ein", async () => {
        const retrievedPartner = await sequelizeBusinessPartnerRepo.find(partner.ein);
        const shouldBeUndefined = await sequelizeBusinessPartnerRepo.find(322);
        expect(retrievedPartner).toBeInstanceOf(businessPartner_1.BusinessPartner);
        expect(retrievedPartner?.id).toEqual(newId);
        expect(shouldBeUndefined).toBeUndefined();
    });
    it("updates the email of a given partner", async () => {
        const newEmail = "company@mail.net";
        await sequelizeBusinessPartnerRepo.updateEmail(newId, newEmail);
        const retrievedPartner = await sequelizeBusinessPartnerRepo.find(partner.ein);
        expect(retrievedPartner?.email).toEqual(newEmail);
    });
    it("deletes a given partner", async () => {
        await sequelizeBusinessPartnerRepo.delete(newId);
        const shouldBeUndefined = await sequelizeBusinessPartnerRepo.find(partner.ein);
        expect(shouldBeUndefined).toBeUndefined();
    });
    it("lists all partners", async () => {
        const partnersList = await sequelizeBusinessPartnerRepo.list();
        expect(partnersList[0]).toBeInstanceOf(businessPartner_1.BusinessPartner);
        expect(partnersList[0].id).toEqual(newId);
        expect(partnersList[1].id).toEqual(newId2);
    });
});
