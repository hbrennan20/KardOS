import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface Alert {
  id: number;
  type: "warning" | "critical" | "info";
  category: string;
  message: string;
  date: string;
}

export function AlertList({ alerts, limit }: { alerts: Alert[]; limit?: number }) {
  const items = limit ? alerts.slice(0, limit) : alerts;
  return (
    <div className="space-y-3">
      {items.map((alert) => (
        <div key={alert.id} className="flex items-start gap-3 text-sm">
          <div
            className={cn(
              "mt-0.5 h-2 w-2 shrink-0 rounded-full",
              alert.type === "critical" && "bg-red-500",
              alert.type === "warning" && "bg-amber-500",
              alert.type === "info" && "bg-blue-500"
            )}
          />
          <div className="flex-1 min-w-0">
            <p className="leading-snug">{alert.message}</p>
            <div className="flex items-center gap-2 mt-1">
              <Badge variant="secondary" className="text-[10px]">{alert.category}</Badge>
              <span className="text-[10px] text-muted-foreground">{alert.date}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
