"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { opportunities, customers, formatCurrency } from "@/lib/data";
import { ArrowLeft } from "lucide-react";

export default function OpportunityDetailPage() {
  const { id } = useParams<{ id: string }>();
  const opp = opportunities.find((o) => o.id === Number(id));

  if (!opp) {
    return (
      <div className="space-y-4">
        <Link href="/opportunities" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground">
          <ArrowLeft className="h-4 w-4" /> Back to Opportunities
        </Link>
        <p>Opportunity not found.</p>
      </div>
    );
  }

  const customer = customers.find((c) => c.name === opp.customer);
  const typeColor = opp.type === "Cross-sell" ? "default" : opp.type === "Reactivation" ? "destructive" : opp.type === "Upsell" ? "secondary" : "outline";

  return (
    <div className="space-y-6">
      <div>
        <Link href="/opportunities" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground mb-2">
          <ArrowLeft className="h-4 w-4" /> Back to Opportunities
        </Link>
        <div className="flex items-center gap-3 mt-2">
          <h1 className="text-2xl font-bold tracking-tight">{opp.customer}</h1>
          <Badge variant={typeColor}>{opp.type}</Badge>
        </div>
        <p className="text-sm text-muted-foreground">Opportunity #{opp.id}</p>
      </div>

      <div className="grid gap-4 grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardContent className="pt-6">
            <p className="text-xs text-muted-foreground">Estimated Annual Revenue</p>
            <p className="text-2xl font-bold">{formatCurrency(opp.estimatedRevenue)}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <p className="text-xs text-muted-foreground">Confidence</p>
            <p className="text-2xl font-bold">{opp.confidence}%</p>
            <Progress value={opp.confidence} className="h-2 mt-2" />
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <p className="text-xs text-muted-foreground">Target Product</p>
            <p className="text-2xl font-bold">{opp.product}</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Rationale</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm">{opp.reason}</p>
        </CardContent>
      </Card>

      {customer && (
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Customer Profile</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 grid-cols-2 lg:grid-cols-4 text-sm">
              <div>
                <p className="text-muted-foreground">Customer</p>
                <Link href={`/customers/${customer.id}`} className="font-medium text-blue-600 hover:underline">{customer.name}</Link>
              </div>
              <div>
                <p className="text-muted-foreground">Sector</p>
                <p className="font-medium">{customer.sector}</p>
              </div>
              <div>
                <p className="text-muted-foreground">Lifetime Value</p>
                <p className="font-medium">{formatCurrency(customer.lifetimeValue)}</p>
              </div>
              <div>
                <p className="text-muted-foreground">Status</p>
                <Badge variant={customer.status === "active" ? "default" : "destructive"}>{customer.status}</Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
