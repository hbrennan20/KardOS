"use client";

import { useRouter } from "next/navigation";
import { MetricCard } from "@/components/metric-card";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { salesOrders, financialSummary, formatCurrency } from "@/lib/data";
import { ShoppingCart, Truck, Clock } from "lucide-react";

export default function SalesPage() {
  const router = useRouter();
  const todayOrders = salesOrders.filter((o) => o.date === "2026-03-08");
  const pending = salesOrders.filter((o) => o.status === "pending" || o.status === "processing");
  const shipped = salesOrders.filter((o) => o.status === "shipped");

  const salespersonData = salesOrders.reduce((acc, o) => {
    acc[o.salesperson] = (acc[o.salesperson] || 0) + o.total;
    return acc;
  }, {} as Record<string, number>);

  const categoryRevenue: Record<string, number> = {
    "Bearings": 42500,
    "Fasteners": 18200,
    "Oil Seals": 12800,
    "Chains & Sprockets": 9400,
    "Couplings": 7200,
    "Motors": 5600,
    "Belts": 4100,
    "Lubricants": 3500,
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Sales Orders</h1>
        <p className="text-sm text-muted-foreground">Order tracking, revenue monitoring and fulfilment</p>
      </div>

      <div className="grid gap-4 grid-cols-2 lg:grid-cols-5">
        <MetricCard title="Orders Today" value={todayOrders.length.toString()} icon={ShoppingCart} />
        <MetricCard title="Revenue Today" value={formatCurrency(financialSummary.revenueToday)} />
        <MetricCard title="Revenue This Week" value={formatCurrency(financialSummary.revenueThisWeek)} />
        <MetricCard title="Awaiting Fulfilment" value={pending.length.toString()} icon={Clock} />
        <MetricCard title="In Transit" value={shipped.length.toString()} icon={Truck} />
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="text-base">Order Queue</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b text-muted-foreground text-left">
                    <th className="pb-2 font-medium">Order</th>
                    <th className="pb-2 font-medium">Customer</th>
                    <th className="pb-2 font-medium">Date</th>
                    <th className="pb-2 font-medium">Salesperson</th>
                    <th className="pb-2 font-medium text-right">Items</th>
                    <th className="pb-2 font-medium text-right">Total</th>
                    <th className="pb-2 font-medium">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {salesOrders.map((order) => (
                    <tr key={order.id} className="border-b last:border-0 hover:bg-muted/50 cursor-pointer" onClick={() => router.push(`/sales/${order.id}`)}>
                      <td className="py-2 font-medium">{order.id}</td>
                      <td className="py-2">{order.customerName}</td>
                      <td className="py-2 text-muted-foreground">{order.date}</td>
                      <td className="py-2">{order.salesperson}</td>
                      <td className="py-2 text-right">{order.items}</td>
                      <td className="py-2 text-right">{formatCurrency(order.total)}</td>
                      <td className="py-2">
                        <Badge
                          variant={
                            order.status === "delivered"
                              ? "secondary"
                              : order.status === "shipped"
                              ? "default"
                              : order.status === "processing"
                              ? "outline"
                              : "destructive"
                          }
                          className="text-xs"
                        >
                          {order.status}
                        </Badge>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Sales by Salesperson</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {Object.entries(salespersonData)
                  .sort(([, a], [, b]) => b - a)
                  .map(([name, total]) => (
                    <div key={name} className="flex items-center justify-between text-sm">
                      <span className="font-medium">{name}</span>
                      <span>{formatCurrency(total)}</span>
                    </div>
                  ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-base">Revenue by Category</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {Object.entries(categoryRevenue)
                  .sort(([, a], [, b]) => b - a)
                  .map(([cat, rev]) => (
                    <div key={cat} className="flex items-center justify-between text-sm">
                      <span>{cat}</span>
                      <span className="text-muted-foreground">{formatCurrency(rev)}</span>
                    </div>
                  ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
