"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { ArrowLeft, Mail, UserPlus, Trash2 } from "lucide-react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { toast } from "sonner"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { mockTeams } from "@/lib/mock-data"

const inviteSchema = z.object({
  email: z.string().email("Invalid email address"),
  role: z.string().min(1, "Please select a role"),
  team: z.string().optional(),
  message: z.string().optional(),
})

type InviteForm = z.infer<typeof inviteSchema>

export default function InviteMemberPage() {
  const router = useRouter()
  const [invites, setInvites] = React.useState<Array<{ email: string; role: string }>>([])
  const [isLoading, setIsLoading] = React.useState(false)

  const form = useForm<InviteForm>({
    resolver: zodResolver(inviteSchema),
    defaultValues: {
      email: "",
      role: "member",
      team: "",
      message: "",
    },
  })

  const addInvite = () => {
    const email = form.getValues("email")
    const role = form.getValues("role")

    if (!email || !z.string().email().safeParse(email).success) {
      form.setError("email", { message: "Please enter a valid email" })
      return
    }

    if (invites.some((i) => i.email === email)) {
      form.setError("email", { message: "This email is already in the list" })
      return
    }

    setInvites([...invites, { email, role }])
    form.setValue("email", "")
  }

  const removeInvite = (email: string) => {
    setInvites(invites.filter((i) => i.email !== email))
  }

  const onSubmit = async (data: InviteForm) => {
    setIsLoading(true)

    // Add current form email if valid
    let allInvites = [...invites]
    if (data.email && z.string().email().safeParse(data.email).success) {
      if (!allInvites.some((i) => i.email === data.email)) {
        allInvites.push({ email: data.email, role: data.role })
      }
    }

    if (allInvites.length === 0) {
      form.setError("email", { message: "Please add at least one email" })
      setIsLoading(false)
      return
    }

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    toast.success(`Invitation${allInvites.length > 1 ? "s" : ""} sent successfully!`, {
      description: `${allInvites.length} invitation${allInvites.length > 1 ? "s" : ""} sent`,
    })
    setIsLoading(false)
    router.push("/team")
  }

  return (
    <div className="flex flex-col gap-6 p-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" onClick={() => router.back()}>
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Invite Team Member</h1>
          <p className="text-muted-foreground">Send invitations to add new members to your team</p>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Invite Form */}
        <Card>
          <CardHeader>
            <CardTitle>Invite by Email</CardTitle>
            <CardDescription>
              Enter email addresses to invite new team members
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <div className="flex gap-2">
                  <div className="flex-1">
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <Input placeholder="colleague@company.com" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <FormField
                    control={form.control}
                    name="role"
                    render={({ field }) => (
                      <FormItem>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger className="w-[120px]">
                              <SelectValue placeholder="Role" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="member">Member</SelectItem>
                            <SelectItem value="manager">Manager</SelectItem>
                            <SelectItem value="admin">Admin</SelectItem>
                          </SelectContent>
                        </Select>
                      </FormItem>
                    )}
                  />
                  <Button type="button" variant="outline" onClick={addInvite}>
                    Add
                  </Button>
                </div>

                {/* Pending Invites */}
                {invites.length > 0 && (
                  <div className="space-y-2">
                    <Label>Pending Invites</Label>
                    <div className="border rounded-lg divide-y">
                      {invites.map((invite) => (
                        <div
                          key={invite.email}
                          className="flex items-center justify-between p-3"
                        >
                          <div className="flex items-center gap-3">
                            <Mail className="h-4 w-4 text-muted-foreground" />
                            <span className="text-sm">{invite.email}</span>
                            <Badge variant="secondary">{invite.role}</Badge>
                          </div>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8"
                            onClick={() => removeInvite(invite.email)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <Separator />

                <FormField
                  control={form.control}
                  name="team"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Add to Team (Optional)</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a team" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="">No team</SelectItem>
                          {mockTeams.map((team) => (
                            <SelectItem key={team.id} value={team.id}>
                              {team.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormDescription>
                        Optionally add invited members directly to a team
                      </FormDescription>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="message"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Personal Message (Optional)</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Add a personal note to the invitation..."
                          rows={4}
                          {...field}
                        />
                      </FormControl>
                      <FormDescription>
                        This message will be included in the invitation email
                      </FormDescription>
                    </FormItem>
                  )}
                />

                <div className="flex gap-4">
                  <Button type="submit" disabled={isLoading}>
                    {isLoading ? (
                      <>Sending...</>
                    ) : (
                      <>
                        <UserPlus className="mr-2 h-4 w-4" />
                        Send Invitation{invites.length > 1 ? "s" : ""}
                      </>
                    )}
                  </Button>
                  <Button type="button" variant="outline" onClick={() => router.back()}>
                    Cancel
                  </Button>
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>

        {/* Info Card */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>How invitations work</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex gap-4">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground text-sm font-medium">
                  1
                </div>
                <div>
                  <h4 className="font-medium">Send Invitation</h4>
                  <p className="text-sm text-muted-foreground">
                    Enter email addresses and send invitations to your team members.
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground text-sm font-medium">
                  2
                </div>
                <div>
                  <h4 className="font-medium">Email Received</h4>
                  <p className="text-sm text-muted-foreground">
                    Invitees receive an email with a link to accept the invitation.
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground text-sm font-medium">
                  3
                </div>
                <div>
                  <h4 className="font-medium">Account Created</h4>
                  <p className="text-sm text-muted-foreground">
                    New members create their account and join your workspace.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Role Permissions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <div className="flex items-center gap-2">
                  <Badge variant="secondary" className="bg-gray-100 text-gray-700">
                    Member
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground mt-1">
                  Can view and edit assigned tasks, participate in team discussions.
                </p>
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <Badge variant="secondary" className="bg-blue-100 text-blue-700">
                    Manager
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground mt-1">
                  Can manage team tasks, create workflows, and view team analytics.
                </p>
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <Badge variant="secondary" className="bg-purple-100 text-purple-700">
                    Admin
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground mt-1">
                  Full access to all features including team management and settings.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
