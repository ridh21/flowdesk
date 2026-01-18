import { AppLayout } from "@/components/layouts/app-layout"
import { Toaster } from "@/components/ui/sonner"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <AppLayout>{children}</AppLayout>
      <Toaster position="top-right" />
    </>
  )
}
