"use client";

import { MetricCard } from "@/components/metric-card";
import { AlertList } from "@/components/alert-list";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  financialSummary,
  alerts,
  opportunities,
  operationsMetrics,
  salesOrders,
  customers,
  products,
  formatCurrency,
  formatPercent,
} from "@/lib/data";
import {
  DollarSign,
  ShoppingCart,
  TrendingUp,
  Package,
  RefreshCw,
  Landmark,
  AlertTriangle,
  Users,
  Sparkles,
  Activity,
} from "lucide-react";

export default function ExecutiveDashboard() {
  const totalInventoryValue = products.reduce((sum, p) => sum + p.cost * p.stock, 0);
  const inventoryTurnover = 8.2;
  const topCustomerRevenue = customers
    .sort((a, b) => b.lifetimeValue - a.lifetimeValue)
    .slice(0, 3)
    .reduce((sum, c) => sum + c.lifetimeValue, 0);
  const totalRevenue = customers.reduce((sum, c) => sum + c.lifetimeValue, 0);
  const topCustomerPct = (topCustomerRevenue / totalRevenue) * 100;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Executive Dashboard</h1>
        <p className="text-sm text-muted-foreground">
          Kard Engineering & Supplies — Daily Command View
        </p>
      </div>

      <div className="grid gap-4 grid-cols-2 lg:grid-cols-5">
        <MetricCard
          title="Revenue Today"
          value={formatCurrency(financialSummary.revenueToday)}
          icon={DollarSign}
          trend={{ value: "+12.3%", positive: true }}
          subtitle="vs yesterday"
        />
        <MetricCard
          title="Orders Today"
          value={salesOrders.filter((o) => o.date === "2026-03-08").length.toString()}
          icon={ShoppingCart}
          subtitle={`${operationsMetrics.ordersShippedToday} shipped`}
        />
        <MetricCard
          title="Gross Margin"
          value={formatPercent(financialSummary.grossMargin)}
          icon={TrendingUp}
          trend={{ value: "-0.4%", positive: false }}
          subtitle="vs last month"
        />
        <MetricCard
          title="Cash Balance"
          value={formatCurrency(financialSummary.cashBalance)}
          icon={Landmark}
          subtitle="DSCR: 1.45x"
        />
        <MetricCard
          title="Inventory Value"
          value={formatCurrency(totalInventoryValue)}
          icon={Package}
          subtitle={`Turnover: ${inventoryTurnover}x`}
        />
      </div>

      <div className="grid gap-4 grid-cols-2 lg:grid-cols-4">
        <MetricCard
          title="Monthly Revenue"
          value={formatCurrency(financialSummary.revenueThisMonth)}
          icon={RefreshCw}
          subtitle={`Target: ${formatCurrency(financialSummary.revenueTarget)}`}
        />
        <MetricCard
          title="AR Overdue"
          value={formatCurrency(34230)}
          icon={AlertTriangle}
          subtitle="5 invoices overdue"
        />
        <MetricCard
          title="Top 3 Customer %"
          value={formatPercent(topCustomerPct)}
          icon={Users}
          subtitle="Concentration risk"
        />
        <MetricCard
          title="AI Opportunities"
          value={opportunities.length.toString()}
          icon={Sparkles}
          subtitle={`${formatCurrency(opportunities.reduce((s, o) => s + o.estimatedRevenue, 0))} potential`}
        />
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <Activity className="h-4 w-4" />
              Active Alerts
            </CardTitle>
          </CardHeader>
          <CardContent>
            <AlertList alerts={alerts} limit={6} />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <Sparkles className="h-4 w-4" />
              Top Sales Opportunities
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {opportunities.slice(0, 5).map((opp) => (
                <div key={opp.id} className="flex items-start justify-between gap-4 text-sm">
                  <div>
                    <p className="font-medium">{opp.customer}</p>
                    <p className="text-muted-foreground text-xs">{opp.reason}</p>
                  </div>
                  <div className="text-right shrink-0">
                    <p className="font-medium">{formatCurrency(opp.estimatedRevenue)}</p>
                    <Badge variant={opp.confidence > 70 ? "default" : "secondary"} className="text-[10px]">
                      {opp.confidence}% confidence
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Recent Orders</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b text-muted-foreground text-left">
                  <th className="pb-2 font-medium">Order</th>
                  <th className="pb-2 font-medium">Customer</th>
                  <th className="pb-2 font-medium">Date</th>
                  <th className="pb-2 font-medium">Items</th>
                  <th className="pb-2 font-medium text-right">Total</th>
                  <th className="pb-2 font-medium">Status</th>
                </tr>
              </thead>
              <tbody>
                {salesOrders.slice(0, 6).map((order) => (
                  <tr key={order.id} className="border-b last:border-0">
                    <td className="py-2 font-medium">{order.id}</td>
                    <td className="py-2">{order.customerName}</td>
                    <td className="py-2 text-muted-foreground">{order.date}</td>
                    <td className="py-2">{order.items}</td>
                    <td className="py-2 text-right">{formatCurrency(order.total)}</td>
                    <td className="py-2">
                      <Badge
                        variant={
                          order.status === "delivered" ? "secondary" : order.status === "shipped" ? "default" : "outline"
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
    </div>
  );
}
