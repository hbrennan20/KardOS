"use client";

import { useRouter } from "next/navigation";
import { MetricCard } from "@/components/metric-card";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { suppliers, formatCurrency, formatPercent } from "@/lib/data";
import { Truck, Clock, CheckCircle, TrendingDown } from "lucide-react";

export default function SuppliersPage() {
  const router = useRouter();
  const totalSpend = suppliers.reduce((s, sup) => s + sup.totalSpend, 0);
  const avgMargin = suppliers.reduce((s, sup) => s + sup.avgMargin, 0) / suppliers.length;
  const avgLeadTime = suppliers.reduce((s, sup) => s + sup.avgLeadTime, 0) / suppliers.length;
  const avgOnTime = suppliers.reduce((s, sup) => s + sup.onTimeDelivery, 0) / suppliers.length;
  const totalOutstandingPOs = suppliers.reduce((s, sup) => s + sup.outstandingPOs, 0);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Suppliers & Procurement</h1>
        <p className="text-sm text-muted-foreground">Purchasing management and supplier performance</p>
      </div>

      <div className="grid gap-4 grid-cols-2 lg:grid-cols-5">
        <MetricCard title="Total Spend" value={formatCurrency(totalSpend)} icon={Truck} subtitle="Last 12 months" />
        <MetricCard title="Avg Gross Margin" value={formatPercent(avgMargin)} icon={TrendingDown} />
        <MetricCard title="Avg Lead Time" value={`${avgLeadTime.toFixed(1)} days`} icon={Clock} />
        <MetricCard title="On-Time Delivery" value={formatPercent(avgOnTime)} icon={CheckCircle} />
        <MetricCard title="Outstanding POs" value={formatCurrency(totalOutstandingPOs)} />
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Supplier Performance</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b text-muted-foreground text-left">
                  <th className="pb-2 font-medium">Supplier</th>
                  <th className="pb-2 font-medium">Category</th>
                  <th className="pb-2 font-medium text-right">Annual Spend</th>
                  <th className="pb-2 font-medium text-right">Avg Margin</th>
                  <th className="pb-2 font-medium text-right">Lead Time</th>
                  <th className="pb-2 font-medium">On-Time %</th>
                  <th className="pb-2 font-medium text-right">Outstanding POs</th>
                  <th className="pb-2 font-medium text-right">Years</th>
                </tr>
              </thead>
              <tbody>
                {suppliers
                  .sort((a, b) => b.totalSpend - a.totalSpend)
                  .map((sup) => (
                    <tr key={sup.id} className="border-b last:border-0 hover:bg-muted/50 cursor-pointer" onClick={() => router.push(`/suppliers/${sup.id}`)}>
                      <td className="py-3 font-medium">{sup.name}</td>
                      <td className="py-3">
                        <Badge variant="secondary" className="text-xs">{sup.category}</Badge>
                      </td>
                      <td className="py-3 text-right">{formatCurrency(sup.totalSpend)}</td>
                      <td className="py-3 text-right">{formatPercent(sup.avgMargin)}</td>
                      <td className="py-3 text-right">{sup.avgLeadTime} days</td>
                      <td className="py-3">
                        <div className="flex items-center gap-2">
                          <Progress value={sup.onTimeDelivery} className="w-16 h-2" />
                          <span className="text-xs">{sup.onTimeDelivery}%</span>
                        </div>
                      </td>
                      <td className="py-3 text-right">{formatCurrency(sup.outstandingPOs)}</td>
                      <td className="py-3 text-right text-muted-foreground">{sup.yearsSupplying}</td>
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
            <CardTitle className="text-base">Supplier Concentration</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {suppliers
                .sort((a, b) => b.totalSpend - a.totalSpend)
                .map((sup) => {
                  const pct = (sup.totalSpend / totalSpend) * 100;
                  return (
                    <div key={sup.id} className="flex items-center gap-3">
                      <span className="text-sm w-48 truncate">{sup.name}</span>
                      <Progress value={pct} className="flex-1 h-2" />
                      <span className="text-sm text-muted-foreground w-12 text-right">{pct.toFixed(1)}%</span>
                    </div>
                  );
                })}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">Alerts</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4 text-sm">
              <div className="flex items-start gap-3">
                <div className="mt-0.5 h-2 w-2 rounded-full bg-amber-500 shrink-0" />
                <div>
                  <p className="font-medium">Hayley Group — Late Delivery</p>
                  <p className="text-muted-foreground">PO-2891 is 3 days overdue. On-time rate has dropped to 89%.</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="mt-0.5 h-2 w-2 rounded-full bg-amber-500 shrink-0" />
                <div>
                  <p className="font-medium">Hayley Group — Margin Decline</p>
                  <p className="text-muted-foreground">Average gross margin declined 2.1% this quarter. Review pricing.</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="mt-0.5 h-2 w-2 rounded-full bg-red-500 shrink-0" />
                <div>
                  <p className="font-medium">Concentration Risk</p>
                  <p className="text-muted-foreground">Top 3 suppliers account for 52.8% of total spend.</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="mt-0.5 h-2 w-2 rounded-full bg-blue-500 shrink-0" />
                <div>
                  <p className="font-medium">Reorder Suggestion</p>
                  <p className="text-muted-foreground">V-Ring Seal 25mm (Elstan Engineering) — stock depleted, 15 units/month demand.</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
