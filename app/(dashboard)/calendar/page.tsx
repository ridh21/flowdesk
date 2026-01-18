"use client"

import * as React from "react"
import { ChevronLeft, ChevronRight, Plus } from "lucide-react"
import {
  addDays,
  addMonths,
  addWeeks,
  format,
  isSameDay,
  isSameMonth,
  startOfMonth,
  startOfWeek,
  endOfMonth,
  endOfWeek,
  eachDayOfInterval,
  isToday,
  subMonths,
  subWeeks,
  subDays,
} from "date-fns"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { ScrollArea } from "@/components/ui/scroll-area"
import { mockCalendarEvents, mockTasks } from "@/lib/mock-data"
import { cn } from "@/lib/utils"

type ViewType = "month" | "week" | "day"

const eventTypeColors = {
  task: "bg-blue-100 text-blue-700 border-blue-200",
  meeting: "bg-purple-100 text-purple-700 border-purple-200",
  deadline: "bg-red-100 text-red-700 border-red-200",
  reminder: "bg-yellow-100 text-yellow-700 border-yellow-200",
}

export default function CalendarPage() {
  const [currentDate, setCurrentDate] = React.useState(new Date())
  const [view, setView] = React.useState<ViewType>("month")
  const [selectedEvent, setSelectedEvent] = React.useState<typeof mockCalendarEvents[0] | null>(null)

  const navigateDate = (direction: "prev" | "next") => {
    if (view === "month") {
      setCurrentDate(direction === "prev" ? subMonths(currentDate, 1) : addMonths(currentDate, 1))
    } else if (view === "week") {
      setCurrentDate(direction === "prev" ? subWeeks(currentDate, 1) : addWeeks(currentDate, 1))
    } else {
      setCurrentDate(direction === "prev" ? subDays(currentDate, 1) : addDays(currentDate, 1))
    }
  }

  const goToToday = () => setCurrentDate(new Date())

  const getEventsForDate = (date: Date) => {
    return mockCalendarEvents.filter((event) => isSameDay(new Date(event.start), date))
  }

  // Monthly View
  const renderMonthView = () => {
    const monthStart = startOfMonth(currentDate)
    const monthEnd = endOfMonth(currentDate)
    const calendarStart = startOfWeek(monthStart)
    const calendarEnd = endOfWeek(monthEnd)
    const days = eachDayOfInterval({ start: calendarStart, end: calendarEnd })

    return (
      <div className="grid grid-cols-7 gap-px bg-muted rounded-lg overflow-hidden">
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
          <div key={day} className="bg-muted-foreground/10 p-2 text-center text-sm font-medium">
            {day}
          </div>
        ))}
        {days.map((day) => {
          const events = getEventsForDate(day)
          const isCurrentMonth = isSameMonth(day, currentDate)
          return (
            <div
              key={day.toISOString()}
              className={cn(
                "min-h-[100px] bg-background p-2 transition-colors hover:bg-muted/50",
                !isCurrentMonth && "bg-muted/30 text-muted-foreground"
              )}
            >
              <div
                className={cn(
                  "flex h-7 w-7 items-center justify-center rounded-full text-sm",
                  isToday(day) && "bg-primary text-primary-foreground font-bold"
                )}
              >
                {format(day, "d")}
              </div>
              <div className="mt-1 space-y-1">
                {events.slice(0, 2).map((event) => (
                  <button
                    key={event.id}
                    onClick={() => setSelectedEvent(event)}
                    className={cn(
                      "w-full truncate rounded px-1 py-0.5 text-left text-xs border",
                      eventTypeColors[event.type]
                    )}
                  >
                    {event.title}
                  </button>
                ))}
                {events.length > 2 && (
                  <p className="text-xs text-muted-foreground">+{events.length - 2} more</p>
                )}
              </div>
            </div>
          )
        })}
      </div>
    )
  }

  // Weekly View
  const renderWeekView = () => {
    const weekStart = startOfWeek(currentDate)
    const days = eachDayOfInterval({ start: weekStart, end: addDays(weekStart, 6) })
    const hours = Array.from({ length: 24 }, (_, i) => i)

    return (
      <div className="border rounded-lg overflow-hidden">
        <div className="grid grid-cols-8 border-b bg-muted/30">
          <div className="p-2 text-center text-sm font-medium border-r">Time</div>
          {days.map((day) => (
            <div
              key={day.toISOString()}
              className={cn(
                "p-2 text-center",
                isToday(day) && "bg-primary/10"
              )}
            >
              <p className="text-xs text-muted-foreground">{format(day, "EEE")}</p>
              <p
                className={cn(
                  "text-lg font-semibold",
                  isToday(day) && "text-primary"
                )}
              >
                {format(day, "d")}
              </p>
            </div>
          ))}
        </div>
        <ScrollArea className="h-[600px]">
          <div className="grid grid-cols-8">
            {hours.map((hour) => (
              <React.Fragment key={hour}>
                <div className="border-r border-b p-2 text-xs text-muted-foreground text-right">
                  {format(new Date().setHours(hour, 0), "ha")}
                </div>
                {days.map((day) => {
                  const events = getEventsForDate(day).filter(
                    (e) => new Date(e.start).getHours() === hour
                  )
                  return (
                    <div
                      key={`${day.toISOString()}-${hour}`}
                      className={cn(
                        "border-b p-1 min-h-[60px]",
                        isToday(day) && "bg-primary/5"
                      )}
                    >
                      {events.map((event) => (
                        <button
                          key={event.id}
                          onClick={() => setSelectedEvent(event)}
                          className={cn(
                            "w-full truncate rounded px-1 py-0.5 text-left text-xs border mb-1",
                            eventTypeColors[event.type]
                          )}
                        >
                          {format(new Date(event.start), "h:mm a")} - {event.title}
                        </button>
                      ))}
                    </div>
                  )
                })}
              </React.Fragment>
            ))}
          </div>
        </ScrollArea>
      </div>
    )
  }

  // Daily View
  const renderDayView = () => {
    const hours = Array.from({ length: 24 }, (_, i) => i)
    const dayEvents = getEventsForDate(currentDate)

    return (
      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 border rounded-lg overflow-hidden">
          <ScrollArea className="h-[600px]">
            <div className="divide-y">
              {hours.map((hour) => {
                const events = dayEvents.filter((e) => new Date(e.start).getHours() === hour)
                return (
                  <div key={hour} className="flex min-h-[60px]">
                    <div className="w-20 flex-shrink-0 border-r p-2 text-sm text-muted-foreground text-right">
                      {format(new Date().setHours(hour, 0), "h:mm a")}
                    </div>
                    <div className="flex-1 p-2">
                      {events.map((event) => (
                        <button
                          key={event.id}
                          onClick={() => setSelectedEvent(event)}
                          className={cn(
                            "w-full rounded-lg border p-2 text-left mb-2",
                            eventTypeColors[event.type]
                          )}
                        >
                          <p className="font-medium text-sm">{event.title}</p>
                          <p className="text-xs">
                            {format(new Date(event.start), "h:mm a")} - {format(new Date(event.end), "h:mm a")}
                          </p>
                        </button>
                      ))}
                    </div>
                  </div>
                )
              })}
            </div>
          </ScrollArea>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="text-sm">Events Today</CardTitle>
          </CardHeader>
          <CardContent>
            {dayEvents.length === 0 ? (
              <p className="text-sm text-muted-foreground text-center py-8">
                No events scheduled
              </p>
            ) : (
              <div className="space-y-3">
                {dayEvents.map((event) => (
                  <button
                    key={event.id}
                    onClick={() => setSelectedEvent(event)}
                    className="w-full text-left rounded-lg border p-3 hover:bg-muted/50 transition-colors"
                  >
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className={eventTypeColors[event.type]}>
                        {event.type}
                      </Badge>
                    </div>
                    <p className="font-medium text-sm mt-2">{event.title}</p>
                    <p className="text-xs text-muted-foreground">
                      {format(new Date(event.start), "h:mm a")} - {format(new Date(event.end), "h:mm a")}
                    </p>
                  </button>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-6 p-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Calendar</h1>
          <p className="text-muted-foreground">Schedule and manage events</p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          New Event
        </Button>
      </div>

      {/* Controls */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-2">
              <Button variant="outline" size="icon" onClick={() => navigateDate("prev")}>
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="icon" onClick={() => navigateDate("next")}>
                <ChevronRight className="h-4 w-4" />
              </Button>
              <Button variant="outline" onClick={goToToday}>Today</Button>
              <h2 className="ml-4 text-lg font-semibold">
                {view === "month" && format(currentDate, "MMMM yyyy")}
                {view === "week" && `Week of ${format(startOfWeek(currentDate), "MMM d, yyyy")}`}
                {view === "day" && format(currentDate, "EEEE, MMMM d, yyyy")}
              </h2>
            </div>
            <Tabs value={view} onValueChange={(v) => setView(v as ViewType)}>
              <TabsList>
                <TabsTrigger value="month">Month</TabsTrigger>
                <TabsTrigger value="week">Week</TabsTrigger>
                <TabsTrigger value="day">Day</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        </CardContent>
      </Card>

      {/* Calendar View */}
      {view === "month" && renderMonthView()}
      {view === "week" && renderWeekView()}
      {view === "day" && renderDayView()}

      {/* Event Details Dialog */}
      <Dialog open={!!selectedEvent} onOpenChange={() => setSelectedEvent(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{selectedEvent?.title}</DialogTitle>
            <DialogDescription>
              <Badge variant="outline" className={cn("mt-2", selectedEvent && eventTypeColors[selectedEvent.type])}>
                {selectedEvent?.type}
              </Badge>
            </DialogDescription>
          </DialogHeader>
          {selectedEvent && (
            <div className="space-y-4">
              <div>
                <p className="text-sm font-medium">Time</p>
                <p className="text-sm text-muted-foreground">
                  {format(new Date(selectedEvent.start), "PPpp")} - {format(new Date(selectedEvent.end), "p")}
                </p>
              </div>
              {selectedEvent.description && (
                <div>
                  <p className="text-sm font-medium">Description</p>
                  <p className="text-sm text-muted-foreground">{selectedEvent.description}</p>
                </div>
              )}
              <div className="flex gap-2">
                <Button className="flex-1">Edit Event</Button>
                <Button variant="outline" className="flex-1">Delete</Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
