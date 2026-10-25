import { Injectable, UnauthorizedException, CanActivate, ExecutionContext, ServiceUnavailableException } from "@nestjs/common";
import { timingSafeEqual } from "node:crypto";

@Injectable()
export class AdminTokenGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const configuredToken = process.env.ADMIN_API_TOKEN;
    if (!configuredToken) {
      throw new ServiceUnavailableException("Product creation is not configured on this server.");
    }

    const request = context.switchToHttp().getRequest<{ header(name: string): string | undefined }>();
    const providedToken = request.header("x-admin-token");
    if (!providedToken) {
      throw new UnauthorizedException("Enter the admin access token to add products.");
    }

    const expected = Buffer.from(configuredToken);
    const actual = Buffer.from(providedToken);
    if (expected.length !== actual.length || !timingSafeEqual(expected, actual)) {
      throw new UnauthorizedException("The admin access token is incorrect.");
    }

    return true;
  }
}
