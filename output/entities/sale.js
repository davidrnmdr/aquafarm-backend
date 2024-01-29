"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Sale = void 0;
var Sale = /** @class */ (function () {
    function Sale(value, partner, date, quantity, employee, id) {
        this.value = value;
        this.partner = partner;
        this.date = date;
        this.quantity = quantity;
        this.employee = employee;
        this.id = id;
    }
    return Sale;
}());
exports.Sale = Sale;
