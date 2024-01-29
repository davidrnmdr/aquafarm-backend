"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TankVerification = void 0;
var TankVerification = /** @class */ (function () {
    function TankVerification(tank, employee, temperature, oxygen, ph, date, id) {
        this.tank = tank;
        this.employee = employee;
        this.temperature = temperature;
        this.oxygen = oxygen;
        this.ph = ph;
        this.date = date;
        this.id = id;
    }
    return TankVerification;
}());
exports.TankVerification = TankVerification;
