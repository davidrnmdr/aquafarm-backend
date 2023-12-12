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

export class App {
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
}
