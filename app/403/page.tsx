import Link from "next/link"
import { ShieldX } from "lucide-react"

import { Button } from "@/components/ui/button"

export default function ForbiddenPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-4 bg-gradient-to-b from-background to-muted">
      <div className="flex h-24 w-24 items-center justify-center rounded-full bg-destructive/10">
        <ShieldX className="h-12 w-12 text-destructive" />
      </div>
      <h1 className="mt-8 text-4xl font-bold tracking-tight">403</h1>
      <h2 className="mt-2 text-xl font-semibold">Access Forbidden</h2>
      <p className="mt-4 max-w-md text-center text-muted-foreground">
        You don't have permission to access this resource. If you believe this is an error, please contact your administrator.
      </p>
      <div className="mt-8 flex gap-4">
        <Button asChild>
          <Link href="/dashboard">Go to Dashboard</Link>
        </Button>
        <Button variant="outline" asChild>
          <Link href="/">Back to Home</Link>
        </Button>
      </div>
    </div>
  )
}
