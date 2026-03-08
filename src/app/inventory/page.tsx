"use client";

import { MetricCard } from "@/components/metric-card";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { products, formatCurrency, formatNumber } from "@/lib/data";
import { Package, RotateCcw, AlertTriangle, TrendingDown } from "lucide-react";

export default function InventoryPage() {
  const totalValue = products.reduce((s, p) => s + p.cost * p.stock, 0);
  const totalSKUs = products.length;
  const outOfStock = products.filter((p) => p.stock === 0).length;
  const lowStock = products.filter((p) => p.stock > 0 && p.stock < p.monthlyDemand).length;
  const deadStock = products.filter(
    (p) => new Date(p.lastSaleDate) < new Date("2025-09-01")
  ).length;
  const avgDaysOfInventory =
    products.reduce((s, p) => s + (p.monthlyDemand > 0 ? (p.stock / p.monthlyDemand) * 30 : 0), 0) / totalSKUs;

  const categories = Array.from(new Set(products.map((p) => p.category)));
  const categoryData = categories.map((cat) => {
    const items = products.filter((p) => p.category === cat);
    const value = items.reduce((s, p) => s + p.cost * p.stock, 0);
    const count = items.length;
    return { category: cat, value, count };
  }).sort((a, b) => b.value - a.value);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Inventory & Stock Control</h1>
        <p className="text-sm text-muted-foreground">Stock visibility, turnover and working capital optimisation</p>
      </div>

      <div className="grid gap-4 grid-cols-2 lg:grid-cols-5">
        <MetricCard title="Total Inventory Value" value={formatCurrency(totalValue)} icon={Package} />
        <MetricCard title="Total SKUs" value={totalSKUs.toString()} subtitle={`${outOfStock} out of stock`} />
        <MetricCard title="Avg Days of Stock" value={Math.round(avgDaysOfInventory).toString()} icon={RotateCcw} />
        <MetricCard title="Low Stock Items" value={lowStock.toString()} icon={AlertTriangle} />
        <MetricCard title="Dead Stock" value={deadStock.toString()} icon={TrendingDown} subtitle=">12 months no sale" />
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle className="text-base">Inventory by Category</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {categoryData.map((cat) => (
                <div key={cat.category} className="flex items-center justify-between text-sm">
                  <div>
                    <p className="font-medium">{cat.category}</p>
                    <p className="text-xs text-muted-foreground">{cat.count} SKUs</p>
                  </div>
                  <span className="font-medium">{formatCurrency(cat.value)}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="text-base">Stock Levels by SKU</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b text-muted-foreground text-left">
                    <th className="pb-2 font-medium">SKU</th>
                    <th className="pb-2 font-medium">Product</th>
                    <th className="pb-2 font-medium text-right">Stock</th>
                    <th className="pb-2 font-medium text-right">Monthly Demand</th>
                    <th className="pb-2 font-medium text-right">Days Supply</th>
                    <th className="pb-2 font-medium text-right">Value</th>
                    <th className="pb-2 font-medium">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {products
                    .sort((a, b) => {
                      const aDays = a.monthlyDemand > 0 ? (a.stock / a.monthlyDemand) * 30 : 999;
                      const bDays = b.monthlyDemand > 0 ? (b.stock / b.monthlyDemand) * 30 : 999;
                      return aDays - bDays;
                    })
                    .map((p) => {
                      const daysSupply = p.monthlyDemand > 0 ? Math.round((p.stock / p.monthlyDemand) * 30) : 999;
                      const status =
                        p.stock === 0 ? "out" : daysSupply < 14 ? "low" : daysSupply > 120 ? "overstock" : "ok";
                      return (
                        <tr key={p.sku} className="border-b last:border-0">
                          <td className="py-2 font-mono text-xs">{p.sku}</td>
                          <td className="py-2">{p.name}</td>
                          <td className="py-2 text-right">{formatNumber(p.stock)}</td>
                          <td className="py-2 text-right">{formatNumber(p.monthlyDemand)}</td>
                          <td className="py-2 text-right">{daysSupply === 999 ? "—" : daysSupply}</td>
                          <td className="py-2 text-right">{formatCurrency(p.cost * p.stock)}</td>
                          <td className="py-2">
                            <Badge
                              variant={status === "ok" ? "secondary" : "destructive"}
                              className={
                                status === "ok"
                                  ? "text-xs"
                                  : status === "overstock"
                                  ? "text-xs bg-amber-100 text-amber-800 hover:bg-amber-100"
                                  : "text-xs"
                              }
                            >
                              {status === "out" ? "Out of Stock" : status === "low" ? "Low" : status === "overstock" ? "Overstock" : "OK"}
                            </Badge>
                          </td>
                        </tr>
                      );
                    })}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
