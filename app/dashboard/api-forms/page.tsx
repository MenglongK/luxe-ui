import React from "react";
import { Metadata } from "next";
import { ApiFormsDemo } from "@/components/forms/ApiFormsDemo";

export const metadata: Metadata = {
  title: "API Endpoint Forms | LUXE Admin",
  description: "RTK Query forms for Categories, Brands, Products, and Facilities",
};

export default function ApiFormsPage() {
  return (
    <div className="p-6 max-w-6xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-neutral-900 dark:text-neutral-50">
          API Endpoint Management & Forms
        </h1>
        <p className="text-sm text-neutral-500 dark:text-neutral-400">
          Redux Toolkit (RTK) Query mutation forms integrated with Zod validation, React Hook Form, and Shadcn UI.
        </p>
      </div>

      <ApiFormsDemo />
    </div>
  );
}
