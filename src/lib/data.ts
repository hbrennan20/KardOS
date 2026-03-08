// Mock data for Kard Engineering & Supplies Limited - KardOS

// ─── Customers ────────────────────────────────────────────
export const customers = [
  { id: "C001", name: "Abbott Ireland", sector: "Pharmaceuticals", creditLimit: 50000, outstandingBalance: 12340, lastOrderDate: "2026-03-06", lifetimeValue: 487200, avgOrderValue: 2850, status: "active" },
  { id: "C002", name: "Valeo Foods", sector: "Food Processing", creditLimit: 40000, outstandingBalance: 8750, lastOrderDate: "2026-03-07", lifetimeValue: 392100, avgOrderValue: 3200, status: "active" },
  { id: "C003", name: "Kingspan Group", sector: "Construction", creditLimit: 60000, outstandingBalance: 15200, lastOrderDate: "2026-03-05", lifetimeValue: 621000, avgOrderValue: 4100, status: "active" },
  { id: "C004", name: "Kepak Group", sector: "Food Processing", creditLimit: 35000, outstandingBalance: 4320, lastOrderDate: "2026-03-04", lifetimeValue: 278500, avgOrderValue: 1950, status: "active" },
  { id: "C005", name: "WaterWipes", sector: "Healthcare", creditLimit: 25000, outstandingBalance: 6100, lastOrderDate: "2026-02-28", lifetimeValue: 156800, avgOrderValue: 2100, status: "active" },
  { id: "C006", name: "Stafford Engineering", sector: "Manufacturing", creditLimit: 30000, outstandingBalance: 9870, lastOrderDate: "2026-03-07", lifetimeValue: 345600, avgOrderValue: 2750, status: "active" },
  { id: "C007", name: "Mercury Engineering", sector: "Construction", creditLimit: 45000, outstandingBalance: 18400, lastOrderDate: "2026-03-03", lifetimeValue: 534200, avgOrderValue: 3800, status: "active" },
  { id: "C008", name: "Dawn Meats", sector: "Food Processing", creditLimit: 30000, outstandingBalance: 2100, lastOrderDate: "2026-01-15", lifetimeValue: 89400, avgOrderValue: 1600, status: "dormant" },
  { id: "C009", name: "Glanbia", sector: "Food Processing", creditLimit: 55000, outstandingBalance: 11200, lastOrderDate: "2026-03-06", lifetimeValue: 412300, avgOrderValue: 3400, status: "active" },
  { id: "C010", name: "Irish Distillers", sector: "Food Processing", creditLimit: 35000, outstandingBalance: 7650, lastOrderDate: "2026-03-01", lifetimeValue: 267800, avgOrderValue: 2200, status: "active" },
  { id: "C011", name: "Boston Scientific", sector: "Healthcare", creditLimit: 50000, outstandingBalance: 14100, lastOrderDate: "2026-03-07", lifetimeValue: 498700, avgOrderValue: 3600, status: "active" },
  { id: "C012", name: "CRH plc", sector: "Construction", creditLimit: 70000, outstandingBalance: 22300, lastOrderDate: "2026-03-05", lifetimeValue: 712000, avgOrderValue: 5200, status: "active" },
  { id: "C013", name: "Kerry Group", sector: "Food Processing", creditLimit: 45000, outstandingBalance: 0, lastOrderDate: "2025-10-12", lifetimeValue: 124500, avgOrderValue: 2800, status: "dormant" },
  { id: "C014", name: "Smurfit Kappa", sector: "Manufacturing", creditLimit: 40000, outstandingBalance: 5400, lastOrderDate: "2026-03-02", lifetimeValue: 298600, avgOrderValue: 2400, status: "active" },
  { id: "C015", name: "Penneys/Primark", sector: "Retail", creditLimit: 20000, outstandingBalance: 3200, lastOrderDate: "2026-02-20", lifetimeValue: 87600, avgOrderValue: 1200, status: "active" },
];

// ─── Suppliers ─────────────────────────────────────────────
export const suppliers = [
  { id: "S001", name: "M&D Engineering Ltd", category: "Bearings & Power Transmission", totalSpend: 245000, avgMargin: 28.5, avgLeadTime: 5, onTimeDelivery: 94, yearsSupplying: 22, outstandingPOs: 12400 },
  { id: "S002", name: "Elstan Engineering", category: "Oil Seals & Gaskets", totalSpend: 178000, avgMargin: 32.1, avgLeadTime: 3, onTimeDelivery: 97, yearsSupplying: 18, outstandingPOs: 8200 },
  { id: "S003", name: "Reliance Bearing & Gear Ltd", category: "Bearings", totalSpend: 312000, avgMargin: 25.4, avgLeadTime: 7, onTimeDelivery: 91, yearsSupplying: 25, outstandingPOs: 18700 },
  { id: "S004", name: "Dicksons Bearings Ltd", category: "Bearings", totalSpend: 198000, avgMargin: 27.8, avgLeadTime: 4, onTimeDelivery: 96, yearsSupplying: 20, outstandingPOs: 6300 },
  { id: "S005", name: "Hayley Group Ltd", category: "General Engineering Supplies", totalSpend: 287000, avgMargin: 22.3, avgLeadTime: 6, onTimeDelivery: 89, yearsSupplying: 15, outstandingPOs: 21500 },
  { id: "S006", name: "Cross+Morse", category: "Chains & Sprockets", totalSpend: 134000, avgMargin: 30.2, avgLeadTime: 8, onTimeDelivery: 88, yearsSupplying: 12, outstandingPOs: 9800 },
  { id: "S007", name: "SKF Ireland", category: "Bearings & Condition Monitoring", totalSpend: 156000, avgMargin: 24.7, avgLeadTime: 10, onTimeDelivery: 92, yearsSupplying: 17, outstandingPOs: 14200 },
  { id: "S008", name: "Wexford Fasteners", category: "Fasteners", totalSpend: 89000, avgMargin: 35.6, avgLeadTime: 2, onTimeDelivery: 98, yearsSupplying: 10, outstandingPOs: 3100 },
];

// ─── Products / SKUs ───────────────────────────────────────
export const products = [
  { sku: "BRG-6205-2RS", name: "Deep Groove Ball Bearing 6205-2RS", category: "Bearings", supplier: "S003", cost: 4.20, price: 5.88, stock: 450, monthlyDemand: 120, lastSaleDate: "2026-03-07" },
  { sku: "BRG-6208-ZZ", name: "Deep Groove Ball Bearing 6208-ZZ", category: "Bearings", supplier: "S001", cost: 7.50, price: 10.50, stock: 280, monthlyDemand: 85, lastSaleDate: "2026-03-06" },
  { sku: "SEAL-TC-35", name: "TC Oil Seal 35x52x7", category: "Oil Seals", supplier: "S002", cost: 1.80, price: 2.88, stock: 620, monthlyDemand: 200, lastSaleDate: "2026-03-07" },
  { sku: "CHN-08B-1", name: "Roller Chain 08B-1 (per metre)", category: "Chains", supplier: "S006", cost: 3.40, price: 5.10, stock: 340, monthlyDemand: 60, lastSaleDate: "2026-03-05" },
  { sku: "SPR-08B-17", name: "Sprocket 08B 17 Tooth", category: "Sprockets", supplier: "S006", cost: 12.00, price: 17.40, stock: 45, monthlyDemand: 15, lastSaleDate: "2026-03-04" },
  { sku: "COUP-L100", name: "Jaw Coupling L100 Complete", category: "Couplings", supplier: "S001", cost: 18.50, price: 27.75, stock: 32, monthlyDemand: 8, lastSaleDate: "2026-03-02" },
  { sku: "FST-M10-HT", name: "Hex Bolt M10x50 Grade 8.8", category: "Fasteners", supplier: "S008", cost: 0.12, price: 0.22, stock: 5000, monthlyDemand: 1500, lastSaleDate: "2026-03-07" },
  { sku: "FST-M12-NUT", name: "Hex Nut M12 Grade 8", category: "Fasteners", supplier: "S008", cost: 0.06, price: 0.12, stock: 8000, monthlyDemand: 2000, lastSaleDate: "2026-03-07" },
  { sku: "BRG-22210-E", name: "Spherical Roller Bearing 22210-E", category: "Bearings", supplier: "S003", cost: 42.00, price: 58.80, stock: 18, monthlyDemand: 4, lastSaleDate: "2026-02-28" },
  { sku: "MOT-1-5KW", name: "Electric Motor 1.5kW 4-Pole", category: "Motors", supplier: "S005", cost: 185.00, price: 268.25, stock: 6, monthlyDemand: 2, lastSaleDate: "2026-02-25" },
  { sku: "BLT-SPA-1250", name: "V-Belt SPA 1250", category: "Belts", supplier: "S005", cost: 8.20, price: 12.30, stock: 120, monthlyDemand: 30, lastSaleDate: "2026-03-06" },
  { sku: "SEAL-SC-50", name: "Shaft Collar 50mm", category: "Oil Seals", supplier: "S002", cost: 3.50, price: 5.60, stock: 85, monthlyDemand: 20, lastSaleDate: "2026-03-03" },
  { sku: "BRG-UCF-210", name: "Flanged Bearing Unit UCF210", category: "Bearings", supplier: "S004", cost: 22.00, price: 33.00, stock: 35, monthlyDemand: 10, lastSaleDate: "2026-03-06" },
  { sku: "LUB-GREASE-5", name: "Lithium Grease 5kg Tub", category: "Lubricants", supplier: "S005", cost: 14.00, price: 22.40, stock: 40, monthlyDemand: 12, lastSaleDate: "2026-03-04" },
  { sku: "SEAL-VR-25", name: "V-Ring Seal 25mm", category: "Oil Seals", supplier: "S002", cost: 2.10, price: 3.36, stock: 0, monthlyDemand: 15, lastSaleDate: "2026-02-10" },
];

// ─── Sales Orders ──────────────────────────────────────────
export const salesOrders = [
  { id: "SO-4521", customer: "C001", customerName: "Abbott Ireland", date: "2026-03-08", total: 3450.00, status: "pending", items: 12, salesperson: "Tom Kearns" },
  { id: "SO-4520", customer: "C006", customerName: "Stafford Engineering", date: "2026-03-08", total: 1875.50, status: "processing", items: 8, salesperson: "Mark Byrne" },
  { id: "SO-4519", customer: "C003", customerName: "Kingspan Group", date: "2026-03-07", total: 5200.00, status: "shipped", items: 15, salesperson: "Tom Kearns" },
  { id: "SO-4518", customer: "C011", customerName: "Boston Scientific", date: "2026-03-07", total: 2890.00, status: "shipped", items: 9, salesperson: "Lisa Nolan" },
  { id: "SO-4517", customer: "C002", customerName: "Valeo Foods", date: "2026-03-07", total: 4100.00, status: "delivered", items: 18, salesperson: "Mark Byrne" },
  { id: "SO-4516", customer: "C009", customerName: "Glanbia", date: "2026-03-06", total: 3670.00, status: "delivered", items: 14, salesperson: "Tom Kearns" },
  { id: "SO-4515", customer: "C012", customerName: "CRH plc", date: "2026-03-06", total: 7800.00, status: "delivered", items: 22, salesperson: "Lisa Nolan" },
  { id: "SO-4514", customer: "C007", customerName: "Mercury Engineering", date: "2026-03-05", total: 2340.00, status: "delivered", items: 7, salesperson: "Mark Byrne" },
  { id: "SO-4513", customer: "C004", customerName: "Kepak Group", date: "2026-03-05", total: 1560.00, status: "delivered", items: 6, salesperson: "Tom Kearns" },
  { id: "SO-4512", customer: "C010", customerName: "Irish Distillers", date: "2026-03-04", total: 2980.00, status: "delivered", items: 11, salesperson: "Lisa Nolan" },
];

// ─── Financial Data ────────────────────────────────────────
export const financialSummary = {
  revenueToday: 5325.50,
  revenueThisWeek: 35865.50,
  revenueThisMonth: 142300,
  revenueTarget: 185000,
  grossMargin: 27.8,
  operatingExpenses: 28400,
  ebitda: 11200,
  ebitdaYTD: 34600,
  cashBalance: 87450,
  accountsReceivable: 134830,
  accountsPayable: 94200,
  workingCapital: 128080,
  dscr: 1.45,
};

export const monthlyRevenue = [
  { month: "Oct", revenue: 168000, target: 175000 },
  { month: "Nov", revenue: 172000, target: 175000 },
  { month: "Dec", revenue: 145000, target: 160000 },
  { month: "Jan", revenue: 158000, target: 170000 },
  { month: "Feb", revenue: 176000, target: 180000 },
  { month: "Mar", revenue: 142300, target: 185000 },
];

export const cashflowForecast = [
  { week: "W1 Mar", inflow: 42000, outflow: 38000, balance: 91450 },
  { week: "W2 Mar", inflow: 38000, outflow: 41000, balance: 88450 },
  { week: "W3 Mar", inflow: 45000, outflow: 36000, balance: 97450 },
  { week: "W4 Mar", inflow: 40000, outflow: 44000, balance: 93450 },
  { week: "W1 Apr", inflow: 43000, outflow: 39000, balance: 97450 },
  { week: "W2 Apr", inflow: 37000, outflow: 42000, balance: 92450 },
  { week: "W3 Apr", inflow: 46000, outflow: 38000, balance: 100450 },
  { week: "W4 Apr", inflow: 41000, outflow: 40000, balance: 101450 },
];

export const receivablesAgeing = [
  { bucket: "Current", amount: 68200 },
  { bucket: "1-30 days", amount: 32400 },
  { bucket: "31-60 days", amount: 18900 },
  { bucket: "61-90 days", amount: 10200 },
  { bucket: "90+ days", amount: 5130 },
];

// ─── Alerts ────────────────────────────────────────────────
export const alerts = [
  { id: 1, type: "warning" as const, category: "Financial", message: "CRH plc invoice #INV-3892 (€22,300) overdue by 45 days", date: "2026-03-08" },
  { id: 2, type: "critical" as const, category: "Inventory", message: "V-Ring Seal 25mm (SEAL-VR-25) out of stock — 15 units/month demand", date: "2026-03-08" },
  { id: 3, type: "info" as const, category: "Opportunity", message: "Abbott purchases bearings but not couplings — est. €4,200/yr opportunity", date: "2026-03-08" },
  { id: 4, type: "warning" as const, category: "Supplier", message: "Hayley Group delivery 3 days late on PO-2891", date: "2026-03-07" },
  { id: 5, type: "info" as const, category: "Customer", message: "Kerry Group dormant for 5 months — last order Oct 2025", date: "2026-03-07" },
  { id: 6, type: "warning" as const, category: "Financial", message: "Gross margin on Hayley Group products declined 2.1% this quarter", date: "2026-03-06" },
  { id: 7, type: "critical" as const, category: "Risk", message: "Top 3 customers represent 38% of revenue — concentration risk", date: "2026-03-06" },
  { id: 8, type: "info" as const, category: "Inventory", message: "Spherical Roller Bearing 22210-E stock at 4.5 months supply — consider reducing", date: "2026-03-05" },
];

// ─── AI Opportunities ──────────────────────────────────────
export const opportunities = [
  { id: 1, customer: "Abbott Ireland", type: "Cross-sell", product: "Jaw Couplings", reason: "Purchases bearings and seals but not couplings", estimatedRevenue: 4200, confidence: 82 },
  { id: 2, customer: "Kerry Group", type: "Reactivation", product: "General re-engagement", reason: "Dormant 5 months, historically €2,800/month", estimatedRevenue: 33600, confidence: 45 },
  { id: 3, customer: "Valeo Foods", type: "Upsell", product: "SKF Condition Monitoring", reason: "High bearing consumption suggests monitoring need", estimatedRevenue: 8500, confidence: 68 },
  { id: 4, customer: "Kepak Group", type: "Cross-sell", product: "Lubricants & Grease", reason: "Purchases bearings but no lubricants", estimatedRevenue: 3500, confidence: 75 },
  { id: 5, customer: "WaterWipes", type: "Reorder", product: "Oil Seals TC range", reason: "Order interval suggests reorder due in 5 days", estimatedRevenue: 2100, confidence: 91 },
  { id: 6, customer: "Stafford Engineering", type: "Upsell", product: "Premium bearing range", reason: "Currently buying standard — upgrade opportunity", estimatedRevenue: 5800, confidence: 58 },
  { id: 7, customer: "Dawn Meats", type: "Reactivation", product: "Chains & Sprockets", reason: "Used to order monthly, dormant since Jan", estimatedRevenue: 19200, confidence: 38 },
  { id: 8, customer: "Glanbia", type: "Cross-sell", product: "V-Belts & Pulleys", reason: "Similar companies in sector purchase belts", estimatedRevenue: 6200, confidence: 72 },
];

// ─── Operations Data ───────────────────────────────────────
export const operationsMetrics = {
  avgFulfilmentTime: 4.2, // hours
  sameDayRate: 78,
  ordersAwaitingDispatch: 3,
  deliverySuccessRate: 96.5,
  ordersProcessedToday: 5,
  ordersShippedToday: 4,
};

// ─── Risk Data ─────────────────────────────────────────────
export const riskMetrics = {
  customerConcentration: { top3Pct: 38.2, top10Pct: 72.1 },
  supplierConcentration: { top3Pct: 52.8, top5Pct: 76.4 },
  overdueReceivables: 34230,
  covenantStatus: "compliant",
  dscrCurrent: 1.45,
  dscrRequired: 1.20,
};

// ─── Customer Locations (Ireland) ─────────────────────────
export const customerLocations: { id: string; name: string; lat: number; lng: number; sector: string; revenue: number }[] = [
  { id: "C001", name: "Abbott Ireland", lat: 52.8409, lng: -6.9341, sector: "Pharmaceuticals", revenue: 487200 },
  { id: "C002", name: "Valeo Foods", lat: 53.3498, lng: -6.2603, sector: "Food Processing", revenue: 392100 },
  { id: "C003", name: "Kingspan Group", lat: 53.9871, lng: -6.7406, sector: "Construction", revenue: 621000 },
  { id: "C004", name: "Kepak Group", lat: 53.5256, lng: -6.4575, sector: "Food Processing", revenue: 278500 },
  { id: "C005", name: "WaterWipes", lat: 53.2707, lng: -9.0568, sector: "Healthcare", revenue: 156800 },
  { id: "C006", name: "Stafford Engineering", lat: 52.6638, lng: -8.6267, sector: "Manufacturing", revenue: 345600 },
  { id: "C007", name: "Mercury Engineering", lat: 53.3025, lng: -6.3653, sector: "Construction", revenue: 534200 },
  { id: "C008", name: "Dawn Meats", lat: 52.3540, lng: -7.6943, sector: "Food Processing", revenue: 89400 },
  { id: "C009", name: "Glanbia", lat: 52.6554, lng: -7.2525, sector: "Food Processing", revenue: 412300 },
  { id: "C010", name: "Irish Distillers", lat: 51.8985, lng: -8.4756, sector: "Food Processing", revenue: 267800 },
  { id: "C011", name: "Boston Scientific", lat: 53.2760, lng: -9.0497, sector: "Healthcare", revenue: 498700 },
  { id: "C012", name: "CRH plc", lat: 53.3331, lng: -6.2489, sector: "Construction", revenue: 712000 },
  { id: "C013", name: "Kerry Group", lat: 52.2668, lng: -9.6905, sector: "Food Processing", revenue: 124500 },
  { id: "C014", name: "Smurfit Kappa", lat: 53.3478, lng: -6.2597, sector: "Manufacturing", revenue: 298600 },
  { id: "C015", name: "Penneys/Primark", lat: 53.3441, lng: -6.2675, sector: "Retail", revenue: 87600 },
];

// ─── Contracts ────────────────────────────────────────────
export const contracts = [
  { id: "CTR-001", customer: "C001", customerName: "Abbott Ireland", type: "Supply Agreement", status: "active" as const, startDate: "2025-01-15", endDate: "2026-12-31", value: 120000, terms: "Net 30", autoRenew: true },
  { id: "CTR-002", customer: "C003", customerName: "Kingspan Group", type: "Framework Agreement", status: "active" as const, startDate: "2025-03-01", endDate: "2027-02-28", value: 250000, terms: "Net 45", autoRenew: true },
  { id: "CTR-003", customer: "C012", customerName: "CRH plc", type: "Supply Agreement", status: "active" as const, startDate: "2024-06-01", endDate: "2026-05-31", value: 350000, terms: "Net 60", autoRenew: false },
  { id: "CTR-004", customer: "C002", customerName: "Valeo Foods", type: "Service Level Agreement", status: "active" as const, startDate: "2025-07-01", endDate: "2026-06-30", value: 85000, terms: "Net 30", autoRenew: true },
  { id: "CTR-005", customer: "C009", customerName: "Glanbia", type: "Supply Agreement", status: "active" as const, startDate: "2025-04-01", endDate: "2026-09-30", value: 180000, terms: "Net 30", autoRenew: true },
  { id: "CTR-006", customer: "C011", customerName: "Boston Scientific", type: "Framework Agreement", status: "active" as const, startDate: "2025-02-01", endDate: "2027-01-31", value: 220000, terms: "Net 45", autoRenew: true },
  { id: "CTR-007", customer: "C007", customerName: "Mercury Engineering", type: "Supply Agreement", status: "active" as const, startDate: "2024-09-01", endDate: "2026-08-31", value: 165000, terms: "Net 30", autoRenew: false },
  { id: "CTR-008", customer: "C006", customerName: "Stafford Engineering", type: "Service Level Agreement", status: "active" as const, startDate: "2025-06-01", endDate: "2026-05-31", value: 95000, terms: "Net 30", autoRenew: true },
  { id: "CTR-009", customer: "C013", customerName: "Kerry Group", type: "Supply Agreement", status: "expired" as const, startDate: "2024-01-01", endDate: "2025-12-31", value: 75000, terms: "Net 30", autoRenew: false },
  { id: "CTR-010", customer: "C004", customerName: "Kepak Group", type: "Supply Agreement", status: "active" as const, startDate: "2025-01-01", endDate: "2026-12-31", value: 110000, terms: "Net 30", autoRenew: true },
  { id: "CTR-011", customer: "C014", customerName: "Smurfit Kappa", type: "Framework Agreement", status: "active" as const, startDate: "2025-05-01", endDate: "2026-10-31", value: 140000, terms: "Net 45", autoRenew: true },
  { id: "CTR-012", customer: "C010", customerName: "Irish Distillers", type: "Supply Agreement", status: "active" as const, startDate: "2025-08-01", endDate: "2026-07-31", value: 98000, terms: "Net 30", autoRenew: true },
];

// ─── Activity Feed ────────────────────────────────────────
export const activityFeed = [
  { id: 1, type: "order" as const, message: "New order SO-4521 from Abbott Ireland", detail: "€3,450.00 — 12 items", timestamp: "2026-03-08T09:15:00", icon: "shopping-cart" },
  { id: 2, type: "payment" as const, message: "Payment received from Valeo Foods", detail: "€8,750.00 — Invoice INV-3845", timestamp: "2026-03-08T08:42:00", icon: "credit-card" },
  { id: 3, type: "shipment" as const, message: "Order SO-4519 shipped to Kingspan Group", detail: "15 items via DPD Express", timestamp: "2026-03-07T16:30:00", icon: "truck" },
  { id: 4, type: "alert" as const, message: "V-Ring Seal 25mm out of stock", detail: "15 units/month demand — reorder needed", timestamp: "2026-03-07T14:20:00", icon: "alert-triangle" },
  { id: 5, type: "contract" as const, message: "Contract CTR-002 renewal due in 90 days", detail: "Kingspan Group — Framework Agreement", timestamp: "2026-03-07T11:00:00", icon: "file-text" },
  { id: 6, type: "order" as const, message: "Order SO-4520 processing", detail: "Stafford Engineering — €1,875.50", timestamp: "2026-03-08T10:05:00", icon: "shopping-cart" },
  { id: 7, type: "opportunity" as const, message: "New AI opportunity detected", detail: "Glanbia — V-Belts & Pulleys cross-sell", timestamp: "2026-03-07T09:30:00", icon: "sparkles" },
  { id: 8, type: "supplier" as const, message: "Hayley Group PO-2891 delayed", detail: "3 days overdue — impacting Abbott order", timestamp: "2026-03-07T08:15:00", icon: "truck" },
];

// ─── Notifications ────────────────────────────────────────
export const notifications = [
  { id: 1, title: "Invoice Overdue", message: "CRH plc invoice #INV-3892 (€22,300) is 45 days overdue", read: false, timestamp: "2026-03-08T09:00:00", type: "warning" as const },
  { id: 2, title: "Stock Alert", message: "V-Ring Seal 25mm is out of stock with 15 units/month demand", read: false, timestamp: "2026-03-08T08:30:00", type: "critical" as const },
  { id: 3, title: "Order Received", message: "New order SO-4521 from Abbott Ireland worth €3,450", read: false, timestamp: "2026-03-08T09:15:00", type: "info" as const },
  { id: 4, title: "Delivery Delayed", message: "Hayley Group PO-2891 is 3 days late", read: true, timestamp: "2026-03-07T14:00:00", type: "warning" as const },
  { id: 5, title: "Contract Expiring", message: "Kerry Group contract CTR-009 expired — renewal pending", read: true, timestamp: "2026-03-07T10:00:00", type: "warning" as const },
  { id: 6, title: "Payment Received", message: "€8,750 payment from Valeo Foods cleared", read: true, timestamp: "2026-03-07T08:42:00", type: "info" as const },
];

// ─── Helpers ───────────────────────────────────────────────
export function formatCurrency(value: number): string {
  return new Intl.NumberFormat("en-IE", { style: "currency", currency: "EUR" }).format(value);
}

export function formatPercent(value: number): string {
  return `${value.toFixed(1)}%`;
}

export function formatNumber(value: number): string {
  return new Intl.NumberFormat("en-IE").format(value);
}
