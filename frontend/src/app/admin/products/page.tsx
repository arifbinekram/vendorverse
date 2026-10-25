import ProductForm from "@/components/admin/ProductForm";

export default function AdminProductsPage() {
  return (
    <div className="page-container py-8">
      <div className="mx-auto max-w-2xl rounded-xl border border-line bg-white p-6 shadow-sm sm:p-8">
        <p className="text-sm font-semibold text-brand-600">VendorVerse administration</p>
        <h1 className="mt-1 text-2xl font-bold">Add a product</h1>
        <p className="mt-2 text-sm text-muted">
          New products are saved to PostgreSQL and appear in the homepage catalog.
        </p>
        <ProductForm />
      </div>
    </div>
  );
}
