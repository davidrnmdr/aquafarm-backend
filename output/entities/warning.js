"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Warning = void 0;
var Warning = /** @class */ (function () {
    function Warning(tank, msg, details, id) {
        this.tank = tank;
        this.msg = msg;
        this.details = details;
        this.id = id;
    }
    return Warning;
}());
exports.Warning = Warning;
