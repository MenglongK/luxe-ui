"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";
import {
  UserRole,
  Order,
  Customer,
  Staff,
  Shift,
  StockItem,
  Facility,
  Supplier,
  FinancialMetric,
  Coupon,
  StockImport,
  StockTransfer,
  OrderStatus,
} from "@/types/dashboard";
import {
  initialOrders,
  initialCustomers,
  initialStaff,
  initialShifts,
  initialStockItems,
  initialFacilities,
  initialSuppliers,
  initialCoupons,
  initialStockImports,
  initialStockTransfers,
  mockFinancialMetric,
} from "@/data/dashboardMockData";

interface DashboardContextType {
  // Role
  currentRole: UserRole;
  setCurrentRole: (role: UserRole) => void;

  // Search & Filter globals
  searchQuery: string;
  setSearchQuery: (query: string) => void;

  // Orders CRUD
  orders: Order[];
  addOrder: (order: Omit<Order, "id" | "orderNumber" | "createdAt" | "isDeleted">) => void;
  updateOrderStatus: (id: string, status: OrderStatus, reason?: string) => void;
  softDeleteOrder: (id: string) => void;
  permanentDeleteOrder: (id: string) => void;
  restoreOrder: (id: string) => void;

  // Customers CRUD
  customers: Customer[];
  addCustomer: (customer: Omit<Customer, "id" | "joinedDate" | "isDeleted">) => void;
  updateCustomer: (id: string, data: Partial<Customer>) => void;
  softDeleteCustomer: (id: string) => void;
  permanentDeleteCustomer: (id: string) => void;
  restoreCustomer: (id: string) => void;

  // Staff CRUD
  staffList: Staff[];
  addStaff: (staff: Omit<Staff, "id" | "joinedDate" | "isDeleted">) => void;
  updateStaff: (id: string, data: Partial<Staff>) => void;
  assignShiftToStaff: (staffId: string, shiftId: string, shiftName: string) => void;
  softDeleteStaff: (id: string) => void;
  permanentDeleteStaff: (id: string) => void;
  restoreStaff: (id: string) => void;

  // Shifts CRUD
  shifts: Shift[];
  addShift: (shift: Omit<Shift, "id" | "assignedStaffCount" | "isDeleted">) => void;
  updateShift: (id: string, data: Partial<Shift>) => void;
  softDeleteShift: (id: string) => void;
  permanentDeleteShift: (id: string) => void;
  restoreShift: (id: string) => void;

  // Stock Items
  stockItems: StockItem[];
  addStockItem: (item: Omit<StockItem, "id" | "lastRestocked" | "isDeleted">) => void;
  updateStockItem: (id: string, data: Partial<StockItem>) => void;
  softDeleteStockItem: (id: string) => void;
  permanentDeleteStockItem: (id: string) => void;
  restoreStockItem: (id: string) => void;

  // Facilities CRUD
  facilities: Facility[];
  addFacility: (facility: Omit<Facility, "id" | "createdAt" | "isDeleted">) => void;
  updateFacility: (id: string, data: Partial<Facility>) => void;
  softDeleteFacility: (id: string) => void;
  permanentDeleteFacility: (id: string) => void;
  restoreFacility: (id: string) => void;

  // Suppliers CRUD
  suppliers: Supplier[];
  addSupplier: (supplier: Omit<Supplier, "id" | "isDeleted">) => void;
  updateSupplier: (id: string, data: Partial<Supplier>) => void;
  softDeleteSupplier: (id: string) => void;
  permanentDeleteSupplier: (id: string) => void;
  restoreSupplier: (id: string) => void;

  // Financial
  financialMetric: FinancialMetric;

  // Coupons CRUD
  coupons: Coupon[];
  addCoupon: (coupon: Omit<Coupon, "id" | "usageCount" | "isDeleted">) => void;
  updateCoupon: (id: string, data: Partial<Coupon>) => void;
  softDeleteCoupon: (id: string) => void;
  permanentDeleteCoupon: (id: string) => void;
  restoreCoupon: (id: string) => void;

  // Stock Imports CRUD
  stockImports: StockImport[];
  addStockImport: (item: Omit<StockImport, "id" | "isDeleted">) => void;
  updateStockImport: (id: string, data: Partial<StockImport>) => void;
  softDeleteStockImport: (id: string) => void;
  permanentDeleteStockImport: (id: string) => void;
  restoreStockImport: (id: string) => void;

  // Stock Transfers CRUD
  stockTransfers: StockTransfer[];
  addStockTransfer: (transfer: Omit<StockTransfer, "id" | "isDeleted">) => void;
  updateStockTransferStatus: (id: string, status: StockTransfer["status"]) => void;
  softDeleteStockTransfer: (id: string) => void;
  permanentDeleteStockTransfer: (id: string) => void;
  restoreStockTransfer: (id: string) => void;
}

const DashboardContext = createContext<DashboardContextType | undefined>(undefined);

export function DashboardProvider({ children }: { children: ReactNode }) {
  const [currentRole, setCurrentRole] = useState<UserRole>("admin");
  const [searchQuery, setSearchQuery] = useState("");

  const [orders, setOrders] = useState<Order[]>(initialOrders);
  const [customers, setCustomers] = useState<Customer[]>(initialCustomers);
  const [staffList, setStaffList] = useState<Staff[]>(initialStaff);
  const [shifts, setShifts] = useState<Shift[]>(initialShifts);
  const [stockItems, setStockItems] = useState<StockItem[]>(initialStockItems);
  const [facilities, setFacilities] = useState<Facility[]>(initialFacilities);
  const [suppliers, setSuppliers] = useState<Supplier[]>(initialSuppliers);
  const [coupons, setCoupons] = useState<Coupon[]>(initialCoupons);
  const [stockImports, setStockImports] = useState<StockImport[]>(initialStockImports);
  const [stockTransfers, setStockTransfers] = useState<StockTransfer[]>(initialStockTransfers);
  const [financialMetric] = useState<FinancialMetric>(mockFinancialMetric);

  // === ORDERS ACTIONS ===
  const addOrder = (orderData: Omit<Order, "id" | "orderNumber" | "createdAt" | "isDeleted">) => {
    const newOrder: Order = {
      ...orderData,
      id: `ord-${Date.now()}`,
      orderNumber: `LX-${Math.floor(10000 + Math.random() * 90000)}`,
      createdAt: new Date().toISOString(),
      isDeleted: false,
    };
    setOrders((prev) => [newOrder, ...prev]);
  };

  const updateOrderStatus = (id: string, status: OrderStatus, reason?: string) => {
    setOrders((prev) =>
      prev.map((ord) => (ord.id === id ? { ...ord, status, ...(reason ? { rejectionReason: reason } : {}) } : ord))
    );
  };

  const softDeleteOrder = (id: string) => {
    setOrders((prev) => prev.map((ord) => (ord.id === id ? { ...ord, isDeleted: true } : ord)));
  };

  const permanentDeleteOrder = (id: string) => {
    setOrders((prev) => prev.filter((ord) => ord.id !== id));
  };

  const restoreOrder = (id: string) => {
    setOrders((prev) => prev.map((ord) => (ord.id === id ? { ...ord, isDeleted: false } : ord)));
  };

  // === CUSTOMERS ACTIONS ===
  const addCustomer = (data: Omit<Customer, "id" | "joinedDate" | "isDeleted">) => {
    const newCustomer: Customer = {
      ...data,
      id: `cust-${Date.now()}`,
      joinedDate: new Date().toISOString().split("T")[0],
      isDeleted: false,
    };
    setCustomers((prev) => [newCustomer, ...prev]);
  };

  const updateCustomer = (id: string, data: Partial<Customer>) => {
    setCustomers((prev) => prev.map((c) => (c.id === id ? { ...c, ...data } : c)));
  };

  const softDeleteCustomer = (id: string) => {
    setCustomers((prev) => prev.map((c) => (c.id === id ? { ...c, isDeleted: true } : c)));
  };

  const permanentDeleteCustomer = (id: string) => {
    setCustomers((prev) => prev.filter((c) => c.id !== id));
  };

  const restoreCustomer = (id: string) => {
    setCustomers((prev) => prev.map((c) => (c.id === id ? { ...c, isDeleted: false } : c)));
  };

  // === STAFF ACTIONS ===
  const addStaff = (data: Omit<Staff, "id" | "joinedDate" | "isDeleted">) => {
    const newStaff: Staff = {
      ...data,
      id: `stf-${Date.now()}`,
      joinedDate: new Date().toISOString().split("T")[0],
      isDeleted: false,
    };
    setStaffList((prev) => [newStaff, ...prev]);
  };

  const updateStaff = (id: string, data: Partial<Staff>) => {
    setStaffList((prev) => prev.map((s) => (s.id === id ? { ...s, ...data } : s)));
  };

  const assignShiftToStaff = (staffId: string, shiftId: string, shiftName: string) => {
    setStaffList((prev) =>
      prev.map((s) => (s.id === staffId ? { ...s, shiftId, shiftName } : s))
    );
  };

  const softDeleteStaff = (id: string) => {
    setStaffList((prev) => prev.map((s) => (s.id === id ? { ...s, isDeleted: true } : s)));
  };

  const permanentDeleteStaff = (id: string) => {
    setStaffList((prev) => prev.filter((s) => s.id !== id));
  };

  const restoreStaff = (id: string) => {
    setStaffList((prev) => prev.map((s) => (s.id === id ? { ...s, isDeleted: false } : s)));
  };

  // === SHIFTS ACTIONS ===
  const addShift = (data: Omit<Shift, "id" | "assignedStaffCount" | "isDeleted">) => {
    const newShift: Shift = {
      ...data,
      id: `shf-${Date.now()}`,
      assignedStaffCount: 0,
      isDeleted: false,
    };
    setShifts((prev) => [newShift, ...prev]);
  };

  const updateShift = (id: string, data: Partial<Shift>) => {
    setShifts((prev) => prev.map((sh) => (sh.id === id ? { ...sh, ...data } : sh)));
  };

  const softDeleteShift = (id: string) => {
    setShifts((prev) => prev.map((sh) => (sh.id === id ? { ...sh, isDeleted: true } : sh)));
  };

  const permanentDeleteShift = (id: string) => {
    setShifts((prev) => prev.filter((sh) => sh.id !== id));
  };

  const restoreShift = (id: string) => {
    setShifts((prev) => prev.map((sh) => (sh.id === id ? { ...sh, isDeleted: false } : sh)));
  };

  // === STOCK ITEMS ACTIONS ===
  const addStockItem = (data: Omit<StockItem, "id" | "lastRestocked" | "isDeleted">) => {
    const newItem: StockItem = {
      ...data,
      id: `stk-${Date.now()}`,
      lastRestocked: new Date().toISOString().split("T")[0],
      isDeleted: false,
    };
    setStockItems((prev) => [newItem, ...prev]);
  };

  const updateStockItem = (id: string, data: Partial<StockItem>) => {
    setStockItems((prev) => prev.map((item) => (item.id === id ? { ...item, ...data } : item)));
  };

  const softDeleteStockItem = (id: string) => {
    setStockItems((prev) => prev.map((item) => (item.id === id ? { ...item, isDeleted: true } : item)));
  };

  const permanentDeleteStockItem = (id: string) => {
    setStockItems((prev) => prev.filter((item) => item.id !== id));
  };

  const restoreStockItem = (id: string) => {
    setStockItems((prev) => prev.map((item) => (item.id === id ? { ...item, isDeleted: false } : item)));
  };

  // === FACILITIES ACTIONS ===
  const addFacility = (data: Omit<Facility, "id" | "createdAt" | "isDeleted">) => {
    const newFacility: Facility = {
      ...data,
      id: `fac-${Date.now()}`,
      createdAt: new Date().toISOString().split("T")[0],
      isDeleted: false,
    };
    setFacilities((prev) => [newFacility, ...prev]);
  };

  const updateFacility = (id: string, data: Partial<Facility>) => {
    setFacilities((prev) => prev.map((f) => (f.id === id ? { ...f, ...data } : f)));
  };

  const softDeleteFacility = (id: string) => {
    setFacilities((prev) => prev.map((f) => (f.id === id ? { ...f, isDeleted: true } : f)));
  };

  const permanentDeleteFacility = (id: string) => {
    setFacilities((prev) => prev.filter((f) => f.id !== id));
  };

  const restoreFacility = (id: string) => {
    setFacilities((prev) => prev.map((f) => (f.id === id ? { ...f, isDeleted: false } : f)));
  };

  // === SUPPLIERS ACTIONS ===
  const addSupplier = (data: Omit<Supplier, "id" | "isDeleted">) => {
    const newSupplier: Supplier = {
      ...data,
      id: `sup-${Date.now()}`,
      isDeleted: false,
    };
    setSuppliers((prev) => [newSupplier, ...prev]);
  };

  const updateSupplier = (id: string, data: Partial<Supplier>) => {
    setSuppliers((prev) => prev.map((s) => (s.id === id ? { ...s, ...data } : s)));
  };

  const softDeleteSupplier = (id: string) => {
    setSuppliers((prev) => prev.map((s) => (s.id === id ? { ...s, isDeleted: true } : s)));
  };

  const permanentDeleteSupplier = (id: string) => {
    setSuppliers((prev) => prev.filter((s) => s.id !== id));
  };

  const restoreSupplier = (id: string) => {
    setSuppliers((prev) => prev.map((s) => (s.id === id ? { ...s, isDeleted: false } : s)));
  };

  // === COUPONS ACTIONS ===
  const addCoupon = (data: Omit<Coupon, "id" | "usageCount" | "isDeleted">) => {
    const newCoupon: Coupon = {
      ...data,
      id: `cpn-${Date.now()}`,
      usageCount: 0,
      isDeleted: false,
    };
    setCoupons((prev) => [newCoupon, ...prev]);
  };

  const updateCoupon = (id: string, data: Partial<Coupon>) => {
    setCoupons((prev) => prev.map((cp) => (cp.id === id ? { ...cp, ...data } : cp)));
  };

  const softDeleteCoupon = (id: string) => {
    setCoupons((prev) => prev.map((cp) => (cp.id === id ? { ...cp, isDeleted: true } : cp)));
  };

  const permanentDeleteCoupon = (id: string) => {
    setCoupons((prev) => prev.filter((cp) => cp.id !== id));
  };

  const restoreCoupon = (id: string) => {
    setCoupons((prev) => prev.map((cp) => (cp.id === id ? { ...cp, isDeleted: false } : cp)));
  };

  // === STOCK IMPORTS ACTIONS ===
  const addStockImport = (data: Omit<StockImport, "id" | "isDeleted">) => {
    const newImport: StockImport = {
      ...data,
      id: `imp-${Date.now()}`,
      isDeleted: false,
    };
    setStockImports((prev) => [newImport, ...prev]);
  };

  const updateStockImport = (id: string, data: Partial<StockImport>) => {
    setStockImports((prev) => prev.map((item) => (item.id === id ? { ...item, ...data } : item)));
  };

  const softDeleteStockImport = (id: string) => {
    setStockImports((prev) => prev.map((item) => (item.id === id ? { ...item, isDeleted: true } : item)));
  };

  const permanentDeleteStockImport = (id: string) => {
    setStockImports((prev) => prev.filter((item) => item.id !== id));
  };

  const restoreStockImport = (id: string) => {
    setStockImports((prev) => prev.map((item) => (item.id === id ? { ...item, isDeleted: false } : item)));
  };

  // === STOCK TRANSFERS ACTIONS ===
  const addStockTransfer = (data: Omit<StockTransfer, "id" | "isDeleted">) => {
    const newTransfer: StockTransfer = {
      ...data,
      id: `trf-${Date.now()}`,
      isDeleted: false,
    };
    setStockTransfers((prev) => [newTransfer, ...prev]);
  };

  const updateStockTransferStatus = (id: string, status: StockTransfer["status"]) => {
    setStockTransfers((prev) =>
      prev.map((t) =>
        t.id === id
          ? {
              ...t,
              status,
              ...(status === "completed" ? { completedDate: new Date().toISOString().split("T")[0] } : {}),
            }
          : t
      )
    );
  };

  const softDeleteStockTransfer = (id: string) => {
    setStockTransfers((prev) => prev.map((t) => (t.id === id ? { ...t, isDeleted: true } : t)));
  };

  const permanentDeleteStockTransfer = (id: string) => {
    setStockTransfers((prev) => prev.filter((t) => t.id !== id));
  };

  const restoreStockTransfer = (id: string) => {
    setStockTransfers((prev) => prev.map((t) => (t.id === id ? { ...t, isDeleted: false } : t)));
  };

  return (
    <DashboardContext.Provider
      value={{
        currentRole,
        setCurrentRole,
        searchQuery,
        setSearchQuery,
        orders,
        addOrder,
        updateOrderStatus,
        softDeleteOrder,
        permanentDeleteOrder,
        restoreOrder,
        customers,
        addCustomer,
        updateCustomer,
        softDeleteCustomer,
        permanentDeleteCustomer,
        restoreCustomer,
        staffList,
        addStaff,
        updateStaff,
        assignShiftToStaff,
        softDeleteStaff,
        permanentDeleteStaff,
        restoreStaff,
        shifts,
        addShift,
        updateShift,
        softDeleteShift,
        permanentDeleteShift,
        restoreShift,
        stockItems,
        addStockItem,
        updateStockItem,
        softDeleteStockItem,
        permanentDeleteStockItem,
        restoreStockItem,
        facilities,
        addFacility,
        updateFacility,
        softDeleteFacility,
        permanentDeleteFacility,
        restoreFacility,
        suppliers,
        addSupplier,
        updateSupplier,
        softDeleteSupplier,
        permanentDeleteSupplier,
        restoreSupplier,
        financialMetric,
        coupons,
        addCoupon,
        updateCoupon,
        softDeleteCoupon,
        permanentDeleteCoupon,
        restoreCoupon,
        stockImports,
        addStockImport,
        updateStockImport,
        softDeleteStockImport,
        permanentDeleteStockImport,
        restoreStockImport,
        stockTransfers,
        addStockTransfer,
        updateStockTransferStatus,
        softDeleteStockTransfer,
        permanentDeleteStockTransfer,
        restoreStockTransfer,
      }}
    >
      {children}
    </DashboardContext.Provider>
  );
}

export function useDashboard() {
  const context = useContext(DashboardContext);
  if (!context) {
    throw new Error("useDashboard must be used within a DashboardProvider");
  }
  return context;
}
