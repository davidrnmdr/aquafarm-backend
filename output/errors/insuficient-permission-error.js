"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.InsuficientPermissionError = void 0;
var InsuficientPermissionError = /** @class */ (function (_super) {
    __extends(InsuficientPermissionError, _super);
    function InsuficientPermissionError() {
        var _this = _super.call(this, "Current User Has Insuficient Permission To This Operation.") || this;
        _this.name = "InsuficientPermissionError()";
        return _this;
    }
    return InsuficientPermissionError;
}(Error));
exports.InsuficientPermissionError = InsuficientPermissionError;