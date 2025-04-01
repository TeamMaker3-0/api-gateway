// src/controllers/survey-gateway.controller.ts
import { Controller, Get, Param, Post, Body } from '@nestjs/common';
import { ApiGatewayService } from '../services/api-gateway.service';

@Controller('surveys')
export class SurveyGatewayController {
  constructor(private readonly apiGatewayService: ApiGatewayService) {}

  @Post('caracterial')
  async createOrUpdateCaracterialSurvey(@Body() dto: any) {
    return this.apiGatewayService.createOrUpdateCaracterialSurvey(dto);
  }

  @Get('caracterialByStudentId/:studentId')
  async getCaracterialSurvey(@Param('studentId') studentId: string) {
    return this.apiGatewayService.getCaracterialSurvey(studentId);
  }

  @Post('social')
  async createOrUpdateSocialSurvey(@Body() dto: any) {
    return this.apiGatewayService.createOrUpdateSocialSurvey(dto);
  }

  @Get('social/:studentId/:courseId')
  async getSocialSurvey(
    @Param('studentId') studentId: string,
    @Param('courseId') courseId: string,
  ): Promise<any> {
    return this.apiGatewayService.getSocialSurvey(studentId, courseId);
  }

  @Post('calculate-eneatype')
  calculateEneatype(@Body() dto: any) {
    return this.apiGatewayService.calculateEneatype(dto);
  }

  @Get('all-caracterial')
  async getallcaracterialSurvey() {
    return this.apiGatewayService.getallcaracterialSurvey();
  }

  @Get('all-social')
  async getallSocialSurvey() {
    return this.apiGatewayService.getallSocialSurvey();
  }
}
