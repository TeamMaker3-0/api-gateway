// src/controllers/course-gateway.controller.ts
import { Controller, Get, Param, Post, Delete,  Body } from '@nestjs/common';
import { ApiGatewayService } from '../services/api-gateway.service';

@Controller('courses')
export class CourseGatewayController {
  constructor(private readonly apiGatewayService: ApiGatewayService) {}

  @Post()
  async createCourse(@Body() createCourseDto: { name: string; description?: string; professorId: string }): Promise<any> {
    return this.apiGatewayService.createCourse(createCourseDto);
  }

  @Post(':courseId/add-student')
  async addStudent(@Param('courseId') courseId: string, @Body('studentId') studentId: string): Promise<any> {
    return this.apiGatewayService.addStudent(courseId, studentId);
  }

  @Post(':courseId/remove-student')
  async removeStudent(@Param('courseId') courseId: string, @Body('studentId') studentId: string): Promise<any> {
    return this.apiGatewayService.removeStudent(courseId, studentId);
  }

  @Get(':courseId/students')
  async getStudentsByCourseId(@Param('courseId') courseId: string): Promise<string[]> {
    return this.apiGatewayService.getStudentsByCourseId(courseId);
  }

  @Get()
  async getAllCourses(): Promise<any[]> {
    return this.apiGatewayService.getAllCourses();
  }

  @Get(':courseId')
  async findCourseById(@Param('courseId') courseId: string): Promise<any> {
    return this.apiGatewayService.findCourseById(courseId);
  }

  @Get('getcourseprofessor/:professorId')
  async findCoursesByProfessorId(@Param('professorId') professorId: string): Promise<any[]> {
    return this.apiGatewayService.findCoursesByProfessorId(professorId);
  }

  @Get('getcoursestudent/:studentId')
  async findCoursesByStudentId(@Param('studentId') studentId: string): Promise<any[]> {
    return this.apiGatewayService.findCoursesByStudentId(studentId);
  }
  
}
