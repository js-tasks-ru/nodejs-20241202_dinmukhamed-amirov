import { Injectable } from "@nestjs/common";

@Injectable()
export class NotificationService {
  constructor() {}

  sendEmail(email: string, subject: string, message: string) {}

  sendSMS(phone: string, message: string) {}
}
