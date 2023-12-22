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

    const retrievedPartner = await fakeBusinessPartnerRepo.find(newId);

    expect(retrievedPartner?.id).toEqual(partner.id);
    expect(retrievedPartner?.ein).toEqual(partner.ein);
  });

  it("updates products of a given partner", async () => {
    const partner: BusinessPartner = new BusinessPartner(
      123,
      "mall@sales.com",
      "mall",
      "street 1"
    );

    const newId = await fakeBusinessPartnerRepo.add(partner);

    const foodToBeAdded: Food = new Food(
      "pallets",
      110,
      230.4,
      new Date("2023-12-14"),
      partner
    );

    const treatmentToBeAdded: Treatment = new Treatment(
      "skin med",
      13.65,
      4,
      new Date("2023-08-08"),
      partner
    );

    await fakeBusinessPartnerRepo.updateProducts(newId, foodToBeAdded, "foods");

    expect(partner.foods.includes(foodToBeAdded)).toBeTruthy();
    expect(partner.foods[0].type).toEqual("pallets");

    await fakeBusinessPartnerRepo.updateProducts(
      newId,
      treatmentToBeAdded,
      "treatments"
    );

    expect(partner.treatments.includes(treatmentToBeAdded)).toBeTruthy();
    expect(partner.treatments[0].name).toEqual("skin med");
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

  it("removes a specific product of a given partner", async () => {
    const partner: BusinessPartner = new BusinessPartner(
      123,
      "mall@sales.com",
      "mall",
      "street 1"
    );

    const partnerId = await fakeBusinessPartnerRepo.add(partner);

    const productId = "thisWillLaterBeAnRandomUUID";

    const foodToBeAdded: Food = new Food(
      "pallets",
      110,
      230.4,
      new Date("2023-12-14"),
      partner,
      productId
    );

    const treatmentToBeAdded: Treatment = new Treatment(
      "skin med",
      13.65,
      4,
      new Date("2023-08-08"),
      partner,
      productId
    );

    await fakeBusinessPartnerRepo.updateProducts(
      partnerId,
      foodToBeAdded,
      "foods"
    );
    await fakeBusinessPartnerRepo.updateProducts(
      partnerId,
      treatmentToBeAdded,
      "treatments"
    );

    await fakeBusinessPartnerRepo.deleteProduct(partnerId, "food", productId);
    expect(partner.foods.includes(foodToBeAdded)).toBeFalsy();
    expect(partner.treatments.includes(treatmentToBeAdded)).toBeTruthy();
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
      123,
      "mall@sales.com",
      "mall",
      "street 1"
    );

    const partner2Id = await fakeBusinessPartnerRepo.add(partner2);

    await fakeBusinessPartnerRepo.delete(partner1Id);

    expect(await fakeBusinessPartnerRepo.find(partner1Id)).toBeFalsy();
    expect(await fakeBusinessPartnerRepo.find(partner2Id)).toBeTruthy();
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
