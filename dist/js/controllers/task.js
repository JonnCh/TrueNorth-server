"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateTask = exports.getTasks = void 0;
const task_1 = __importDefault(require("../models/task"));
const task_2 = __importDefault(require("../models/task"));
const axios_1 = __importDefault(require("axios"));
const task_3 = __importDefault(require("../models/task"));
const getTasks = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    try {
        const quantity = parseInt((_b = (_a = req.query.quantity) === null || _a === void 0 ? void 0 : _a.toString()) !== null && _b !== void 0 ? _b : "0");
        const tasks = yield task_2.default.find().limit(quantity);
        if (quantity > task_3.default.length) {
            const result = yield axios_1.default.get(`https://lorem-faker.vercel.app/api?quantity=${quantity - tasks.length}`);
            const newTasks = result.data.map((s) => new task_1.default({
                title: s,
                status: "Pending"
            }));
            yield Promise.all(newTasks.map(t => t.save()));
            res.status(200).json({ tasks: [...tasks, ...newTasks] });
        }
        else {
            res.status(200).json({ tasks });
        }
    }
    catch (error) {
        throw error;
    }
});
exports.getTasks = getTasks;
const updateTask = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { params: { id }, body, } = req;
        const updateMenu = yield task_2.default.findByIdAndUpdate({ _id: id }, body);
        res.status(updateMenu ? 200 : 404).json({
            menu: updateMenu,
        });
    }
    catch (error) {
        throw error;
    }
});
exports.updateTask = updateTask;
