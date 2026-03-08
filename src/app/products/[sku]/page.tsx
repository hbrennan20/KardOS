"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { products, suppliers, formatCurrency, formatPercent, formatNumber } from "@/lib/data";
import { ArrowLeft } from "lucide-react";

export default function ProductDetailPage() {
  const { sku } = useParams<{ sku: string }>();
  const product = products.find((p) => p.sku === sku);

  if (!product) {
    return (
      <div className="space-y-4">
        <Link href="/products" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground">
          <ArrowLeft className="h-4 w-4" /> Back to Products
        </Link>
        <p>Product not found.</p>
      </div>
    );
  }

  const supplier = suppliers.find((s) => s.id === product.supplier);
  const margin = ((product.price - product.cost) / product.price) * 100;
  const monthlyRevenue = product.price * product.monthlyDemand;
  const monthlyProfit = (product.price - product.cost) * product.monthlyDemand;
  const stockTurn = product.monthlyDemand > 0 ? (product.monthlyDemand * 12) / Math.max(product.stock, 1) : 0;
  const daysSupply = product.monthlyDemand > 0 ? Math.round((product.stock / product.monthlyDemand) * 30) : 999;

  return (
    <div className="space-y-6">
      <div>
        <Link href="/products" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground mb-2">
          <ArrowLeft className="h-4 w-4" /> Back to Products
        </Link>
        <h1 className="text-2xl font-bold tracking-tight mt-2">{product.name}</h1>
        <p className="text-sm text-muted-foreground font-mono">{product.sku} &middot; {product.category}</p>
      </div>

      <div className="grid gap-4 grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardContent className="pt-6">
            <p className="text-xs text-muted-foreground">Monthly Revenue</p>
            <p className="text-2xl font-bold">{formatCurrency(monthlyRevenue)}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <p className="text-xs text-muted-foreground">Monthly Profit</p>
            <p className="text-2xl font-bold">{formatCurrency(monthlyProfit)}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <p className="text-xs text-muted-foreground">Margin</p>
            <p className={`text-2xl font-bold ${margin < 25 ? "text-red-600" : ""}`}>{formatPercent(margin)}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <p className="text-xs text-muted-foreground">Stock Turn</p>
            <p className="text-2xl font-bold">{stockTurn.toFixed(1)}x</p>
            <p className="text-xs text-muted-foreground">annual</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Pricing</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between"><span className="text-muted-foreground">Cost Price</span><span className="font-medium">{formatCurrency(product.cost)}</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Sell Price</span><span className="font-medium">{formatCurrency(product.price)}</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Gross Margin</span><span className={`font-medium ${margin < 25 ? "text-red-600" : ""}`}>{formatPercent(margin)}</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Markup</span><span className="font-medium">{(((product.price - product.cost) / product.cost) * 100).toFixed(1)}%</span></div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">Stock & Demand</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between"><span className="text-muted-foreground">Current Stock</span><span className="font-medium">{formatNumber(product.stock)}</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Monthly Demand</span><span className="font-medium">{formatNumber(product.monthlyDemand)}</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Days Supply</span><span className="font-medium">{daysSupply === 999 ? "N/A" : daysSupply}</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Stock Value</span><span className="font-medium">{formatCurrency(product.cost * product.stock)}</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Last Sale</span><span className="font-medium">{product.lastSaleDate}</span></div>
            </div>
          </CardContent>
        </Card>
      </div>

      {supplier && (
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Supplier</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 grid-cols-2 lg:grid-cols-4 text-sm">
              <div>
                <p className="text-muted-foreground">Name</p>
                <Link href={`/suppliers/${supplier.id}`} className="font-medium text-blue-600 hover:underline">{supplier.name}</Link>
              </div>
              <div>
                <p className="text-muted-foreground">Category</p>
                <p className="font-medium">{supplier.category}</p>
              </div>
              <div>
                <p className="text-muted-foreground">Lead Time</p>
                <p className="font-medium">{supplier.avgLeadTime} days</p>
              </div>
              <div>
                <p className="text-muted-foreground">On-Time Delivery</p>
                <p className="font-medium">{supplier.onTimeDelivery}%</p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
