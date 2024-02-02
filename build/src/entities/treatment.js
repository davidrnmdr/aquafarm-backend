"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Treatment = void 0;
class Treatment {
    name;
    quantity;
    cost;
    expirationDate;
    seller;
    id;
    constructor(name, quantity, cost, expirationDate, seller, id) {
        this.name = name;
        this.quantity = quantity;
        this.cost = cost;
        this.expirationDate = expirationDate;
        this.seller = seller;
        this.id = id;
    }
}
exports.Treatment = Treatment;
