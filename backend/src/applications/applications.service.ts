import { Injectable, ConflictException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Application, ApplicationDocument } from './schemas/application.schema';
import { Model, Types } from 'mongoose';
import { CreateApplicationDto } from './dto/create-application.dto';

@Injectable()
export class ApplicationsService {
  constructor(@InjectModel(Application.name) private appModel: Model<ApplicationDocument>) {}

  async apply(taskId: string, userId: string, dto: CreateApplicationDto) {
    const already = await this.appModel.findOne({
      taskId: new Types.ObjectId(taskId),
      userId: new Types.ObjectId(userId),
    });

    if (already) {
      throw new ConflictException('You have already applied to this task');
    }

    const created = new this.appModel({
      taskId: new Types.ObjectId(taskId),
      userId: new Types.ObjectId(userId),
      applicantName: dto.applicantName,
      course: dto.course,
      status: dto.status || 'Pending',
      message: dto.message,
      appliedAt: new Date(),
    });

    return created.save();
  }


  async findByTask(taskId: string) {
    return this.appModel
      .find({ taskId: new Types.ObjectId(taskId) })
      .populate('userId', 'name email') 
      .sort({ appliedAt: -1 })
      .exec();
  }
}
