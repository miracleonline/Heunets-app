import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type ApplicationDocument = Application & Document;

@Schema({ timestamps: { createdAt: 'appliedAt' } })
export class Application {
  @Prop({ type: Types.ObjectId, ref: 'Task', required: true }) taskId: Types.ObjectId;
  @Prop({ type: Types.ObjectId, ref: 'User', required: true }) userId: Types.ObjectId;
  @Prop({ required: true }) message: string;
  @Prop({ default: Date.now }) appliedAt: Date;
}

export const ApplicationSchema = SchemaFactory.createForClass(Application);
