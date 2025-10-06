import { Body, Controller, Get, Param, Post, Req, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Roles } from '../common/roles.decorator';
import { RolesGuard } from '../common/roles.guard';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';

@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('tasks')
export class TasksController {
  constructor(private tasksService: TasksService) {}

  @Post()
  @Roles('contributor')
  async create(@Body() dto: CreateTaskDto, @Req() req) {
    const task = await this.tasksService.create(dto, req.user.id);
    return task;
  }

  // GET /tasks (no role restriction)
  @UseGuards(JwtAuthGuard) // skip class guards usage
  @Get()
  async all() {
    return this.tasksService.findAll();
  }

  // GET /my-posted-tasks (contributor only)
  @Get('my-posted-tasks')
  @Roles('contributor')
  async myPosted(@Req() req) {
    return this.tasksService.findByUser(req.user.id);
  }

  @Get(':id')
  async getById(@Param('id') id: string) {
    return this.tasksService.findById(id);
  }
}
