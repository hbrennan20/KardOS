"use client";

import { MetricCard } from "@/components/metric-card";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  financialSummary,
  monthlyRevenue,
  cashflowForecast,
  receivablesAgeing,
  formatCurrency,
  formatPercent,
} from "@/lib/data";
import {
  DollarSign,
  TrendingUp,
  Landmark,
  ArrowDownUp,
  CreditCard,
  Shield,
} from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  Legend,
} from "recharts";

export default function FinancialPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Financial Monitoring</h1>
        <p className="text-sm text-muted-foreground">Cashflow, profitability & debt service tracking</p>
      </div>

      <div className="grid gap-4 grid-cols-2 lg:grid-cols-4">
        <MetricCard title="Daily Revenue" value={formatCurrency(financialSummary.revenueToday)} icon={DollarSign} />
        <MetricCard
          title="Monthly Revenue"
          value={formatCurrency(financialSummary.revenueThisMonth)}
          subtitle={`Target: ${formatCurrency(financialSummary.revenueTarget)}`}
          icon={TrendingUp}
        />
        <MetricCard title="Gross Margin" value={formatPercent(financialSummary.grossMargin)} icon={TrendingUp} />
        <MetricCard title="EBITDA (Month)" value={formatCurrency(financialSummary.ebitda)} subtitle={`YTD: ${formatCurrency(financialSummary.ebitdaYTD)}`} />
      </div>

      <div className="grid gap-4 grid-cols-2 lg:grid-cols-4">
        <MetricCard title="Cash Balance" value={formatCurrency(financialSummary.cashBalance)} icon={Landmark} />
        <MetricCard title="Accounts Receivable" value={formatCurrency(financialSummary.accountsReceivable)} icon={ArrowDownUp} />
        <MetricCard title="Accounts Payable" value={formatCurrency(financialSummary.accountsPayable)} icon={CreditCard} />
        <MetricCard title="DSCR" value={financialSummary.dscr.toFixed(2) + "x"} subtitle="Required: 1.20x" icon={Shield} />
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Monthly Revenue vs Target</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={280}>
              <BarChart data={monthlyRevenue}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                <XAxis dataKey="month" className="text-xs" />
                <YAxis className="text-xs" tickFormatter={(v) => `€${(v / 1000).toFixed(0)}k`} />
                <Tooltip formatter={(v) => formatCurrency(Number(v))} />
                <Legend />
                <Bar dataKey="revenue" fill="hsl(var(--chart-1))" name="Revenue" radius={[4, 4, 0, 0]} />
                <Bar dataKey="target" fill="hsl(var(--chart-3))" name="Target" radius={[4, 4, 0, 0]} opacity={0.5} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">13-Week Cashflow Forecast</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={280}>
              <LineChart data={cashflowForecast}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                <XAxis dataKey="week" className="text-xs" />
                <YAxis className="text-xs" tickFormatter={(v) => `€${(v / 1000).toFixed(0)}k`} />
                <Tooltip formatter={(v) => formatCurrency(Number(v))} />
                <Legend />
                <Line type="monotone" dataKey="inflow" stroke="hsl(var(--chart-1))" name="Inflows" strokeWidth={2} />
                <Line type="monotone" dataKey="outflow" stroke="hsl(var(--chart-5))" name="Outflows" strokeWidth={2} />
                <Line type="monotone" dataKey="balance" stroke="hsl(var(--chart-3))" name="Balance" strokeWidth={2} strokeDasharray="5 5" />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Accounts Receivable Ageing</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={receivablesAgeing}>
              <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
              <XAxis dataKey="bucket" className="text-xs" />
              <YAxis className="text-xs" tickFormatter={(v) => `€${(v / 1000).toFixed(0)}k`} />
              <Tooltip formatter={(v) => formatCurrency(Number(v))} />
              <Bar dataKey="amount" name="Outstanding" radius={[4, 4, 0, 0]}>
                {receivablesAgeing.map((entry, i) => (
                  <rect key={i} fill={i < 2 ? "hsl(var(--chart-1))" : i < 4 ? "hsl(var(--chart-4))" : "hsl(var(--chart-5))"} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
          <div className="grid grid-cols-5 gap-4 mt-4">
            {receivablesAgeing.map((bucket) => (
              <div key={bucket.bucket} className="text-center">
                <p className="text-xs text-muted-foreground">{bucket.bucket}</p>
                <p className="text-sm font-semibold">{formatCurrency(bucket.amount)}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
