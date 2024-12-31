import { BadRequestException, HttpStatus, PipeTransform } from "@nestjs/common";

export class ParseIntPipe implements PipeTransform {
  transform(value: string): number {
    const parsedValue = parseInt(value, 10);
    if (isNaN(parsedValue)) {
      throw new BadRequestException({
        statusCode: HttpStatus.BAD_REQUEST,
        message: `"${value}" не является числом`,
        error: "Bad Request",
      });
    }
    return parsedValue;
  }
}
