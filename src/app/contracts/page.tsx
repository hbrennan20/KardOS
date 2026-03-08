"use client";

import { MetricCard } from "@/components/metric-card";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { contracts, formatCurrency } from "@/lib/data";
import { generateContractPDF } from "@/lib/generate-pdf";
import { FileText, Download, CheckCircle, AlertTriangle, Clock } from "lucide-react";
import Link from "next/link";

export default function ContractsPage() {
  const active = contracts.filter((c) => c.status === "active");
  const expired = contracts.filter((c) => c.status === "expired");
  const totalValue = active.reduce((s, c) => s + c.value, 0);
  const autoRenewCount = active.filter((c) => c.autoRenew).length;

  const expiringSoon = active.filter((c) => {
    const end = new Date(c.endDate);
    const now = new Date();
    const daysLeft = Math.ceil((end.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
    return daysLeft <= 180;
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Contracts</h1>
        <p className="text-sm text-muted-foreground">Manage customer contracts, agreements and renewals</p>
      </div>

      <div className="grid gap-4 grid-cols-2 lg:grid-cols-5">
        <MetricCard title="Active Contracts" value={active.length.toString()} icon={CheckCircle} />
        <MetricCard title="Total Value" value={formatCurrency(totalValue)} icon={FileText} />
        <MetricCard title="Auto-Renew" value={autoRenewCount.toString()} subtitle={`of ${active.length} active`} />
        <MetricCard title="Expiring Soon" value={expiringSoon.length.toString()} icon={AlertTriangle} subtitle="Within 6 months" />
        <MetricCard title="Expired" value={expired.length.toString()} icon={Clock} />
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">All Contracts</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b text-muted-foreground text-left">
                  <th className="pb-2 font-medium">Contract</th>
                  <th className="pb-2 font-medium">Customer</th>
                  <th className="pb-2 font-medium">Type</th>
                  <th className="pb-2 font-medium">Start</th>
                  <th className="pb-2 font-medium">End</th>
                  <th className="pb-2 font-medium text-right">Value</th>
                  <th className="pb-2 font-medium">Terms</th>
                  <th className="pb-2 font-medium">Auto-Renew</th>
                  <th className="pb-2 font-medium">Status</th>
                  <th className="pb-2 font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {contracts
                  .sort((a, _b) => (a.status === "active" ? -1 : 1))
                  .map((c) => {
                    const end = new Date(c.endDate);
                    const now = new Date();
                    const daysLeft = Math.ceil((end.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
                    return (
                      <tr key={c.id} className="border-b last:border-0 hover:bg-muted/50">
                        <td className="py-2 font-mono text-xs font-medium">{c.id}</td>
                        <td className="py-2">
                          <Link href={`/customers/${c.customer}`} className="text-blue-600 hover:underline">
                            {c.customerName}
                          </Link>
                        </td>
                        <td className="py-2">
                          <Badge variant="secondary" className="text-xs">{c.type}</Badge>
                        </td>
                        <td className="py-2 text-muted-foreground">{c.startDate}</td>
                        <td className="py-2 text-muted-foreground">
                          <span className={daysLeft < 90 && c.status === "active" ? "text-amber-600 font-medium" : ""}>
                            {c.endDate}
                          </span>
                          {daysLeft <= 180 && daysLeft > 0 && c.status === "active" && (
                            <span className="text-xs text-muted-foreground ml-1">({daysLeft}d)</span>
                          )}
                        </td>
                        <td className="py-2 text-right font-medium">{formatCurrency(c.value)}</td>
                        <td className="py-2">{c.terms}</td>
                        <td className="py-2">
                          {c.autoRenew ? (
                            <Badge variant="default" className="text-xs">Yes</Badge>
                          ) : (
                            <span className="text-xs text-muted-foreground">No</span>
                          )}
                        </td>
                        <td className="py-2">
                          <Badge
                            variant={c.status === "active" ? "default" : "destructive"}
                            className="text-xs"
                          >
                            {c.status}
                          </Badge>
                        </td>
                        <td className="py-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-7 px-2 text-xs"
                            onClick={() => generateContractPDF(c.id)}
                          >
                            <Download className="h-3 w-3 mr-1" />
                            PDF
                          </Button>
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
            <CardTitle className="text-base flex items-center gap-2">
              <AlertTriangle className="h-4 w-4" />
              Expiring Soon
            </CardTitle>
          </CardHeader>
          <CardContent>
            {expiringSoon.length === 0 ? (
              <p className="text-sm text-muted-foreground">No contracts expiring within 6 months</p>
            ) : (
              <div className="space-y-3">
                {expiringSoon.map((c) => {
                  const daysLeft = Math.ceil((new Date(c.endDate).getTime() - Date.now()) / (1000 * 60 * 60 * 24));
                  return (
                    <div key={c.id} className="flex items-center justify-between text-sm border rounded-lg p-3">
                      <div>
                        <p className="font-medium">{c.customerName}</p>
                        <p className="text-xs text-muted-foreground">{c.type} — {c.id}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-medium">{formatCurrency(c.value)}</p>
                        <p className={`text-xs ${daysLeft < 90 ? "text-red-600" : "text-amber-600"}`}>
                          {daysLeft} days remaining
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">By Contract Type</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {["Supply Agreement", "Framework Agreement", "Service Level Agreement"].map((type) => {
                const items = active.filter((c) => c.type === type);
                const value = items.reduce((s, c) => s + c.value, 0);
                return (
                  <div key={type} className="flex items-center justify-between text-sm">
                    <div>
                      <p className="font-medium">{type}</p>
                      <p className="text-xs text-muted-foreground">{items.length} contracts</p>
                    </div>
                    <span className="font-medium">{formatCurrency(value)}</span>
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
