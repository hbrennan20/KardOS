"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { salesOrders, customers, products, formatCurrency } from "@/lib/data";
import { generateOrderPDF, generateInvoicePDF } from "@/lib/generate-pdf";
import { ArrowLeft, Download, FileText } from "lucide-react";

export default function SalesOrderDetailPage() {
  const { id } = useParams<{ id: string }>();
  const order = salesOrders.find((o) => o.id === id);

  if (!order) {
    return (
      <div className="space-y-4">
        <Link href="/sales" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground">
          <ArrowLeft className="h-4 w-4" /> Back to Sales
        </Link>
        <p>Order not found.</p>
      </div>
    );
  }

  const customer = customers.find((c) => c.id === order.customer);
  const statusColor = order.status === "delivered" ? "secondary" : order.status === "shipped" ? "default" : order.status === "processing" ? "outline" : "destructive";

  const sampleItems = products.slice(0, Math.min(order.items, 6)).map((p, i) => {
    const qty = ((i + 3) * 7) % 20 + 1;
    return { ...p, qty, lineTotal: p.price * qty };
  });
  const subtotal = order.total * 0.81;
  const vat = order.total * 0.19;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <Link href="/sales" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground mb-2">
            <ArrowLeft className="h-4 w-4" /> Back to Sales
          </Link>
          <div className="flex items-center gap-3 mt-2">
            <h1 className="text-2xl font-bold tracking-tight">{order.id}</h1>
            <Badge variant={statusColor} className="text-xs">{order.status}</Badge>
          </div>
          <p className="text-sm text-muted-foreground">{order.customerName} — {order.date}</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={() => generateOrderPDF(order.id)}>
            <Download className="h-4 w-4 mr-2" />
            Order PDF
          </Button>
          <Button variant="outline" size="sm" onClick={() => generateInvoicePDF(order.id)}>
            <FileText className="h-4 w-4 mr-2" />
            Invoice PDF
          </Button>
        </div>
      </div>

      <div className="grid gap-4 grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardContent className="pt-6">
            <p className="text-xs text-muted-foreground">Order Total</p>
            <p className="text-2xl font-bold">{formatCurrency(order.total)}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <p className="text-xs text-muted-foreground">Items</p>
            <p className="text-2xl font-bold">{order.items}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <p className="text-xs text-muted-foreground">Salesperson</p>
            <p className="text-2xl font-bold">{order.salesperson}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <p className="text-xs text-muted-foreground">Customer</p>
            <Link href={`/customers/${order.customer}`} className="text-2xl font-bold text-blue-600 hover:underline">
              {order.customerName}
            </Link>
            {customer && <p className="text-xs text-muted-foreground">{customer.sector}</p>}
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Line Items</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b text-muted-foreground text-left">
                  <th className="pb-2 font-medium">SKU</th>
                  <th className="pb-2 font-medium">Product</th>
                  <th className="pb-2 font-medium text-right">Unit Price</th>
                  <th className="pb-2 font-medium text-right">Qty</th>
                  <th className="pb-2 font-medium text-right">Line Total</th>
                </tr>
              </thead>
              <tbody>
                {sampleItems.map((item) => (
                  <tr key={item.sku} className="border-b last:border-0">
                    <td className="py-2 font-mono text-xs">{item.sku}</td>
                    <td className="py-2">{item.name}</td>
                    <td className="py-2 text-right">{formatCurrency(item.price)}</td>
                    <td className="py-2 text-right">{item.qty}</td>
                    <td className="py-2 text-right font-medium">{formatCurrency(item.lineTotal)}</td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr className="border-t">
                  <td colSpan={4} className="py-2 text-right text-muted-foreground">Subtotal</td>
                  <td className="py-2 text-right">{formatCurrency(subtotal)}</td>
                </tr>
                <tr>
                  <td colSpan={4} className="py-1 text-right text-muted-foreground">VAT (23%)</td>
                  <td className="py-1 text-right">{formatCurrency(vat)}</td>
                </tr>
                <tr className="border-t font-bold">
                  <td colSpan={4} className="py-2 text-right">Total</td>
                  <td className="py-2 text-right">{formatCurrency(order.total)}</td>
                </tr>
              </tfoot>
            </table>
          </div>
        </CardContent>
      </Card>

      {customer && (
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Customer Summary</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 grid-cols-2 lg:grid-cols-4 text-sm">
              <div>
                <p className="text-muted-foreground">Lifetime Value</p>
                <p className="font-medium">{formatCurrency(customer.lifetimeValue)}</p>
              </div>
              <div>
                <p className="text-muted-foreground">Outstanding Balance</p>
                <p className="font-medium">{formatCurrency(customer.outstandingBalance)}</p>
              </div>
              <div>
                <p className="text-muted-foreground">Credit Limit</p>
                <p className="font-medium">{formatCurrency(customer.creditLimit)}</p>
              </div>
              <div>
                <p className="text-muted-foreground">Avg Order Value</p>
                <p className="font-medium">{formatCurrency(customer.avgOrderValue)}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
