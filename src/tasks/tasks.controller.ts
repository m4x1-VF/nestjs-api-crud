import {
  Controller,
  Get,
  Post,
  Body,
  Delete,
  Param,
  Patch,
  NotFoundException,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Task } from '@prisma/client';

@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Get()
  async getAllTasks() {
    try {
      return await this.tasksService.getAllTasks();
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }

  @Get(':id')
  async getTaskById(@Param('id') id: string) {
    try {
      const task = await this.tasksService.getTaskById(Number(id));
      if (!task) throw new NotFoundException('Task not found');
      return task;
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }

  @Post()
  async createTask(@Body() data: Task) {
    try {
      const task = await this.tasksService.createTask(data);
      return {
        message: 'Task created',
        data: task,
      };
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }

  @Delete(':id')
  async deleteTask(@Param('id') id: string) {
    try {
      const task = await this.tasksService.deleteTasks(Number(id));
      return {
        message: 'Task deleted',
        data: task,
      };
    } catch (error) {
      throw new NotFoundException("Task doesn't exist");
    }
  }

  @Patch(':id')
  async updateTask(@Param('id') id: string, @Body() data: Task) {
    try {
      const task = await this.tasksService.updateTasks(Number(id), data);
      return {
        message: 'Task updated',
        data: task,
      };
    } catch (error) {
      throw new NotFoundException("Task doesn't exist");
    }
  }
}
