"use client";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { IPOData } from "@/data/ipos";
import { Clock, CalendarClock, Building2, ArrowRight } from "lucide-react";
import Link from "next/link";

interface UpcomingIPOsProps {
  ipoData: IPOData[];
}

const UpcomingIPOs = ({ ipoData }: UpcomingIPOsProps) => {
  const upcomingIPOs = ipoData.filter((ipo) => ipo.status === "Upcoming");
  const closedIPOs = ipoData.filter((ipo) => ipo.status === "Closed");

  const IPOCard = ({ ipo }: { ipo: typeof ipoData[0] }) => (
    <Link href={`/ipo/${ipo.id}`}>
      <Card className="group hover:shadow-xl transition-all duration-300 hover:border-primary/50 h-full">
        <div className="p-card">
          {/* Header */}
          <div className="flex items-start justify-between mb-4">
            <div className="flex-1">
              <h3 className="font-heading font-bold text-xl mb-1 group-hover:text-primary transition-colors">
                {ipo.name}
              </h3>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Building2 className="w-3 h-3" />
                <span>{ipo.sector}</span>
              </div>
            </div>
            <Badge className={ipo.status === "Upcoming"
              ? "bg-muted text-muted-foreground"
              : "bg-warning/10 text-warning border-warning/20"
            }>
              {ipo.status}
            </Badge>
          </div>

          {/* Key Metrics */}
          <div className="space-y-3 mb-4">
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Issue Price</span>
              <span className="font-mono font-bold">₹{ipo.issuePrice}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Issue Size</span>
              <span className="font-mono font-semibold">{ipo.issueSize}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Min Investment</span>
              <span className="font-mono font-semibold">₹{ipo.minInvestment.toLocaleString()}</span>
            </div>
            {ipo.status === "Closed" && (
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Subscription</span>
                <span className="font-mono font-bold text-primary">{ipo.subscriptionOverall}x</span>
              </div>
            )}
          </div>

          {/* GMP Info */}
          {ipo.gmpPremium !== undefined && (
            <div className="p-3 rounded-lg bg-muted/50 mb-4">
              <div className="flex justify-between items-center">
                <span className="text-xs text-muted-foreground">GMP</span>
                <span className={`text-sm font-bold ${ipo.gmpPremiumPercent && ipo.gmpPremiumPercent > 0 ? 'text-success' : 'text-muted-foreground'}`}>
                  +₹{ipo.gmpPremium} ({ipo.gmpPremiumPercent?.toFixed(2)}%)
                </span>
              </div>
              {ipo.expectedListing && (
                <div className="flex justify-between items-center mt-2">
                  <span className="text-xs text-muted-foreground">Expected Listing</span>
                  <span className="text-sm font-mono font-semibold">₹{ipo.expectedListing}</span>
                </div>
              )}
            </div>
          )}

          {/* Timeline */}
          <div className="border-t pt-4 space-y-2">
            <div className="flex justify-between items-center text-xs">
              <span className="text-muted-foreground">Open Date</span>
              <span className="font-medium">{ipo.openDate}</span>
            </div>
            <div className="flex justify-between items-center text-xs">
              <span className="text-muted-foreground">Close Date</span>
              <span className="font-medium">{ipo.closeDate}</span>
            </div>
            <div className="flex justify-between items-center text-xs">
              <span className="text-muted-foreground">Listing Date</span>
              <span className="font-semibold text-primary">{ipo.listingDate}</span>
            </div>
          </div>

          {/* View Details Button */}
          <Button className="w-full mt-4 gap-2 group-hover:gap-3 transition-all">
            View Details
            <ArrowRight className="w-4 h-4" />
          </Button>
        </div>
      </Card>
    </Link>
  );

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Page Header */}
      <div className="border-b bg-gradient-to-b from-muted/30 to-background">
        <div className="container mx-auto px-4 py-8 sm:py-12">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 rounded-lg bg-primary/10">
              <Clock className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h1 className="font-heading text-2xl sm:text-3xl md:text-4xl font-bold text-foreground">Upcoming & Closed IPOs</h1>
              <p className="text-sm sm:text-base text-muted-foreground mt-1">IPOs opening soon and awaiting listing</p>
            </div>
          </div>
        </div>
      </div>

      {/* IPOs Tabs */}
      <div className="container mx-auto px-4 py-8">
        <Tabs defaultValue="upcoming" className="w-full">
          <TabsList className="grid w-full max-w-md grid-cols-2 mb-8">
            <TabsTrigger value="upcoming" className="gap-2">
              <CalendarClock className="w-4 h-4" />
              Upcoming ({upcomingIPOs.length})
            </TabsTrigger>
            <TabsTrigger value="closed" className="gap-2">
              <Clock className="w-4 h-4" />
              Closed ({closedIPOs.length})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="upcoming" className="mt-6">
            {upcomingIPOs.length > 0 ? (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                {upcomingIPOs.map((ipo) => (
                  <IPOCard key={ipo.id} ipo={ipo} />
                ))}
              </div>
            ) : (
              <Card className="p-12 text-center">
                <CalendarClock className="w-16 h-16 text-muted-foreground mx-auto mb-4 opacity-50" />
                <h3 className="font-semibold text-xl mb-2">No Upcoming IPOs</h3>
                <p className="text-muted-foreground mb-6">
                  No IPOs scheduled to open soon. Check back later!
                </p>
                <Button asChild>
                  <Link href="/">Back to Home</Link>
                </Button>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="closed" className="mt-6">
            {closedIPOs.length > 0 ? (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                {closedIPOs.map((ipo) => (
                  <IPOCard key={ipo.id} ipo={ipo} />
                ))}
              </div>
            ) : (
              <Card className="p-12 text-center">
                <Clock className="w-16 h-16 text-muted-foreground mx-auto mb-4 opacity-50" />
                <h3 className="font-semibold text-xl mb-2">No Closed IPOs</h3>
                <p className="text-muted-foreground mb-6">
                  No IPOs currently closed and awaiting listing.
                </p>
                <Button asChild>
                  <Link href="/">Back to Home</Link>
                </Button>
              </Card>
            )}
          </TabsContent>
        </Tabs>
      </div>

      <Footer />
    </div>
  );
};

export default UpcomingIPOs;
