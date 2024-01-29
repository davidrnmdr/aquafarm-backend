"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FishSpecie = void 0;
var FishSpecie = /** @class */ (function () {
    function FishSpecie(name, foodType, temperatureRange, oxygenRange, phRange, id) {
        this.name = name;
        this.foodType = foodType;
        this.temperatureRange = temperatureRange;
        this.oxygenRange = oxygenRange;
        this.phRange = phRange;
        this.id = id;
    }
    return FishSpecie;
}());
exports.FishSpecie = FishSpecie;
