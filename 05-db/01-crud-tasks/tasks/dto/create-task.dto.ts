import { IsString, IsNotEmpty, IsOptional, IsBoolean } from "class-validator";

export class CreateTaskDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsBoolean()
  isCompleted?: boolean; // Необязательное поле с флагом завершенности
}
