"use client";

import { useRouter } from "next/navigation";
import { MetricCard } from "@/components/metric-card";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { customers, formatCurrency } from "@/lib/data";
import { Users, TrendingUp, AlertTriangle, Clock } from "lucide-react";

export default function CustomersPage() {
  const router = useRouter();
  const totalRevenue = customers.reduce((s, c) => s + c.lifetimeValue, 0);
  const totalOutstanding = customers.reduce((s, c) => s + c.outstandingBalance, 0);
  const activeCount = customers.filter((c) => c.status === "active").length;
  const dormantCount = customers.filter((c) => c.status === "dormant").length;
  const avgOrderValue = customers.reduce((s, c) => s + c.avgOrderValue, 0) / customers.length;

  const sectors = Array.from(new Set(customers.map((c) => c.sector)));
  const sectorData = sectors.map((sector) => {
    const sectorCustomers = customers.filter((c) => c.sector === sector);
    const rev = sectorCustomers.reduce((s, c) => s + c.lifetimeValue, 0);
    return { sector, revenue: rev, count: sectorCustomers.length };
  }).sort((a, b) => b.revenue - a.revenue);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Customer Intelligence & CRM</h1>
        <p className="text-sm text-muted-foreground">Customer relationships, revenue and credit management</p>
      </div>

      <div className="grid gap-4 grid-cols-2 lg:grid-cols-5">
        <MetricCard title="Total Customers" value={customers.length.toString()} icon={Users} subtitle={`${activeCount} active, ${dormantCount} dormant`} />
        <MetricCard title="Lifetime Revenue" value={formatCurrency(totalRevenue)} icon={TrendingUp} />
        <MetricCard title="Outstanding Balance" value={formatCurrency(totalOutstanding)} icon={AlertTriangle} />
        <MetricCard title="Avg Order Value" value={formatCurrency(avgOrderValue)} />
        <MetricCard title="Dormant Customers" value={dormantCount.toString()} icon={Clock} subtitle=">90 days no order" />
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Customer Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b text-muted-foreground text-left">
                  <th className="pb-2 font-medium">Customer</th>
                  <th className="pb-2 font-medium">Sector</th>
                  <th className="pb-2 font-medium text-right">Lifetime Value</th>
                  <th className="pb-2 font-medium text-right">Outstanding</th>
                  <th className="pb-2 font-medium text-right">Credit Limit</th>
                  <th className="pb-2 font-medium">Credit Usage</th>
                  <th className="pb-2 font-medium text-right">Avg Order</th>
                  <th className="pb-2 font-medium">Last Order</th>
                  <th className="pb-2 font-medium">Status</th>
                </tr>
              </thead>
              <tbody>
                {customers
                  .sort((a, b) => b.lifetimeValue - a.lifetimeValue)
                  .map((c) => {
                    const creditUsage = (c.outstandingBalance / c.creditLimit) * 100;
                    return (
                      <tr key={c.id} className="border-b last:border-0 hover:bg-muted/50 cursor-pointer" onClick={() => router.push(`/customers/${c.id}`)}>
                        <td className="py-2 font-medium">{c.name}</td>
                        <td className="py-2">
                          <Badge variant="secondary" className="text-xs">{c.sector}</Badge>
                        </td>
                        <td className="py-2 text-right">{formatCurrency(c.lifetimeValue)}</td>
                        <td className="py-2 text-right">{formatCurrency(c.outstandingBalance)}</td>
                        <td className="py-2 text-right">{formatCurrency(c.creditLimit)}</td>
                        <td className="py-2">
                          <div className="flex items-center gap-2">
                            <Progress value={creditUsage} className="w-16 h-2" />
                            <span className="text-xs">{creditUsage.toFixed(0)}%</span>
                          </div>
                        </td>
                        <td className="py-2 text-right">{formatCurrency(c.avgOrderValue)}</td>
                        <td className="py-2 text-muted-foreground">{c.lastOrderDate}</td>
                        <td className="py-2">
                          <Badge variant={c.status === "active" ? "default" : "destructive"} className="text-xs">
                            {c.status}
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

      <div className="grid gap-4 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Revenue by Sector</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {sectorData.map((s) => {
                const pct = (s.revenue / totalRevenue) * 100;
                return (
                  <div key={s.sector} className="flex items-center gap-3">
                    <span className="text-sm w-36 truncate">{s.sector}</span>
                    <Progress value={pct} className="flex-1 h-2" />
                    <span className="text-sm w-20 text-right">{formatCurrency(s.revenue / 1000)}k</span>
                    <span className="text-xs text-muted-foreground w-16 text-right">{s.count} customers</span>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">Customer Concentration</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {customers
                .sort((a, b) => b.lifetimeValue - a.lifetimeValue)
                .slice(0, 8)
                .map((c) => {
                  const pct = (c.lifetimeValue / totalRevenue) * 100;
                  return (
                    <div key={c.id} className="flex items-center gap-3">
                      <span className="text-sm w-36 truncate">{c.name}</span>
                      <Progress value={pct} className="flex-1 h-2" />
                      <span className="text-xs text-muted-foreground w-12 text-right">{pct.toFixed(1)}%</span>
                    </div>
                  );
                })}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
