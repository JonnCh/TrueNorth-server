import { Response, Request } from "express";
import { ITask } from "../types/task";
import Task from "../models/task";
import TaskSchema from "../models/task";
import axios, { AxiosResponse } from 'axios';
import task from "../models/task";

const getTasks = async (req: Request, res: Response): Promise<void> => {
    try {
        const quantity = parseInt(req.query.quantity?.toString() ?? "0");
        const tasks: ITask[] = await TaskSchema.find().limit(quantity);
        if (quantity > task.length){
            const result: AxiosResponse = await axios.get(`https://lorem-faker.vercel.app/api?quantity=${quantity-tasks.length}`);
            const newTasks: [ITask] = result.data.map((s: string) => new Task({
                title: s,
                status: "Pending"
            }));
            await Promise.all(newTasks.map(t => t.save()));
            res.status(200).json({ tasks: [...tasks, ...newTasks] });
        } else {
            res.status(200).json({ tasks });
        }
    } catch (error) {
        throw error;
    }
};

const updateTask = async (req: Request, res: Response): Promise<void> => {
    try {
        const {
            params: { id },
            body,
        } = req;

        const updateTask: ITask | null = await TaskSchema.findByIdAndUpdate(
            { _id: id },
            body
        );

        res.status(updateTask ? 200 : 404).json({
            task: updateTask,
        });
    } catch (error) {
        throw error;
    }
};

export { getTasks, updateTask }