"use client";

import React, { useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { ShoppingBag, Sparkles, CheckCircle2, AlertCircle, RefreshCw, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useCreateProductMutation } from "@/store/services/productApi";
import { ProductRequest, Gender, DiscountType } from "@/types/api";

// ============================================================================
// ZOD VALIDATION SCHEMA
// Aligned with co.istad.corefeature.product.dto.ProductRequest
// ============================================================================
const productSchema = z.object({
  name: z
    .string()
    .min(2, "Product name must be at least 2 characters")
    .max(255, "Product name must not exceed 255 characters"),
  descriptions: z.string().max(2000, "Description must not exceed 2000 characters").optional(),
  gender: z.enum(["MEN", "WOMEN", "CHILDREN"] as const),
  discountType: z.enum(["NONE", "PERCENTAGE", "FIXED_AMOUNT"] as const),
  skuCode: z.string().max(50, "SKU code must not exceed 50 characters").optional(),
  thumbnailUrl: z.string().max(255, "Thumbnail URL must not exceed 255 characters").optional(),
  imageUrlsInput: z.string().optional(),
  brandId: z.string().min(1, "Brand ID is required"),
  categoryId: z.string().min(1, "Category ID is required"),
  currencyId: z.string().optional(),
  supplierId: z.string().optional(),
  isActive: z.boolean(),
});

type ProductFormData = z.infer<typeof productSchema>;

export function ProductForm() {
  const [createProduct, { isLoading, isSuccess, data: responseData, reset: resetMutation }] =
    useCreateProductMutation();

  const [notification, setNotification] = useState<{ type: "success" | "error"; text: string } | null>(null);

  const {
    register,
    handleSubmit,
    control,
    setValue,
    reset,
    formState: { errors },
  } = useForm<ProductFormData>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      name: "",
      descriptions: "",
      gender: "MEN",
      discountType: "NONE",
      skuCode: "",
      thumbnailUrl: "",
      imageUrlsInput: "",
      brandId: "1", // TARGET TO CHANGE: Default placeholder
      categoryId: "1", // TARGET TO CHANGE: Default placeholder
      currencyId: "1",
      supplierId: "1",
      isActive: true,
    },
  });

  const watchedThumbnail = useWatch({ control, name: "thumbnailUrl" });

  // TARGET TO CHANGE: Pre-fill luxury timepiece sample data
  const handleFillDraft = () => {
    setValue("name", "Royal Oak Automatic 41mm Rose Gold");
    setValue(
      "descriptions",
      "Handcrafted in Le Brassus with tapisserie dial pattern, sapphire crystal caseback, and 40-hour power reserve."
    );
    setValue("gender", "MEN");
    setValue("discountType", "NONE");
    setValue("skuCode", "RO-41-RG-001");
    setValue(
      "thumbnailUrl",
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=800&q=80"
    );
    setValue(
      "imageUrlsInput",
      "https://images.unsplash.com/photo-1542496658-e33a6d0d50f6?auto=format&fit=crop&w=800&q=80, https://images.unsplash.com/photo-1524805444758-089113d48a6d?auto=format&fit=crop&w=800&q=80"
    );
    // TARGET TO CHANGE: Enter real brandId and categoryId from your backend database
    setValue("brandId", "1");
    setValue("categoryId", "1");
    setValue("currencyId", "1");
    setValue("supplierId", "1");
    setValue("isActive", true);
    setNotification(null);
    resetMutation();
  };

  const onSubmit = async (data: ProductFormData) => {
    setNotification(null);
    try {
      // Parse comma-separated image URLs into string[]
      const imageUrls = data.imageUrlsInput
        ? data.imageUrlsInput
            .split(",")
            .map((url) => url.trim())
            .filter((url) => url.length > 0)
        : [];

      const payload: ProductRequest = {
        name: data.name,
        descriptions: data.descriptions || undefined,
        gender: data.gender as Gender,
        discountType: data.discountType as DiscountType,
        skuCode: data.skuCode || undefined,
        thumbnailUrl: data.thumbnailUrl || undefined,
        imageUrls: imageUrls.length > 0 ? imageUrls : undefined,
        brandId: Number(data.brandId),
        categoryId: Number(data.categoryId),
        currencyId: data.currencyId ? Number(data.currencyId) : null,
        supplierId: data.supplierId ? Number(data.supplierId) : null,
        isActive: data.isActive,
      };

      const res = await createProduct(payload).unwrap();
      setNotification({
        type: "success",
        text: `Product "${res.payload?.name || data.name}" created successfully with ID #${res.payload?.id || "N/A"}!`,
      });
      reset();
    } catch (err: unknown) {
      const errorMsg =
        (err as { data?: { message?: string } })?.data?.message ||
        "Failed to post product to luxe-api. Ensure Brand ID and Category ID exist in your database first.";
      setNotification({
        type: "error",
        text: errorMsg,
      });
    }
  };

  return (
    <Card className="max-w-3xl mx-auto shadow-md border-neutral-200 dark:border-neutral-800">
      <CardHeader className="border-b border-neutral-100 dark:border-neutral-800/60 pb-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-lg bg-[#c5a880]/15 text-[#c5a880]">
              <ShoppingBag size={20} />
            </div>
            <div>
              <CardTitle className="text-lg">Create Product</CardTitle>
              <CardDescription>
                POST luxury product catalog item to <code className="text-xs text-[#c5a880]">/api/v1/products</code>
              </CardDescription>
            </div>
          </div>
          <Badge variant="outline" className="border-[#c5a880]/40 text-[#c5a880] font-mono text-[11px]">
            POST /api/v1/products
          </Badge>
        </div>

        {/* TARGET TO CHANGE Callout */}
        <div className="mt-3 p-3 rounded-lg bg-amber-500/10 border border-amber-500/20 text-xs text-amber-600 dark:text-amber-400 space-y-1">
          <span className="font-semibold uppercase tracking-wider block">
            TARGET TO CHANGE (Foreign Key Relations)
          </span>
          <p>
            Spring Boot requires existing records for <code className="bg-amber-500/20 px-1 py-0.5 rounded">brandId</code> and{" "}
            <code className="bg-amber-500/20 px-1 py-0.5 rounded">categoryId</code>. If you have not created brands or
            categories yet, use the Category and Brand forms first, then put their generated IDs here.
          </p>
        </div>
      </CardHeader>

      <form onSubmit={handleSubmit(onSubmit)}>
        <CardContent className="space-y-5 pt-5">
          {/* Notifications */}
          {notification && (
            <div
              className={`p-3.5 rounded-lg text-xs flex items-start gap-2.5 ${
                notification.type === "success"
                  ? "bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400"
                  : "bg-rose-500/10 border border-rose-500/20 text-rose-600 dark:text-rose-400"
              }`}
            >
              {notification.type === "success" ? (
                <CheckCircle2 size={16} className="shrink-0 mt-0.5" />
              ) : (
                <AlertCircle size={16} className="shrink-0 mt-0.5" />
              )}
              <div className="flex-1">
                <p className="font-medium">{notification.text}</p>
                {isSuccess && responseData?.payload && (
                  <pre className="mt-2 p-2 rounded bg-neutral-900 text-neutral-100 text-[11px] overflow-x-auto">
                    {JSON.stringify(responseData.payload, null, 2)}
                  </pre>
                )}
              </div>
            </div>
          )}

          {/* Section 1: Basic Information */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-neutral-500 dark:text-neutral-400">
              1. Basic Information
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="sm:col-span-2 space-y-1">
                <Input
                  id="product-name"
                  label="Product Title *"
                  placeholder="e.g. Royal Oak Tourbillon"
                  error={errors.name?.message}
                  {...register("name")}
                />
              </div>
              <div className="space-y-1">
                <Input
                  id="product-sku"
                  label="SKU Code"
                  placeholder="e.g. RO-41-RG"
                  error={errors.skuCode?.message}
                  {...register("skuCode")}
                />
              </div>
            </div>

            <div className="space-y-1">
              <label htmlFor="product-desc" className="block text-xs font-medium text-neutral-700 dark:text-neutral-300">
                Product Description
              </label>
              <textarea
                id="product-desc"
                rows={3}
                placeholder="Detailed craft specifications, materials, warranty..."
                className="w-full rounded-lg border border-neutral-300 bg-white px-3 py-2 text-sm text-neutral-900 transition-colors focus:border-[#c5a880] focus:outline-none focus:ring-1 focus:ring-[#c5a880] dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-100"
                {...register("descriptions")}
              />
              {errors.descriptions && <p className="text-[11px] text-rose-500">{errors.descriptions.message}</p>}
            </div>
          </div>

          {/* Section 2: Relationships & Classification */}
          <div className="space-y-3 pt-2 border-t border-neutral-100 dark:border-neutral-800/60">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-neutral-500 dark:text-neutral-400">
              2. Taxonomy & Relationships (TARGET TO CHANGE)
            </h4>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="space-y-1">
                <Input
                  id="product-brandId"
                  type="number"
                  label="Brand ID *"
                  placeholder="e.g. 1"
                  error={errors.brandId?.message}
                  {...register("brandId")}
                />
              </div>
              <div className="space-y-1">
                <Input
                  id="product-categoryId"
                  type="number"
                  label="Category ID *"
                  placeholder="e.g. 1"
                  error={errors.categoryId?.message}
                  {...register("categoryId")}
                />
              </div>
              <div className="space-y-1">
                <Select
                  id="product-gender"
                  label="Target Gender *"
                  error={errors.gender?.message}
                  {...register("gender")}
                >
                  <option value="MEN">Men</option>
                  <option value="WOMEN">Women</option>
                  <option value="CHILDREN">Children</option>
                </Select>
              </div>
              <div className="space-y-1">
                <Select
                  id="product-discountType"
                  label="Discount Type"
                  error={errors.discountType?.message}
                  {...register("discountType")}
                >
                  <option value="NONE">None</option>
                  <option value="PERCENTAGE">Percentage (%)</option>
                  <option value="FIXED_AMOUNT">Fixed Amount ($)</option>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <Input
                id="product-supplierId"
                type="number"
                label="Supplier ID (Optional)"
                placeholder="e.g. 1"
                {...register("supplierId")}
              />
              <Input
                id="product-currencyId"
                type="number"
                label="Currency ID (Optional)"
                placeholder="e.g. 1 (USD)"
                {...register("currencyId")}
              />
            </div>
          </div>

          {/* Section 3: Media & Images */}
          <div className="space-y-3 pt-2 border-t border-neutral-100 dark:border-neutral-800/60">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-neutral-500 dark:text-neutral-400">
              3. Visual Assets
            </h4>
            <div className="space-y-2">
              <Input
                id="product-thumbnail"
                label="Thumbnail Image URL"
                placeholder="https://images.unsplash.com/..."
                error={errors.thumbnailUrl?.message}
                {...register("thumbnailUrl")}
              />

              {/* Preview */}
              {watchedThumbnail && (
                <div className="p-2 rounded-lg border border-neutral-200 dark:border-neutral-800 flex items-center gap-3">
                  <div className="w-10 h-10 rounded bg-neutral-200 overflow-hidden shrink-0">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={watchedThumbnail}
                      alt="Product thumbnail"
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        (e.target as HTMLElement).style.display = "none";
                      }}
                    />
                  </div>
                  <p className="text-xs text-neutral-500 truncate">{watchedThumbnail}</p>
                </div>
              )}

              <Input
                id="product-images"
                label="Gallery Image URLs (Comma-separated)"
                placeholder="https://image1.jpg, https://image2.jpg"
                {...register("imageUrlsInput")}
              />
            </div>
          </div>

          {/* Section 4: Status */}
          <div className="flex items-center justify-between p-3 rounded-lg border border-neutral-200 dark:border-neutral-800 bg-neutral-50/50 dark:bg-neutral-900/50">
            <div>
              <p className="text-xs font-medium text-neutral-800 dark:text-neutral-200">Catalog Visibility</p>
              <p className="text-[11px] text-neutral-400">Publish immediately to the luxury store</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" className="sr-only peer" {...register("isActive")} />
              <div className="w-10 h-5 bg-neutral-300 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-neutral-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-[#c5a880] dark:bg-neutral-700"></div>
            </label>
          </div>
        </CardContent>

        <CardFooter className="flex items-center justify-between border-t border-neutral-100 dark:border-neutral-800/60 pt-4">
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={handleFillDraft}
            className="text-xs text-neutral-600 dark:text-neutral-300"
          >
            <Sparkles size={14} className="text-[#c5a880]" />
            Fill Draft Sample
          </Button>

          <div className="flex items-center gap-2">
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={() => {
                reset();
                setNotification(null);
                resetMutation();
              }}
              disabled={isLoading}
            >
              Reset
            </Button>
            <Button
              type="submit"
              variant="gold"
              size="sm"
              disabled={isLoading}
              className="min-w-28"
            >
              {isLoading ? (
                <>
                  <RefreshCw size={14} className="animate-spin" />
                  Posting...
                </>
              ) : (
                <>
                  Create Product
                  <ArrowRight size={14} />
                </>
              )}
            </Button>
          </div>
        </CardFooter>
      </form>
    </Card>
  );
}
