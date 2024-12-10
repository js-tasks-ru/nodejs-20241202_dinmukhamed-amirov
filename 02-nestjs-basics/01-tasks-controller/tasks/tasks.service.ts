import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from "@nestjs/common";
import { Task } from "./task.model";
import { TaskStatus } from "./task.model";

@Injectable()
export class TasksService {
  private tasks: Task[] = [];

  getAllTasks(): Task[] {
    return this.tasks;
  }

  getTaskById(id: string): Task {
    const taskById = this.tasks.find((task) => task.id == id);

    if (!taskById) {
      throw new NotFoundException(`Resource with ID ${id} not found`);
    }

    return taskById;
  }

  createTask(task: Task): Task {
    if (typeof task.status != "string" || typeof task.description != "string") {
      throw new BadRequestException("Not string");
    }

    if (!Object.values(TaskStatus).includes(task.status)) {
      throw new BadRequestException("Not right status");
    }

    const newTask = { id: Math.random().toString(), ...task };
    this.tasks.push(newTask);
    return newTask;
  }

  updateTask(id: string, update: Task): Task {
    if (
      typeof update.status != "string" ||
      typeof update.description != "string"
    ) {
      throw new BadRequestException("Not string");
    }

    if (!Object.values(TaskStatus).includes(update.status)) {
      throw new BadRequestException("Not right status");
    }

    const taskIndexById = this.tasks.findIndex((task) => task.id == id);

    if (taskIndexById === -1) {
      throw new NotFoundException(`Resource with ID ${id} not found`);
    }

    this.tasks[taskIndexById] = { ...this.tasks[taskIndexById], ...update };

    return this.tasks[taskIndexById];
  }

  deleteTask(id: string): Task {
    const taskIndexById = this.tasks.findIndex((task) => task.id == id);

    if (taskIndexById === -1) {
      throw new NotFoundException(`Resource with ID ${id} not found`);
    }

    if (taskIndexById === -1) {
      throw new NotFoundException(`Task with ID ${id} not found`);
    }

    const [deletedTask] = this.tasks.splice(taskIndexById, 1);

    return deletedTask;
  }
}
