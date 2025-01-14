import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from "@nestjs/common";
import { Observable } from "rxjs";
@Injectable()
export class RolesGuard implements CanActivate {
  canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();
    const role = request.headers["x-role"];

    if (role === "admin") {
      return true;
    } else {
      throw new ForbiddenException("Доступ запрещён: требуется роль admin");
    }
  }
}
