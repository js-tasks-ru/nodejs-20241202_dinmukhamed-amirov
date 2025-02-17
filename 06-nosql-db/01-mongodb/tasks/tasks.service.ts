import { Injectable, NotFoundException } from "@nestjs/common";
import { CreateTaskDto } from "./dto/create-task.dto";
import { UpdateTaskDto } from "./dto/update-task.dto";
import { InjectModel } from "@nestjs/mongoose";
import { Task, TaskDocument } from "./schemas/task.schema";
import { Model, ObjectId } from "mongoose";

@Injectable()
export class TasksService {
  constructor(@InjectModel(Task.name) private taskModel: Model<TaskDocument>) {}

  async create(createTaskDto: CreateTaskDto) {
    const createdTask = new this.taskModel(createTaskDto);
    return await createdTask.save();
  }

  async findAll() {
    return await this.taskModel.find().exec();
  }

  async findOne(id: ObjectId) {
    const task = await this.taskModel.findById(id).exec();
    if (!task) {
      throw new NotFoundException("Task not found");
    }
    return task;
  }

  async update(id: ObjectId, updateTaskDto: UpdateTaskDto) {
    const updatedTask = await this.taskModel
      .findByIdAndUpdate(id, updateTaskDto, { new: true })
      .exec();
    if (!updatedTask) {
      throw new NotFoundException("Task not found");
    }
    return updatedTask;
  }

  async remove(id: ObjectId) {
    const deletedTask = await this.taskModel.findByIdAndDelete(id).exec();
    if (!deletedTask) {
      throw new NotFoundException("Task not found");
    }
    return deletedTask;
  }
}
