import { NestInterceptor, ExecutionContext, CallHandler } from "@nestjs/common";
import { Observable, map, tap } from "rxjs";

export class ApiVersionInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const start = Date.now();
    let end = 0;
    return next.handle().pipe(
      tap(() => (end = Date.now() - start)),
      map((response) => ({
        tasks: response.tasks,
        apiVersion: "1.0",
        executionTime: end + "ms",
      })),
    );
  }
}
