import { Injectable, BadRequestException } from "@nestjs/common";
import { Task, TaskStatus } from "./task.model";

@Injectable()
export class TasksService {
  private tasks: Task[] = [
    {
      id: "1",
      title: "Task 1",
      description: "First task",
      status: TaskStatus.PENDING,
    },
    {
      id: "2",
      title: "Task 2",
      description: "Second task",
      status: TaskStatus.IN_PROGRESS,
    },
    {
      id: "3",
      title: "Task 3",
      description: "Third task",
      status: TaskStatus.COMPLETED,
    },
    {
      id: "4",
      title: "Task 4",
      description: "Fourth task",
      status: TaskStatus.PENDING,
    },
    {
      id: "5",
      title: "Task 5",
      description: "Fifth task",
      status: TaskStatus.IN_PROGRESS,
    },
  ];

  getFilteredTasks(status?: TaskStatus, page = 1, limit = 10): Task[] {
    if (Number(page) < 0 || Number(limit) < 0) {
      throw new BadRequestException("Page or limit is not correct");
    }

    let filteredTasks = this.tasks;

    if (status) {
      if (!Object.values(TaskStatus).includes(status)) {
        throw new BadRequestException("Status is not correct");
      }

      filteredTasks = filteredTasks.filter((task) => task.status === status);
    }

    const start = (Number(page) - 1) * Number(limit);
    const end = start + Number(limit);

    return filteredTasks.slice(start, end);
  }
}
