"use client"

import * as React from "react"
import { useParams, useRouter } from "next/navigation"
import Link from "next/link"
import {
  Search,
  Plus,
  Hash,
  Users,
  Lock,
  MoreHorizontal,
  Settings,
  Phone,
  Video,
  Smile,
  Paperclip,
  Send,
  AtSign,
  ImageIcon,
  FileText,
  ArrowLeft,
  Star,
  Pin,
  Bell,
  BellOff,
} from "lucide-react"
import { toast } from "sonner"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { mockChannels, mockMessages, mockUsers, currentUser } from "@/lib/mock-data"
import { cn } from "@/lib/utils"

export default function ChatPage() {
  const params = useParams()
  const router = useRouter()
  const [message, setMessage] = React.useState("")
  const [messages, setMessages] = React.useState(mockMessages)
  const scrollRef = React.useRef<HTMLDivElement>(null)
  const [isDetailsOpen, setIsDetailsOpen] = React.useState(false)

  const channel = mockChannels.find((c) => c.id === params.id)

  React.useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [messages])

  if (!channel) {
    return (
      <div className="flex flex-col items-center justify-center h-[calc(100vh-4rem)] gap-4">
        <h2 className="text-xl font-semibold">Channel not found</h2>
        <Button asChild>
          <Link href="/messages">Back to Messages</Link>
        </Button>
      </div>
    )
  }

  const isDM = channel.type === "direct"
  const otherUser = isDM ? channel.members?.find((m) => m.id !== currentUser.id) : null

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault()
    if (!message.trim()) return

    const newMessage = {
      id: `msg-${Date.now()}`,
      channelId: channel.id,
      sender: currentUser,
      content: message,
      timestamp: new Date().toISOString(),
      reactions: [],
    }

    setMessages([...messages, newMessage])
    setMessage("")
  }

  const groupMessagesByDate = () => {
    const channelMessages = messages.filter((m) => m.channelId === channel.id)
    const groups: { [key: string]: typeof messages } = {}

    channelMessages.forEach((msg) => {
      const date = new Date(msg.timestamp).toLocaleDateString()
      if (!groups[date]) {
        groups[date] = []
      }
      groups[date].push(msg)
    })

    return groups
  }

  const messageGroups = groupMessagesByDate()

  return (
    <div className="flex h-[calc(100vh-4rem)]">
      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col">
        {/* Chat Header */}
        <div className="h-14 border-b flex items-center justify-between px-4">
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden"
              onClick={() => router.push("/messages")}
            >
              <ArrowLeft className="h-4 w-4" />
            </Button>
            {isDM ? (
              <div className="flex items-center gap-3">
                <div className="relative">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={otherUser?.avatar} />
                    <AvatarFallback>{otherUser?.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  {otherUser?.status === "active" && (
                    <span className="absolute -bottom-0.5 -right-0.5 h-2.5 w-2.5 rounded-full bg-green-500 border-2 border-background" />
                  )}
                </div>
                <div>
                  <h3 className="font-semibold">{otherUser?.name}</h3>
                  <p className="text-xs text-muted-foreground">
                    {otherUser?.status === "active" ? "Online" : "Offline"}
                  </p>
                </div>
              </div>
            ) : (
              <div className="flex items-center gap-3">
                {channel.type === "private" ? (
                  <Lock className="h-5 w-5 text-muted-foreground" />
                ) : (
                  <Hash className="h-5 w-5 text-muted-foreground" />
                )}
                <div>
                  <h3 className="font-semibold">{channel.name}</h3>
                  <p className="text-xs text-muted-foreground">
                    {channel.members?.length} members
                  </p>
                </div>
              </div>
            )}
          </div>
          <div className="flex items-center gap-1">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <Phone className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>Start call</TooltipContent>
              </Tooltip>
            </TooltipProvider>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <Video className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>Start video call</TooltipContent>
              </Tooltip>
            </TooltipProvider>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <Search className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>Search messages</TooltipContent>
              </Tooltip>
            </TooltipProvider>
            <Sheet open={isDetailsOpen} onOpenChange={setIsDetailsOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <Users className="h-4 w-4" />
                </Button>
              </SheetTrigger>
              <SheetContent>
                <SheetHeader>
                  <SheetTitle>
                    {isDM ? otherUser?.name : `#${channel.name}`}
                  </SheetTitle>
                  <SheetDescription>
                    {channel.description || "No description"}
                  </SheetDescription>
                </SheetHeader>
                <div className="mt-6 space-y-6">
                  {/* Quick Actions */}
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" className="flex-1">
                      <Bell className="mr-2 h-4 w-4" />
                      Mute
                    </Button>
                    <Button variant="outline" size="sm" className="flex-1">
                      <Star className="mr-2 h-4 w-4" />
                      Star
                    </Button>
                  </div>

                  <Separator />

                  {/* Members */}
                  <div>
                    <h4 className="text-sm font-semibold mb-3">
                      Members ({channel.members?.length || 0})
                    </h4>
                    <div className="space-y-2">
                      {channel.members?.map((member) => (
                        <div
                          key={member.id}
                          className="flex items-center gap-3 p-2 rounded-md hover:bg-muted"
                        >
                          <div className="relative">
                            <Avatar className="h-8 w-8">
                              <AvatarImage src={member.avatar} />
                              <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                            {member.status === "active" && (
                              <span className="absolute -bottom-0.5 -right-0.5 h-2 w-2 rounded-full bg-green-500 border border-background" />
                            )}
                          </div>
                          <div className="flex-1">
                            <p className="text-sm font-medium">{member.name}</p>
                            <p className="text-xs text-muted-foreground">
                              {member.id === currentUser.id ? "You" : member.role}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {!isDM && (
                    <>
                      <Separator />
                      <div>
                        <h4 className="text-sm font-semibold mb-3">Channel Settings</h4>
                        <div className="space-y-2">
                          <Button variant="ghost" className="w-full justify-start">
                            <Settings className="mr-2 h-4 w-4" />
                            Edit Channel
                          </Button>
                          <Button variant="ghost" className="w-full justify-start text-destructive">
                            Leave Channel
                          </Button>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>

        {/* Messages */}
        <ScrollArea ref={scrollRef} className="flex-1 p-4">
          <div className="space-y-6">
            {Object.entries(messageGroups).map(([date, msgs]) => (
              <div key={date}>
                <div className="flex items-center gap-4 my-4">
                  <Separator className="flex-1" />
                  <span className="text-xs text-muted-foreground font-medium">{date}</span>
                  <Separator className="flex-1" />
                </div>
                <div className="space-y-4">
                  {msgs.map((msg, idx) => {
                    const showAvatar =
                      idx === 0 || msgs[idx - 1]?.sender.id !== msg.sender.id
                    const isCurrentUser = msg.sender.id === currentUser.id

                    return (
                      <div
                        key={msg.id}
                        className={cn(
                          "group flex gap-3",
                          !showAvatar && "pl-11"
                        )}
                      >
                        {showAvatar && (
                          <Avatar className="h-8 w-8 mt-1">
                            <AvatarImage src={msg.sender.avatar} />
                            <AvatarFallback>{msg.sender.name.charAt(0)}</AvatarFallback>
                          </Avatar>
                        )}
                        <div className="flex-1">
                          {showAvatar && (
                            <div className="flex items-center gap-2 mb-1">
                              <span className="font-semibold text-sm">{msg.sender.name}</span>
                              <span className="text-xs text-muted-foreground">
                                {new Date(msg.timestamp).toLocaleTimeString([], {
                                  hour: "2-digit",
                                  minute: "2-digit",
                                })}
                              </span>
                            </div>
                          )}
                          <p className="text-sm">{msg.content}</p>
                          {msg.reactions && msg.reactions.length > 0 && (
                            <div className="flex gap-1 mt-1">
                              {msg.reactions.map((reaction, i) => (
                                <Badge key={i} variant="secondary" className="text-xs px-1.5 py-0.5">
                                  {reaction.emoji} {reaction.count}
                                </Badge>
                              ))}
                            </div>
                          )}
                        </div>
                        <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon" className="h-6 w-6">
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem>
                                <Smile className="mr-2 h-4 w-4" />
                                Add Reaction
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <Pin className="mr-2 h-4 w-4" />
                                Pin Message
                              </DropdownMenuItem>
                              <DropdownMenuSeparator />
                              {isCurrentUser && (
                                <DropdownMenuItem className="text-destructive">
                                  Delete Message
                                </DropdownMenuItem>
                              )}
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>

        {/* Message Input */}
        <div className="border-t p-4">
          <form onSubmit={handleSendMessage} className="flex gap-2">
            <div className="flex-1 relative">
              <Input
                placeholder={`Message ${isDM ? otherUser?.name : `#${channel.name}`}`}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="pr-24"
              />
              <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-1">
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button type="button" variant="ghost" size="icon" className="h-7 w-7">
                        <Paperclip className="h-4 w-4" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>Attach file</TooltipContent>
                  </Tooltip>
                </TooltipProvider>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button type="button" variant="ghost" size="icon" className="h-7 w-7">
                        <AtSign className="h-4 w-4" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>Mention someone</TooltipContent>
                  </Tooltip>
                </TooltipProvider>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button type="button" variant="ghost" size="icon" className="h-7 w-7">
                        <Smile className="h-4 w-4" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>Add emoji</TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
            </div>
            <Button type="submit" disabled={!message.trim()}>
              <Send className="h-4 w-4" />
            </Button>
          </form>
        </div>
      </div>
    </div>
  )
}
