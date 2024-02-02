"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Equipment = void 0;
class Equipment {
    type;
    status;
    location;
    seller;
    totalMaintenanceCost;
    cost;
    quantity;
    id;
    constructor(type, status, location, seller, totalMaintenanceCost = 0, cost, quantity, id) {
        this.type = type;
        this.status = status;
        this.location = location;
        this.seller = seller;
        this.totalMaintenanceCost = totalMaintenanceCost;
        this.cost = cost;
        this.quantity = quantity;
        this.id = id;
    }
}
exports.Equipment = Equipment;
