import { Injectable } from '@nestjs/common';
import { Task } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class TasksService {
  constructor(private prisma: PrismaService) {}

  async getAllTasks(): Promise<Task[]> {
    return this.prisma.task.findMany();
  }

  async getTaskById(id: number): Promise<Task> {
    return this.prisma.task.findUnique({
      where: { id },
    });
  }

  async createTask(data): Promise<Task> {
    return this.prisma.task.create({
      data,
    });
  }

  async updateTasks(id: number, data: Task): Promise<Task> {
    return this.prisma.task.update({
      where: { id },
      data,
    });
  }
  async deleteTasks(id: number): Promise<Task> {
    return this.prisma.task.delete({
      where: { id },
    });
  }
}
