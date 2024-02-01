"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Employee = void 0;
class Employee {
    name;
    email;
    role;
    password;
    id;
    constructor(name, email, role, password, id) {
        this.name = name;
        this.email = email;
        this.role = role;
        this.password = password;
        this.id = id;
    }
}
exports.Employee = Employee;
