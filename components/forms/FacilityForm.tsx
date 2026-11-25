"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Building2, Sparkles, CheckCircle2, AlertCircle, RefreshCw, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useCreateFacilityMutation } from "@/store/services/facilityApi";
import { FacilityRequest, FacilityType } from "@/types/api";

// ============================================================================
// ZOD VALIDATION SCHEMA
// Aligned with co.istad.corefeature.facility.dto.FacilityRequest & AddressRequest
// ============================================================================
const facilitySchema = z.object({
  code: z
    .string()
    .min(1, "Facility code is required")
    .max(20, "Facility code must not exceed 20 characters")
    .regex(/^[A-Za-z0-9\-_]+$/, "Code can only contain letters, numbers, hyphens, and underscores"),
  name: z.string().min(2, "Facility name must be at least 2 characters"),
  type: z.enum(["WAREHOUSE", "BRANCH"] as const),
  addressLine1: z.string().min(1, "Address Line 1 is required"),
  addressLine2: z.string().optional(),
  city: z.string().min(1, "City is required"),
  province: z.string().min(1, "Province is required"),
  postalCode: z.string().min(1, "Postal code is required"),
  country: z.string().min(1, "Country is required"),
  isActive: z.boolean(),
});

type FacilityFormData = z.infer<typeof facilitySchema>;

export function FacilityForm() {
  const [createFacility, { isLoading, isSuccess, data: responseData, reset: resetMutation }] =
    useCreateFacilityMutation();

  const [notification, setNotification] = useState<{ type: "success" | "error"; text: string } | null>(null);

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm<FacilityFormData>({
    resolver: zodResolver(facilitySchema),
    defaultValues: {
      code: "",
      name: "",
      type: "WAREHOUSE",
      addressLine1: "",
      addressLine2: "",
      city: "",
      province: "",
      postalCode: "",
      country: "",
      isActive: true,
    },
  });

  // TARGET TO CHANGE: Fill sample facility data
  const handleFillDraft = () => {
    // Generate a unique random suffix to prevent code collision when testing repeatedly
    const randomSuffix = Math.floor(100 + Math.random() * 900);
    setValue("code", `WH-PP-${randomSuffix}`);
    setValue("name", "Central Phnom Penh Vault & Logistics");
    setValue("type", "WAREHOUSE");
    setValue("addressLine1", "No. 128, Preah Norodom Blvd");
    setValue("addressLine2", "Suite 400, Luxury Logistics Wing");
    setValue("city", "Phnom Penh");
    setValue("province", "Phnom Penh");
    setValue("postalCode", "12301");
    setValue("country", "Cambodia");
    setValue("isActive", true);
    setNotification(null);
    resetMutation();
  };

  const onSubmit = async (data: FacilityFormData) => {
    setNotification(null);
    try {
      const payload: FacilityRequest = {
        code: data.code,
        name: data.name,
        type: data.type as FacilityType,
        address: {
          addressLine1: data.addressLine1,
          addressLine2: data.addressLine2 || undefined,
          city: data.city,
          province: data.province,
          postalCode: data.postalCode,
          country: data.country,
        },
        isActive: data.isActive,
      };

      const res = await createFacility(payload).unwrap();
      setNotification({
        type: "success",
        text: `Facility "${res.payload?.name || data.name}" (${res.payload?.code || data.code}) registered successfully with ID #${res.payload?.id || "N/A"}!`,
      });
      reset();
    } catch (err: unknown) {
      const errorMsg =
        (err as { data?: { message?: string } })?.data?.message ||
        "Failed to post facility to luxe-api. Verify backend status and ensure the facility code is unique.";
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
              <Building2 size={20} />
            </div>
            <div>
              <CardTitle className="text-lg">Create Facility</CardTitle>
              <CardDescription>
                POST logistics node to <code className="text-xs text-[#c5a880]">/api/v1/facilities</code>
              </CardDescription>
            </div>
          </div>
          <Badge variant="outline" className="border-[#c5a880]/40 text-[#c5a880] font-mono text-[11px]">
            POST /api/v1/facilities
          </Badge>
        </div>

        {/* TARGET TO CHANGE Notice */}
        <div className="mt-3 p-3 rounded-lg bg-amber-500/10 border border-amber-500/20 text-xs text-amber-600 dark:text-amber-400">
          <span className="font-semibold uppercase tracking-wider block mb-0.5">
            TARGET TO CHANGE (Unique Facility Code)
          </span>
          The backend enforces unique facility codes. Supported types in luxe-api are{" "}
          <code className="bg-amber-500/20 px-1 py-0.5 rounded">WAREHOUSE</code> and{" "}
          <code className="bg-amber-500/20 px-1 py-0.5 rounded">BRANCH</code>.
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

          {/* Code, Name & Type */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="space-y-1">
              <Input
                id="facility-code"
                label="Facility Code *"
                placeholder="e.g. WH-PP-01"
                error={errors.code?.message}
                {...register("code")}
              />
            </div>
            <div className="space-y-1">
              <Input
                id="facility-name"
                label="Facility Name *"
                placeholder="e.g. Phnom Penh Central"
                error={errors.name?.message}
                {...register("name")}
              />
            </div>
            <div className="space-y-1">
              <Select
                id="facility-type"
                label="Facility Type *"
                error={errors.type?.message}
                {...register("type")}
              >
                <option value="WAREHOUSE">Warehouse</option>
                <option value="BRANCH">Boutique Branch</option>
              </Select>
            </div>
          </div>

          {/* Address Details */}
          <div className="space-y-3 pt-2 border-t border-neutral-100 dark:border-neutral-800/60">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-neutral-500 dark:text-neutral-400">
              Address Information
            </h4>
            <div className="space-y-2">
              <Input
                id="facility-address1"
                label="Address Line 1 *"
                placeholder="Street address or P.O. Box"
                error={errors.addressLine1?.message}
                {...register("addressLine1")}
              />
              <Input
                id="facility-address2"
                label="Address Line 2 (Optional)"
                placeholder="Suite, unit, building, floor"
                error={errors.addressLine2?.message}
                {...register("addressLine2")}
              />
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <Input
                id="facility-city"
                label="City *"
                placeholder="Phnom Penh"
                error={errors.city?.message}
                {...register("city")}
              />
              <Input
                id="facility-province"
                label="Province *"
                placeholder="Phnom Penh"
                error={errors.province?.message}
                {...register("province")}
              />
              <Input
                id="facility-postal"
                label="Postal Code *"
                placeholder="12000"
                error={errors.postalCode?.message}
                {...register("postalCode")}
              />
              <Input
                id="facility-country"
                label="Country *"
                placeholder="Cambodia"
                error={errors.country?.message}
                {...register("country")}
              />
            </div>
          </div>

          {/* Is Active Toggle */}
          <div className="flex items-center justify-between p-3 rounded-lg border border-neutral-200 dark:border-neutral-800 bg-neutral-50/50 dark:bg-neutral-900/50">
            <div>
              <p className="text-xs font-medium text-neutral-800 dark:text-neutral-200">Facility Operational Status</p>
              <p className="text-[11px] text-neutral-400">Enable inventory assignments and stock transfers to this node</p>
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
                  Create Facility
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
