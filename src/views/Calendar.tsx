"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { IPOData } from "@/data/ipos";
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon, Bell, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameDay, addMonths, subMonths, startOfWeek, endOfWeek, addWeeks, subWeeks, parseISO } from "date-fns";
import { toast } from "sonner";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

interface CalendarEvent {
  date: Date;
  ipo: IPOData;
  type: "open" | "close" | "listing";
}

interface CalendarProps {
  ipoData: IPOData[];
}

const Calendar = ({ ipoData }: CalendarProps) => {
  const [currentDate, setCurrentDate] = useState(new Date(2025, 10, 1)); // November 2025
  const [view, setView] = useState<"month" | "week">("month");

  // Parse dates and create events
  const events: CalendarEvent[] = [];
  ipoData.forEach((ipo) => {
    try {
      const openDate = parseISO(ipo.openDate.replace(/,/g, "").replace(/ /g, "-").split("-").reverse().join("-") + "-2025");
      const closeDate = parseISO(ipo.closeDate.replace(/,/g, "").replace(/ /g, "-").split("-").reverse().join("-") + "-2025");
      const listingDate = parseISO(ipo.listingDate.replace(/,/g, "").replace(/ /g, "-").split("-").reverse().join("-") + "-2025");

      if (!isNaN(openDate.getTime())) events.push({ date: openDate, ipo, type: "open" });
      if (!isNaN(closeDate.getTime())) events.push({ date: closeDate, ipo, type: "close" });
      if (!isNaN(listingDate.getTime())) events.push({ date: listingDate, ipo, type: "listing" });
    } catch (e) {
      console.error("Error parsing dates for", ipo.name);
    }
  });

  const getEventsForDate = (date: Date) => {
    return events.filter((event) => isSameDay(event.date, date));
  };

  const getEventColor = (type: string) => {
    switch (type) {
      case "open": return "bg-success text-success-foreground";
      case "close": return "bg-warning text-warning-foreground";
      case "listing": return "bg-primary text-primary-foreground";
      default: return "bg-muted";
    }
  };

  const getEventLabel = (type: string) => {
    switch (type) {
      case "open": return "Opens";
      case "close": return "Closes";
      case "listing": return "Lists";
      default: return "";
    }
  };

  const handleReminder = (ipo: typeof ipoData[0], eventType: string) => {
    toast.success(`Reminder set for ${ipo.name} - ${eventType}`);
  };

  // Monthly View
  const renderMonthView = () => {
    const monthStart = startOfMonth(currentDate);
    const monthEnd = endOfMonth(currentDate);
    const calendarStart = startOfWeek(monthStart);
    const calendarEnd = endOfWeek(monthEnd);
    const days = eachDayOfInterval({ start: calendarStart, end: calendarEnd });

    const weeks: Date[][] = [];
    for (let i = 0; i < days.length; i += 7) {
      weeks.push(days.slice(i, i + 7));
    }

    return (
      <div className="space-y-2">
        {/* Weekday Headers */}
        <div className="grid grid-cols-7 gap-2 mb-2">
          {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
            <div key={day} className="text-center text-xs font-semibold text-muted-foreground p-2">
              {day}
            </div>
          ))}
        </div>

        {/* Calendar Grid */}
        {weeks.map((week, weekIndex) => (
          <div key={weekIndex} className="grid grid-cols-7 gap-2">
            {week.map((day) => {
              const dayEvents = getEventsForDate(day);
              const isCurrentMonth = day.getMonth() === currentDate.getMonth();
              const isToday = isSameDay(day, new Date());

              return (
                <Card
                  key={day.toISOString()}
                  className={`min-h-[120px] p-2 ${!isCurrentMonth ? "opacity-40" : ""} ${isToday ? "border-primary border-2" : ""}`}
                >
                  <div className="flex justify-between items-start mb-2">
                    <span className={`text-sm font-semibold ${isToday ? "text-primary" : ""}`}>
                      {format(day, "d")}
                    </span>
                    {isToday && (
                      <Badge variant="default" className="text-xs px-1 py-0">Today</Badge>
                    )}
                  </div>

                  <div className="space-y-1">
                    {dayEvents.map((event, idx) => (
                      <div
                        key={idx}
                        className={`text-xs p-1 rounded ${getEventColor(event.type)} cursor-pointer hover:opacity-80 transition-opacity`}
                        onClick={() => handleReminder(event.ipo, getEventLabel(event.type))}
                      >
                        <div className="font-semibold truncate">{event.ipo.symbol}</div>
                        <div className="text-xs opacity-90">{getEventLabel(event.type)}</div>
                      </div>
                    ))}
                  </div>
                </Card>
              );
            })}
          </div>
        ))}
      </div>
    );
  };

  // Weekly View
  const renderWeekView = () => {
    const weekStart = startOfWeek(currentDate);
    const weekEnd = endOfWeek(currentDate);
    const days = eachDayOfInterval({ start: weekStart, end: weekEnd });

    return (
      <div className="space-y-2">
        {/* Weekday Headers */}
        <div className="grid grid-cols-7 gap-2 mb-2">
          {days.map((day) => (
            <div key={day.toISOString()} className="text-center">
              <div className="text-xs font-semibold text-muted-foreground">
                {format(day, "EEE")}
              </div>
              <div className={`text-lg font-bold ${isSameDay(day, new Date()) ? "text-primary" : ""}`}>
                {format(day, "d")}
              </div>
            </div>
          ))}
        </div>

        {/* Events Grid */}
        <div className="grid grid-cols-7 gap-2">
          {days.map((day) => {
            const dayEvents = getEventsForDate(day);
            const isToday = isSameDay(day, new Date());

            return (
              <Card
                key={day.toISOString()}
                className={`min-h-[400px] p-3 ${isToday ? "border-primary border-2" : ""}`}
              >
                {isToday && (
                  <Badge variant="default" className="mb-2 w-full justify-center">Today</Badge>
                )}

                <div className="space-y-2">
                  {dayEvents.length === 0 ? (
                    <p className="text-xs text-muted-foreground text-center mt-8">No events</p>
                  ) : (
                    dayEvents.map((event, idx) => (
                      <Card key={idx} className={`p-3 ${getEventColor(event.type)}`}>
                        <div className="space-y-2">
                          <div>
                            <div className="font-semibold text-sm">{event.ipo.name}</div>
                            <div className="text-xs opacity-90">{event.ipo.symbol}</div>
                          </div>

                          <Badge variant="secondary" className="text-xs">
                            {getEventLabel(event.type)}
                          </Badge>

                          <div className="space-y-1 text-xs">
                            <div className="flex justify-between">
                              <span className="opacity-80">Issue Price</span>
                              <span className="font-mono font-semibold">₹{event.ipo.issuePrice}</span>
                            </div>
                            {event.ipo.gmpPremium !== undefined && (
                              <div className="flex justify-between">
                                <span className="opacity-80">GMP</span>
                                <span className="font-mono font-semibold">
                                  +₹{event.ipo.gmpPremium}
                                </span>
                              </div>
                            )}
                          </div>

                          <div className="flex gap-2 pt-2">
                            <Button
                              size="sm"
                              variant="secondary"
                              className="flex-1 h-7 text-xs"
                              onClick={() => handleReminder(event.ipo, getEventLabel(event.type))}
                            >
                              <Bell className="w-3 h-3 mr-1" />
                              Remind
                            </Button>
                            <Link href={`/ipo/${event.ipo.id}`} className="flex-1">
                              <Button size="sm" variant="outline" className="w-full h-7 text-xs">
                                View
                              </Button>
                            </Link>
                          </div>
                        </div>
                      </Card>
                    ))
                  )}
                </div>
              </Card>
            );
          })}
        </div>
      </div>
    );
  };

  const navigatePrevious = () => {
    if (view === "month") {
      setCurrentDate(subMonths(currentDate, 1));
    } else {
      setCurrentDate(subWeeks(currentDate, 1));
    }
  };

  const navigateNext = () => {
    if (view === "month") {
      setCurrentDate(addMonths(currentDate, 1));
    } else {
      setCurrentDate(addWeeks(currentDate, 1));
    }
  };

  const goToToday = () => {
    setCurrentDate(new Date());
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="font-heading text-section-title font-bold mb-2">IPO Calendar</h1>
          <p className="text-muted-foreground">Track all IPO dates, events, and set reminders</p>
        </div>
        {/* Calendar Controls */}
        <Card className="p-4 mb-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <Button variant="outline" size="icon" onClick={navigatePrevious}>
                <ChevronLeft className="w-4 h-4" />
              </Button>
              <div className="text-center min-w-[200px]">
                <h2 className="font-heading text-xl font-bold">
                  {view === "month"
                    ? format(currentDate, "MMMM yyyy")
                    : `${format(startOfWeek(currentDate), "MMM d")} - ${format(endOfWeek(currentDate), "MMM d, yyyy")}`}
                </h2>
              </div>
              <Button variant="outline" size="icon" onClick={navigateNext}>
                <ChevronRight className="w-4 h-4" />
              </Button>
            </div>

            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" onClick={goToToday}>
                <CalendarIcon className="w-4 h-4 mr-2" />
                Today
              </Button>

              <Tabs value={view} onValueChange={(v) => setView(v as "month" | "week")}>
                <TabsList>
                  <TabsTrigger value="month">Month</TabsTrigger>
                  <TabsTrigger value="week">Week</TabsTrigger>
                </TabsList>
              </Tabs>
            </div>
          </div>
        </Card>

        {/* Legend */}
        <Card className="p-4 mb-6">
          <div className="flex flex-wrap items-center gap-4">
            <span className="text-sm font-semibold mr-2">Event Types:</span>
            <div className="flex items-center gap-2">
              <div className={`w-4 h-4 rounded ${getEventColor("open")}`}></div>
              <span className="text-sm">IPO Opens</span>
            </div>
            <div className="flex items-center gap-2">
              <div className={`w-4 h-4 rounded ${getEventColor("close")}`}></div>
              <span className="text-sm">IPO Closes</span>
            </div>
            <div className="flex items-center gap-2">
              <div className={`w-4 h-4 rounded ${getEventColor("listing")}`}></div>
              <span className="text-sm">Listing Date</span>
            </div>
          </div>
        </Card>

        {/* Calendar View */}
        {view === "month" ? renderMonthView() : renderWeekView()}

        {/* Upcoming Events List */}
        <Card className="mt-6">
          <div className="border-b p-4 bg-muted/30">
            <h3 className="font-semibold">Upcoming Events (Next 7 Days)</h3>
          </div>
          <div className="divide-y">
            {events
              .filter((event) => {
                const today = new Date();
                const sevenDaysLater = new Date();
                sevenDaysLater.setDate(today.getDate() + 7);
                return event.date >= today && event.date <= sevenDaysLater;
              })
              .sort((a, b) => a.date.getTime() - b.date.getTime())
              .slice(0, 10)
              .map((event, idx) => (
                <div key={idx} className="p-4 hover:bg-muted/50 transition-colors">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="text-center">
                        <div className="text-2xl font-bold">{format(event.date, "d")}</div>
                        <div className="text-xs text-muted-foreground">{format(event.date, "MMM")}</div>
                      </div>
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <p className="font-semibold">{event.ipo.name}</p>
                          <Badge className={getEventColor(event.type)}>
                            {getEventLabel(event.type)}
                          </Badge>
                        </div>
                        <div className="flex items-center gap-3 text-xs text-muted-foreground">
                          <span>{event.ipo.symbol}</span>
                          <span>•</span>
                          <span>{event.ipo.sector}</span>
                          <span>•</span>
                          <span className="font-mono">Issue: ₹{event.ipo.issuePrice}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleReminder(event.ipo, getEventLabel(event.type))}
                      >
                        <Bell className="w-4 h-4 mr-2" />
                        Set Reminder
                      </Button>
                      <Link href={`/ipo/${event.ipo.id}`}>
                        <Button size="sm">View Details</Button>
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </Card>
      </div>

      <Footer />
    </div>
  );
};

export default Calendar;
