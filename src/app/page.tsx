"use client";

import { MetricCard } from "@/components/metric-card";
import { AlertList } from "@/components/alert-list";
import { CustomerMap } from "@/components/customer-map";
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
  contracts,
  activityFeed,
  formatCurrency,
  formatPercent,
} from "@/lib/data";
import {
  DollarSign,
  ShoppingCart,
  TrendingUp,
  Package,
  Landmark,
  AlertTriangle,
  Users,
  Sparkles,
  Activity,
  FileText,
  CreditCard,
  Truck,
  MapPin,
} from "lucide-react";
import Link from "next/link";

const activityIcons: Record<string, React.ReactNode> = {
  "shopping-cart": <ShoppingCart className="h-3.5 w-3.5" />,
  "credit-card": <CreditCard className="h-3.5 w-3.5" />,
  truck: <Truck className="h-3.5 w-3.5" />,
  "alert-triangle": <AlertTriangle className="h-3.5 w-3.5" />,
  "file-text": <FileText className="h-3.5 w-3.5" />,
  sparkles: <Sparkles className="h-3.5 w-3.5" />,
};

const activityColors: Record<string, string> = {
  order: "bg-blue-100 text-blue-700",
  payment: "bg-emerald-100 text-emerald-700",
  shipment: "bg-purple-100 text-purple-700",
  alert: "bg-red-100 text-red-700",
  contract: "bg-amber-100 text-amber-700",
  opportunity: "bg-cyan-100 text-cyan-700",
  supplier: "bg-orange-100 text-orange-700",
};

export default function ExecutiveDashboard() {
  const totalInventoryValue = products.reduce((sum, p) => sum + p.cost * p.stock, 0);
  const inventoryTurnover = 8.2;
  const topCustomerRevenue = customers
    .sort((a, b) => b.lifetimeValue - a.lifetimeValue)
    .slice(0, 3)
    .reduce((sum, c) => sum + c.lifetimeValue, 0);
  const totalRevenue = customers.reduce((sum, c) => sum + c.lifetimeValue, 0);
  const topCustomerPct = (topCustomerRevenue / totalRevenue) * 100;

  const activeContracts = contracts.filter((c) => c.status === "active").length;
  const contractValue = contracts.filter((c) => c.status === "active").reduce((s, c) => s + c.value, 0);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Executive Dashboard</h1>
          <p className="text-sm text-muted-foreground">
            Kard Engineering & Supplies — Daily Command View
          </p>
        </div>
        <div className="text-right">
          <p className="text-sm font-medium">{new Date().toLocaleDateString("en-IE", { weekday: "long", year: "numeric", month: "long", day: "numeric" })}</p>
          <p className="text-xs text-muted-foreground">Last updated: {new Date().toLocaleTimeString("en-IE", { hour: "2-digit", minute: "2-digit" })}</p>
        </div>
      </div>

      <div className="grid gap-4 grid-cols-2 lg:grid-cols-5">
        <MetricCard title="Revenue Today" value={formatCurrency(financialSummary.revenueToday)} icon={DollarSign} trend={{ value: "+12.3%", positive: true }} subtitle="vs yesterday" />
        <MetricCard title="Orders Today" value={salesOrders.filter((o) => o.date === "2026-03-08").length.toString()} icon={ShoppingCart} subtitle={`${operationsMetrics.ordersShippedToday} shipped`} />
        <MetricCard title="Gross Margin" value={formatPercent(financialSummary.grossMargin)} icon={TrendingUp} trend={{ value: "-0.4%", positive: false }} subtitle="vs last month" />
        <MetricCard title="Cash Balance" value={formatCurrency(financialSummary.cashBalance)} icon={Landmark} subtitle="DSCR: 1.45x" />
        <MetricCard title="Inventory Value" value={formatCurrency(totalInventoryValue)} icon={Package} subtitle={`Turnover: ${inventoryTurnover}x`} />
      </div>

      <div className="grid gap-4 grid-cols-2 lg:grid-cols-4">
        <MetricCard title="Monthly Revenue" value={formatCurrency(financialSummary.revenueThisMonth)} icon={DollarSign} subtitle={`Target: ${formatCurrency(financialSummary.revenueTarget)}`} />
        <MetricCard title="AR Overdue" value={formatCurrency(34230)} icon={AlertTriangle} subtitle="5 invoices overdue" />
        <MetricCard title="Active Contracts" value={activeContracts.toString()} icon={FileText} subtitle={formatCurrency(contractValue) + " total value"} />
        <MetricCard title="AI Opportunities" value={opportunities.length.toString()} icon={Sparkles} subtitle={`${formatCurrency(opportunities.reduce((s, o) => s + o.estimatedRevenue, 0))} potential`} />
      </div>

      <div className="grid gap-4 lg:grid-cols-5">
        <Card className="lg:col-span-3">
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <MapPin className="h-4 w-4" />
              Customer Locations — Ireland
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <CustomerMap className="h-[380px] rounded-b-lg overflow-hidden" />
          </CardContent>
        </Card>

        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <Activity className="h-4 w-4" />
              Activity Feed
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {activityFeed.map((item) => (
                <div key={item.id} className="flex items-start gap-3">
                  <div className={`mt-0.5 h-7 w-7 rounded-full flex items-center justify-center shrink-0 ${activityColors[item.type] || "bg-gray-100 text-gray-700"}`}>
                    {activityIcons[item.icon] || <Activity className="h-3.5 w-3.5" />}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-medium leading-tight">{item.message}</p>
                    <p className="text-xs text-muted-foreground">{item.detail}</p>
                    <p className="text-[10px] text-muted-foreground mt-0.5">
                      {new Date(item.timestamp).toLocaleString("en-IE", { month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" })}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Quick Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 lg:grid-cols-6 gap-3">
            {[
              { label: "View Sales", href: "/sales", icon: ShoppingCart, color: "bg-blue-50 text-blue-700 hover:bg-blue-100" },
              { label: "View Customers", href: "/customers", icon: Users, color: "bg-emerald-50 text-emerald-700 hover:bg-emerald-100" },
              { label: "View Contracts", href: "/contracts", icon: FileText, color: "bg-amber-50 text-amber-700 hover:bg-amber-100" },
              { label: "Check Inventory", href: "/inventory", icon: Package, color: "bg-purple-50 text-purple-700 hover:bg-purple-100" },
              { label: "AI Opportunities", href: "/opportunities", icon: Sparkles, color: "bg-cyan-50 text-cyan-700 hover:bg-cyan-100" },
              { label: "Risk Monitor", href: "/risk", icon: AlertTriangle, color: "bg-red-50 text-red-700 hover:bg-red-100" },
            ].map((action) => (
              <Link key={action.href} href={action.href}>
                <div className={`flex flex-col items-center gap-2 rounded-lg p-4 transition-colors ${action.color}`}>
                  <action.icon className="h-5 w-5" />
                  <span className="text-xs font-medium">{action.label}</span>
                </div>
              </Link>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-4 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <AlertTriangle className="h-4 w-4" />
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
                <Link key={opp.id} href={`/opportunities/${opp.id}`} className="block">
                  <div className="flex items-start justify-between gap-4 text-sm hover:bg-muted/50 rounded-lg p-2 -mx-2 transition-colors">
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
                </Link>
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
                    <td className="py-2"><Link href={`/sales/${order.id}`} className="font-medium text-blue-600 hover:underline">{order.id}</Link></td>
                    <td className="py-2"><Link href={`/customers/${order.customer}`} className="hover:underline">{order.customerName}</Link></td>
                    <td className="py-2 text-muted-foreground">{order.date}</td>
                    <td className="py-2">{order.items}</td>
                    <td className="py-2 text-right">{formatCurrency(order.total)}</td>
                    <td className="py-2">
                      <Badge variant={order.status === "delivered" ? "secondary" : order.status === "shipped" ? "default" : "outline"} className="text-xs">
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
