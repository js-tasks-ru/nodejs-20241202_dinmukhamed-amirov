import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  NotFoundException,
} from "@nestjs/common";
import { TasksService } from "./tasks.service";
import { ObjectId } from "mongoose";
import { ObjectIDPipe } from "../objectid/objectid.pipe";

import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Task, TaskDocument } from "./schemas/task.schema";
import { CreateTaskDto } from "./dto/create-task.dto";
import { UpdateTaskDto } from "./dto/update-task.dto";

@Controller("tasks")
export class TasksController {
  constructor(
    @InjectModel(Task.name) private taskModel: Model<TaskDocument>,
    private taskService: TasksService,
  ) {}

  @Post()
  async create(@Body() createTaskDto: CreateTaskDto) {
    try {
      const createdTask = new this.taskModel(createTaskDto);
      return await createdTask.save();
    } catch (error) {
      // Обработка ошибок, например, уникальности
      throw error;
    }
  }

  @Get()
  async findAll() {
    return await this.taskModel.find().exec();
  }

  @Get(":id")
  async findOne(@Param("id", ObjectIDPipe) id: ObjectId) {
    const task = await this.taskModel.findById(id).exec();
    if (!task) throw new NotFoundException("Task not found");
    return task;
  }

  @Patch(":id")
  async update(
    @Param("id", ObjectIDPipe) id: ObjectId,
    @Body() updateTaskDto: UpdateTaskDto,
  ) {
    const updatedTask = await this.taskModel
      .findByIdAndUpdate(id, updateTaskDto, { new: true })
      .exec();
    if (!updatedTask) throw new NotFoundException("Task not found");
    return updatedTask;
  }

  @Delete(":id")
  async remove(@Param("id", ObjectIDPipe) id: ObjectId) {
    const deletedTask = await this.taskModel.findByIdAndDelete(id).exec();
    if (!deletedTask) throw new NotFoundException("Task not found");
    return deletedTask;
  }
}
