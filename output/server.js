"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var body_parser_1 = require("body-parser");
var register_employee_1 = require("./controllers/employees/register-employee");
var find_employee_1 = require("./controllers/employees/find-employee");
var register_specie_1 = require("./controllers/fish-species/register-specie");
var cors = function (req, res, next) {
    res.set("access-control-allow-origin", "*");
    res.set("access-control-allow-headers", "*");
    res.set("access-control-allow-methods", "*");
    next();
};
var contentType = function (req, res, next) {
    res.type("json");
    next();
};
var server = (0, express_1.default)();
server.use(body_parser_1.default.json());
server.use(cors);
server.use(contentType);
// routes:
server.post("/api/employees", register_employee_1.registerEmployeeController);
server.get("/api/employees", find_employee_1.findEmployeeController);
server.post("/api/fishSpecies", register_specie_1.registerSpecieController);
var port = 3000;
var serverApp = server.listen(port, function () {
    console.log("Server listening on port ".concat(port));
});
exports.default = serverApp;
