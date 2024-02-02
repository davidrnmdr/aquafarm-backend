"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TankVerification = void 0;
class TankVerification {
    tank;
    employee;
    temperature;
    oxygen;
    ph;
    date;
    id;
    constructor(tank, employee, temperature, oxygen, ph, date, id) {
        this.tank = tank;
        this.employee = employee;
        this.temperature = temperature;
        this.oxygen = oxygen;
        this.ph = ph;
        this.date = date;
        this.id = id;
    }
}
exports.TankVerification = TankVerification;
