"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { suppliers, products, formatCurrency, formatPercent } from "@/lib/data";
import { ArrowLeft } from "lucide-react";

export default function SupplierDetailPage() {
  const { id } = useParams<{ id: string }>();
  const supplier = suppliers.find((s) => s.id === id);

  if (!supplier) {
    return (
      <div className="space-y-4">
        <Link href="/suppliers" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground">
          <ArrowLeft className="h-4 w-4" /> Back to Suppliers
        </Link>
        <p>Supplier not found.</p>
      </div>
    );
  }

  const supplierProducts = products.filter((p) => p.supplier === supplier.id);
  const totalProductValue = supplierProducts.reduce((s, p) => s + p.cost * p.stock, 0);

  return (
    <div className="space-y-6">
      <div>
        <Link href="/suppliers" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground mb-2">
          <ArrowLeft className="h-4 w-4" /> Back to Suppliers
        </Link>
        <h1 className="text-2xl font-bold tracking-tight mt-2">{supplier.name}</h1>
        <p className="text-sm text-muted-foreground">{supplier.category} &middot; {supplier.id} &middot; {supplier.yearsSupplying} years supplying</p>
      </div>

      <div className="grid gap-4 grid-cols-2 lg:grid-cols-5">
        <Card>
          <CardContent className="pt-6">
            <p className="text-xs text-muted-foreground">Total Spend</p>
            <p className="text-2xl font-bold">{formatCurrency(supplier.totalSpend)}</p>
            <p className="text-xs text-muted-foreground">Last 12 months</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <p className="text-xs text-muted-foreground">Avg Margin</p>
            <p className="text-2xl font-bold">{formatPercent(supplier.avgMargin)}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <p className="text-xs text-muted-foreground">Lead Time</p>
            <p className="text-2xl font-bold">{supplier.avgLeadTime} days</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <p className="text-xs text-muted-foreground">On-Time Delivery</p>
            <p className="text-2xl font-bold">{supplier.onTimeDelivery}%</p>
            <Progress value={supplier.onTimeDelivery} className="h-2 mt-2" />
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <p className="text-xs text-muted-foreground">Outstanding POs</p>
            <p className="text-2xl font-bold">{formatCurrency(supplier.outstandingPOs)}</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Products from {supplier.name}</CardTitle>
        </CardHeader>
        <CardContent>
          {supplierProducts.length === 0 ? (
            <p className="text-sm text-muted-foreground">No products linked to this supplier.</p>
          ) : (
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b text-muted-foreground text-left">
                  <th className="pb-2 font-medium">SKU</th>
                  <th className="pb-2 font-medium">Product</th>
                  <th className="pb-2 font-medium">Category</th>
                  <th className="pb-2 font-medium text-right">Cost</th>
                  <th className="pb-2 font-medium text-right">Price</th>
                  <th className="pb-2 font-medium text-right">Stock</th>
                  <th className="pb-2 font-medium text-right">Stock Value</th>
                </tr>
              </thead>
              <tbody>
                {supplierProducts.map((p) => (
                  <tr key={p.sku} className="border-b last:border-0 hover:bg-muted/50 cursor-pointer" onClick={() => window.location.href = `/products/${p.sku}`}>
                    <td className="py-2 font-mono text-xs">{p.sku}</td>
                    <td className="py-2">{p.name}</td>
                    <td className="py-2"><Badge variant="secondary" className="text-xs">{p.category}</Badge></td>
                    <td className="py-2 text-right">{formatCurrency(p.cost)}</td>
                    <td className="py-2 text-right">{formatCurrency(p.price)}</td>
                    <td className="py-2 text-right">{p.stock}</td>
                    <td className="py-2 text-right">{formatCurrency(p.cost * p.stock)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
          <p className="text-xs text-muted-foreground mt-3">Total inventory value from this supplier: {formatCurrency(totalProductValue)}</p>
        </CardContent>
      </Card>
    </div>
  );
}
