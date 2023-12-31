import { FakeBusinessPartnerRepo } from "../../src/doubles/fake-businessPartner-repo";
import { BusinessPartner } from "../../src/entities/businessPartner";
import { Food } from "../../src/entities/food";
import { Treatment } from "../../src/entities/treatment";

let fakeBusinessPartnerRepo: FakeBusinessPartnerRepo;

describe("fake partners repo", () => {
  beforeEach(() => {
    fakeBusinessPartnerRepo = new FakeBusinessPartnerRepo();
  });

  it("adds a partner to the repo", async () => {
    const partner: BusinessPartner = new BusinessPartner(
      123,
      "mall@sales.com",
      "mall",
      "street 1"
    );

    const newId = await fakeBusinessPartnerRepo.add(partner);

    expect(newId).toBeDefined();
    expect(fakeBusinessPartnerRepo.businessPartners[0].email).toEqual(
      partner.email
    );
  });

  it("retrieves a partner from the repo", async () => {
    const partner: BusinessPartner = new BusinessPartner(
      123,
      "mall@sales.com",
      "mall",
      "street 1"
    );

    const newId = await fakeBusinessPartnerRepo.add(partner);

    const retrievedPartner = await fakeBusinessPartnerRepo.find(partner.ein);

    expect(retrievedPartner?.id).toEqual(partner.id);
    expect(retrievedPartner?.ein).toEqual(partner.ein);
  });

  it("changes the email of a given partner", async () => {
    const partner: BusinessPartner = new BusinessPartner(
      123,
      "mall@sales.com",
      "mall",
      "street 1"
    );

    const partnerId = await fakeBusinessPartnerRepo.add(partner);
    const newEmail = "new@mail.com";

    await fakeBusinessPartnerRepo.updateEmail(partnerId, newEmail);

    expect(partner.email).toEqual(newEmail);
  });

  it("removes a partner from the repository", async () => {
    const partner1: BusinessPartner = new BusinessPartner(
      123,
      "mall@sales.com",
      "mall",
      "street 1"
    );

    const partner1Id = await fakeBusinessPartnerRepo.add(partner1);

    const partner2: BusinessPartner = new BusinessPartner(
      124,
      "mall@sales.com",
      "mall",
      "street 1"
    );

    const partner2Id = await fakeBusinessPartnerRepo.add(partner2);

    await fakeBusinessPartnerRepo.delete(partner1Id);

    const retrievedPartner1 = await fakeBusinessPartnerRepo.find(partner1.ein);
    const retrievedPartner2 = await fakeBusinessPartnerRepo.find(partner2.ein);

    expect(retrievedPartner1).toBeUndefined();
    expect(retrievedPartner2).toBeTruthy();
  });

  it("lists the partners", async () => {
    const partner1: BusinessPartner = new BusinessPartner(
      123,
      "mall@sales.com",
      "mall",
      "street 1"
    );
    await fakeBusinessPartnerRepo.add(partner1);

    const partner2: BusinessPartner = new BusinessPartner(
      123,
      "mall@sales.com",
      "mall",
      "street 1"
    );
    await fakeBusinessPartnerRepo.add(partner2);

    const partnersList: BusinessPartner[] =
      await fakeBusinessPartnerRepo.list();

    expect(
      partnersList.includes(partner1) && partnersList.includes(partner2)
    ).toBeTruthy();
  });
});
