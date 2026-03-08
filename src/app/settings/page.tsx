"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Building, Users, Bell, Shield, Database, Globe } from "lucide-react";

export default function SettingsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Settings</h1>
        <p className="text-sm text-muted-foreground">System configuration and company settings</p>
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <Building className="h-4 w-4" />
              Company Information
            </CardTitle>
            <CardDescription>Business details and registration</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3 text-sm">
              {[
                ["Company Name", "Kard Engineering & Supplies Ltd"],
                ["Registration No.", "456789"],
                ["VAT Number", "IE 1234567T"],
                ["Address", "Unit 4, Kylemore Industrial Estate, Dublin 12"],
                ["Phone", "+353 1 456 7890"],
                ["Email", "info@kardengineering.ie"],
                ["Website", "www.kardengineering.ie"],
              ].map(([label, value]) => (
                <div key={label} className="flex justify-between">
                  <span className="text-muted-foreground">{label}</span>
                  <span className="font-medium">{value}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <Users className="h-4 w-4" />
              Team
            </CardTitle>
            <CardDescription>Users and access management</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {[
                { name: "Hugh Brennan", role: "Director", email: "hugh@kardengineering.ie", status: "active" },
                { name: "Tom Kearns", role: "Sales Manager", email: "tom@kardengineering.ie", status: "active" },
                { name: "Mark Byrne", role: "Sales Rep", email: "mark@kardengineering.ie", status: "active" },
                { name: "Lisa Nolan", role: "Sales Rep", email: "lisa@kardengineering.ie", status: "active" },
                { name: "Sarah Murphy", role: "Accounts", email: "sarah@kardengineering.ie", status: "active" },
              ].map((user) => (
                <div key={user.email} className="flex items-center justify-between text-sm">
                  <div>
                    <p className="font-medium">{user.name}</p>
                    <p className="text-xs text-muted-foreground">{user.email}</p>
                  </div>
                  <Badge variant="secondary" className="text-xs">{user.role}</Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <Bell className="h-4 w-4" />
              Notification Preferences
            </CardTitle>
            <CardDescription>Alert thresholds and notification settings</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3 text-sm">
              {[
                ["Low Stock Alert Threshold", "< 14 days supply"],
                ["Invoice Overdue Alert", "After 30 days"],
                ["Critical Credit Utilisation", "> 80%"],
                ["Dormant Customer Alert", "> 90 days no order"],
                ["Supplier Late Delivery", "> 2 days overdue"],
                ["Margin Decline Alert", "> 2% quarterly drop"],
              ].map(([label, value]) => (
                <div key={label} className="flex justify-between">
                  <span className="text-muted-foreground">{label}</span>
                  <span className="font-medium">{value}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <Database className="h-4 w-4" />
              System Information
            </CardTitle>
            <CardDescription>Platform status and configuration</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3 text-sm">
              {[
                ["Platform", "KardOS v1.0"],
                ["Environment", "Production"],
                ["Database", "Connected"],
                ["AI Engine", "Active — 8 opportunities detected"],
                ["Last Backup", "2026-03-08 04:00"],
                ["API Status", "Operational"],
                ["Uptime", "99.9%"],
              ].map(([label, value]) => (
                <div key={label} className="flex justify-between">
                  <span className="text-muted-foreground">{label}</span>
                  <span className="font-medium">{value}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <Globe className="h-4 w-4" />
              Regional Settings
            </CardTitle>
            <CardDescription>Locale and formatting preferences</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3 text-sm">
              {[
                ["Currency", "EUR (Euro)"],
                ["Locale", "en-IE (Ireland)"],
                ["Timezone", "Europe/Dublin (GMT/IST)"],
                ["Date Format", "DD/MM/YYYY"],
                ["VAT Rate", "23%"],
                ["Fiscal Year", "January — December"],
              ].map(([label, value]) => (
                <div key={label} className="flex justify-between">
                  <span className="text-muted-foreground">{label}</span>
                  <span className="font-medium">{value}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <Shield className="h-4 w-4" />
              Security
            </CardTitle>
            <CardDescription>Authentication and compliance</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3 text-sm">
              {[
                ["Authentication", "SSO + 2FA"],
                ["Session Timeout", "30 minutes"],
                ["Password Policy", "12+ characters, mixed case"],
                ["Audit Logging", "Enabled"],
                ["Data Retention", "7 years"],
                ["GDPR Compliance", "Compliant"],
              ].map(([label, value]) => (
                <div key={label} className="flex justify-between">
                  <span className="text-muted-foreground">{label}</span>
                  <span className="font-medium">{value}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
