import { IsString, IsOptional, IsBoolean } from "class-validator";

export class UpdateTaskDto {
  @IsOptional()
  @IsString()
  title?: string; // Поле для обновления названия задачи

  @IsOptional()
  @IsBoolean()
  isCompleted?: boolean; // Поле для обновления статуса завершенности

  @IsOptional()
  @IsString()
  description?: string;
}
