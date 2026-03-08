"use client";

import { MetricCard } from "@/components/metric-card";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import {
  riskMetrics,
  customers,
  suppliers,
  financialSummary,
  formatCurrency,
  formatPercent,
} from "@/lib/data";
import { ShieldAlert, Users, Truck, AlertTriangle, Shield } from "lucide-react";

export default function RiskPage() {
  const totalCustomerRevenue = customers.reduce((s, c) => s + c.lifetimeValue, 0);
  const topCustomers = customers
    .sort((a, b) => b.lifetimeValue - a.lifetimeValue)
    .slice(0, 5);

  const totalSupplierSpend = suppliers.reduce((s, sup) => s + sup.totalSpend, 0);
  const topSuppliers = suppliers
    .sort((a, b) => b.totalSpend - a.totalSpend)
    .slice(0, 5);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Risk Monitoring</h1>
        <p className="text-sm text-muted-foreground">Financial, operational and concentration risk tracking</p>
      </div>

      <div className="grid gap-4 grid-cols-2 lg:grid-cols-5">
        <MetricCard
          title="Customer Conc. (Top 3)"
          value={formatPercent(riskMetrics.customerConcentration.top3Pct)}
          icon={Users}
        />
        <MetricCard
          title="Supplier Conc. (Top 3)"
          value={formatPercent(riskMetrics.supplierConcentration.top3Pct)}
          icon={Truck}
        />
        <MetricCard
          title="Overdue Receivables"
          value={formatCurrency(riskMetrics.overdueReceivables)}
          icon={AlertTriangle}
        />
        <MetricCard
          title="DSCR"
          value={`${riskMetrics.dscrCurrent}x`}
          subtitle={`Required: ${riskMetrics.dscrRequired}x`}
          icon={Shield}
        />
        <MetricCard
          title="Covenant Status"
          value={riskMetrics.covenantStatus.toUpperCase()}
          icon={ShieldAlert}
        />
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <Users className="h-4 w-4" />
              Customer Concentration Risk
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {topCustomers.map((c) => {
                const pct = (c.lifetimeValue / totalCustomerRevenue) * 100;
                return (
                  <div key={c.id} className="flex items-center gap-3">
                    <span className="text-sm w-36 truncate">{c.name}</span>
                    <Progress value={pct} className="flex-1 h-2" />
                    <span className="text-xs text-muted-foreground w-20 text-right">
                      {formatPercent(pct)}
                    </span>
                    <span className="text-xs w-24 text-right">{formatCurrency(c.lifetimeValue)}</span>
                  </div>
                );
              })}
              <div className="mt-4 pt-3 border-t space-y-1 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Top 3 concentration</span>
                  <span className={riskMetrics.customerConcentration.top3Pct > 35 ? "text-red-600 font-medium" : "font-medium"}>
                    {formatPercent(riskMetrics.customerConcentration.top3Pct)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Top 10 concentration</span>
                  <span className="font-medium">{formatPercent(riskMetrics.customerConcentration.top10Pct)}</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <Truck className="h-4 w-4" />
              Supplier Concentration Risk
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {topSuppliers.map((s) => {
                const pct = (s.totalSpend / totalSupplierSpend) * 100;
                return (
                  <div key={s.id} className="flex items-center gap-3">
                    <span className="text-sm w-36 truncate">{s.name}</span>
                    <Progress value={pct} className="flex-1 h-2" />
                    <span className="text-xs text-muted-foreground w-20 text-right">
                      {formatPercent(pct)}
                    </span>
                    <span className="text-xs w-24 text-right">{formatCurrency(s.totalSpend)}</span>
                  </div>
                );
              })}
              <div className="mt-4 pt-3 border-t space-y-1 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Top 3 concentration</span>
                  <span className={riskMetrics.supplierConcentration.top3Pct > 50 ? "text-amber-600 font-medium" : "font-medium"}>
                    {formatPercent(riskMetrics.supplierConcentration.top3Pct)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Top 5 concentration</span>
                  <span className="font-medium">{formatPercent(riskMetrics.supplierConcentration.top5Pct)}</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Covenant Monitoring</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>Debt Service Coverage Ratio (DSCR)</span>
                  <span className="font-medium">{riskMetrics.dscrCurrent}x / {riskMetrics.dscrRequired}x required</span>
                </div>
                <Progress value={(riskMetrics.dscrCurrent / 2) * 100} className="h-3" />
                <p className="text-xs text-muted-foreground mt-1">
                  Headroom: {((riskMetrics.dscrCurrent - riskMetrics.dscrRequired) / riskMetrics.dscrRequired * 100).toFixed(0)}% above covenant
                </p>
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>Working Capital</span>
                  <span className="font-medium">{formatCurrency(financialSummary.workingCapital)}</span>
                </div>
                <Progress value={75} className="h-3" />
                <p className="text-xs text-muted-foreground mt-1">Adequate working capital position</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <AlertTriangle className="h-4 w-4" />
              Risk Alerts
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3 text-sm">
              <div className="flex items-start gap-3">
                <div className="mt-0.5 h-2 w-2 rounded-full bg-red-500 shrink-0" />
                <div>
                  <p className="font-medium">High Customer Concentration</p>
                  <p className="text-muted-foreground">Top 3 customers at 38.2% of revenue. Target: below 30%.</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="mt-0.5 h-2 w-2 rounded-full bg-amber-500 shrink-0" />
                <div>
                  <p className="font-medium">CRH plc — High Credit Exposure</p>
                  <p className="text-muted-foreground">€22,300 outstanding (37% of credit limit), 45 days overdue.</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="mt-0.5 h-2 w-2 rounded-full bg-amber-500 shrink-0" />
                <div>
                  <p className="font-medium">Supplier Dependency</p>
                  <p className="text-muted-foreground">Top 3 suppliers account for 52.8% of total procurement spend.</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="mt-0.5 h-2 w-2 rounded-full bg-blue-500 shrink-0" />
                <div>
                  <p className="font-medium">Covenant Compliance</p>
                  <p className="text-muted-foreground">DSCR at 1.45x — compliant with 20.8% headroom above 1.20x requirement.</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
