"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Equipment = void 0;
var Equipment = /** @class */ (function () {
    function Equipment(type, status, location, seller, totalMaintenanceCost, cost, quantity, id) {
        if (totalMaintenanceCost === void 0) { totalMaintenanceCost = 0; }
        this.type = type;
        this.status = status;
        this.location = location;
        this.seller = seller;
        this.totalMaintenanceCost = totalMaintenanceCost;
        this.cost = cost;
        this.quantity = quantity;
        this.id = id;
    }
    return Equipment;
}());
exports.Equipment = Equipment;
