"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Maintenance = void 0;
class Maintenance {
    equipment;
    employee;
    date;
    cost;
    id;
    constructor(equipment, employee, date, cost, id) {
        this.equipment = equipment;
        this.employee = employee;
        this.date = date;
        this.cost = cost;
        this.id = id;
    }
}
exports.Maintenance = Maintenance;
