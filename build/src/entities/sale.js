"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Sale = void 0;
class Sale {
    value;
    partner;
    date;
    quantity;
    employee;
    id;
    constructor(value, partner, date, quantity, employee, id) {
        this.value = value;
        this.partner = partner;
        this.date = date;
        this.quantity = quantity;
        this.employee = employee;
        this.id = id;
    }
}
exports.Sale = Sale;
