"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Tag, Sparkles, CheckCircle2, AlertCircle, RefreshCw, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useCreateCategoryMutation } from "@/store/services/categoryApi";
import { CategoryRequest } from "@/types/api";

// ============================================================================
// ZOD VALIDATION SCHEMA
// Aligned with co.istad.corefeature.category.dto.CategoryRequest
// ============================================================================
const categorySchema = z.object({
  name: z
    .string()
    .min(2, "Category name must be at least 2 characters")
    .max(50, "Category name must not exceed 50 characters")
    .regex(
      /^[a-zA-Z0-9\s\-_&]+$/,
      "Category name can only contain letters, numbers, spaces, hyphens, underscores, and ampersands (&)"
    ),
  parentId: z.string().optional(),
  isActive: z.boolean(),
});

type CategoryFormData = z.infer<typeof categorySchema>;

export function CategoryForm() {
  const [createCategory, { isLoading, isSuccess, data: responseData, reset: resetMutation }] =
    useCreateCategoryMutation();

  const [notification, setNotification] = useState<{ type: "success" | "error"; text: string } | null>(null);

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm<CategoryFormData>({
    resolver: zodResolver(categorySchema),
    defaultValues: {
      name: "",
      parentId: "",
      isActive: true,
    },
  });

  // TARGET TO CHANGE: Pre-fill draft values for rapid testing before API has live data
  const handleFillDraft = () => {
    setValue("name", "Haute Horlogerie & Timepieces");
    setValue("parentId", ""); // TARGET TO CHANGE: Set to existing ID (e.g. "1") once parent categories exist
    setValue("isActive", true);
    setNotification(null);
    resetMutation();
  };

  const onSubmit = async (data: CategoryFormData) => {
    setNotification(null);
    try {
      const payload: CategoryRequest = {
        name: data.name,
        parentId: data.parentId && data.parentId.trim() !== "" ? Number(data.parentId) : null,
        isActive: data.isActive,
      };

      const res = await createCategory(payload).unwrap();
      setNotification({
        type: "success",
        text: `Category "${res.payload?.name || data.name}" created successfully with ID #${res.payload?.id || "N/A"}!`,
      });
      reset();
    } catch (err: unknown) {
      const errorMsg =
        (err as { data?: { message?: string } })?.data?.message ||
        "Failed to post category to luxe-api. Verify that backend is running at http://localhost:8080.";
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
              <Tag size={20} />
            </div>
            <div>
              <CardTitle className="text-lg">Create Category</CardTitle>
              <CardDescription>
                POST new luxury category node to <code className="text-xs text-[#c5a880]">/api/v1/categories</code>
              </CardDescription>
            </div>
          </div>
          <Badge variant="outline" className="border-[#c5a880]/40 text-[#c5a880] font-mono text-[11px]">
            POST /api/v1/categories
          </Badge>
        </div>

        {/* TARGET TO CHANGE Notice */}
        <div className="mt-3 p-3 rounded-lg bg-amber-500/10 border border-amber-500/20 text-xs text-amber-600 dark:text-amber-400">
          <span className="font-semibold uppercase tracking-wider block mb-0.5">
            TARGET TO CHANGE (Draft Mode)
          </span>
          Categories form will submit to your Spring Boot API. When parent categories are seeded in the database,
          specify a valid <code className="bg-amber-500/20 px-1 py-0.5 rounded">parentId</code> to create nested subcategories.
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

          {/* Name Field */}
          <div className="space-y-1">
            <Input
              id="category-name"
              label="Category Name *"
              placeholder="e.g. Haute Horlogerie, Fine Leather, Silk Scarves"
              error={errors.name?.message}
              {...register("name")}
            />
            <p className="text-[11px] text-neutral-400 dark:text-neutral-500">
              Letters, numbers, spaces, hyphens, and ampersands (&) allowed (2-50 chars).
            </p>
          </div>

          {/* Parent ID Field */}
          <div className="space-y-1">
            <Input
              id="category-parentId"
              type="number"
              label="Parent Category ID (Optional)"
              placeholder="Leave blank for Root category, or enter parent ID (e.g. 1)"
              error={errors.parentId?.message}
              {...register("parentId")}
            />
            <p className="text-[11px] text-neutral-400 dark:text-neutral-500">
              {/* TARGET TO CHANGE NOTE */}
              TARGET TO CHANGE: Provide parent category ID once parent categories exist in database.
            </p>
          </div>

          {/* Is Active Toggle */}
          <div className="flex items-center justify-between p-3 rounded-lg border border-neutral-200 dark:border-neutral-800 bg-neutral-50/50 dark:bg-neutral-900/50">
            <div>
              <p className="text-xs font-medium text-neutral-800 dark:text-neutral-200">Category Active Status</p>
              <p className="text-[11px] text-neutral-400">Make this category visible in the storefront</p>
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
                  Create Category
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
