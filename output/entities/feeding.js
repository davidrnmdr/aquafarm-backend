"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Feeding = void 0;
var Feeding = /** @class */ (function () {
    function Feeding(employee, tank, food, quantity, dateTime, id) {
        this.employee = employee;
        this.tank = tank;
        this.food = food;
        this.quantity = quantity;
        this.dateTime = dateTime;
        this.id = id;
    }
    return Feeding;
}());
exports.Feeding = Feeding;
