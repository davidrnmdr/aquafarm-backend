import { FakeBusinessPartnerRepo } from "../../doubles/fake-businessPartner-repo";
import { BusinessPartner } from "../../entities/businessPartner";
import { Produtcs } from "../../types/Products";

let fakeBusinessPartnerRepo: FakeBusinessPartnerRepo;

describe("fake partners repo", () => {
  beforeEach(() => {
    fakeBusinessPartnerRepo = new FakeBusinessPartnerRepo();
  });

  it("should correctly add a partner to the repo", async () => {
    const partner: BusinessPartner = new BusinessPartner(
      123,
      "mall@sales.com",
      "mall",
      "street 1",
      {} as Produtcs
    );

    const newId = await fakeBusinessPartnerRepo.add(partner);

    expect(newId).toBeDefined();
    expect(fakeBusinessPartnerRepo.businessPartners[0].email).toEqual(
      partner.email
    );
  });
});
