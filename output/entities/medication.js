"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Medication = void 0;
var Medication = /** @class */ (function () {
    function Medication(employee, tank, treatment, quantity, dateTime, id) {
        this.employee = employee;
        this.tank = tank;
        this.treatment = treatment;
        this.quantity = quantity;
        this.dateTime = dateTime;
        this.id = id;
    }
    return Medication;
}());
exports.Medication = Medication;
