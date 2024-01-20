import { BusinessPartner } from "../../../src/entities/businessPartner";
import { SequelizeBusinessPartnerRepo } from "../../../src/services/database/sequelize-businessPartner-repo";

import { BusinessPartners } from "../../../src/services/database/models";

describe("sequelize business partner repository", () => {
  const sequelizeBusinessPartnerRepo = new SequelizeBusinessPartnerRepo();
  let newId: string;
  let newId2: string;

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

  beforeEach(async () => {
    await BusinessPartners.sync({ force: true });

    newId = await sequelizeBusinessPartnerRepo.add(partner);
    partner.id = newId;

    newId2 = await sequelizeBusinessPartnerRepo.add(partner2);
    partner2.id = newId2;
  }, 20000);

  afterAll(async () => {
    await BusinessPartners.sync({ force: true });
  }, 20000);

  it("adds a partner to the repository", async () => {
    expect(newId).toBeTruthy();
  });

  it("finds a partner by ein", async () => {
    const retrievedPartner = await sequelizeBusinessPartnerRepo.find(
      partner.ein
    );

    const shouldBeUndefined = await sequelizeBusinessPartnerRepo.find(322);

    expect(retrievedPartner).toBeInstanceOf(BusinessPartner);
    expect(retrievedPartner?.id).toEqual(newId);
    expect(shouldBeUndefined).toBeUndefined();
  });

  it("updates the email of a given partner", async () => {
    const newEmail = "company@mail.net";

    await sequelizeBusinessPartnerRepo.updateEmail(newId, newEmail);

    const retrievedPartner = await sequelizeBusinessPartnerRepo.find(
      partner.ein
    );

    expect(retrievedPartner?.email).toEqual(newEmail);
  });

  it("deletes a given partner", async () => {
    await sequelizeBusinessPartnerRepo.delete(newId);

    const shouldBeUndefined = await sequelizeBusinessPartnerRepo.find(
      partner.ein
    );

    expect(shouldBeUndefined).toBeUndefined();
  });

  it("lists all partners", async () => {
    const partnersList = await sequelizeBusinessPartnerRepo.list();

    expect(partnersList[0]).toBeInstanceOf(BusinessPartner);
    expect(partnersList[0].id).toEqual(newId);
    expect(partnersList[1].id).toEqual(newId2);
  });
});
