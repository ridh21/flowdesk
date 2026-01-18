import { Wrench } from "lucide-react"

export default function MaintenancePage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-4 bg-gradient-to-b from-background to-muted">
      <div className="flex h-24 w-24 items-center justify-center rounded-full bg-primary/10">
        <Wrench className="h-12 w-12 text-primary animate-pulse" />
      </div>
      <h1 className="mt-8 text-3xl font-bold tracking-tight">Under Maintenance</h1>
      <p className="mt-4 max-w-md text-center text-muted-foreground">
        We're currently performing scheduled maintenance to improve your experience. We'll be back shortly.
      </p>
      <div className="mt-8 flex flex-col items-center gap-2">
        <p className="text-sm text-muted-foreground">Expected downtime</p>
        <div className="flex gap-4">
          <div className="flex flex-col items-center p-4 border rounded-lg bg-background">
            <span className="text-2xl font-bold">02</span>
            <span className="text-xs text-muted-foreground">Hours</span>
          </div>
          <div className="flex flex-col items-center p-4 border rounded-lg bg-background">
            <span className="text-2xl font-bold">30</span>
            <span className="text-xs text-muted-foreground">Minutes</span>
          </div>
        </div>
      </div>
      <div className="mt-12 text-center">
        <p className="text-sm text-muted-foreground">Need help?</p>
        <a 
          href="mailto:support@flowdesk.io" 
          className="text-sm text-primary hover:underline"
        >
          Contact Support
        </a>
      </div>
    </div>
  )
}
