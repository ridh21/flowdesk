"use client"

import * as React from "react"
import Link from "next/link"
import { Search, Plus, Hash, Users, Lock, MoreHorizontal, Settings } from "lucide-react"
import { toast } from "sonner"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { mockChannels, mockUsers, currentUser } from "@/lib/mock-data"
import { cn } from "@/lib/utils"

export default function MessagesPage() {
  const [searchQuery, setSearchQuery] = React.useState("")
  const [createDialogOpen, setCreateDialogOpen] = React.useState(false)
  const [channelType, setChannelType] = React.useState<"channel" | "dm">("channel")

  const filteredChannels = mockChannels.filter((channel) =>
    channel.name.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const teamChannels = filteredChannels.filter((c) => c.type === "team")
  const groupChannels = filteredChannels.filter((c) => c.type === "group")
  const directMessages = filteredChannels.filter((c) => c.type === "direct")

  const handleCreateChannel = () => {
    toast.success(channelType === "channel" ? "Channel created!" : "Direct message started!")
    setCreateDialogOpen(false)
  }

  return (
    <div className="flex h-[calc(100vh-4rem)]">
      {/* Sidebar */}
      <div className="w-72 border-r flex flex-col">
        {/* Header */}
        <div className="p-4 border-b">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold">Messages</h2>
            <Dialog open={createDialogOpen} onOpenChange={setCreateDialogOpen}>
              <DialogTrigger asChild>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <Plus className="h-4 w-4" />
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>New Conversation</DialogTitle>
                  <DialogDescription>
                    Create a new channel or start a direct message
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4 py-4">
                  <div className="flex gap-2">
                    <Button
                      variant={channelType === "channel" ? "default" : "outline"}
                      className="flex-1"
                      onClick={() => setChannelType("channel")}
                    >
                      <Hash className="mr-2 h-4 w-4" />
                      Channel
                    </Button>
                    <Button
                      variant={channelType === "dm" ? "default" : "outline"}
                      className="flex-1"
                      onClick={() => setChannelType("dm")}
                    >
                      <Users className="mr-2 h-4 w-4" />
                      Direct Message
                    </Button>
                  </div>

                  {channelType === "channel" ? (
                    <>
                      <div className="space-y-2">
                        <Label>Channel Name</Label>
                        <div className="flex">
                          <span className="flex items-center px-3 border border-r-0 rounded-l-md bg-muted text-muted-foreground">
                            #
                          </span>
                          <Input
                            placeholder="new-channel"
                            className="rounded-l-none"
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label>Description</Label>
                        <Textarea placeholder="What's this channel about?" rows={3} />
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <Label>Make Private</Label>
                          <p className="text-sm text-muted-foreground">
                            Only invited members can see this channel
                          </p>
                        </div>
                        <Switch />
                      </div>
                    </>
                  ) : (
                    <div className="space-y-2">
                      <Label>Select People</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Search for people..." />
                        </SelectTrigger>
                        <SelectContent>
                          {mockUsers.filter((u) => u.id !== currentUser.id).map((user) => (
                            <SelectItem key={user.id} value={user.id}>
                              <div className="flex items-center gap-2">
                                <Avatar className="h-6 w-6">
                                  <AvatarImage src={user.avatar} />
                                  <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                                </Avatar>
                                {user.name}
                              </div>
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  )}
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setCreateDialogOpen(false)}>
                    Cancel
                  </Button>
                  <Button onClick={handleCreateChannel}>
                    {channelType === "channel" ? "Create Channel" : "Start Conversation"}
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search conversations..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9"
            />
          </div>
        </div>

        {/* Channel List */}
        <ScrollArea className="flex-1">
          <div className="p-2">
            {/* Team Channels */}
            {teamChannels.length > 0 && (
              <div className="mb-4">
                <div className="flex items-center gap-2 px-2 py-1 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                  <Hash className="h-3 w-3" />
                  Channels
                </div>
                {teamChannels.map((channel) => (
                  <Link
                    key={channel.id}
                    href={`/messages/${channel.id}`}
                    className={cn(
                      "flex items-center gap-3 px-2 py-2 rounded-md hover:bg-muted transition-colors",
                      channel.unreadCount && channel.unreadCount > 0 && "font-medium"
                    )}
                  >
                    <Hash className="h-4 w-4 text-muted-foreground" />
                    <span className="flex-1 truncate">{channel.name}</span>
                    {channel.unreadCount && channel.unreadCount > 0 && (
                      <Badge variant="default" className="h-5 min-w-5 px-1.5">
                        {channel.unreadCount}
                      </Badge>
                    )}
                  </Link>
                ))}
              </div>
            )}

            {/* Group Channels */}
            {groupChannels.length > 0 && (
              <div className="mb-4">
                <div className="flex items-center gap-2 px-2 py-1 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                  <Lock className="h-3 w-3" />
                  Group Channels
                </div>
                {groupChannels.map((channel) => (
                  <Link
                    key={channel.id}
                    href={`/messages/${channel.id}`}
                    className={cn(
                      "flex items-center gap-3 px-2 py-2 rounded-md hover:bg-muted transition-colors",
                      channel.unreadCount && channel.unreadCount > 0 && "font-medium"
                    )}
                  >
                    <Lock className="h-4 w-4 text-muted-foreground" />
                    <span className="flex-1 truncate">{channel.name}</span>
                    {channel.unreadCount && channel.unreadCount > 0 && (
                      <Badge variant="default" className="h-5 min-w-5 px-1.5">
                        {channel.unreadCount}
                      </Badge>
                    )}
                  </Link>
                ))}
              </div>
            )}

            {/* Direct Messages */}
            {directMessages.length > 0 && (
              <div>
                <div className="flex items-center gap-2 px-2 py-1 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                  Direct Messages
                </div>
                {directMessages.map((channel) => {
                  const otherUser = channel.members?.find((m) => m.id !== currentUser.id)
                  return (
                    <Link
                      key={channel.id}
                      href={`/messages/${channel.id}`}
                      className={cn(
                        "flex items-center gap-3 px-2 py-2 rounded-md hover:bg-muted transition-colors",
                        channel.unreadCount && channel.unreadCount > 0 && "font-medium"
                      )}
                    >
                      <div className="relative">
                        <Avatar className="h-6 w-6">
                          <AvatarImage src={otherUser?.avatar} />
                          <AvatarFallback>{otherUser?.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        {otherUser?.status === "active" && (
                          <span className="absolute -bottom-0.5 -right-0.5 h-2.5 w-2.5 rounded-full bg-green-500 border-2 border-background" />
                        )}
                      </div>
                      <span className="flex-1 truncate">{otherUser?.name || channel.name}</span>
                      {channel.unreadCount && channel.unreadCount > 0 && (
                        <Badge variant="default" className="h-5 min-w-5 px-1.5">
                          {channel.unreadCount}
                        </Badge>
                      )}
                    </Link>
                  )
                })}
              </div>
            )}
          </div>
        </ScrollArea>
      </div>

      {/* Main Content - Empty State */}
      <div className="flex-1 flex flex-col items-center justify-center text-center p-8">
        <div className="flex h-20 w-20 items-center justify-center rounded-full bg-muted">
          <Hash className="h-10 w-10 text-muted-foreground" />
        </div>
        <h2 className="mt-6 text-2xl font-semibold">Select a conversation</h2>
        <p className="mt-2 text-muted-foreground max-w-sm">
          Choose a channel or direct message from the sidebar to start chatting with your team.
        </p>
        <Button className="mt-6" onClick={() => setCreateDialogOpen(true)}>
          <Plus className="mr-2 h-4 w-4" />
          New Conversation
        </Button>
      </div>
    </div>
  )
}
