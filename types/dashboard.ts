/**
 * Dashboard TypeScript Interfaces
 * Structured cleanly to easily hook into Redux Toolkit (RTK) slices / RTK Query
 */

export type UserRole = "admin" | "staff" | "stock-controller";

export type OrderType = "online" | "walk-in";
export type OrderStatus = "pending" | "processing" | "completed" | "cancelled" | "rejected";

export interface OrderItem {
  id: string;
  productId: string;
  productName: string;
  sku: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
}

export interface Order {
  id: string;
  orderNumber: string;
  customerName: string;
  customerEmail: string;
  customerPhone?: string;
  orderType: OrderType;
  items: OrderItem[];
  totalAmount: number;
  paymentMethod: "Cash" | "Credit Card" | "Bakong KHQR" | "Bank Transfer";
  status: OrderStatus;
  rejectionReason?: string;
  facilityName: string;
  createdAt: string; // ISO format
  isDeleted: boolean; // Soft delete flag
}

export interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  avatar?: string;
  totalSpent: number;
  ordersCount: number;
  points: number;
  tier: "VIP Royal" | "Gold Atelier" | "Silver" | "Standard";
  status: "active" | "inactive";
  joinedDate: string;
  lastOrderDate: string;
  address?: string;
  isDeleted: boolean; // Soft delete flag
}

export interface Staff {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: "Store Manager" | "Sales Associate" | "Stock Specialist" | "Cashier" | "Inventory Lead";
  department: "Retail Operations" | "Inventory & Logistics" | "Customer Service" | "Management";
  facilityId: string;
  facilityName: string;
  shiftId: string;
  shiftName: string;
  salary: number;
  status: "active" | "on_leave" | "inactive";
  joinedDate: string;
  isDeleted: boolean; // Soft delete flag
}

export interface Shift {
  id: string;
  name: string;
  startTime: string; // e.g. "08:00 AM"
  endTime: string;   // e.g. "04:00 PM"
  daysOfWeek: string[]; // e.g. ["Mon", "Tue", "Wed", "Thu", "Fri"]
  assignedStaffCount: number;
  maxStaff: number;
  facilityName: string;
  isDeleted: boolean; // Soft delete flag
}

export interface StockItem {
  id: string;
  sku: string;
  productName: string;
  category: "Tailoring" | "Knitwear" | "Outerwear" | "Leather Goods" | "Footwear" | "Accessories";
  facilityId: string;
  facilityName: string;
  facilityType: "warehouse" | "branch";
  currentStock: number;
  minStockAlert: number;
  maxCapacity: number;
  unitCost: number;
  sellingPrice: number;
  status: "in_stock" | "low_stock" | "out_of_stock";
  lastRestocked: string;
  isDeleted: boolean; // Soft delete flag
}

export interface Facility {
  id: string;
  name: string;
  type: "warehouse" | "branch";
  address: string;
  city: string;
  contactPhone: string;
  managerName: string;
  totalCapacity: number;
  usedCapacity: number;
  status: "active" | "maintenance" | "inactive";
  createdAt: string;
  isDeleted: boolean; // Soft delete flag
}

export interface Supplier {
  id: string;
  name: string;
  code: string;
  category: "Italian Wool" | "Mongolian Cashmere" | "French Silk" | "Leather Tanneries" | "Packaging & Boxes";
  contactPerson: string;
  email: string;
  phone: string;
  address: string;
  rating: number; // 1-5
  leadTimeDays: number;
  paymentTerms: "Net 30" | "Net 60" | "Immediate" | "Letter of Credit";
  status: "active" | "review" | "inactive";
  isDeleted: boolean; // Soft delete flag
}

export interface FinancialMetric {
  grossRevenue: number;
  netProfit: number;
  operationalCosts: number;
  refunds: number;
  cogs: number;
  profitMarginPercent: number;
  monthlyRevenue: {
    month: string;
    revenue: number;
    expenses: number;
    profit: number;
  }[];
  categoryRevenue: {
    category: string;
    amount: number;
    percentage: number;
  }[];
  recentTransactions: {
    id: string;
    date: string;
    description: string;
    type: "income" | "expense";
    category: string;
    amount: number;
    status: "completed" | "pending";
  }[];
}

export interface Coupon {
  id: string;
  code: string;
  description: string;
  discountType: "percentage" | "fixed";
  discountValue: number; // e.g. 15 for 15% or 50 for $50
  minSpend: number;
  usageCount: number;
  usageLimit: number;
  startDate: string;
  expiryDate: string;
  status: "active" | "expired" | "disabled";
  isDeleted: boolean; // Soft delete flag
}

export interface StockImport {
  id: string;
  poNumber: string;
  supplierId: string;
  supplierName: string;
  destinationFacilityId: string;
  destinationFacilityName: string;
  totalItems: number;
  totalCost: number;
  status: "received" | "inspecting" | "pending" | "cancelled";
  importDate: string;
  notes?: string;
  items: {
    sku: string;
    productName: string;
    quantity: number;
    unitCost: number;
  }[];
  isDeleted: boolean; // Soft delete flag
}

export interface StockTransfer {
  id: string;
  transferCode: string;
  sourceFacilityId: string;
  sourceFacilityName: string;
  destFacilityId: string;
  destFacilityName: string;
  totalItems: number;
  status: "draft" | "dispatched" | "in_transit" | "completed" | "rejected";
  transferDate: string;
  completedDate?: string;
  requestedBy: string;
  notes?: string;
  items: {
    sku: string;
    productName: string;
    quantity: number;
  }[];
  isDeleted: boolean; // Soft delete flag
}
