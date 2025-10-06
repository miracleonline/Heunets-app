import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type TaskDocument = Task & Document;

@Schema({ timestamps: { createdAt: 'createdAt' } })
export class Task {
  @Prop({ required: true }) title: string;
  @Prop() description: string;
  @Prop({ type: Types.ObjectId, ref: 'User', required: true }) createdBy: Types.ObjectId;
  @Prop({ required: true }) dueDate: Date;
  @Prop({ default: Date.now }) createdAt: Date;
}

export const TaskSchema = SchemaFactory.createForClass(Task);
