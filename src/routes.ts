import { Router } from "express";
import {
 getTasks,
 updateTask
} from "./controllers/task";

const routes: Router = Router();

routes.get("/task", getTasks);
routes.put("/task/:id", updateTask);
export default routes;