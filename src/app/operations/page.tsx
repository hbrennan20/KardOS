"use client";

import { MetricCard } from "@/components/metric-card";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { operationsMetrics, salesOrders, formatCurrency } from "@/lib/data";
import { Clock, Truck, CheckCircle, Package, AlertTriangle } from "lucide-react";

export default function OperationsPage() {
  const pending = salesOrders.filter((o) => o.status === "pending" || o.status === "processing");
  const shipped = salesOrders.filter((o) => o.status === "shipped");

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Operational Performance</h1>
        <p className="text-sm text-muted-foreground">Fulfilment efficiency and delivery monitoring</p>
      </div>

      <div className="grid gap-4 grid-cols-2 lg:grid-cols-4">
        <MetricCard
          title="Avg Fulfilment Time"
          value={`${operationsMetrics.avgFulfilmentTime}h`}
          icon={Clock}
          subtitle="Order to dispatch"
        />
        <MetricCard
          title="Same-Day Rate"
          value={`${operationsMetrics.sameDayRate}%`}
          icon={CheckCircle}
        />
        <MetricCard
          title="Awaiting Dispatch"
          value={operationsMetrics.ordersAwaitingDispatch.toString()}
          icon={Package}
        />
        <MetricCard
          title="Delivery Success"
          value={`${operationsMetrics.deliverySuccessRate}%`}
          icon={Truck}
        />
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Fulfilment Queue</CardTitle>
          </CardHeader>
          <CardContent>
            {pending.length === 0 ? (
              <p className="text-sm text-muted-foreground">No orders awaiting fulfilment</p>
            ) : (
              <div className="space-y-3">
                {pending.map((order) => (
                  <div key={order.id} className="flex items-center justify-between border rounded-lg p-3">
                    <div>
                      <p className="font-medium text-sm">{order.id}</p>
                      <p className="text-xs text-muted-foreground">{order.customerName}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium">{formatCurrency(order.total)}</p>
                      <Badge variant={order.status === "processing" ? "default" : "outline"} className="text-xs">
                        {order.status}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">In Transit</CardTitle>
          </CardHeader>
          <CardContent>
            {shipped.length === 0 ? (
              <p className="text-sm text-muted-foreground">No orders in transit</p>
            ) : (
              <div className="space-y-3">
                {shipped.map((order) => (
                  <div key={order.id} className="flex items-center justify-between border rounded-lg p-3">
                    <div>
                      <p className="font-medium text-sm">{order.id}</p>
                      <p className="text-xs text-muted-foreground">{order.customerName}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium">{formatCurrency(order.total)}</p>
                      <Badge className="text-xs">shipped</Badge>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Performance Metrics</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6 lg:grid-cols-2">
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>Same-Day Fulfilment Rate</span>
                  <span className="font-medium">{operationsMetrics.sameDayRate}%</span>
                </div>
                <Progress value={operationsMetrics.sameDayRate} className="h-2" />
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>Delivery Success Rate</span>
                  <span className="font-medium">{operationsMetrics.deliverySuccessRate}%</span>
                </div>
                <Progress value={operationsMetrics.deliverySuccessRate} className="h-2" />
              </div>
            </div>
            <div className="space-y-4">
              <div className="flex items-center justify-between text-sm border rounded-lg p-3">
                <span>Orders Processed Today</span>
                <span className="font-bold text-lg">{operationsMetrics.ordersProcessedToday}</span>
              </div>
              <div className="flex items-center justify-between text-sm border rounded-lg p-3">
                <span>Orders Shipped Today</span>
                <span className="font-bold text-lg">{operationsMetrics.ordersShippedToday}</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-base flex items-center gap-2">
            <AlertTriangle className="h-4 w-4" />
            Operational Alerts
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3 text-sm">
            <div className="flex items-start gap-3">
              <div className="mt-0.5 h-2 w-2 rounded-full bg-red-500 shrink-0" />
              <p>V-Ring Seal 25mm out of stock — blocking 2 orders for WaterWipes and Glanbia</p>
            </div>
            <div className="flex items-start gap-3">
              <div className="mt-0.5 h-2 w-2 rounded-full bg-amber-500 shrink-0" />
              <p>PO-2891 from Hayley Group delayed — impacting SO-4521 for Abbott Ireland</p>
            </div>
            <div className="flex items-start gap-3">
              <div className="mt-0.5 h-2 w-2 rounded-full bg-blue-500 shrink-0" />
              <p>Warehouse pick efficiency at 94% this week — target is 96%</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
