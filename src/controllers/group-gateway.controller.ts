// src/controllers/group-gateway.controller.ts
import { Controller, Get, Param, Post, Body } from '@nestjs/common';
import { ApiGatewayService } from '../services/api-gateway.service';

@Controller('groups')
export class GroupGatewayController {
  constructor(private readonly apiGatewayService: ApiGatewayService) {}

  @Post('create-random')
  async createGroupsRandom(@Body() dto: { courseId: string; numberOfGroups: number }): Promise<any[]> {
    return this.apiGatewayService.createGroupsRandom(dto);
  }

  @Post('create-specialized')
  async createGroupsSpecialized(@Body() dto: { courseId: string; numberOfGroups: number; students: any }): Promise<any[]> {
    return this.apiGatewayService.createGroupsSpecialized(dto);
  }

  @Get('course/:courseId')
  async getGroupsByCourse(@Param('courseId') courseId: string): Promise<any[]> {
    return this.apiGatewayService.getGroupsByCourse(courseId);
  }

  @Get('student/:studentId')
  async getGroupsByStudent(@Param('studentId') studentId: string): Promise<any[]> {
    return this.apiGatewayService.getGroupsByStudent(studentId);
  }

}
