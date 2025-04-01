// src/app.module.ts
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { HttpModule } from '@nestjs/axios';
import configuration from './config/configuration';
import { UserGatewayController } from './controllers/user-gateway.controller';
import { CourseGatewayController } from './controllers/course-gateway.controller';
import { GroupGatewayController } from './controllers/group-gateway.controller';
import { SurveyGatewayController } from './controllers/survey-gateway.controller';
import { ApiGatewayService } from './services/api-gateway.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration], // opcional
    }),
    HttpModule,
  ],
  controllers: [
    UserGatewayController,
    CourseGatewayController,
    GroupGatewayController,
    SurveyGatewayController,
  ],
  providers: [ApiGatewayService],
})
export class AppModule {}
