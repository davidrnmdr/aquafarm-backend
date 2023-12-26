import { BusinessPartner } from "./entities/businessPartner";
import { Employee } from "./entities/employee";
import { Feeding } from "./entities/feeding";
import { Food } from "./entities/food";
import { Tank } from "./entities/tank";
import { TankVerification } from "./entities/tankVerification";
import { DuplicatedEmployeeError } from "./errors/duplicate-employee-error";
import { DuplicatePartnerError } from "./errors/duplicate-partner-error";
import { EmployeeNotFoundError } from "./errors/employee-not-found-error";
import { ExpiredFoodError } from "./errors/expired-food-error";
import { FeedingNotFoundError } from "./errors/feeding-not-found-error";
import { FoodNotFoundError } from "./errors/food-not-found-error";
import { InsuficientFoodError } from "./errors/insuficient-food-error";
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
import { TankRepo } from "./ports/tank-repo";
import { TankVerificationRepo } from "./ports/tankVerification-repo";
import { TransactionRepo } from "./ports/transaction-repo";
import { TreatmentRepo } from "./ports/treatment-repo";
import { Crypt } from "./services/crypt";

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
    readonly treatmentRepo: TreatmentRepo
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

  async registerTank(tank: Tank): Promise<string> {
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

  async registerFood(food: Food): Promise<string> {
    const seller = await this.businessPartnerRepo.find(food.seller.ein);

    if (!seller) throw new PartnerNotFoundError();

    return this.foodRepo.add(food);
  }

  async findFood(id: string): Promise<Food> {
    const retrievedFood = await this.foodRepo.find(id);

    if (!retrievedFood) throw new FoodNotFoundError();

    return retrievedFood;
  }

  async removeFood(id: string): Promise<void> {
    const retrievedFood = await this.findFood(id);

    await this.foodRepo.delete(id);
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
    const today = new Date();
    const tank = await this.findTank(tankId);
    const employee = await this.findEmployee(employeeEmail);

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
    const tank = await this.findTank(tankId);
    const employee = await this.findEmployee(employeeEmail);
    const food = await this.findFood(foodId);

    const today = new Date();

    if (food.quantity < quantity) throw new InsuficientFoodError();
    if (food.expirationDate < today) throw new ExpiredFoodError();

    food.quantity - quantity === 0
      ? await this.removeFood(foodId)
      : await this.foodRepo.updateQuantity(foodId, food.quantity - quantity);

    return this.feedingRepo.add(
      new Feeding(employee, tank, food, quantity, today)
    );
  }

  async findFeeding(id: string): Promise<Feeding> {
    const retrievedFeeding = await this.feedingRepo.find(id);

    if (!retrievedFeeding) throw new FeedingNotFoundError();

    return retrievedFeeding;
  }
}
