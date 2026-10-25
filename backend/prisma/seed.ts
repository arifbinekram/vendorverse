import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const vendor = await prisma.vendor.upsert({
    where: { slug: "quadcore-demo" },
    update: {},
    create: { slug: "quadcore-demo", displayName: "QuadCore Demo Vendor" },
  });
  const store = await prisma.store.upsert({
    where: { vendorId_slug: { vendorId: vendor.id, slug: "quadcore-demo-store" } },
    update: {},
    create: {
      vendorId: vendor.id,
      slug: "quadcore-demo-store",
      name: "QuadCore Demo Store",
      location: "Dhaka",
    },
  });
  const category = await prisma.category.upsert({
    where: { slug: "electronic-accessories" },
    update: {},
    create: { slug: "electronic-accessories", name: "Electronic Accessories" },
  });

  await prisma.product.upsert({
    where: { storeId_slug: { storeId: store.id, slug: "vendorverse-demo-earbuds" } },
    update: {
      storeId: store.id,
      categoryId: category.id,
      stockQuantity: 100,
    },
    create: {
      slug: "vendorverse-demo-earbuds",
      title: "VendorVerse Demo Wireless Earbuds",
      image: "/images/mock/headphone.svg",
      imageBg: "radial-gradient(circle at 50% 42%, #F1ECFF, #DED3FF)",
      price: 1499,
      originalPrice: 1999,
      rating: 4.5,
      reviews: 28,
      sold: 63,
      stockQuantity: 100,
      categoryId: category.id,
      storeId: store.id,
      freeDelivery: true,
      isFlashSale: true,
      soldPercent: 42,
    },
  });
}

main()
  .then(async () => prisma.$disconnect())
  .catch(async (error: unknown) => {
    console.error(error);
    await prisma.$disconnect();
    process.exitCode = 1;
  });
