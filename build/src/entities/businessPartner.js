"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BusinessPartner = void 0;
class BusinessPartner {
    ein;
    email;
    name;
    address;
    id;
    constructor(ein, email, name, address, id) {
        this.ein = ein;
        this.email = email;
        this.name = name;
        this.address = address;
        this.id = id;
    }
}
exports.BusinessPartner = BusinessPartner;
