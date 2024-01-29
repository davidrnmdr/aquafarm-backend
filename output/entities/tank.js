"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Tank = void 0;
var Tank = /** @class */ (function () {
    function Tank(fishSpecie, type, location, status, capacity, id) {
        this.fishSpecie = fishSpecie;
        this.type = type;
        this.location = location;
        this.status = status;
        this.capacity = capacity;
        this.id = id;
    }
    return Tank;
}());
exports.Tank = Tank;
