"use client";

import { useParams } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { customers, salesOrders, contracts, formatCurrency } from "@/lib/data";
import { generateContractPDF, generateOrderPDF, generateInvoicePDF } from "@/lib/generate-pdf";
import { ArrowLeft, Download, FileText, ShoppingCart } from "lucide-react";
import Link from "next/link";

export default function CustomerDetailPage() {
  const { id } = useParams<{ id: string }>();
  const customer = customers.find((c) => c.id === id);

  if (!customer) {
    return (
      <div className="space-y-4">
        <Link href="/customers" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground">
          <ArrowLeft className="h-4 w-4" /> Back to Customers
        </Link>
        <p>Customer not found.</p>
      </div>
    );
  }

  const creditUsage = (customer.outstandingBalance / customer.creditLimit) * 100;
  const customerOrders = salesOrders.filter((o) => o.customer === customer.id);
  const customerContracts = contracts.filter((c) => c.customer === customer.id);

  return (
    <div className="space-y-6">
      <div>
        <Link href="/customers" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground mb-2">
          <ArrowLeft className="h-4 w-4" /> Back to Customers
        </Link>
        <div className="flex items-center gap-3 mt-2">
          <h1 className="text-2xl font-bold tracking-tight">{customer.name}</h1>
          <Badge variant={customer.status === "active" ? "default" : "destructive"}>{customer.status}</Badge>
        </div>
        <p className="text-sm text-muted-foreground">{customer.sector} &middot; {customer.id}</p>
      </div>

      <div className="grid gap-4 grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardContent className="pt-6">
            <p className="text-xs text-muted-foreground">Lifetime Value</p>
            <p className="text-2xl font-bold">{formatCurrency(customer.lifetimeValue)}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <p className="text-xs text-muted-foreground">Outstanding Balance</p>
            <p className="text-2xl font-bold">{formatCurrency(customer.outstandingBalance)}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <p className="text-xs text-muted-foreground">Credit Limit</p>
            <p className="text-2xl font-bold">{formatCurrency(customer.creditLimit)}</p>
            <div className="flex items-center gap-2 mt-2">
              <Progress value={creditUsage} className="flex-1 h-2" />
              <span className="text-xs">{creditUsage.toFixed(0)}%</span>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <p className="text-xs text-muted-foreground">Avg Order Value</p>
            <p className="text-2xl font-bold">{formatCurrency(customer.avgOrderValue)}</p>
            <p className="text-xs text-muted-foreground mt-1">Last order: {customer.lastOrderDate}</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <ShoppingCart className="h-4 w-4" />
              Recent Orders
            </CardTitle>
          </CardHeader>
          <CardContent>
            {customerOrders.length === 0 ? (
              <p className="text-sm text-muted-foreground">No recent orders.</p>
            ) : (
              <div className="space-y-3">
                {customerOrders.map((o) => (
                  <div key={o.id} className="flex items-center justify-between border rounded-lg p-3">
                    <div>
                      <Link href={`/sales/${o.id}`} className="font-medium text-sm text-blue-600 hover:underline">
                        {o.id}
                      </Link>
                      <p className="text-xs text-muted-foreground">{o.date} — {o.items} items — {o.salesperson}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="text-right mr-2">
                        <p className="text-sm font-medium">{formatCurrency(o.total)}</p>
                        <Badge variant={o.status === "delivered" ? "secondary" : o.status === "shipped" ? "default" : "destructive"} className="text-xs">
                          {o.status}
                        </Badge>
                      </div>
                      <div className="flex gap-1">
                        <Button variant="ghost" size="sm" className="h-7 w-7 p-0" onClick={() => generateOrderPDF(o.id)} title="Download Order PDF">
                          <Download className="h-3 w-3" />
                        </Button>
                        <Button variant="ghost" size="sm" className="h-7 w-7 p-0" onClick={() => generateInvoicePDF(o.id)} title="Download Invoice PDF">
                          <FileText className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <FileText className="h-4 w-4" />
              Contracts
            </CardTitle>
          </CardHeader>
          <CardContent>
            {customerContracts.length === 0 ? (
              <p className="text-sm text-muted-foreground">No contracts found.</p>
            ) : (
              <div className="space-y-3">
                {customerContracts.map((c) => {
                  const daysLeft = Math.ceil((new Date(c.endDate).getTime() - Date.now()) / (1000 * 60 * 60 * 24));
                  return (
                    <div key={c.id} className="flex items-center justify-between border rounded-lg p-3">
                      <div>
                        <p className="text-sm font-medium">{c.type}</p>
                        <p className="text-xs text-muted-foreground">
                          {c.id} — {c.startDate} to {c.endDate}
                          {daysLeft > 0 && c.status === "active" && (
                            <span className={daysLeft < 90 ? " text-amber-600" : ""}> ({daysLeft}d left)</span>
                          )}
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="text-right mr-2">
                          <p className="text-sm font-medium">{formatCurrency(c.value)}</p>
                          <Badge variant={c.status === "active" ? "default" : "destructive"} className="text-xs">
                            {c.status}
                          </Badge>
                        </div>
                        <Button variant="ghost" size="sm" className="h-7 w-7 p-0" onClick={() => generateContractPDF(c.id)} title="Download Contract PDF">
                          <Download className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
