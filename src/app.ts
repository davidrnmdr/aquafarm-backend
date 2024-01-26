import { SaleFilter } from "./types/transactionFilters";
import { PurchaseFilter } from "./types/transactionFilters";
import { Range } from "./types/range";

import { BusinessPartner } from "./entities/businessPartner";
import { Employee } from "./entities/employee";
import { Equipment } from "./entities/equipment";
import { Feeding } from "./entities/feeding";
import { Food } from "./entities/food";
import { Maintenance } from "./entities/maintenance";
import { Medication } from "./entities/medication";
import { Purchase } from "./entities/purchase";
import { Sale } from "./entities/sale";
import { Tank } from "./entities/tank";
import { TankVerification } from "./entities/tankVerification";
import { Treatment } from "./entities/treatment";

import { DuplicatedEmployeeError } from "./errors/duplicate-employee-error";
import { DuplicatePartnerError } from "./errors/duplicate-partner-error";
import { EmployeeNotFoundError } from "./errors/employee-not-found-error";
import { EquipmentNotFoundError } from "./errors/equipment-not-found-error";
import { ExpiredFoodError } from "./errors/expired-food-error";
import { ExpiredTreatmentError } from "./errors/expired-treatment-error";
import { FeedingNotFoundError } from "./errors/feeding-not-found-error";
import { FoodNotFoundError } from "./errors/food-not-found-error";
import { InsuficientFoodError } from "./errors/insuficient-food-error";
import { InsuficientPermissionError } from "./errors/insuficient-permission-error";
import { InsuficientTreatmentError } from "./errors/insuficient-treatment-error";
import { InvalidInputError } from "./errors/invalid-input-error";
import { PartnerNotFoundError } from "./errors/partner-not-found-error";
import { TankNotFoundError } from "./errors/tank-not-found-error";
import { UnableToFindError } from "./errors/unable-to-find-error";
import { WrongTypeError } from "./errors/wrong-type-error";

import { BusinessPartnerRepo } from "./ports/businessPartner-repo";
import { EmployeeRepo } from "./ports/employee-repo";
import { EquipmentRepo } from "./ports/equipments-repo";
import { FeedingRepo } from "./ports/feeding-repo";
import { FoodRepo } from "./ports/food-repo";
import { MaintenanceRepo } from "./ports/maintenance-repo";
import { MedicationRepo } from "./ports/medication-repo";
import { TankRepo } from "./ports/tank-repo";
import { TankVerificationRepo } from "./ports/tankVerification-repo";
import { TransactionRepo } from "./ports/transaction-repo";
import { TreatmentRepo } from "./ports/treatment-repo";

import { Crypt } from "./services/crypt";
import { WarningRepo } from "./ports/warning-repo";
import { Warning } from "./entities/warning";
import { WarningDetails } from "./types/warningDetails";
import { FishSpecieRepo } from "./ports/fishSpecie-repo";
import { FishSpecie } from "./entities/fishSpecie";

const superRoles = new Set(["president", "manager"]);

export class App {
  crypt: Crypt = new Crypt();

  constructor(
    readonly businessPartnerRepo: BusinessPartnerRepo,
    readonly employeeRepo: EmployeeRepo,
    readonly equipmentRepo: EquipmentRepo,
    readonly feedingRepo: FeedingRepo,
    readonly foodRepo: FoodRepo,
    readonly maintenanceRepo: MaintenanceRepo,
    readonly tankRepo: TankRepo,
    readonly tankVerificationRepo: TankVerificationRepo,
    readonly transactionRepo: TransactionRepo,
    readonly treatmentRepo: TreatmentRepo,
    readonly medicationRepo: MedicationRepo,
    readonly warningRepo: WarningRepo,
    readonly fishSpecieRepo: FishSpecieRepo
  ) {}

  async registerEmployee(employee: Employee): Promise<string> {
    if (await this.employeeRepo.find(employee.email)) {
      throw new DuplicatedEmployeeError();
    }

    const encryptedPassword = await this.crypt.encrypt(employee.password);
    employee.password = encryptedPassword;

    return await this.employeeRepo.add(employee);
  }

  async findEmployee(email: string): Promise<Employee> {
    const retrievedEmployee = await this.employeeRepo.find(email);

    if (!retrievedEmployee) throw new EmployeeNotFoundError();

    return retrievedEmployee;
  }

  async registerSpecie(specie: FishSpecie): Promise<string> {
    return await this.fishSpecieRepo.add(specie);
  }

  async registerTank(tank: Tank): Promise<string> {
    if (tank.capacity <= 0 || tank.status <= 0) throw new InvalidInputError();

    return await this.tankRepo.add(tank);
  }

  async findTank(id: string): Promise<Tank> {
    const retrievedTank = await this.tankRepo.find(id);

    if (!retrievedTank) throw new TankNotFoundError();

    return retrievedTank;
  }

  async findTanksBy(
    attribute: "type" | "capacity" | "status" | "location",
    attributeValue: string | number
  ): Promise<Tank[]> {
    if (
      (["type", "location"].includes(attribute) &&
        typeof attributeValue === "number") ||
      (["status", "capacity"].includes(attribute) &&
        typeof attributeValue === "string")
    ) {
      throw new WrongTypeError();
    }

    return await this.tankRepo.findBy(attribute, attributeValue);
  }

  async registerEquipment(equipment: Equipment): Promise<string> {
    const seller = await this.businessPartnerRepo.find(equipment.seller.ein);

    if (!seller) throw new PartnerNotFoundError();
    if (
      equipment.quantity <= 0 ||
      equipment.cost <= 0 ||
      equipment.totalMaintenanceCost != 0
    )
      throw new InvalidInputError();

    return await this.equipmentRepo.add(equipment);
  }

  async findEquipment(id: string): Promise<Equipment> {
    if (!id) throw new InvalidInputError();

    const retrievedEquipment = await this.equipmentRepo.find(id);

    if (!retrievedEquipment) throw new EquipmentNotFoundError();

    return retrievedEquipment;
  }

  async registerFood(food: Food): Promise<string> {
    const seller = await this.businessPartnerRepo.find(food.seller.ein);

    if (!seller) throw new PartnerNotFoundError();

    const today = new Date();

    if (food.quantity <= 0 || food.cost <= 0 || food.expirationDate < today)
      throw new InvalidInputError();

    return this.foodRepo.add(food);
  }

  async findFood(id: string): Promise<Food> {
    if (!id) throw new InvalidInputError();

    const retrievedFood = await this.foodRepo.find(id);

    if (!retrievedFood) throw new FoodNotFoundError();

    return retrievedFood;
  }

  async removeFood(id: string): Promise<void> {
    await this.findFood(id);

    await this.foodRepo.delete(id);
  }

  async registerTreatment(treatment: Treatment): Promise<string> {
    const seller = await this.businessPartnerRepo.find(treatment.seller.ein);

    if (!seller) throw new PartnerNotFoundError();
    if (treatment.quantity <= 0 || treatment.cost <= 0)
      throw new InvalidInputError();

    return this.treatmentRepo.add(treatment);
  }

  async findTreatment(id: string): Promise<Treatment> {
    if (!id) throw new InvalidInputError();

    const retrievedTreatment = await this.treatmentRepo.find(id);

    if (!retrievedTreatment) throw new FoodNotFoundError();

    return retrievedTreatment;
  }

  async removeTreatment(id: string): Promise<void> {
    await this.findTreatment(id);

    await this.treatmentRepo.delete(id);
  }

  async findBusinessPartner(ein: number): Promise<BusinessPartner> {
    const retrievedPartner = await this.businessPartnerRepo.find(ein);

    if (!retrievedPartner) throw new PartnerNotFoundError();

    return retrievedPartner;
  }

  async registerBusinessPartner(partner: BusinessPartner): Promise<string> {
    if (await this.businessPartnerRepo.find(partner.ein)) {
      throw new DuplicatePartnerError();
    }

    return this.businessPartnerRepo.add(partner);
  }

  async registerVerification(
    tankId: string,
    employeeEmail: string,
    temperature: number,
    oxygen: number,
    ph: number
  ): Promise<string> {
    if (!(oxygen > 0 && isInRange(ph, 0, 14))) throw new InvalidInputError();

    const today = new Date();
    const tank = await this.findTank(tankId);
    const employee = await this.findEmployee(employeeEmail);

    const oldWarnings = await this.findWarningsByTank(tankId);

    const details: WarningDetails = {
      verification: {
        temperatureOutOfRange: !isIn(
          temperature,
          tank.fishSpecie.temperatureRange
        ),
        oxygenOutOfRange: !isIn(oxygen, tank.fishSpecie.oxygenRange),
        phOutOfRange: !isIn(ph, tank.fishSpecie.phRange),
      },
    };

    if (
      details.verification?.temperatureOutOfRange ||
      details.verification?.oxygenOutOfRange ||
      details.verification?.phOutOfRange
    ) {
      this.warningRepo.add(
        new Warning(
          tank,
          `Verified Metric Out Of Range in Tank ${tankId}`,
          details
        )
      );
    } else {
      oldWarnings.forEach(
        async (warning) => await this.warningRepo.delete(warning.id as string)
      );
    }

    return await this.tankVerificationRepo.add(
      new TankVerification(tank, employee, temperature, oxygen, ph, today)
    );
  }

  async findVerificationsByEmployee(
    attribute: "email" | "name" | "role",
    value: string
  ): Promise<TankVerification[]> {
    const retrievedVerifications =
      await this.tankVerificationRepo.findByEmployee(attribute, value);

    if (retrievedVerifications.length === 0) throw new UnableToFindError();

    return retrievedVerifications;
  }

  async registerFeeding(
    tankId: string,
    employeeEmail: string,
    foodId: string,
    quantity: number
  ): Promise<string> {
    if (quantity < 0) throw new InvalidInputError();

    const tank = await this.findTank(tankId);
    const employee = await this.findEmployee(employeeEmail);
    const food = await this.findFood(foodId);

    const today = new Date();

    if (food.quantity < quantity) throw new InsuficientFoodError();
    if (food.expirationDate < today) throw new ExpiredFoodError();

    await this.foodRepo.updateStorage(foodId, food.quantity - quantity);

    return this.feedingRepo.add(
      new Feeding(employee, tank, food, quantity, today)
    );
  }

  async findFeeding(id: string): Promise<Feeding> {
    const retrievedFeeding = await this.feedingRepo.find(id);

    if (!retrievedFeeding) throw new FeedingNotFoundError();

    return retrievedFeeding;
  }

  async findFeedingsByEmployee(
    attribute: "email" | "name" | "role",
    value: string
  ): Promise<Feeding[]> {
    const retrievedFeedings = await this.feedingRepo.findByEmployee(
      attribute,
      value
    );

    if (retrievedFeedings.length === 0) throw new UnableToFindError();

    return retrievedFeedings;
  }

  async registerSale(
    value: number,
    partnerEin: number,
    quantity: number,
    employeeEmail: string
  ) {
    if (value < 0 || quantity < 0) throw new InvalidInputError();

    const partner = await this.findBusinessPartner(partnerEin);
    const employee = await this.findEmployee(employeeEmail);

    const today = new Date();

    return await this.transactionRepo.add(
      new Sale(value, partner, today, quantity, employee)
    );
  }

  async findSalesByEmployee(
    attribute: "email" | "name" | "role",
    value: string
  ): Promise<Sale[]> {
    const retrievedSales = await this.transactionRepo.findByEmployee(
      "sale",
      attribute,
      value
    );

    if (retrievedSales.length === 0) throw new UnableToFindError();

    return retrievedSales as Sale[];
  }

  async registerPurchase(
    value: number,
    partnerEin: number,
    foodId: string | null,
    treatmentId: string | null,
    equipmentId: string | null,
    employeeEmail: string
  ): Promise<string> {
    let totalValue = 0;

    let food = null;
    let foodQuantity: number = 0;

    let treatment = null;
    let treatmentQuantity: number = 0;

    let equipment = null;
    let equipmentQuantity: number = 0;

    if (equipmentId) {
      totalValue =
        equipmentId &&
        (equipmentQuantity = (equipment = await this.findEquipment(equipmentId))
          .quantity) > 0
          ? totalValue + equipment.cost
          : totalValue;
    }
    if (foodId) {
      totalValue =
        foodId &&
        (foodQuantity = (food = await this.findFood(foodId)).quantity) > 0
          ? totalValue + food.cost
          : totalValue;
    }

    if (treatmentId) {
      totalValue =
        treatmentId &&
        (treatmentQuantity = (treatment = await this.findTreatment(treatmentId))
          .quantity) > 0
          ? totalValue + treatment.cost
          : totalValue;
    }

    if (
      value < 0 ||
      foodQuantity < 0 ||
      treatmentQuantity < 0 ||
      equipmentQuantity < 0 ||
      (foodQuantity === 0 && treatmentQuantity === 0 && equipmentQuantity == 0)
    )
      throw new InvalidInputError();

    const partner = await this.findBusinessPartner(partnerEin);
    const employee = await this.findEmployee(employeeEmail);

    if (totalValue != value && !superRoles.has(employee.role)) {
      throw new InsuficientPermissionError();
    }

    return await this.transactionRepo.add(
      new Purchase(
        value,
        partner,
        new Date(),
        food,
        treatment,
        equipment,
        employee
      )
    );
  }

  async findPurchasesByEmployee(
    attribute: "email" | "name" | "role",
    value: string
  ): Promise<Purchase[]> {
    const retrievedPurchases = await this.transactionRepo.findByEmployee(
      "purchase",
      attribute,
      value
    );

    if (retrievedPurchases.length === 0) throw new UnableToFindError();

    return retrievedPurchases as Purchase[];
  }

  async registerMedication(
    tankId: string,
    employeeEmail: string,
    treatmentId: string,
    quantity: number
  ): Promise<string> {
    if (quantity < 0) throw new InvalidInputError();

    const tank = await this.findTank(tankId);
    const employee = await this.findEmployee(employeeEmail);
    const treatment = await this.findTreatment(treatmentId);

    const today = new Date();

    if (treatment.quantity < quantity) throw new InsuficientTreatmentError();
    if (treatment.expirationDate < today) throw new ExpiredTreatmentError();

    await this.treatmentRepo.updateStorage(
      treatmentId,
      treatment.quantity - quantity
    );

    return this.medicationRepo.add(
      new Medication(employee, tank, treatment, quantity, today)
    );
  }

  async findMedication(id: string): Promise<Medication> {
    const retrievedMedication = await this.medicationRepo.find(id);

    if (!retrievedMedication) throw new FeedingNotFoundError();

    return retrievedMedication;
  }

  async findMedicationsByEmployee(
    attribute: "email" | "name" | "role",
    value: string
  ): Promise<Medication[]> {
    const retrievedMedications = await this.medicationRepo.findByEmployee(
      attribute,
      value
    );

    if (retrievedMedications.length === 0) throw new UnableToFindError();

    return retrievedMedications;
  }

  async registerMaintenance(
    equipmentId: string,
    employeeEmail: string,
    cost: number
  ): Promise<string> {
    if (cost < 0) throw new InvalidInputError();

    const equipment = await this.findEquipment(equipmentId);
    const employee = await this.findEmployee(employeeEmail);

    const today = new Date();

    await this.equipmentRepo.updateMaintenanceCost(
      equipmentId,
      equipment.totalMaintenanceCost + cost
    );

    return await this.maintenanceRepo.add(
      new Maintenance(equipment, employee, today, cost)
    );
  }

  async findMaintenancesByEmployee(
    attribute: "email" | "name" | "role",
    value: string
  ): Promise<Maintenance[]> {
    const retrievedMaintenances = await this.maintenanceRepo.findByEmployee(
      attribute,
      value
    );

    if (retrievedMaintenances.length === 0) throw new UnableToFindError();

    return retrievedMaintenances;
  }

  async filterSales(filter: SaleFilter): Promise<Sale[]> {
    const allSales = (await this.transactionRepo.list("sale")) as Sale[];

    const filteredSales = allSales.filter((sale) => {
      if (
        filter.value &&
        !isInRange(sale.value, filter.value.min, filter.value.max)
      )
        return false;

      if (
        filter.date &&
        !isInRange(sale.date, filter.date.min, filter.date.max)
      )
        return false;

      if (
        filter.quantity &&
        !isInRange(sale.quantity, filter.quantity.min, filter.quantity.max)
      )
        return false;

      if (filter.partner && sale.partner.ein !== filter.partner.ein)
        return false;

      return true;
    });

    return filteredSales;
  }

  async filterPurchases(filter: PurchaseFilter): Promise<Purchase[]> {
    const allPurchases = (await this.transactionRepo.list(
      "purchase"
    )) as Purchase[];

    const filteredPurchases = allPurchases.filter((purchase) => {
      if (
        filter.value &&
        !isInRange(purchase.value, filter.value.min, filter.value.max)
      )
        return false;

      if (
        filter.date &&
        !isInRange(purchase.date, filter.date.min, filter.date.max)
      )
        return false;

      if (filter.partner && purchase.partner.ein !== filter.partner.ein)
        return false;

      if ((!filter.food && purchase.food) || (filter.food && !purchase.food))
        return false;

      if (
        (!filter.treatment && purchase.treatment) ||
        (filter.treatment && !purchase.treatment)
      )
        return false;

      if (
        (!filter.equipment && purchase.equipment) ||
        (filter.equipment && !purchase.equipment)
      )
        return false;

      return true;
    });

    return filteredPurchases;
  }

  async listWarnings(): Promise<Warning[]> {
    return await this.warningRepo.list();
  }

  async findWarningsByTank(tankId: string): Promise<Warning[]> {
    const allWarnings = await this.warningRepo.list();

    return allWarnings.filter((warning) => warning.tank.id === tankId);
  }
}

function isInRange(
  value: number | Date,
  min: number | Date,
  max: number | Date = Infinity
): boolean {
  return value <= max && value >= min;
}

function isIn(value: number | Date, range: Range): boolean {
  return value <= range.max && value >= range.min;
}
