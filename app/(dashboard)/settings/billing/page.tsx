"use client"

import * as React from "react"
import { Check, CreditCard, Download, AlertCircle } from "lucide-react"
import { toast } from "sonner"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { cn } from "@/lib/utils"

const plans = [
  {
    name: "Free",
    price: "$0",
    description: "For individuals and small teams",
    features: [
      "Up to 5 team members",
      "10 workflows",
      "100 tasks per month",
      "Basic analytics",
      "Email support",
    ],
    current: false,
  },
  {
    name: "Pro",
    price: "$12",
    description: "For growing teams",
    features: [
      "Up to 20 team members",
      "Unlimited workflows",
      "Unlimited tasks",
      "Advanced analytics",
      "Priority support",
      "Custom integrations",
    ],
    current: true,
    popular: true,
  },
  {
    name: "Enterprise",
    price: "Custom",
    description: "For large organizations",
    features: [
      "Unlimited team members",
      "Unlimited everything",
      "Custom analytics",
      "Dedicated support",
      "SSO & SAML",
      "Custom contracts",
      "SLA guarantees",
    ],
    current: false,
  },
]

const invoices = [
  { id: "INV-001", date: "Jan 1, 2024", amount: "$12.00", status: "paid" },
  { id: "INV-002", date: "Dec 1, 2023", amount: "$12.00", status: "paid" },
  { id: "INV-003", date: "Nov 1, 2023", amount: "$12.00", status: "paid" },
  { id: "INV-004", date: "Oct 1, 2023", amount: "$12.00", status: "paid" },
]

export default function BillingSettingsPage() {
  const [upgradeDialogOpen, setUpgradeDialogOpen] = React.useState(false)
  const [cancelDialogOpen, setCancelDialogOpen] = React.useState(false)

  const handleUpgrade = (plan: string) => {
    toast.success(`Upgraded to ${plan} plan`)
    setUpgradeDialogOpen(false)
  }

  const handleCancelSubscription = () => {
    toast.info("Subscription cancelled. You'll have access until the end of your billing period.")
    setCancelDialogOpen(false)
  }

  return (
    <div className="space-y-6">
      {/* Current Plan */}
      <Card>
        <CardHeader>
          <div className="flex items-start justify-between">
            <div>
              <CardTitle>Current Plan</CardTitle>
              <CardDescription>
                You're currently on the Pro plan
              </CardDescription>
            </div>
            <Badge className="bg-primary">Pro</Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-bold">$12</span>
            <span className="text-muted-foreground">per user / month</span>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Storage used</span>
              <span>4.2 GB / 10 GB</span>
            </div>
            <Progress value={42} />
          </div>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Team members</span>
              <span>8 / 20</span>
            </div>
            <Progress value={40} />
          </div>
          <p className="text-sm text-muted-foreground">
            Your next billing date is <strong>February 1, 2024</strong>
          </p>
        </CardContent>
        <CardFooter className="flex gap-2">
          <Dialog open={upgradeDialogOpen} onOpenChange={setUpgradeDialogOpen}>
            <DialogTrigger asChild>
              <Button>Upgrade Plan</Button>
            </DialogTrigger>
            <DialogContent className="max-w-3xl">
              <DialogHeader>
                <DialogTitle>Choose a Plan</DialogTitle>
                <DialogDescription>
                  Select the plan that best fits your team's needs
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4 sm:grid-cols-3">
                {plans.map((plan) => (
                  <div
                    key={plan.name}
                    className={cn(
                      "relative flex flex-col rounded-lg border p-4",
                      plan.popular && "border-primary",
                      plan.current && "bg-muted/50"
                    )}
                  >
                    {plan.popular && (
                      <Badge className="absolute -top-2.5 left-1/2 -translate-x-1/2">
                        Most Popular
                      </Badge>
                    )}
                    <h3 className="font-semibold">{plan.name}</h3>
                    <div className="mt-2">
                      <span className="text-2xl font-bold">{plan.price}</span>
                      {plan.price !== "Custom" && (
                        <span className="text-muted-foreground">/mo</span>
                      )}
                    </div>
                    <p className="mt-1 text-sm text-muted-foreground">{plan.description}</p>
                    <ul className="mt-4 space-y-2 flex-1">
                      {plan.features.map((feature) => (
                        <li key={feature} className="flex items-center gap-2 text-sm">
                          <Check className="h-4 w-4 text-primary" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                    <Button
                      className="mt-4"
                      variant={plan.current ? "outline" : "default"}
                      disabled={plan.current}
                      onClick={() => handleUpgrade(plan.name)}
                    >
                      {plan.current ? "Current Plan" : plan.name === "Enterprise" ? "Contact Sales" : "Upgrade"}
                    </Button>
                  </div>
                ))}
              </div>
            </DialogContent>
          </Dialog>
          <Dialog open={cancelDialogOpen} onOpenChange={setCancelDialogOpen}>
            <DialogTrigger asChild>
              <Button variant="outline">Cancel Subscription</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Cancel Subscription</DialogTitle>
                <DialogDescription>
                  Are you sure you want to cancel your subscription?
                </DialogDescription>
              </DialogHeader>
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Warning</AlertTitle>
                <AlertDescription>
                  You'll lose access to Pro features at the end of your billing period.
                </AlertDescription>
              </Alert>
              <DialogFooter>
                <Button variant="outline" onClick={() => setCancelDialogOpen(false)}>
                  Keep Subscription
                </Button>
                <Button variant="destructive" onClick={handleCancelSubscription}>
                  Cancel Subscription
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </CardFooter>
      </Card>

      {/* Payment Method */}
      <Card>
        <CardHeader>
          <CardTitle>Payment Method</CardTitle>
          <CardDescription>
            Manage your payment methods
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between p-4 border rounded-lg">
            <div className="flex items-center gap-4">
              <div className="flex h-10 w-14 items-center justify-center rounded border bg-muted">
                <CreditCard className="h-5 w-5" />
              </div>
              <div>
                <p className="font-medium">•••• •••• •••• 4242</p>
                <p className="text-sm text-muted-foreground">Expires 12/25</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant="secondary">Default</Badge>
              <Button variant="ghost" size="sm">
                Edit
              </Button>
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button variant="outline">Add Payment Method</Button>
        </CardFooter>
      </Card>

      {/* Billing History */}
      <Card>
        <CardHeader>
          <CardTitle>Billing History</CardTitle>
          <CardDescription>
            Download invoices for your records
          </CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Invoice</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="w-12"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {invoices.map((invoice) => (
                <TableRow key={invoice.id}>
                  <TableCell className="font-medium">{invoice.id}</TableCell>
                  <TableCell>{invoice.date}</TableCell>
                  <TableCell>{invoice.amount}</TableCell>
                  <TableCell>
                    <Badge variant="secondary" className="bg-green-100 text-green-700">
                      {invoice.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <Download className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
