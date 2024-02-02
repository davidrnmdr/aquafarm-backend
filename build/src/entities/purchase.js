"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Purchase = void 0;
class Purchase {
    value;
    partner;
    date;
    food;
    treatment;
    equipment;
    employee;
    id;
    constructor(value, partner, date, food, treatment, equipment, employee, id) {
        this.value = value;
        this.partner = partner;
        this.date = date;
        this.food = food;
        this.treatment = treatment;
        this.equipment = equipment;
        this.employee = employee;
        this.id = id;
    }
}
exports.Purchase = Purchase;
