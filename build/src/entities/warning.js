"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Warning = void 0;
class Warning {
    tank;
    msg;
    details;
    id;
    constructor(tank, msg, details, id) {
        this.tank = tank;
        this.msg = msg;
        this.details = details;
        this.id = id;
    }
}
exports.Warning = Warning;
