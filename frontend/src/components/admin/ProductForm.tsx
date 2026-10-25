"use client";

import { useState, type FormEvent } from "react";

type ProductResponse = {
  message?: string | string[];
  title?: string;
};

const fieldClass =
  "mt-1 w-full rounded-lg border border-line bg-white px-3 py-2 text-sm text-ink outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-100";

export default function ProductForm() {
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setMessage("");
    setIsSubmitting(true);

    const form = event.currentTarget;
    const formData = new FormData(form);
    const payload = {
      title: String(formData.get("title") ?? ""),
      image: String(formData.get("image") ?? ""),
      price: Number(formData.get("price")),
      originalPrice: Number(formData.get("originalPrice")),
      category: String(formData.get("category") ?? ""),
      vendorName: String(formData.get("vendorName") ?? ""),
      store: String(formData.get("store") ?? ""),
      location: String(formData.get("location") ?? ""),
      stockQuantity: Number(formData.get("stockQuantity")),
      freeDelivery: formData.get("freeDelivery") === "on",
      isMall: formData.get("isMall") === "on",
      isFlashSale: formData.get("isFlashSale") === "on",
      soldPercent: Number(formData.get("soldPercent") ?? 0),
    };

    try {
      const response = await fetch("/api/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-admin-token": String(formData.get("adminToken") ?? ""),
        },
        body: JSON.stringify(payload),
      });
      const result = (await response.json()) as ProductResponse;
      if (!response.ok) {
        const errorMessage = Array.isArray(result.message) ? result.message.join(" ") : result.message;
        throw new Error(errorMessage ?? "Could not save the product.");
      }

      setMessage(`Saved "${result.title ?? payload.title}". Refresh the homepage to see it.`);
      form.reset();
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Could not save the product.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="mt-6 space-y-4">
      <label className="block text-sm font-medium">
        Admin access token
        <input
          className={fieldClass}
          type="password"
          name="adminToken"
          autoComplete="current-password"
          required
        />
      </label>
      <p className="-mt-3 text-xs text-muted">This token is sent securely to the API and is not saved in the browser.</p>

      <label className="block text-sm font-medium">
        Product name
        <input className={fieldClass} name="title" minLength={3} maxLength={160} required />
      </label>

      <label className="block text-sm font-medium">
        Image path or URL
        <input
          className={fieldClass}
          name="image"
          placeholder="/images/mock/headphone.svg"
          maxLength={2048}
          required
        />
      </label>

      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block text-sm font-medium">
          Selling price (BDT)
          <input className={fieldClass} name="price" type="number" min={1} step={1} required />
        </label>
        <label className="block text-sm font-medium">
          Original price (BDT)
          <input className={fieldClass} name="originalPrice" type="number" min={1} step={1} required />
        </label>
        <label className="block text-sm font-medium">
          Category slug
          <input className={fieldClass} name="category" placeholder="electronic-accessories" required />
        </label>
        <label className="block text-sm font-medium">
          Vendor name
          <input className={fieldClass} name="vendorName" required />
        </label>
        <label className="block text-sm font-medium">
          Store name
          <input className={fieldClass} name="store" required />
        </label>
        <label className="block text-sm font-medium sm:col-span-2">
          Seller location
          <input className={fieldClass} name="location" placeholder="Dhaka" required />
        </label>
        <label className="block text-sm font-medium">
          Available stock
          <input className={fieldClass} name="stockQuantity" type="number" min={0} step={1} required />
        </label>
      </div>

      <fieldset className="flex flex-wrap gap-x-5 gap-y-2 text-sm">
        <legend className="mb-2 font-medium">Product options</legend>
        <label className="flex items-center gap-2">
          <input type="checkbox" name="freeDelivery" className="accent-violet-700" />
          Free delivery
        </label>
        <label className="flex items-center gap-2">
          <input type="checkbox" name="isMall" className="accent-violet-700" />
          VV Mall
        </label>
        <label className="flex items-center gap-2">
          <input type="checkbox" name="isFlashSale" className="accent-violet-700" />
          Include in Flash Sale
        </label>
      </fieldset>
      <label className="block max-w-xs text-sm font-medium">
        Flash Sale sold percentage (0–100)
        <input className={fieldClass} name="soldPercent" type="number" min={0} max={100} step={1} defaultValue={0} />
      </label>

      <button
        type="submit"
        disabled={isSubmitting}
        className="rounded-lg bg-brand-600 px-5 py-2.5 text-sm font-bold text-white hover:bg-brand-700 disabled:cursor-wait disabled:opacity-60"
      >
        {isSubmitting ? "Saving..." : "Save product"}
      </button>
      {message && (
        <p role="status" className="text-sm text-ink">
          {message}
        </p>
      )}
    </form>
  );
}
