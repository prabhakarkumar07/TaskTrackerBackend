import {
  Controller,
  Get,
  Post,
  Body,
  UseGuards,
  Request,
  Patch,
  Param,
} from '@nestjs/common';
import { TaskService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('tasks')
export class TaskController {
  constructor(private taskService: TaskService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async create(@Body() createTaskDto: CreateTaskDto, @Request() req) {
    return this.taskService.create({
      ...createTaskDto,
      userId: req.user.userId,
    });
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  async findAll(@Request() req) {
    return this.taskService.findAll(req.user.userId);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  async updateTask(
    @Param('id') id: string,
    @Body() updateTaskDto: Partial<CreateTaskDto>,
  ) {
    return this.taskService.updateTask(id, updateTaskDto);
  }
}
