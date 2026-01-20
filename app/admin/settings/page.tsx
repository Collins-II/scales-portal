"use client"

import * as React from "react"
import {
  Card,
  CardContent,
  CardHeader,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Switch } from "@/components/ui/switch"
import { Button } from "@/components/ui/button"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Loader2 } from "lucide-react"

type Settings = {
  siteName: string
  siteEmail: string
  sitePhone: string
  logoUrl: string
  currency: string
  enableEmails: boolean
  enableSms: boolean
  maintenanceMode: boolean
}

export default function GeneralSettingsPage() {
  const [settings, setSettings] = React.useState<Settings | null>(null)
  const [saving, setSaving] = React.useState(false)

  React.useEffect(() => {
    fetch("/api/admin/settings")
      .then((r) => r.json())
      .then(setSettings)
  }, [])

  async function save() {
    setSaving(true)
    await fetch("/api/admin/settings", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(settings),
    })
    setSaving(false)
  }

  if (!settings) {
    return (
      <div className="flex justify-center py-20 text-muted-foreground">
        <Loader2 className="animate-spin mr-2" />
        Loading settings
      </div>
    )
  }

  return (
    <div className="max-w-4xl space-y-6 text-red-500">
      <div>
        <h1 className="text-2xl font-bold ">General Settings</h1>
        <p className="text-sm text-muted-foreground">
          System-wide configuration
        </p>
      </div>

      <Tabs defaultValue="company">
        <TabsList className="text-red-500">
          <TabsTrigger value="company">Company</TabsTrigger>
          <TabsTrigger value="branding">Branding</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="system">System</TabsTrigger>
        </TabsList>

        {/* Company */}
        <TabsContent value="company">
          <Card>
            <CardHeader className="font-semibold">
              Company Information
            </CardHeader>
            <CardContent className="space-y-4">
              <Input
                value={settings.siteName}
                onChange={(e) =>
                  setSettings({ ...settings, siteName: e.target.value })
                }
                placeholder="Company name"
              />
              <Input
                value={settings.siteEmail}
                onChange={(e) =>
                  setSettings({ ...settings, siteEmail: e.target.value })
                }
                placeholder="Support email"
              />
              <Input
                value={settings.sitePhone}
                onChange={(e) =>
                  setSettings({ ...settings, sitePhone: e.target.value })
                }
                placeholder="Phone number"
              />
            </CardContent>
          </Card>
        </TabsContent>

        {/* Branding */}
        <TabsContent value="branding">
          <Card>
            <CardHeader className="font-semibold">Branding</CardHeader>
            <CardContent className="space-y-4">
              <Input
                value={settings.logoUrl}
                onChange={(e) =>
                  setSettings({ ...settings, logoUrl: e.target.value })
                }
                placeholder="Logo URL"
              />
              <Input
                value={settings.currency}
                onChange={(e) =>
                  setSettings({ ...settings, currency: e.target.value })
                }
                placeholder="Currency (ZMW)"
              />
            </CardContent>
          </Card>
        </TabsContent>

        {/* Notifications */}
        <TabsContent value="notifications">
          <Card>
            <CardHeader className="font-semibold">
              Notifications
            </CardHeader>
            <CardContent className="space-y-4">
              <Toggle
                label="Enable email notifications"
                checked={settings.enableEmails}
                onChange={(v) =>
                  setSettings({ ...settings, enableEmails: v })
                }
              />
              <Toggle
                label="Enable SMS alerts"
                checked={settings.enableSms}
                onChange={(v) =>
                  setSettings({ ...settings, enableSms: v })
                }
              />
            </CardContent>
          </Card>
        </TabsContent>

        {/* System */}
        <TabsContent value="system">
          <Card>
            <CardHeader className="font-semibold">System</CardHeader>
            <CardContent className="space-y-4">
              <Toggle
                label="Maintenance mode"
                checked={settings.maintenanceMode}
                onChange={(v) =>
                  setSettings({ ...settings, maintenanceMode: v })
                }
              />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <div className="flex justify-end">
        <Button onClick={save} disabled={saving}>
          {saving ? "Saving..." : "Save Changes"}
        </Button>
      </div>
    </div>
  )
}

/* -----------------------------
   Toggle Helper
----------------------------- */
function Toggle({
  label,
  checked,
  onChange,
}: {
  label: string
  checked: boolean
  onChange: (v: boolean) => void
}) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-sm">{label}</span>
      <Switch checked={checked} onCheckedChange={onChange} />
    </div>
  )
}
