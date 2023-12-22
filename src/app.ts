import { Employee } from "./entities/employee";
import { Tank } from "./entities/tank";
import { DuplicatedEmployeeError } from "./errors/duplicate-employee-error";
import { EmployeeNotFoundError } from "./errors/employee-not-found-error";
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

  // async registerTank(tank: Tank): Promise<string> {}

  // async findTanksBy(
  //   attribute: string,
  //   attributeValue: string | number
  // ): Promise<Tank[]> {}
}
