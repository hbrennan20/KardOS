// Mock data for Kard Engineering & Supplies Limited - KardOS

// ─── Customers ────────────────────────────────────────────
/** Trailing-twelve-months revenue by customer — totals €1.2M annual */
export const customers = [
  { id: "C001", name: "Abbott Ireland", sector: "Pharmaceuticals", creditLimit: 11300, outstandingBalance: 2790, lastOrderDate: "2026-03-06", lifetimeValue: 110200, avgOrderValue: 650, status: "active" },
  { id: "C002", name: "Valeo Foods", sector: "Food Processing", creditLimit: 9040, outstandingBalance: 1980, lastOrderDate: "2026-03-07", lifetimeValue: 88700, avgOrderValue: 720, status: "active" },
  { id: "C003", name: "Kingspan Group", sector: "Construction", creditLimit: 13560, outstandingBalance: 3440, lastOrderDate: "2026-03-05", lifetimeValue: 140500, avgOrderValue: 930, status: "active" },
  { id: "C004", name: "Kepak Group", sector: "Food Processing", creditLimit: 7910, outstandingBalance: 980, lastOrderDate: "2026-03-04", lifetimeValue: 63000, avgOrderValue: 440, status: "active" },
  { id: "C005", name: "WaterWipes", sector: "Healthcare", creditLimit: 5650, outstandingBalance: 1380, lastOrderDate: "2026-02-28", lifetimeValue: 35500, avgOrderValue: 475, status: "active" },
  { id: "C006", name: "Stafford Engineering", sector: "Manufacturing", creditLimit: 6780, outstandingBalance: 2230, lastOrderDate: "2026-03-07", lifetimeValue: 78200, avgOrderValue: 625, status: "active" },
  { id: "C007", name: "Mercury Engineering", sector: "Construction", creditLimit: 10170, outstandingBalance: 4160, lastOrderDate: "2026-03-03", lifetimeValue: 120800, avgOrderValue: 860, status: "active" },
  { id: "C008", name: "Dawn Meats", sector: "Food Processing", creditLimit: 6780, outstandingBalance: 475, lastOrderDate: "2026-01-15", lifetimeValue: 20200, avgOrderValue: 360, status: "dormant" },
  { id: "C009", name: "Glanbia", sector: "Food Processing", creditLimit: 12430, outstandingBalance: 2530, lastOrderDate: "2026-03-06", lifetimeValue: 93300, avgOrderValue: 770, status: "active" },
  { id: "C010", name: "Irish Distillers", sector: "Food Processing", creditLimit: 7910, outstandingBalance: 1730, lastOrderDate: "2026-03-01", lifetimeValue: 60600, avgOrderValue: 500, status: "active" },
  { id: "C011", name: "Boston Scientific", sector: "Healthcare", creditLimit: 11300, outstandingBalance: 3190, lastOrderDate: "2026-03-07", lifetimeValue: 112800, avgOrderValue: 815, status: "active" },
  { id: "C012", name: "CRH plc", sector: "Construction", creditLimit: 15820, outstandingBalance: 9850, lastOrderDate: "2026-03-05", lifetimeValue: 164000, avgOrderValue: 1180, status: "active" },
  { id: "C013", name: "Kerry Group", sector: "Food Processing", creditLimit: 10170, outstandingBalance: 0, lastOrderDate: "2025-10-12", lifetimeValue: 28200, avgOrderValue: 635, status: "dormant" },
  { id: "C014", name: "Smurfit Kappa", sector: "Manufacturing", creditLimit: 9040, outstandingBalance: 1220, lastOrderDate: "2026-03-02", lifetimeValue: 64200, avgOrderValue: 540, status: "active" },
  { id: "C015", name: "Penneys/Primark", sector: "Retail", creditLimit: 4520, outstandingBalance: 720, lastOrderDate: "2026-02-20", lifetimeValue: 19800, avgOrderValue: 270, status: "active" },
];

// ─── Suppliers ─────────────────────────────────────────────
export const suppliers = [
  { id: "S001", name: "M&D Engineering Ltd", category: "Bearings & Power Transmission", totalSpend: 128600, avgMargin: 28.5, avgLeadTime: 5, onTimeDelivery: 94, yearsSupplying: 22, outstandingPOs: 6500 },
  { id: "S002", name: "Elstan Engineering", category: "Oil Seals & Gaskets", totalSpend: 93500, avgMargin: 32.1, avgLeadTime: 3, onTimeDelivery: 97, yearsSupplying: 18, outstandingPOs: 4300 },
  { id: "S003", name: "Reliance Bearing & Gear Ltd", category: "Bearings", totalSpend: 163800, avgMargin: 25.4, avgLeadTime: 7, onTimeDelivery: 91, yearsSupplying: 25, outstandingPOs: 9800 },
  { id: "S004", name: "Dicksons Bearings Ltd", category: "Bearings", totalSpend: 104000, avgMargin: 27.8, avgLeadTime: 4, onTimeDelivery: 96, yearsSupplying: 20, outstandingPOs: 3300 },
  { id: "S005", name: "Hayley Group Ltd", category: "General Engineering Supplies", totalSpend: 150700, avgMargin: 22.3, avgLeadTime: 6, onTimeDelivery: 89, yearsSupplying: 15, outstandingPOs: 11300 },
  { id: "S006", name: "Cross+Morse", category: "Chains & Sprockets", totalSpend: 70400, avgMargin: 30.2, avgLeadTime: 8, onTimeDelivery: 88, yearsSupplying: 12, outstandingPOs: 5100 },
  { id: "S007", name: "SKF Ireland", category: "Bearings & Condition Monitoring", totalSpend: 81900, avgMargin: 24.7, avgLeadTime: 10, onTimeDelivery: 92, yearsSupplying: 17, outstandingPOs: 7500 },
  { id: "S008", name: "Wexford Fasteners", category: "Fasteners", totalSpend: 46700, avgMargin: 35.6, avgLeadTime: 2, onTimeDelivery: 98, yearsSupplying: 10, outstandingPOs: 1600 },
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
  { id: "SO-4521", customer: "C001", customerName: "Abbott Ireland", date: "2026-03-08", total: 1680.0, status: "pending", items: 12, salesperson: "Tom Kearns" },
  { id: "SO-4520", customer: "C006", customerName: "Stafford Engineering", date: "2026-03-08", total: 920.0, status: "processing", items: 8, salesperson: "Mark Byrne" },
  { id: "SO-4519", customer: "C003", customerName: "Kingspan Group", date: "2026-03-07", total: 2480.0, status: "shipped", items: 15, salesperson: "Tom Kearns" },
  { id: "SO-4518", customer: "C011", customerName: "Boston Scientific", date: "2026-03-07", total: 1380.0, status: "shipped", items: 9, salesperson: "Lisa Nolan" },
  { id: "SO-4517", customer: "C002", customerName: "Valeo Foods", date: "2026-03-07", total: 1960.0, status: "delivered", items: 18, salesperson: "Mark Byrne" },
  { id: "SO-4516", customer: "C009", customerName: "Glanbia", date: "2026-03-06", total: 1750.0, status: "delivered", items: 14, salesperson: "Tom Kearns" },
  { id: "SO-4515", customer: "C012", customerName: "CRH plc", date: "2026-03-06", total: 3720.0, status: "delivered", items: 22, salesperson: "Lisa Nolan" },
  { id: "SO-4514", customer: "C007", customerName: "Mercury Engineering", date: "2026-03-05", total: 1120.0, status: "delivered", items: 7, salesperson: "Mark Byrne" },
  { id: "SO-4513", customer: "C004", customerName: "Kepak Group", date: "2026-03-05", total: 760.0, status: "delivered", items: 6, salesperson: "Tom Kearns" },
  { id: "SO-4512", customer: "C010", customerName: "Irish Distillers", date: "2026-03-04", total: 1420.0, status: "delivered", items: 11, salesperson: "Lisa Nolan" },
];

// ─── Financial Data ────────────────────────────────────────
/** ~€1.2M annual run-rate (≈€100k / month) */
export const financialSummary = {
  revenueToday: 4120.0,
  revenueThisWeek: 25100.0,
  revenueThisMonth: 98800,
  revenueTarget: 105000,
  grossMargin: 27.8,
  operatingExpenses: 19800,
  ebitda: 7800,
  ebitdaYTD: 24100,
  cashBalance: 52400,
  accountsReceivable: 91800,
  accountsPayable: 68400,
  workingCapital: 78200,
  dscr: 1.45,
};

export const monthlyRevenue = [
  { month: "Oct", revenue: 102000, target: 105000 },
  { month: "Nov", revenue: 101000, target: 105000 },
  { month: "Dec", revenue: 95000, target: 100000 },
  { month: "Jan", revenue: 98000, target: 105000 },
  { month: "Feb", revenue: 105000, target: 108000 },
  { month: "Mar", revenue: 98800, target: 105000 },
];

export const cashflowForecast = [
  { week: "W1 Mar", inflow: 24800, outflow: 22400, balance: 52400 },
  { week: "W2 Mar", inflow: 22600, outflow: 24100, balance: 50900 },
  { week: "W3 Mar", inflow: 26700, outflow: 21300, balance: 56300 },
  { week: "W4 Mar", inflow: 23700, outflow: 26000, balance: 54000 },
  { week: "W1 Apr", inflow: 25400, outflow: 23000, balance: 56400 },
  { week: "W2 Apr", inflow: 21900, outflow: 24800, balance: 53500 },
  { week: "W3 Apr", inflow: 27200, outflow: 22400, balance: 58300 },
  { week: "W4 Apr", inflow: 24300, outflow: 23700, balance: 58900 },
];

export const receivablesAgeing = [
  { bucket: "Current", amount: 46800 },
  { bucket: "1-30 days", amount: 22100 },
  { bucket: "31-60 days", amount: 12900 },
  { bucket: "61-90 days", amount: 7000 },
  { bucket: "90+ days", amount: 3000 },
];

// ─── Alerts ────────────────────────────────────────────────
export const alerts = [
  { id: 1, type: "warning" as const, category: "Financial", message: "CRH plc invoice #INV-3892 (€9,850) overdue by 45 days", date: "2026-03-08" },
  { id: 2, type: "critical" as const, category: "Inventory", message: "V-Ring Seal 25mm (SEAL-VR-25) out of stock — 15 units/month demand", date: "2026-03-08" },
  { id: 3, type: "info" as const, category: "Opportunity", message: "Abbott purchases bearings but not couplings — est. €1,900/yr opportunity", date: "2026-03-08" },
  { id: 4, type: "warning" as const, category: "Supplier", message: "Hayley Group delivery 3 days late on PO-2891", date: "2026-03-07" },
  { id: 5, type: "info" as const, category: "Customer", message: "Kerry Group dormant for 5 months — last order Oct 2025", date: "2026-03-07" },
  { id: 6, type: "warning" as const, category: "Financial", message: "Gross margin on Hayley Group products declined 2.1% this quarter", date: "2026-03-06" },
  { id: 7, type: "critical" as const, category: "Risk", message: "Top 3 customers represent 38% of revenue — concentration risk", date: "2026-03-06" },
  { id: 8, type: "info" as const, category: "Inventory", message: "Spherical Roller Bearing 22210-E stock at 4.5 months supply — consider reducing", date: "2026-03-05" },
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
  overdueReceivables: 24800,
  covenantStatus: "compliant",
  dscrCurrent: 1.45,
  dscrRequired: 1.20,
};

// ─── Customer Locations (Ireland) ─────────────────────────
export const customerLocations: { id: string; name: string; lat: number; lng: number; sector: string; revenue: number }[] = [
  { id: "C001", name: "Abbott Ireland", lat: 52.8409, lng: -6.9341, sector: "Pharmaceuticals", revenue: 110200 },
  { id: "C002", name: "Valeo Foods", lat: 53.3498, lng: -6.2603, sector: "Food Processing", revenue: 88700 },
  { id: "C003", name: "Kingspan Group", lat: 53.9871, lng: -6.7406, sector: "Construction", revenue: 140500 },
  { id: "C004", name: "Kepak Group", lat: 53.5256, lng: -6.4575, sector: "Food Processing", revenue: 63000 },
  { id: "C005", name: "WaterWipes", lat: 53.2707, lng: -9.0568, sector: "Healthcare", revenue: 35500 },
  { id: "C006", name: "Stafford Engineering", lat: 52.6638, lng: -8.6267, sector: "Manufacturing", revenue: 78200 },
  { id: "C007", name: "Mercury Engineering", lat: 53.3025, lng: -6.3653, sector: "Construction", revenue: 120800 },
  { id: "C008", name: "Dawn Meats", lat: 52.3540, lng: -7.6943, sector: "Food Processing", revenue: 20200 },
  { id: "C009", name: "Glanbia", lat: 52.6554, lng: -7.2525, sector: "Food Processing", revenue: 93300 },
  { id: "C010", name: "Irish Distillers", lat: 51.8985, lng: -8.4756, sector: "Food Processing", revenue: 60600 },
  { id: "C011", name: "Boston Scientific", lat: 53.2760, lng: -9.0497, sector: "Healthcare", revenue: 112800 },
  { id: "C012", name: "CRH plc", lat: 53.3331, lng: -6.2489, sector: "Construction", revenue: 164000 },
  { id: "C013", name: "Kerry Group", lat: 52.2668, lng: -9.6905, sector: "Food Processing", revenue: 28200 },
  { id: "C014", name: "Smurfit Kappa", lat: 53.3478, lng: -6.2597, sector: "Manufacturing", revenue: 64200 },
  { id: "C015", name: "Penneys/Primark", lat: 53.3441, lng: -6.2675, sector: "Retail", revenue: 19800 },
];

// ─── Contracts ────────────────────────────────────────────
export const contracts = [
  { id: "CTR-001", customer: "C001", customerName: "Abbott Ireland", type: "Supply Agreement", status: "active" as const, startDate: "2025-01-15", endDate: "2026-12-31", value: 54000, terms: "Net 30", autoRenew: true },
  { id: "CTR-002", customer: "C003", customerName: "Kingspan Group", type: "Framework Agreement", status: "active" as const, startDate: "2025-03-01", endDate: "2027-02-28", value: 112500, terms: "Net 45", autoRenew: true },
  { id: "CTR-003", customer: "C012", customerName: "CRH plc", type: "Supply Agreement", status: "active" as const, startDate: "2024-06-01", endDate: "2026-05-31", value: 157500, terms: "Net 60", autoRenew: false },
  { id: "CTR-004", customer: "C002", customerName: "Valeo Foods", type: "Service Level Agreement", status: "active" as const, startDate: "2025-07-01", endDate: "2026-06-30", value: 38250, terms: "Net 30", autoRenew: true },
  { id: "CTR-005", customer: "C009", customerName: "Glanbia", type: "Supply Agreement", status: "active" as const, startDate: "2025-04-01", endDate: "2026-09-30", value: 81000, terms: "Net 30", autoRenew: true },
  { id: "CTR-006", customer: "C011", customerName: "Boston Scientific", type: "Framework Agreement", status: "active" as const, startDate: "2025-02-01", endDate: "2027-01-31", value: 99000, terms: "Net 45", autoRenew: true },
  { id: "CTR-007", customer: "C007", customerName: "Mercury Engineering", type: "Supply Agreement", status: "active" as const, startDate: "2024-09-01", endDate: "2026-08-31", value: 74250, terms: "Net 30", autoRenew: false },
  { id: "CTR-008", customer: "C006", customerName: "Stafford Engineering", type: "Service Level Agreement", status: "active" as const, startDate: "2025-06-01", endDate: "2026-05-31", value: 42750, terms: "Net 30", autoRenew: true },
  { id: "CTR-009", customer: "C013", customerName: "Kerry Group", type: "Supply Agreement", status: "expired" as const, startDate: "2024-01-01", endDate: "2025-12-31", value: 33750, terms: "Net 30", autoRenew: false },
  { id: "CTR-010", customer: "C004", customerName: "Kepak Group", type: "Supply Agreement", status: "active" as const, startDate: "2025-01-01", endDate: "2026-12-31", value: 49500, terms: "Net 30", autoRenew: true },
  { id: "CTR-011", customer: "C014", customerName: "Smurfit Kappa", type: "Framework Agreement", status: "active" as const, startDate: "2025-05-01", endDate: "2026-10-31", value: 63000, terms: "Net 45", autoRenew: true },
  { id: "CTR-012", customer: "C010", customerName: "Irish Distillers", type: "Supply Agreement", status: "active" as const, startDate: "2025-08-01", endDate: "2026-07-31", value: 44100, terms: "Net 30", autoRenew: true },
];

// ─── Activity Feed ────────────────────────────────────────
export const activityFeed = [
  { id: 1, type: "order" as const, message: "New order SO-4521 from Abbott Ireland", detail: "€1,680.00 — 12 items", timestamp: "2026-03-08T09:15:00", icon: "shopping-cart" },
  { id: 2, type: "payment" as const, message: "Payment received from Valeo Foods", detail: "€4,200.00 — Invoice INV-3845", timestamp: "2026-03-08T08:42:00", icon: "credit-card" },
  { id: 3, type: "shipment" as const, message: "Order SO-4519 shipped to Kingspan Group", detail: "15 items via DPD Express", timestamp: "2026-03-07T16:30:00", icon: "truck" },
  { id: 4, type: "alert" as const, message: "V-Ring Seal 25mm out of stock", detail: "15 units/month demand — reorder needed", timestamp: "2026-03-07T14:20:00", icon: "alert-triangle" },
  { id: 5, type: "contract" as const, message: "Contract CTR-002 renewal due in 90 days", detail: "Kingspan Group — Framework Agreement", timestamp: "2026-03-07T11:00:00", icon: "file-text" },
  { id: 6, type: "order" as const, message: "Order SO-4520 processing", detail: "Stafford Engineering — €920.00", timestamp: "2026-03-08T10:05:00", icon: "shopping-cart" },
  { id: 7, type: "opportunity" as const, message: "Sales opportunity noted", detail: "Glanbia — V-Belts & Pulleys cross-sell", timestamp: "2026-03-07T09:30:00", icon: "sparkles" },
  { id: 8, type: "supplier" as const, message: "Hayley Group PO-2891 delayed", detail: "3 days overdue — impacting Abbott order", timestamp: "2026-03-07T08:15:00", icon: "truck" },
];

// ─── Notifications ────────────────────────────────────────
export const notifications = [
  { id: 1, title: "Invoice Overdue", message: "CRH plc invoice #INV-3892 (€9,850) is 45 days overdue", read: false, timestamp: "2026-03-08T09:00:00", type: "warning" as const },
  { id: 2, title: "Stock Alert", message: "V-Ring Seal 25mm is out of stock with 15 units/month demand", read: false, timestamp: "2026-03-08T08:30:00", type: "critical" as const },
  { id: 3, title: "Order Received", message: "New order SO-4521 from Abbott Ireland worth €1,680", read: false, timestamp: "2026-03-08T09:15:00", type: "info" as const },
  { id: 4, title: "Delivery Delayed", message: "Hayley Group PO-2891 is 3 days late", read: true, timestamp: "2026-03-07T14:00:00", type: "warning" as const },
  { id: 5, title: "Contract Expiring", message: "Kerry Group contract CTR-009 expired — renewal pending", read: true, timestamp: "2026-03-07T10:00:00", type: "warning" as const },
  { id: 6, title: "Payment Received", message: "€4,200 payment from Valeo Foods cleared", read: true, timestamp: "2026-03-07T08:42:00", type: "info" as const },
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
