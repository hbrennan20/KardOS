"use client";

import { MetricCard } from "@/components/metric-card";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { opportunities, formatCurrency } from "@/lib/data";
import { Sparkles, TrendingUp, RotateCcw, ArrowUpRight } from "lucide-react";

export default function OpportunitiesPage() {
  const totalEstimated = opportunities.reduce((s, o) => s + o.estimatedRevenue, 0);
  const crossSell = opportunities.filter((o) => o.type === "Cross-sell");
  const reactivation = opportunities.filter((o) => o.type === "Reactivation");
  const upsell = opportunities.filter((o) => o.type === "Upsell");
  const reorder = opportunities.filter((o) => o.type === "Reorder");
  const avgConfidence = opportunities.reduce((s, o) => s + o.confidence, 0) / opportunities.length;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">AI Sales Opportunities</h1>
        <p className="text-sm text-muted-foreground">Data-driven identification of revenue opportunities</p>
      </div>

      <div className="grid gap-4 grid-cols-2 lg:grid-cols-5">
        <MetricCard title="Total Opportunities" value={opportunities.length.toString()} icon={Sparkles} />
        <MetricCard title="Estimated Revenue" value={formatCurrency(totalEstimated)} icon={TrendingUp} />
        <MetricCard title="Avg Confidence" value={`${avgConfidence.toFixed(0)}%`} />
        <MetricCard title="Cross-sell" value={crossSell.length.toString()} icon={ArrowUpRight} />
        <MetricCard title="Reactivation" value={reactivation.length.toString()} icon={RotateCcw} />
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Opportunity Pipeline</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {opportunities
              .sort((a, b) => b.estimatedRevenue - a.estimatedRevenue)
              .map((opp) => (
                <div key={opp.id} className="border rounded-lg p-4">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-semibold text-sm">{opp.customer}</h3>
                        <Badge
                          variant={
                            opp.type === "Cross-sell"
                              ? "default"
                              : opp.type === "Reactivation"
                              ? "destructive"
                              : opp.type === "Upsell"
                              ? "secondary"
                              : "outline"
                          }
                          className="text-xs"
                        >
                          {opp.type}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">{opp.reason}</p>
                      <p className="text-xs text-muted-foreground mt-1">
                        Product: <span className="font-medium text-foreground">{opp.product}</span>
                      </p>
                    </div>
                    <div className="text-right shrink-0">
                      <p className="text-lg font-bold">{formatCurrency(opp.estimatedRevenue)}</p>
                      <p className="text-xs text-muted-foreground">est. annual revenue</p>
                      <div className="flex items-center gap-2 mt-2 justify-end">
                        <Progress value={opp.confidence} className="w-20 h-2" />
                        <span className="text-xs font-medium">{opp.confidence}%</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-4 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle className="text-base">By Type</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {[
                { label: "Cross-sell", items: crossSell, color: "bg-blue-500" },
                { label: "Upsell", items: upsell, color: "bg-emerald-500" },
                { label: "Reactivation", items: reactivation, color: "bg-amber-500" },
                { label: "Reorder", items: reorder, color: "bg-purple-500" },
              ].map((t) => (
                <div key={t.label} className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <div className={`h-3 w-3 rounded-full ${t.color}`} />
                    <span>{t.label}</span>
                  </div>
                  <div className="text-right">
                    <span className="font-medium">{t.items.length}</span>
                    <span className="text-muted-foreground ml-2">
                      ({formatCurrency(t.items.reduce((s, o) => s + o.estimatedRevenue, 0))})
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="text-base">Example: Cross-sell Detection</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="border rounded-lg p-4 bg-muted/50">
              <p className="text-sm font-medium mb-2">How it works</p>
              <p className="text-sm text-muted-foreground mb-3">
                The AI engine analyses historical purchase patterns across all customers and identifies products that are commonly purchased together but missing from a specific customer&apos;s order history.
              </p>
              <div className="border rounded p-3 bg-background text-sm font-mono">
                <p><span className="text-muted-foreground">Customer:</span> Abbott Ireland</p>
                <p><span className="text-muted-foreground">Purchases:</span> Bearings, Oil Seals, Fasteners</p>
                <p><span className="text-muted-foreground">Missing:</span> Jaw Couplings (commonly paired with bearings)</p>
                <p><span className="text-muted-foreground">Estimated opportunity:</span> €4,200/year</p>
                <p><span className="text-muted-foreground">Confidence:</span> 82% (based on 12 similar customers)</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
