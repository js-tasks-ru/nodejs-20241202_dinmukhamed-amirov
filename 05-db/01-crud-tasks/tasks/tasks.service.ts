import { Injectable, NotFoundException } from "@nestjs/common";
import { CreateTaskDto } from "./dto/create-task.dto";
import { UpdateTaskDto } from "./dto/update-task.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { Task } from "./entities/task.entity";
import { Repository } from "typeorm";

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task)
    private readonly taskRepository: Repository<Task>,
  ) {}

  findAll(): Promise<Task[]> {
    return this.taskRepository.find();
  }

  async findOne(id: number): Promise<Task> {
    const result = await this.taskRepository.findOne({ where: { id } });

    if (!result) {
      throw new NotFoundException(`Task with ID ${id} not found`);
    }

    return result;
  }

  create(task: CreateTaskDto): Promise<Task> {
    return this.taskRepository.save(task);
  }

  async update(id: number, task: UpdateTaskDto): Promise<Task> {
    const result = await this.taskRepository.update(id, task);

    if (result.affected === 0) {
      throw new NotFoundException(`Task with ID ${id} not found`);
    }

    const updatedTask = await this.findOne(id);
    if (!updatedTask) {
      throw new NotFoundException(`Task with ID ${id} not found after update`);
    }

    return updatedTask;
  }

  async remove(id: number): Promise<void> {
    const result = await this.taskRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Task with ID ${id} not found`);
    }
  }
}
