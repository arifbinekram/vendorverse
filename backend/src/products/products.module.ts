import { Module } from "@nestjs/common";

import { AdminTokenGuard } from "./admin-token.guard";
import { ProductsController } from "./products.controller";
import { ProductsService } from "./products.service";

@Module({
  controllers: [ProductsController],
  providers: [AdminTokenGuard, ProductsService],
})
export class ProductsModule {}
