import { Injectable, NotFoundException } from "@nestjs/common";
import { CreateTaskDto, Task, TaskStatus, UpdateTaskDto } from "./task.model";
import { NotificationService } from "../providers/NotificationService";

@Injectable()
export class TasksService {
  private tasks: Task[] = [];

  constructor(private readonly notificationService: NotificationService) {}

  async createTask(createTaskDto: CreateTaskDto) {
    const { title, description, assignedTo } = createTaskDto;

    if (title && description && assignedTo) {
      this.notificationService.sendEmail(
        "user1@mail.com",
        "Новая задача",
        'Вы назначены ответственным за задачу: "New Task"',
      );
    }

    const task: Task = {
      id: (this.tasks.length + 1).toString(),
      title,
      description,
      status: TaskStatus.Pending,
      assignedTo,
    };
    this.tasks.push(task);

    return task;
  }

  async updateTask(id: string, updateTaskDto: UpdateTaskDto) {
    const task = this.tasks.find((t) => t.id === id);
    if (!task) {
      throw new NotFoundException(`Задача с ID ${id} не найдена`);
    }

    if (id && updateTaskDto.status === TaskStatus.Completed) {
      this.notificationService.sendSMS(
        "+987654321",
        'Статус задачи "Existing Task" обновлён на "completed"',
      );
    }

    Object.assign(task, updateTaskDto);
    return task;
  }
}
