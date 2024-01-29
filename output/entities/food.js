"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Food = void 0;
var Food = /** @class */ (function () {
    function Food(type, quantity, cost, expirationDate, seller, id) {
        this.type = type;
        this.quantity = quantity;
        this.cost = cost;
        this.expirationDate = expirationDate;
        this.seller = seller;
        this.id = id;
    }
    return Food;
}());
exports.Food = Food;
