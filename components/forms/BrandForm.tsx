"use client";

import React, { useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Layers, Sparkles, CheckCircle2, AlertCircle, RefreshCw, ArrowRight, Image as ImageIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useCreateBrandMutation } from "@/store/services/brandApi";
import { BrandRequest } from "@/types/api";

// ============================================================================
// ZOD VALIDATION SCHEMA
// Aligned with co.istad.corefeature.brand.dto.BrandRequest
// ============================================================================
const brandSchema = z.object({
  name: z
    .string()
    .min(2, "Brand name must be at least 2 characters")
    .max(100, "Brand name must not exceed 100 characters")
    .regex(
      /^[a-zA-Z0-9\s\-_&]+$/,
      "Brand name can only contain letters, numbers, spaces, hyphens, underscores, and ampersands (&)"
    ),
  logoUrl: z
    .string()
    .min(1, "Logo URL is required")
    .max(2048, "Logo URL is too long (max 2048 characters)"),
  isActive: z.boolean(),
});

type BrandFormData = z.infer<typeof brandSchema>;

export function BrandForm() {
  const [createBrand, { isLoading, isSuccess, data: responseData, reset: resetMutation }] =
    useCreateBrandMutation();

  const [notification, setNotification] = useState<{ type: "success" | "error"; text: string } | null>(null);

  const {
    register,
    handleSubmit,
    control,
    setValue,
    reset,
    formState: { errors },
  } = useForm<BrandFormData>({
    resolver: zodResolver(brandSchema),
    defaultValues: {
      name: "",
      logoUrl: "",
      isActive: true,
    },
  });

  const watchedLogoUrl = useWatch({ control, name: "logoUrl" });

  // TARGET TO CHANGE: Fill sample luxury brand draft values
  const handleFillDraft = () => {
    setValue("name", "Audemars Piguet");
    setValue("logoUrl", "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=400&q=80");
    setValue("isActive", true);
    setNotification(null);
    resetMutation();
  };

  const onSubmit = async (data: BrandFormData) => {
    setNotification(null);
    try {
      const payload: BrandRequest = {
        name: data.name,
        logoUrl: data.logoUrl,
        isActive: data.isActive,
      };

      const res = await createBrand(payload).unwrap();
      setNotification({
        type: "success",
        text: `Brand "${res.payload?.name || data.name}" created successfully with ID #${res.payload?.id || "N/A"}!`,
      });
      reset();
    } catch (err: unknown) {
      const errorMsg =
        (err as { data?: { message?: string } })?.data?.message ||
        "Failed to post brand to luxe-api. Verify backend status at http://localhost:8080.";
      setNotification({
        type: "error",
        text: errorMsg,
      });
    }
  };

  return (
    <Card className="max-w-2xl mx-auto shadow-md border-neutral-200 dark:border-neutral-800">
      <CardHeader className="border-b border-neutral-100 dark:border-neutral-800/60 pb-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-lg bg-[#c5a880]/15 text-[#c5a880]">
              <Layers size={20} />
            </div>
            <div>
              <CardTitle className="text-lg">Create Brand</CardTitle>
              <CardDescription>
                POST luxury brand profile to <code className="text-xs text-[#c5a880]">/api/v1/brands</code>
              </CardDescription>
            </div>
          </div>
          <Badge variant="outline" className="border-[#c5a880]/40 text-[#c5a880] font-mono text-[11px]">
            POST /api/v1/brands
          </Badge>
        </div>

        {/* TARGET TO CHANGE Notice */}
        <div className="mt-3 p-3 rounded-lg bg-amber-500/10 border border-amber-500/20 text-xs text-amber-600 dark:text-amber-400">
          <span className="font-semibold uppercase tracking-wider block mb-0.5">
            TARGET TO CHANGE (Draft Mode)
          </span>
          Brand creation requires a valid URL for <code className="bg-amber-500/20 px-1 py-0.5 rounded">logoUrl</code>.
          Once created, keep note of the returned Brand ID to associate products to this brand.
        </div>
      </CardHeader>

      <form onSubmit={handleSubmit(onSubmit)}>
        <CardContent className="space-y-4 pt-5">
          {/* Status Notifications */}
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

          {/* Brand Name */}
          <div className="space-y-1">
            <Input
              id="brand-name"
              label="Brand Name *"
              placeholder="e.g. Rolex, Cartier, Hermès, Patek Philippe"
              error={errors.name?.message}
              {...register("name")}
            />
            <p className="text-[11px] text-neutral-400 dark:text-neutral-500">
              Only alphanumeric, spaces, hyphens, and ampersands are permitted.
            </p>
          </div>

          {/* Logo URL with Live Preview */}
          <div className="space-y-2">
            <Input
              id="brand-logoUrl"
              label="Logo URL *"
              placeholder="https://images.unsplash.com/..."
              error={errors.logoUrl?.message}
              {...register("logoUrl")}
            />

            {/* Live Preview Box */}
            <div className="p-3 rounded-lg border border-neutral-200 dark:border-neutral-800 bg-neutral-50/50 dark:bg-neutral-900/50 flex items-center gap-3">
              <div className="w-12 h-12 rounded-lg bg-neutral-200 dark:bg-neutral-800 flex items-center justify-center overflow-hidden shrink-0 border border-neutral-300 dark:border-neutral-700">
                {watchedLogoUrl ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={watchedLogoUrl}
                    alt="Logo preview"
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      (e.target as HTMLElement).style.display = "none";
                    }}
                  />
                ) : (
                  <ImageIcon size={20} className="text-neutral-400" />
                )}
              </div>
              <div className="text-xs text-neutral-500">
                <p className="font-medium text-neutral-700 dark:text-neutral-300">Logo Thumbnail Preview</p>
                <p className="text-[11px] text-neutral-400">
                  {watchedLogoUrl ? "Image loaded from provided URL" : "Enter a valid URL above to preview brand emblem"}
                </p>
              </div>
            </div>
          </div>

          {/* Is Active Toggle */}
          <div className="flex items-center justify-between p-3 rounded-lg border border-neutral-200 dark:border-neutral-800 bg-neutral-50/50 dark:bg-neutral-900/50">
            <div>
              <p className="text-xs font-medium text-neutral-800 dark:text-neutral-200">Brand Active Status</p>
              <p className="text-[11px] text-neutral-400">Active brands will be displayed in catalogs and filters</p>
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
                  Create Brand
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
