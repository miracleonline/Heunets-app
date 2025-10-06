import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Task, TaskDocument } from './schemas/task.schema';
import { Model, Types } from 'mongoose';
import { CreateTaskDto } from './dto/create-task.dto';

@Injectable()
export class TasksService {
  constructor(@InjectModel(Task.name) private taskModel: Model<TaskDocument>) {}

  async create(dto: CreateTaskDto, userId: string) {
    const created = new this.taskModel({ ...dto, createdBy: new Types.ObjectId(userId) });
    return created.save();
  }

  async findAll() {
    return this.taskModel.find().populate('createdBy', 'name email').sort({ createdAt: -1 }).exec();
  }

  async findByUser(userId: string) {
    return this.taskModel.find({ createdBy: new Types.ObjectId(userId) }).sort({ createdAt: -1 }).exec();
  }

  async findById(id: string) {
    const task = await this.taskModel.findById(id).populate('createdBy', 'name email').exec();
    if (!task) throw new NotFoundException('Task not found');
    return task;
  }
}
