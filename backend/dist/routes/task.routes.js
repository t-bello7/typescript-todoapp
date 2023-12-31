"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const task_controller_1 = require("../controllers/task.controller");
const taskRoutes = express_1.default.Router();
taskRoutes.get("/", task_controller_1.getAllTask);
taskRoutes.post("/", task_controller_1.createTask);
taskRoutes.get("/:id", task_controller_1.getTask);
taskRoutes.patch("/:id", task_controller_1.updateTask);
taskRoutes.delete("/:id", task_controller_1.deleteTask);
taskRoutes.delete("/", task_controller_1.deleteAllTask);
exports.default = taskRoutes;
//# sourceMappingURL=task.routes.js.map