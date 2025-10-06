import { Body, Controller, Get, Param, Post, Req, UseGuards, ForbiddenException } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Roles } from '../common/roles.decorator';
import { RolesGuard } from '../common/roles.guard';
import { ApplicationsService } from './applications.service';
import { CreateApplicationDto } from './dto/create-application.dto';
import { TasksService } from '../tasks/tasks.service';

@UseGuards(JwtAuthGuard, RolesGuard)
@Controller()
export class ApplicationsController {
  constructor(private appsService: ApplicationsService, private tasksService: TasksService) {}

  @Post('tasks/:id/apply')
  @Roles('volunteer')
  async apply(@Param('id') id: string, @Req() req, @Body() dto: CreateApplicationDto) {
    // check task exists:
    await this.tasksService.findById(id);
    const app = await this.appsService.apply(id, req.user.id, dto);
    return app;
  }

  // Contributor views applications for a task they created
  @Get('tasks/:id/applications')
  @Roles('contributor')
  async getApplications(@Param('id') id: string, @Req() req) {
    const task = await this.tasksService.findById(id);
    if (task.createdBy.toString() !== req.user.id) {
      throw new ForbiddenException(
        'You are not allowed to view applications for this task',
      );
    }
    return this.appsService.findByTask(id);
  }
}
