// src/services/api-gateway.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class ApiGatewayService {
  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {}

  //USERS // Métodos para user-microservice
  async register(dto: any) {
    const userMsUrl = this.configService.get<string>('userMsUrl');
    const response$ = this.httpService.post(`${userMsUrl}/users/register`, dto);
    const response = await lastValueFrom(response$);
    return response.data;
  }

  async login(dto: any) {
    const userMsUrl = this.configService.get<string>('userMsUrl');
    const response$ = this.httpService.post(`${userMsUrl}/auth/login`, dto);
    const response = await lastValueFrom(response$);
    return response.data;
  }
  
  async getUsers() {
    const userMsUrl = this.configService.get<string>('userMsUrl');
    const response$ = this.httpService.get(`${userMsUrl}/users`);
    const response = await lastValueFrom(response$);
    return response.data;
  }

  async createUser(dto: any) {
    const userMsUrl = this.configService.get<string>('userMsUrl');
    const response$ = this.httpService.post(`${userMsUrl}/users`, dto);
    const response = await lastValueFrom(response$);
    return response.data;
  }

  async getStudents() {
    const userMsUrl = this.configService.get<string>('userMsUrl');
    const response$ = this.httpService.get(`${userMsUrl}/users/students`);
    const response = await lastValueFrom(response$);
    return response.data;
  }

  async getTeachers() {
    const userMsUrl = this.configService.get<string>('userMsUrl');
    const response$ = this.httpService.get(`${userMsUrl}/users/teachers`);
    const response = await lastValueFrom(response$);
    return response.data;
  }

  async getUsersByIds(ids: string[]) {
    const userMsUrl = this.configService.get<string>('userMsUrl');
    const response$ = this.httpService.post(`${userMsUrl}/users/by-ids`, {
      ids,
    });
    const response = await lastValueFrom(response$);
    return response.data;
  }

  async getUserById(id: string) {
    const userMsUrl = this.configService.get<string>('userMsUrl');
    const response$ = this.httpService.get(`${userMsUrl}/users/${id}`);
    const response = await lastValueFrom(response$);
    return response.data;
  }

  async updateUser(id: string, dto: any) {
    const userMsUrl = this.configService.get<string>('userMsUrl');
    const response$ = this.httpService.put(`${userMsUrl}/users/${id}`, dto);
    const response = await lastValueFrom(response$);
    return response.data;
  }

  async deleteUser(id: string) {
    const userMsUrl = this.configService.get<string>('userMsUrl');
    const response$ = this.httpService.delete(`${userMsUrl}/users/${id}`);
    const response = await lastValueFrom(response$);
    return response.data;
  }

  async recoverPassword(email: string): Promise<{ message: string }> {
    const userMsUrl = this.configService.get<string>('userMsUrl');
    const response$ = this.httpService.post(`${userMsUrl}/users/recover-password`, { email });
    const response = await lastValueFrom(response$);
    return { message: response.data.message };
  }

  async updatePassword(id: string, dto: { oldPassword: string; newPassword: string }): Promise<{ message: string }> {
    const userMsUrl = this.configService.get<string>('userMsUrl');
    const response$ = this.httpService.put(`${userMsUrl}/users/${id}/new-password`, dto);
    const response = await lastValueFrom(response$);
    return { message: response.data.message };
  }

  async sendReminderEmails(courseName: string, emails: string[]): Promise<{ message: string }> {
    const userMsUrl = this.configService.get<string>('userMsUrl');
    const response$ = this.httpService.post(`${userMsUrl}/users/send-reminder-emails`, { courseName, emails });
    const response = await lastValueFrom(response$);
    return { message: response.data.message };
  }

  //COURSES
  async createCourse(createCourseDto: {
    name: string;
    description?: string;
    professorId: string;
  }): Promise<any> {
    const courseMsUrl = this.configService.get<string>('courseMsUrl');
    const response$ = this.httpService.post(`${courseMsUrl}/courses`, createCourseDto);
    const response = await lastValueFrom(response$);
    return response.data;
  }

  async addStudent(courseId: string, studentId: string): Promise<any> {
    const courseMsUrl = this.configService.get<string>('courseMsUrl');
    const response$ = this.httpService.post(`${courseMsUrl}/courses/${courseId}/add-student`, { studentId });
    const response = await lastValueFrom(response$);
    return response.data;
  }

  async removeStudent(courseId: string, studentId: string): Promise<any> {
    const courseMsUrl = this.configService.get<string>('courseMsUrl');
    const response$ = this.httpService.post(`${courseMsUrl}/courses/${courseId}/remove-student`, {studentId});
    const response = await lastValueFrom(response$);
    return response.data;
  }

  // Endpoint para obtener los estudiantes inscritos en un curso dado su ID
  async getStudentsByCourseId(courseId: string): Promise<string[]> {
    const courseMsUrl = this.configService.get<string>('courseMsUrl');
    const response$ = this.httpService.get(`${courseMsUrl}/courses/${courseId}/students`);
    const response = await lastValueFrom(response$);
    return response.data;
  }


  async getAllCourses(): Promise<any[]> {
    const courseMsUrl = this.configService.get<string>('courseMsUrl');
    const response$ = this.httpService.get(`${courseMsUrl}/courses`);
    const response = await lastValueFrom(response$);
    return response.data;
  }

  async findCourseById(courseId: string): Promise<any> {
    const courseMsUrl = this.configService.get<string>('courseMsUrl');
    const response$ = this.httpService.get(`${courseMsUrl}/courses/${courseId}`);
    const response = await lastValueFrom(response$);
    return response.data;
  }

  async findCoursesByProfessorId(professorId: string): Promise<any[]> {
    const courseMsUrl = this.configService.get<string>('courseMsUrl');
    const response$ = this.httpService.get(`${courseMsUrl}/courses/getcourseprofessor/${professorId}`);
    const response = await lastValueFrom(response$);
    return response.data;
  }

  async findCoursesByStudentId(studentId: string): Promise<any[]> {
    const courseMsUrl = this.configService.get<string>('courseMsUrl');
    const response$ = this.httpService.get(`${courseMsUrl}/courses/getcoursestudent/${studentId}`);
    const response = await lastValueFrom(response$);
    return response.data;
  }

  //GROUPS
  async createGroupsRandom(dto: { courseId: string; numberOfGroups: number }): Promise<any[]> {
    const groupMsUrl = this.configService.get<string>('groupMsUrl');
    const response$ = this.httpService.post(`${groupMsUrl}/groups/create-random`, dto);
    const response = await lastValueFrom(response$);
    return response.data;
  }

  async createGroupsSpecialized(dto: { courseId: string; numberOfGroups: number; students: any }): Promise<any[]> {
    const groupMsUrl = this.configService.get<string>('groupMsUrl');
    const response$ = this.httpService.post(`${groupMsUrl}/groups/create-specialized`, dto);
    const response = await lastValueFrom(response$);
    return response.data;
  }

  async getGroupsByCourse(courseId: string): Promise<any[]> {
    const groupMsUrl = this.configService.get<string>('groupMsUrl');
    const response$ = this.httpService.get(`${groupMsUrl}/groups/course/${courseId}`);
    const response = await lastValueFrom(response$);
    return response.data;
  }


  async getGroupsByStudent(studentId: string): Promise<any[]> {
    const groupMsUrl = this.configService.get<string>('groupMsUrl');
    const response$ = this.httpService.get(`${groupMsUrl}/groups/student/${studentId}`);
    const response = await lastValueFrom(response$);
    return response.data;
  }

  //SURVEYS
  // Encuesta Caracterial
  async createOrUpdateCaracterialSurvey(dto: any){
    const surveyMsUrl = this.configService.get<string>('surveyMsUrl');
    const response$ = this.httpService.post(`${surveyMsUrl}/surveys/caracterial`, dto);
    const response = await lastValueFrom(response$);
    return response.data;
  }

  async getCaracterialSurvey(studentId: string): Promise<any[]> {
    const surveyMsUrl = this.configService.get<string>('surveyMsUrl');
    const response$ = this.httpService.get(`${surveyMsUrl}/surveys/caracterial/${studentId}`);
    const response = await lastValueFrom(response$);
    return response.data;
  }

  // Encuesta Social
  async createOrUpdateSocialSurvey(dto: any) {
    const surveyMsUrl = this.configService.get<string>('surveyMsUrl');
    const response$ = this.httpService.post(`${surveyMsUrl}/surveys/social`, dto);
    const response = await lastValueFrom(response$);
    return response.data;
  }

  async getSocialSurvey(studentId: string, courseId: string): Promise<any[]> {
    const surveyMsUrl = this.configService.get<string>('surveyMsUrl');
    const response$ = this.httpService.get(`${surveyMsUrl}/surveys/caracterial/${studentId}/${courseId}`);
    const response = await lastValueFrom(response$);
    return response.data;
  }

  async calculateEneatype(dto: { answers: any[] }): Promise<string> {
    const surveyMsUrl = this.configService.get<string>('surveyMsUrl');
    const response$ = this.httpService.post(`${surveyMsUrl}/surveys/calculate-eneatype`, dto);
    const response = await lastValueFrom(response$);
    return response.data;
  }

  async getallcaracterialSurvey(): Promise<any[]> {
    const surveyMsUrl = this.configService.get<string>('surveyMsUrl');
    const response$ = this.httpService.get(`${surveyMsUrl}/surveys/all-caracterial`);
    const response = await lastValueFrom(response$);
    return response.data;
  }

  async getallSocialSurvey(): Promise<any[]> {
    const surveyMsUrl = this.configService.get<string>('surveyMsUrl');
    const response$ = this.httpService.get(`${surveyMsUrl}/surveys/all-social`);
    const response = await lastValueFrom(response$);
    return response.data;
  }

}
