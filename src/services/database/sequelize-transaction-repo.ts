import { Purchase } from "../../entities/purchase";
import { Sale } from "../../entities/sale";
import { TransactionRepo } from "../../ports/transaction-repo";

import crypto from "crypto";
import {
  BusinessPartners,
  Employees,
  Equipments,
  Foods,
  Transactions,
  Treatments,
} from "./models";
import { partnerInstanceToObj } from "./sequelize-businessPartner-repo";
import { employeeInstanceToObj } from "./sequelize-employee-repo";
import { foodInstanceToObj } from "./sequelize-food-repo";
import { equipmentInstanceToObj } from "./sequelize-equipment-repo";
import { treatmentInstanceToObj } from "./sequelize-treatment-repo";
import { Op } from "sequelize";

export class SequelizeTransactionRepo implements TransactionRepo {
  async add(transaction: Sale | Purchase): Promise<string> {
    const transactionType: string =
      transaction instanceof Sale ? "sale" : "purchase";
    const newId = crypto.randomUUID();

    if (transaction instanceof Sale) {
      await Transactions.create({
        transactionType: transactionType.toLowerCase(),
        transactionValue: transaction.value,
        transactionPartnerId: transaction.partner.id,
        transactionEmployeeId: transaction.employee.id,
        transactionSaleQuantity: transaction.quantity,
        transactionDate: transaction.date,
        transactionId: newId,
      });
    } else {
      await Transactions.create({
        transactionType: transactionType.toLowerCase(),
        transactionValue: transaction.value,
        transactionPartnerId: transaction.partner.id,
        transactionEmployeeId: transaction.employee.id,
        transactionPurchaseFoodId: transaction.food?.id,
        transactionPurchaseTreatmentId: transaction.treatment?.id,
        transactionPurchaseEquipmentId: transaction.equipment?.id,
        transactionDate: transaction.date,
        transactionId: newId,
      });
    }

    transaction.id = newId;

    return newId;
  }

  async find(
    type: "sale" | "purchase",
    id: string
  ): Promise<Sale | Purchase | undefined> {
    const transaction = await Transactions.findOne({
      where: { transactionId: id },
    });

    return transaction
      ? type === "sale"
        ? await saleInstanceToObj(transaction)
        : await purchaseInstanceToObj(transaction)
      : undefined;
  }

  async findByEmployee(
    type: "sale" | "purchase",
    attribute: "name" | "email" | "role",
    value: string
  ): Promise<Sale[] | Purchase[]> {
    let employeeIds: string[] = [];
    const saleObjects: Sale[] = [];
    const purchaseObjects: Purchase[] = [];

    switch (attribute) {
      case "email":
        employeeIds = (
          await Employees.findAll({ where: { employeeEmail: value } })
        )
          .map(employeeInstanceToObj)
          .map((employee) => employee.id) as string[];
        break;

      case "name":
        employeeIds = (
          await Employees.findAll({ where: { employeeName: value } })
        )
          .map(employeeInstanceToObj)
          .map((employee) => employee.id) as string[];
        break;

      case "role":
        employeeIds = (
          await Employees.findAll({ where: { employeeRole: value } })
        )
          .map(employeeInstanceToObj)
          .map((employee) => employee.id) as string[];
        break;
    }

    const transactionInstances = await Transactions.findAll({
      where: {
        transactionEmployeeId: {
          [Op.in]: employeeIds,
        },
        transactionType: type,
      },
    });

    if (type === "sale") {
      for (let i = 0; i < transactionInstances.length; i++) {
        saleObjects.push(await saleInstanceToObj(transactionInstances[i]));
      }

      return saleObjects;
    } else {
      for (let i = 0; i < transactionInstances.length; i++) {
        purchaseObjects.push(
          await purchaseInstanceToObj(transactionInstances[i])
        );
      }
      return purchaseObjects;
    }
  }

  async list(
    type: "sale" | "purchase" | undefined
  ): Promise<Sale[] | Purchase[]> {
    const allTransactionInstances = await Transactions.findAll({
      where: { transactionType: type },
    });
    const saleObjects: Sale[] = [];
    const purchaseObjects: Purchase[] = [];

    if (type === "sale") {
      for (let i = 0; i < allTransactionInstances.length; i++) {
        saleObjects.push(await saleInstanceToObj(allTransactionInstances[i]));
      }

      return saleObjects;
    } else {
      for (let i = 0; i < allTransactionInstances.length; i++) {
        purchaseObjects.push(
          await purchaseInstanceToObj(allTransactionInstances[i])
        );
      }
      return purchaseObjects;
    }
  }
}

async function saleInstanceToObj(instance: any): Promise<Sale> {
  return new Sale(
    instance.dataValues.transactionValue,
    partnerInstanceToObj(
      await BusinessPartners.findOne({
        where: { partnerId: instance.dataValues.transactionPartnerId },
      })
    ),
    instance.dataValues.transactionDate,
    instance.dataValues.transactionSaleQuantity,
    employeeInstanceToObj(
      await Employees.findOne({
        where: { employeeId: instance.dataValues.transactionEmployeeId },
      })
    ),
    instance.dataValues.transactionId
  );
}

async function purchaseInstanceToObj(instance: any): Promise<Purchase> {
  // console.log(instance);

  // console.log(
  //   await Foods.findOne({
  //     where: { foodId: instance.dataValues.transactionPurchaseFoodId },
  //   })
  // );

  return new Purchase(
    instance.dataValues.transactionValue,
    partnerInstanceToObj(
      await BusinessPartners.findOne({
        where: { partnerId: instance.dataValues.transactionPartnerId },
      })
    ),
    instance.dataValues.transactionDate,
    instance.dataValues.transactionPurchaseFoodId
      ? await foodInstanceToObj(
          await Foods.findOne({
            where: { foodId: instance.dataValues.transactionPurchaseFoodId },
          })
        )
      : null,
    instance.dataValues.transactionPurchaseTreatmentId
      ? await treatmentInstanceToObj(
          await Treatments.findOne({
            where: {
              treatmentId: instance.dataValues.transactionPurchaseTreatmentId,
            },
          })
        )
      : null,
    instance.dataValues.transactionPurchaseEquipmentId
      ? await equipmentInstanceToObj(
          await Equipments.findOne({
            where: {
              equipmentId: instance.dataValues.transactionPurchaseEquipmentId,
            },
          })
        )
      : null,
    employeeInstanceToObj(
      await Employees.findOne({
        where: { employeeId: instance.dataValues.transactionEmployeeId },
      })
    ),
    instance.dataValues.transactionId
  );
}
