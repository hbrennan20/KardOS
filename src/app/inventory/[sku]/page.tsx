"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { products, suppliers, formatCurrency, formatNumber, formatPercent } from "@/lib/data";
import { ArrowLeft } from "lucide-react";

export default function InventoryDetailPage() {
  const { sku } = useParams<{ sku: string }>();
  const product = products.find((p) => p.sku === sku);

  if (!product) {
    return (
      <div className="space-y-4">
        <Link href="/inventory" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground">
          <ArrowLeft className="h-4 w-4" /> Back to Inventory
        </Link>
        <p>Product not found.</p>
      </div>
    );
  }

  const supplier = suppliers.find((s) => s.id === product.supplier);
  const daysSupply = product.monthlyDemand > 0 ? Math.round((product.stock / product.monthlyDemand) * 30) : 999;
  const status = product.stock === 0 ? "out" : daysSupply < 14 ? "low" : daysSupply > 120 ? "overstock" : "ok";
  const margin = ((product.price - product.cost) / product.price) * 100;

  return (
    <div className="space-y-6">
      <div>
        <Link href="/inventory" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground mb-2">
          <ArrowLeft className="h-4 w-4" /> Back to Inventory
        </Link>
        <div className="flex items-center gap-3 mt-2">
          <h1 className="text-2xl font-bold tracking-tight">{product.name}</h1>
          <Badge variant={status === "ok" ? "secondary" : "destructive"}
            className={status === "overstock" ? "bg-amber-100 text-amber-800 hover:bg-amber-100" : ""}>
            {status === "out" ? "Out of Stock" : status === "low" ? "Low Stock" : status === "overstock" ? "Overstock" : "OK"}
          </Badge>
        </div>
        <p className="text-sm text-muted-foreground font-mono">{product.sku} &middot; {product.category}</p>
      </div>

      <div className="grid gap-4 grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardContent className="pt-6">
            <p className="text-xs text-muted-foreground">Current Stock</p>
            <p className="text-2xl font-bold">{formatNumber(product.stock)}</p>
            <p className="text-xs text-muted-foreground">{daysSupply === 999 ? "N/A" : `${daysSupply} days supply`}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <p className="text-xs text-muted-foreground">Stock Value</p>
            <p className="text-2xl font-bold">{formatCurrency(product.cost * product.stock)}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <p className="text-xs text-muted-foreground">Monthly Demand</p>
            <p className="text-2xl font-bold">{formatNumber(product.monthlyDemand)}</p>
            <p className="text-xs text-muted-foreground">units / month</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <p className="text-xs text-muted-foreground">Last Sale</p>
            <p className="text-2xl font-bold">{product.lastSaleDate}</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Pricing & Margin</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between"><span className="text-muted-foreground">Cost Price</span><span className="font-medium">{formatCurrency(product.cost)}</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Sell Price</span><span className="font-medium">{formatCurrency(product.price)}</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Margin</span><span className={`font-medium ${margin < 25 ? "text-red-600" : ""}`}>{formatPercent(margin)}</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Monthly Revenue (est)</span><span className="font-medium">{formatCurrency(product.price * product.monthlyDemand)}</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Monthly Profit (est)</span><span className="font-medium">{formatCurrency((product.price - product.cost) * product.monthlyDemand)}</span></div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">Supplier</CardTitle>
          </CardHeader>
          <CardContent>
            {supplier ? (
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Supplier</span>
                  <Link href={`/suppliers/${supplier.id}`} className="font-medium text-blue-600 hover:underline">{supplier.name}</Link>
                </div>
                <div className="flex justify-between"><span className="text-muted-foreground">Category</span><span>{supplier.category}</span></div>
                <div className="flex justify-between"><span className="text-muted-foreground">Lead Time</span><span>{supplier.avgLeadTime} days</span></div>
                <div className="flex justify-between"><span className="text-muted-foreground">On-Time Delivery</span><span>{supplier.onTimeDelivery}%</span></div>
              </div>
            ) : (
              <p className="text-sm text-muted-foreground">Supplier not found.</p>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
