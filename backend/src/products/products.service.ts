import { ConflictException, Injectable } from "@nestjs/common";
import { Prisma } from "@prisma/client";
import { randomUUID } from "node:crypto";

import { PrismaService } from "../prisma/prisma.service";
import { CreateProductDto } from "./create-product.dto";

@Injectable()
export class ProductsService {
  constructor(private readonly prisma: PrismaService) {}

  listProducts() {
    return this.prisma.product
      .findMany({
        where: {
          status: "ACTIVE",
          store: { is: { status: "ACTIVE", vendor: { is: { status: "ACTIVE" } } } },
        },
        include: { category: true, store: { include: { vendor: true } } },
        orderBy: { createdAt: "desc" },
      })
      .then((products) => products.map((product) => this.toProductResponse(product)));
  }

  listFlashSaleProducts() {
    return this.prisma.product
      .findMany({
        where: {
          isFlashSale: true,
          status: "ACTIVE",
          store: { is: { status: "ACTIVE", vendor: { is: { status: "ACTIVE" } } } },
        },
        include: { category: true, store: { include: { vendor: true } } },
        orderBy: { createdAt: "desc" },
      })
      .then((products) => products.map((product) => this.toProductResponse(product)));
  }

  async createProduct(input: CreateProductDto) {
    const titleSlug = this.toSlug(input.title);
    const slug = titleSlug || `product-${randomUUID()}`;
    const vendorSlug = this.toSlug(input.vendorName);
    const storeSlug = this.toSlug(input.store);
    const categorySlug = this.toSlug(input.category);

    try {
      const product = await this.prisma.$transaction(async (transaction) => {
        const vendor = await transaction.vendor.upsert({
          where: { slug: vendorSlug },
          update: {},
          create: { slug: vendorSlug, displayName: input.vendorName },
        });
        if (vendor.status !== "ACTIVE") {
          throw new ConflictException("Products cannot be added for a suspended vendor.");
        }
        const store = await transaction.store.upsert({
          where: { vendorId_slug: { vendorId: vendor.id, slug: storeSlug } },
          update: { location: input.location },
          create: {
            vendorId: vendor.id,
            slug: storeSlug,
            name: input.store,
            location: input.location,
          },
        });
        if (store.status !== "ACTIVE") {
          throw new ConflictException("Products cannot be added to an inactive store.");
        }
        const category = await transaction.category.upsert({
          where: { slug: categorySlug },
          update: {},
          create: {
            slug: categorySlug,
            name: this.toDisplayName(input.category),
          },
        });

        return transaction.product.create({
          data: {
            title: input.title,
            slug,
            image: input.image,
            imageBg: input.imageBg ?? "#f4f3f8",
            price: input.price,
            originalPrice: input.originalPrice,
            categoryId: category.id,
            storeId: store.id,
            stockQuantity: input.stockQuantity,
            isMall: input.isMall,
            freeDelivery: input.freeDelivery,
            isFlashSale: input.isFlashSale,
            soldPercent: input.soldPercent,
          },
          include: { category: true, store: { include: { vendor: true } } },
        });
      });
      return this.toProductResponse(product);
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === "P2002") {
        throw new ConflictException("A product with this title already exists in this store.");
      }
      throw error;
    }
  }

  private toSlug(value: string): string {
    return value
      .toLowerCase()
      .normalize("NFKD")
      .replace(/[^\p{L}\p{N}\p{M}]+/gu, "-")
      .replace(/^-|-$/g, "");
  }

  private toDisplayName(value: string): string {
    return value
      .split(/[-\s]+/)
      .filter(Boolean)
      .map((part) => part[0].toUpperCase() + part.slice(1))
      .join(" ");
  }

  private toProductResponse<T extends {
    category: { slug: string };
    store: { name: string; location: string; vendor: { displayName: string } };
  }>(product: T) {
    return {
      ...product,
      category: product.category.slug,
      store: product.store.name,
      vendor: product.store.vendor.displayName,
      location: product.store.location,
    };
  }
}
