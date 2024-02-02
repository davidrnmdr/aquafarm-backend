"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Food = void 0;
class Food {
    type;
    quantity;
    cost;
    expirationDate;
    seller;
    id;
    constructor(type, quantity, cost, expirationDate, seller, id) {
        this.type = type;
        this.quantity = quantity;
        this.cost = cost;
        this.expirationDate = expirationDate;
        this.seller = seller;
        this.id = id;
    }
}
exports.Food = Food;
