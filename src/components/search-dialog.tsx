"use client";

import { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import { Search } from "lucide-react";
import { customers, suppliers, products, salesOrders, contracts } from "@/lib/data";

interface SearchResult {
  type: string;
  label: string;
  sublabel: string;
  href: string;
}

export function SearchDialog() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const router = useRouter();

  const results = useMemo(() => {
    if (!query || query.length < 2) return [];
    const q = query.toLowerCase();
    const results: SearchResult[] = [];

    customers.forEach((c) => {
      if (c.name.toLowerCase().includes(q) || c.id.toLowerCase().includes(q) || c.sector.toLowerCase().includes(q)) {
        results.push({ type: "Customer", label: c.name, sublabel: c.sector, href: `/customers/${c.id}` });
      }
    });

    suppliers.forEach((s) => {
      if (s.name.toLowerCase().includes(q) || s.id.toLowerCase().includes(q) || s.category.toLowerCase().includes(q)) {
        results.push({ type: "Supplier", label: s.name, sublabel: s.category, href: `/suppliers/${s.id}` });
      }
    });

    products.forEach((p) => {
      if (p.name.toLowerCase().includes(q) || p.sku.toLowerCase().includes(q) || p.category.toLowerCase().includes(q)) {
        results.push({ type: "Product", label: p.name, sublabel: p.sku, href: `/products/${p.sku}` });
      }
    });

    salesOrders.forEach((o) => {
      if (o.id.toLowerCase().includes(q) || o.customerName.toLowerCase().includes(q)) {
        results.push({ type: "Order", label: o.id, sublabel: o.customerName, href: `/sales/${o.id}` });
      }
    });

    contracts.forEach((c) => {
      if (c.id.toLowerCase().includes(q) || c.customerName.toLowerCase().includes(q) || c.type.toLowerCase().includes(q)) {
        results.push({ type: "Contract", label: c.id, sublabel: `${c.customerName} — ${c.type}`, href: `/customers/${c.customer}` });
      }
    });

    return results.slice(0, 8);
  }, [query]);

  function navigate(href: string) {
    setOpen(false);
    setQuery("");
    router.push(href);
  }

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="flex items-center gap-2 w-full rounded-lg border bg-background px-3 py-2 text-sm text-muted-foreground hover:bg-muted transition-colors"
      >
        <Search className="h-4 w-4" />
        <span>Search...</span>
        <kbd className="ml-auto text-[10px] bg-muted px-1.5 py-0.5 rounded font-mono">⌘K</kbd>
      </button>

      {open && (
        <div className="fixed inset-0 z-50 flex items-start justify-center pt-[20vh]" onClick={() => setOpen(false)}>
          <div className="fixed inset-0 bg-black/50" />
          <div
            className="relative z-50 w-full max-w-lg bg-card rounded-xl shadow-2xl border overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center gap-3 border-b px-4 py-3">
              <Search className="h-5 w-5 text-muted-foreground shrink-0" />
              <input
                autoFocus
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search customers, orders, products..."
                className="flex-1 bg-transparent outline-none text-sm placeholder:text-muted-foreground"
              />
              <kbd
                className="text-xs bg-muted px-2 py-1 rounded font-mono text-muted-foreground cursor-pointer"
                onClick={() => setOpen(false)}
              >
                ESC
              </kbd>
            </div>
            {results.length > 0 && (
              <ul className="max-h-80 overflow-y-auto py-2">
                {results.map((r, i) => (
                  <li key={i}>
                    <button
                      onClick={() => navigate(r.href)}
                      className="flex items-center gap-3 w-full px-4 py-2.5 text-left hover:bg-muted transition-colors"
                    >
                      <span className="text-[10px] font-medium text-muted-foreground bg-muted rounded px-1.5 py-0.5 w-16 text-center shrink-0">
                        {r.type}
                      </span>
                      <div className="min-w-0">
                        <p className="text-sm font-medium truncate">{r.label}</p>
                        <p className="text-xs text-muted-foreground truncate">{r.sublabel}</p>
                      </div>
                    </button>
                  </li>
                ))}
              </ul>
            )}
            {query.length >= 2 && results.length === 0 && (
              <div className="py-8 text-center text-sm text-muted-foreground">No results found</div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
