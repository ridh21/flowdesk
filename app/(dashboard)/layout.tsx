import { AppLayout } from "@/components/layouts/app-layout"
import { Toaster } from "@/components/ui/toaster"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <AppLayout>{children}</AppLayout>
      <Toaster position="top-right" options={{ duration: 2000 }} />
    </>
  )
}
