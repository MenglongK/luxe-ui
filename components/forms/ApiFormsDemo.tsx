"use client";

import React, { useState } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { CategoryForm } from "./CategoryForm";
import { BrandForm } from "./BrandForm";
import { ProductForm } from "./ProductForm";
import { FacilityForm } from "./FacilityForm";
import { Tag, Layers, ShoppingBag, Building2, Server, HelpCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export function ApiFormsDemo() {
  const [activeTab, setActiveTab] = useState("categories");
  const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8080/api/v1";

  return (
    <div className="w-full space-y-6">
      {/* Top Banner / API Architecture Status */}
      <div className="p-5 rounded-2xl border border-neutral-200/80 bg-white dark:border-neutral-800 dark:bg-[#181818] shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="inline-flex h-2.5 w-2.5 rounded-full bg-emerald-500 animate-pulse" />
              <h2 className="text-base font-semibold text-neutral-900 dark:text-neutral-50">
                Redux Toolkit & RTK Query Form Console
              </h2>
            </div>
            <p className="text-xs text-neutral-500 dark:text-neutral-400">
              Post, validate, and dispatch data to <code className="text-[#c5a880] font-mono">{baseUrl}</code> with
              Zod schemas, React Hook Form, and Shadcn UI.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-neutral-100 dark:bg-neutral-800 text-xs font-mono text-neutral-700 dark:text-neutral-300">
              <Server size={14} className="text-[#c5a880]" />
              <span className="font-semibold text-neutral-900 dark:text-neutral-100">API URL:</span> {baseUrl}
            </div>
            <Badge variant="outline" className="border-emerald-500/30 text-emerald-600 dark:text-emerald-400">
              RTK Query Active
            </Badge>
          </div>
        </div>

        {/* Workflow Recommended Order */}
        <div className="mt-4 pt-4 border-t border-neutral-100 dark:border-neutral-800/80">
          <p className="text-[11px] font-semibold uppercase tracking-wider text-neutral-400 mb-2 flex items-center gap-1">
            <HelpCircle size={13} />
            Recommended Post Sequence (Database Dependencies):
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-2 text-xs">
            <div className="p-2 rounded-lg bg-neutral-50 dark:bg-neutral-900/60 border border-neutral-200/60 dark:border-neutral-800/60 flex items-center gap-2">
              <span className="w-5 h-5 rounded-full bg-[#c5a880] text-[#121212] font-bold text-[10px] flex items-center justify-center">1</span>
              <div>
                <p className="font-medium text-neutral-800 dark:text-neutral-200">Category</p>
                <p className="text-[10px] text-neutral-400">Root / Subcategories</p>
              </div>
            </div>
            <div className="p-2 rounded-lg bg-neutral-50 dark:bg-neutral-900/60 border border-neutral-200/60 dark:border-neutral-800/60 flex items-center gap-2">
              <span className="w-5 h-5 rounded-full bg-[#c5a880] text-[#121212] font-bold text-[10px] flex items-center justify-center">2</span>
              <div>
                <p className="font-medium text-neutral-800 dark:text-neutral-200">Brand</p>
                <p className="text-[10px] text-neutral-400">Luxury Brand profile</p>
              </div>
            </div>
            <div className="p-2 rounded-lg bg-neutral-50 dark:bg-neutral-900/60 border border-neutral-200/60 dark:border-neutral-800/60 flex items-center gap-2">
              <span className="w-5 h-5 rounded-full bg-[#c5a880] text-[#121212] font-bold text-[10px] flex items-center justify-center">3</span>
              <div>
                <p className="font-medium text-neutral-800 dark:text-neutral-200">Product</p>
                <p className="text-[10px] text-neutral-400">Uses Category & Brand ID</p>
              </div>
            </div>
            <div className="p-2 rounded-lg bg-neutral-50 dark:bg-neutral-900/60 border border-neutral-200/60 dark:border-neutral-800/60 flex items-center gap-2">
              <span className="w-5 h-5 rounded-full bg-[#c5a880] text-[#121212] font-bold text-[10px] flex items-center justify-center">4</span>
              <div>
                <p className="font-medium text-neutral-800 dark:text-neutral-200">Facility</p>
                <p className="text-[10px] text-neutral-400">Warehouse / Boutique</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs Switcher for each Endpoint */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <div className="flex justify-center sm:justify-start">
          <TabsList className="grid grid-cols-2 sm:grid-cols-4 h-11 w-full max-w-xl">
            <TabsTrigger value="categories" className="gap-2 text-xs">
              <Tag size={15} />
              Category
            </TabsTrigger>
            <TabsTrigger value="brands" className="gap-2 text-xs">
              <Layers size={15} />
              Brand
            </TabsTrigger>
            <TabsTrigger value="products" className="gap-2 text-xs">
              <ShoppingBag size={15} />
              Product
            </TabsTrigger>
            <TabsTrigger value="facilities" className="gap-2 text-xs">
              <Building2 size={15} />
              Facility
            </TabsTrigger>
          </TabsList>
        </div>

        <div className="mt-6">
          <TabsContent value="categories">
            <CategoryForm />
          </TabsContent>

          <TabsContent value="brands">
            <BrandForm />
          </TabsContent>

          <TabsContent value="products">
            <ProductForm />
          </TabsContent>

          <TabsContent value="facilities">
            <FacilityForm />
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
}
