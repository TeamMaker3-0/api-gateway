// src/controllers/user-gateway.controller.ts
import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
} from '@nestjs/common';
import { ApiGatewayService } from '../services/api-gateway.service';

@Controller('users')
export class UserGatewayController {
  constructor(private readonly apiGatewayService: ApiGatewayService) {}

  @Post('login')
  async login(@Body() loginDto: any) {
    return this.apiGatewayService.login(loginDto);
  }

  @Post('register')
  async register(@Body() registerDto: any) {
    return this.apiGatewayService.register(registerDto);
  }

  @Get(':id')
  async getUserById(@Param('id') id: string) {
    return this.apiGatewayService.getUserById(id);
  }

  @Post()
  async createUser(@Body() createUserDto: any) {
    return this.apiGatewayService.createUser(createUserDto);
  }

  @Get()
  async getUsers() {
    return this.apiGatewayService.getUsers();
  }

  @Get('students')
  async getStudents() {
    return this.apiGatewayService.getStudents();
  }

  @Get('teachers')
  async getTeachers() {
    return this.apiGatewayService.getTeachers();
  }

  @Post('by-ids')
  async getUsersByIds(@Body('ids') ids: string[]) {
    return this.apiGatewayService.getUsersByIds(ids);
  }

  @Put(':id')
  async updateUser(@Param('id') id: string, @Body() updateUserDto: any) {
    return this.apiGatewayService.updateUser(id, updateUserDto);
  }

  @Delete(':id')
  async deleteUser(@Param('id') id: string) {
    return this.apiGatewayService.deleteUser(id);
  }

  @Post('recover-password')
  async recoverPassword(
    @Body('email') email: string,
  ): Promise<{ message: string }> {
    return this.apiGatewayService.recoverPassword(email);
  }

  @Put(':id/new-password')
  async updatePassword(
    @Param('id') id: string,
    @Body() updatePasswordDto: { oldPassword: string; newPassword: string },
  ): Promise<{ message: string }> {
    return this.apiGatewayService.updatePassword(id, updatePasswordDto);
  }

  @Post('send-reminder-emails')
  async sendReminderEmails(
    @Body('courseName') courseName: string,
    @Body('emails') emails: string[],
  ): Promise<{ message: string }> {
    return this.apiGatewayService.sendReminderEmails(courseName, emails);
  }
}
