"use client";

import { useRouter } from "next/navigation";
import { MetricCard } from "@/components/metric-card";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { products, formatCurrency, formatPercent, formatNumber } from "@/lib/data";
import { BarChart3, TrendingUp, TrendingDown, Package } from "lucide-react";

export default function ProductsPage() {
  const router = useRouter();
  const productsWithMargin = products.map((p) => ({
    ...p,
    margin: ((p.price - p.cost) / p.price) * 100,
    monthlyRevenue: p.price * p.monthlyDemand,
    monthlyCost: p.cost * p.monthlyDemand,
    monthlyProfit: (p.price - p.cost) * p.monthlyDemand,
    stockTurn: p.monthlyDemand > 0 ? (p.monthlyDemand * 12) / Math.max(p.stock, 1) : 0,
  }));

  const totalMonthlyRevenue = productsWithMargin.reduce((s, p) => s + p.monthlyRevenue, 0);
  const totalMonthlyProfit = productsWithMargin.reduce((s, p) => s + p.monthlyProfit, 0);
  const avgMargin = (totalMonthlyProfit / totalMonthlyRevenue) * 100;

  const topBySales = [...productsWithMargin].sort((a, b) => b.monthlyRevenue - a.monthlyRevenue);
  const lowestMargin = [...productsWithMargin].sort((a, b) => a.margin - b.margin);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Product & SKU Analytics</h1>
        <p className="text-sm text-muted-foreground">Product profitability and performance analysis</p>
      </div>

      <div className="grid gap-4 grid-cols-2 lg:grid-cols-4">
        <MetricCard title="Total SKUs" value={products.length.toString()} icon={Package} />
        <MetricCard title="Monthly Revenue (est)" value={formatCurrency(totalMonthlyRevenue)} icon={BarChart3} />
        <MetricCard title="Monthly Profit (est)" value={formatCurrency(totalMonthlyProfit)} icon={TrendingUp} />
        <MetricCard title="Average Margin" value={formatPercent(avgMargin)} />
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">SKU Performance</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b text-muted-foreground text-left">
                  <th className="pb-2 font-medium">SKU</th>
                  <th className="pb-2 font-medium">Product</th>
                  <th className="pb-2 font-medium">Category</th>
                  <th className="pb-2 font-medium text-right">Cost</th>
                  <th className="pb-2 font-medium text-right">Price</th>
                  <th className="pb-2 font-medium text-right">Margin</th>
                  <th className="pb-2 font-medium text-right">Monthly Rev</th>
                  <th className="pb-2 font-medium text-right">Stock Turn</th>
                  <th className="pb-2 font-medium text-right">Stock</th>
                </tr>
              </thead>
              <tbody>
                {topBySales.map((p) => (
                  <tr key={p.sku} className="border-b last:border-0 hover:bg-muted/50 cursor-pointer" onClick={() => router.push(`/products/${p.sku}`)}>
                    <td className="py-2 font-mono text-xs">{p.sku}</td>
                    <td className="py-2">{p.name}</td>
                    <td className="py-2">
                      <Badge variant="secondary" className="text-xs">{p.category}</Badge>
                    </td>
                    <td className="py-2 text-right">{formatCurrency(p.cost)}</td>
                    <td className="py-2 text-right">{formatCurrency(p.price)}</td>
                    <td className="py-2 text-right">
                      <span className={p.margin < 25 ? "text-red-600 font-medium" : ""}>
                        {formatPercent(p.margin)}
                      </span>
                    </td>
                    <td className="py-2 text-right">{formatCurrency(p.monthlyRevenue)}</td>
                    <td className="py-2 text-right">{p.stockTurn.toFixed(1)}x</td>
                    <td className="py-2 text-right">{formatNumber(p.stock)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-4 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <TrendingUp className="h-4 w-4" />
              Top Sellers (Monthly Revenue)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {topBySales.slice(0, 6).map((p, i) => (
                <div key={p.sku} className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <span className="text-muted-foreground w-5">{i + 1}.</span>
                    <span>{p.name}</span>
                  </div>
                  <span className="font-medium">{formatCurrency(p.monthlyRevenue)}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <TrendingDown className="h-4 w-4" />
              Lowest Margin Products
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {lowestMargin.slice(0, 6).map((p, i) => (
                <div key={p.sku} className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <span className="text-muted-foreground w-5">{i + 1}.</span>
                    <span>{p.name}</span>
                  </div>
                  <span className={`font-medium ${p.margin < 25 ? "text-red-600" : ""}`}>
                    {formatPercent(p.margin)}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
