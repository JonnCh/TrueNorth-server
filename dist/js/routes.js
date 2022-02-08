"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const task_1 = require("./controllers/task");
const routes = (0, express_1.Router)();
routes.get("/task", task_1.getTasks);
routes.put("/task/:id", task_1.updateTask);
exports.default = routes;
