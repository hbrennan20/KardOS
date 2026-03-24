"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { SearchDialog } from "@/components/search-dialog";
import { NotificationBell } from "@/components/notification-bell";
import {
  LayoutDashboard,
  Banknote,
  Truck,
  Package,
  ShoppingCart,
  Users,
  BarChart3,
  Activity,
  ShieldAlert,
  FileText,
  Settings,
} from "lucide-react";

const navItems = [
  { href: "/", label: "Executive Dashboard", icon: LayoutDashboard },
  { href: "/financial", label: "Financial", icon: Banknote },
  { href: "/suppliers", label: "Suppliers & Procurement", icon: Truck },
  { href: "/inventory", label: "Inventory", icon: Package },
  { href: "/sales", label: "Sales Orders", icon: ShoppingCart },
  { href: "/customers", label: "Customers & CRM", icon: Users },
  { href: "/contracts", label: "Contracts", icon: FileText },
  { href: "/products", label: "Product Analytics", icon: BarChart3 },
  { href: "/operations", label: "Operations", icon: Activity },
  { href: "/risk", label: "Risk Monitoring", icon: ShieldAlert },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="fixed inset-y-0 left-0 z-30 w-64 border-r bg-card flex flex-col">
      <div className="flex h-16 items-center justify-between border-b px-6">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground font-bold text-sm">
            K
          </div>
          <div>
            <h1 className="text-sm font-semibold leading-none">Kard OS</h1>
            <p className="text-[10px] text-muted-foreground">Engineering & Supplies</p>
          </div>
        </div>
        <NotificationBell />
      </div>

      <div className="px-3 pt-3">
        <SearchDialog />
      </div>

      <nav className="flex-1 overflow-y-auto py-3 px-3">
        <ul className="space-y-1">
          {navItems.map((item) => {
            const isActive =
              item.href === "/"
                ? pathname === "/"
                : pathname.startsWith(item.href);
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={cn(
                    "flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors",
                    isActive
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:bg-muted hover:text-foreground"
                  )}
                >
                  <item.icon className="h-4 w-4 shrink-0" />
                  {item.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
      <div className="border-t p-3">
        <Link
          href="/settings"
          className={cn(
            "flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors",
            pathname === "/settings"
              ? "bg-primary text-primary-foreground"
              : "text-muted-foreground hover:bg-muted hover:text-foreground"
          )}
        >
          <Settings className="h-4 w-4 shrink-0" />
          Settings
        </Link>
        <div className="mt-2 px-3">
          <p className="text-[10px] text-muted-foreground">Kard Engineering & Supplies Ltd</p>
          <p className="text-[10px] text-muted-foreground">Dublin, Ireland</p>
        </div>
      </div>
    </aside>
  );
}
