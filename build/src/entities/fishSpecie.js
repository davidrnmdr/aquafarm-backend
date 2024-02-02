"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FishSpecie = void 0;
class FishSpecie {
    name;
    foodType;
    temperatureRange;
    oxygenRange;
    phRange;
    id;
    constructor(name, foodType, temperatureRange, oxygenRange, phRange, id) {
        this.name = name;
        this.foodType = foodType;
        this.temperatureRange = temperatureRange;
        this.oxygenRange = oxygenRange;
        this.phRange = phRange;
        this.id = id;
    }
}
exports.FishSpecie = FishSpecie;
