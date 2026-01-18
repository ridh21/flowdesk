"use client"

import * as React from "react"
import { Loader2, Save } from "lucide-react"
import { toast } from "sonner"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export default function AdminSettingsPage() {
  const [isLoading, setIsLoading] = React.useState(false)
  const [settings, setSettings] = React.useState({
    organizationName: "FlowDesk Inc.",
    organizationUrl: "flowdesk",
    supportEmail: "support@flowdesk.io",
    allowSignups: true,
    requireEmailVerification: true,
    allowSocialLogin: true,
    sessionTimeout: "24",
    maxLoginAttempts: "5",
    passwordMinLength: "8",
    requireMFA: false,
    allowApiAccess: true,
    apiRateLimit: "1000",
    maintenanceMode: false,
    maintenanceMessage: "",
  })

  const updateSetting = (key: string, value: string | boolean) => {
    setSettings((prev) => ({ ...prev, [key]: value }))
  }

  const handleSave = async () => {
    setIsLoading(true)
    await new Promise((resolve) => setTimeout(resolve, 1000))
    setIsLoading(false)
    toast.success("Settings saved successfully")
  }

  return (
    <div className="space-y-6">
      {/* Organization */}
      <Card>
        <CardHeader>
          <CardTitle>Organization</CardTitle>
          <CardDescription>
            General organization settings and branding
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label>Organization Name</Label>
              <Input
                value={settings.organizationName}
                onChange={(e) => updateSetting("organizationName", e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label>Organization URL</Label>
              <div className="flex">
                <span className="flex items-center px-3 border border-r-0 rounded-l-md bg-muted text-muted-foreground text-sm">
                  flowdesk.app/
                </span>
                <Input
                  value={settings.organizationUrl}
                  onChange={(e) => updateSetting("organizationUrl", e.target.value)}
                  className="rounded-l-none"
                />
              </div>
            </div>
          </div>
          <div className="space-y-2">
            <Label>Support Email</Label>
            <Input
              type="email"
              value={settings.supportEmail}
              onChange={(e) => updateSetting("supportEmail", e.target.value)}
            />
          </div>
        </CardContent>
      </Card>

      {/* Authentication */}
      <Card>
        <CardHeader>
          <CardTitle>Authentication</CardTitle>
          <CardDescription>
            Configure how users sign up and log in
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <Label>Allow Signups</Label>
              <p className="text-sm text-muted-foreground">
                Allow new users to create accounts
              </p>
            </div>
            <Switch
              checked={settings.allowSignups}
              onCheckedChange={(checked) => updateSetting("allowSignups", checked)}
            />
          </div>
          <Separator />
          <div className="flex items-center justify-between">
            <div>
              <Label>Require Email Verification</Label>
              <p className="text-sm text-muted-foreground">
                Users must verify their email before accessing the app
              </p>
            </div>
            <Switch
              checked={settings.requireEmailVerification}
              onCheckedChange={(checked) => updateSetting("requireEmailVerification", checked)}
            />
          </div>
          <Separator />
          <div className="flex items-center justify-between">
            <div>
              <Label>Social Login</Label>
              <p className="text-sm text-muted-foreground">
                Allow users to sign in with Google, GitHub, etc.
              </p>
            </div>
            <Switch
              checked={settings.allowSocialLogin}
              onCheckedChange={(checked) => updateSetting("allowSocialLogin", checked)}
            />
          </div>
          <Separator />
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label>Session Timeout (hours)</Label>
              <Select
                value={settings.sessionTimeout}
                onValueChange={(value) => updateSetting("sessionTimeout", value)}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">1 hour</SelectItem>
                  <SelectItem value="8">8 hours</SelectItem>
                  <SelectItem value="24">24 hours</SelectItem>
                  <SelectItem value="168">7 days</SelectItem>
                  <SelectItem value="720">30 days</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Max Login Attempts</Label>
              <Select
                value={settings.maxLoginAttempts}
                onValueChange={(value) => updateSetting("maxLoginAttempts", value)}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="3">3 attempts</SelectItem>
                  <SelectItem value="5">5 attempts</SelectItem>
                  <SelectItem value="10">10 attempts</SelectItem>
                  <SelectItem value="0">Unlimited</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Security */}
      <Card>
        <CardHeader>
          <CardTitle>Security</CardTitle>
          <CardDescription>
            Password and security requirements
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label>Minimum Password Length</Label>
            <Select
              value={settings.passwordMinLength}
              onValueChange={(value) => updateSetting("passwordMinLength", value)}
            >
              <SelectTrigger className="w-[200px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="6">6 characters</SelectItem>
                <SelectItem value="8">8 characters</SelectItem>
                <SelectItem value="10">10 characters</SelectItem>
                <SelectItem value="12">12 characters</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <Separator />
          <div className="flex items-center justify-between">
            <div>
              <Label>Require Two-Factor Authentication</Label>
              <p className="text-sm text-muted-foreground">
                Force all users to enable 2FA
              </p>
            </div>
            <Switch
              checked={settings.requireMFA}
              onCheckedChange={(checked) => updateSetting("requireMFA", checked)}
            />
          </div>
        </CardContent>
      </Card>

      {/* API */}
      <Card>
        <CardHeader>
          <CardTitle>API Access</CardTitle>
          <CardDescription>
            Configure API access and rate limiting
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <Label>Enable API Access</Label>
              <p className="text-sm text-muted-foreground">
                Allow users to generate API keys
              </p>
            </div>
            <Switch
              checked={settings.allowApiAccess}
              onCheckedChange={(checked) => updateSetting("allowApiAccess", checked)}
            />
          </div>
          {settings.allowApiAccess && (
            <>
              <Separator />
              <div className="space-y-2">
                <Label>Rate Limit (requests/hour)</Label>
                <Select
                  value={settings.apiRateLimit}
                  onValueChange={(value) => updateSetting("apiRateLimit", value)}
                >
                  <SelectTrigger className="w-[200px]">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="100">100 requests</SelectItem>
                    <SelectItem value="500">500 requests</SelectItem>
                    <SelectItem value="1000">1,000 requests</SelectItem>
                    <SelectItem value="5000">5,000 requests</SelectItem>
                    <SelectItem value="0">Unlimited</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </>
          )}
        </CardContent>
      </Card>

      {/* Maintenance */}
      <Card>
        <CardHeader>
          <CardTitle>Maintenance Mode</CardTitle>
          <CardDescription>
            Temporarily disable access to the application
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <Label>Enable Maintenance Mode</Label>
              <p className="text-sm text-muted-foreground">
                Show maintenance page to all users (except admins)
              </p>
            </div>
            <Switch
              checked={settings.maintenanceMode}
              onCheckedChange={(checked) => updateSetting("maintenanceMode", checked)}
            />
          </div>
          {settings.maintenanceMode && (
            <>
              <Separator />
              <div className="space-y-2">
                <Label>Maintenance Message</Label>
                <Textarea
                  value={settings.maintenanceMessage}
                  onChange={(e) => updateSetting("maintenanceMessage", e.target.value)}
                  placeholder="We're currently performing scheduled maintenance..."
                  rows={3}
                />
              </div>
            </>
          )}
        </CardContent>
      </Card>

      <div className="flex justify-end">
        <Button onClick={handleSave} disabled={isLoading}>
          {isLoading ? (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            <Save className="mr-2 h-4 w-4" />
          )}
          Save Settings
        </Button>
      </div>
    </div>
  )
}
