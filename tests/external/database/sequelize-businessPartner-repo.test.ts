import { BusinessPartner } from "../../../src/entities/businessPartner";
import { SequelizeBusinessPartnerRepo } from "../../../src/services/database/sequelize-businessPartner-repo";

import { sequelize } from "../../../src/services/database/sequelize";
import { BusinessPartners } from "../../../src/services/database/models";

describe("sequelize business partner repository", () => {
  const sequelizeBusinessPartnerRepo = new SequelizeBusinessPartnerRepo();

  beforeEach(async () => {
    await BusinessPartners.sync({ force: true });
  }, 20000);

  afterEach(async () => {
    await BusinessPartners.sync({ force: true });
  }, 20000);

  const partner = new BusinessPartner(
    123,
    "company@mail.com",
    "company llc",
    "street 2, 987"
  );

  const partner2 = new BusinessPartner(
    321,
    "shop@mail.com",
    "shop llc",
    "street 5, 342"
  );

  it("adds a partner to the repository", async () => {
    const newId = await sequelizeBusinessPartnerRepo.add(partner);

    expect(newId).toBeTruthy();
  });

  it("finds a partner by ein", async () => {
    const newId = await sequelizeBusinessPartnerRepo.add(partner);

    const retrievedPartner = await sequelizeBusinessPartnerRepo.find(
      partner.ein
    );

    const shouldBeUndefined = await sequelizeBusinessPartnerRepo.find(321);

    expect(retrievedPartner).toBeInstanceOf(BusinessPartner);
    expect(retrievedPartner?.id).toEqual(newId);
    expect(shouldBeUndefined).toBeUndefined();
  });

  it("updates the email of a given partner", async () => {
    const newId = await sequelizeBusinessPartnerRepo.add(partner);

    const newEmail = "company@mail.net";

    await sequelizeBusinessPartnerRepo.updateEmail(newId, newEmail);

    const retrievedPartner = await sequelizeBusinessPartnerRepo.find(
      partner.ein
    );

    expect(retrievedPartner?.email).toEqual(newEmail);
  });

  it("deletes a given partner", async () => {
    const newId = await sequelizeBusinessPartnerRepo.add(partner);

    await sequelizeBusinessPartnerRepo.delete(newId);

    const shouldBeUndefined = await sequelizeBusinessPartnerRepo.find(
      partner.ein
    );

    expect(shouldBeUndefined).toBeUndefined();
  });

  it("lists all partners", async () => {
    const newId = await sequelizeBusinessPartnerRepo.add(partner);
    const newId2 = await sequelizeBusinessPartnerRepo.add(partner2);

    const partnersList = await sequelizeBusinessPartnerRepo.list();

    expect(partnersList[0]).toBeInstanceOf(BusinessPartner);
    expect(partnersList[0].id).toEqual(newId);
    expect(partnersList[1].id).toEqual(newId2);
  });
});
