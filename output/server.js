"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var body_parser_1 = require("body-parser");
var register_employee_1 = require("./controllers/employees/register-employee");
var find_employee_1 = require("./controllers/employees/find-employee");
var register_specie_1 = require("./controllers/fish-species/register-specie");
var register_tank_1 = require("./controllers/tanks/register-tank");
var find_tank_1 = require("./controllers/tanks/find-tank");
var register_partner_1 = require("./controllers/business-partners/register-partner");
var find_partner_1 = require("./controllers/business-partners/find-partner");
var register_equipment_1 = require("./controllers/equipments/register-equipment");
var find_equipment_1 = require("./controllers/equipments/find-equipment");
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
// employees
server.post("/api/employees", register_employee_1.registerEmployeeController);
server.get("/api/employees", find_employee_1.findEmployeeByEmailController);
// fish-species
server.post("/api/fish-species", register_specie_1.registerSpecieController);
// tanks
server.post("/api/tanks", register_tank_1.registerTankController);
server.get("/api/tanks", find_tank_1.findTankByController);
// business-partners
server.post("/api/business-partners", register_partner_1.registerPartnerController);
server.get("/api/business-partners", find_partner_1.findPartnerByEinController);
// equipments
server.post("/api/equipments", register_equipment_1.registerEquipmentController);
server.get("/api/equipments", find_equipment_1.findEquipmentByIdController);
var port = 3000;
var serverApp = server.listen(port, function () {
    console.log("Server listening on port ".concat(port));
});
exports.default = serverApp;
