import { Body, Controller, Get, Post, UseGuards } from "@nestjs/common";

import { AdminTokenGuard } from "./admin-token.guard";
import { CreateProductDto } from "./create-product.dto";
import { ProductsService } from "./products.service";

@Controller("products")
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get()
  listProducts() {
    return this.productsService.listProducts();
  }

  @Get("flash-sale")
  listFlashSaleProducts() {
    return this.productsService.listFlashSaleProducts();
  }

  @Post()
  @UseGuards(AdminTokenGuard)
  createProduct(@Body() product: CreateProductDto) {
    return this.productsService.createProduct(product);
  }
}
