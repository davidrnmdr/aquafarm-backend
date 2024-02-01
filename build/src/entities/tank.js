"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Tank = void 0;
class Tank {
    fishSpecie;
    type;
    location;
    status;
    capacity;
    id;
    constructor(fishSpecie, type, location, status, capacity, id) {
        this.fishSpecie = fishSpecie;
        this.type = type;
        this.location = location;
        this.status = status;
        this.capacity = capacity;
        this.id = id;
    }
}
exports.Tank = Tank;
