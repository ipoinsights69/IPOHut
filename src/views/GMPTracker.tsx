"use client";

import { useState, useMemo } from "react";
import { IPOData } from "@/data/ipos";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { TrendingUp, TrendingDown, ArrowUpDown, Calendar } from "lucide-react";
import Link from "next/link";

type SortField = "name" | "gmpPrice" | "expectedListing" | "status";
type SortOrder = "asc" | "desc";

interface GMPTrackerProps {
  ipoData: IPOData[];
}

const GMPTracker = ({ ipoData }: GMPTrackerProps) => {
  const [selectedStatus, setSelectedStatus] = useState<string>("all");
  const [sortField, setSortField] = useState<SortField>("gmpPrice");
  const [sortOrder, setSortOrder] = useState<SortOrder>("desc");
  const [selectedIPO, setSelectedIPO] = useState<string | null>(null);

  const statuses = ["all", "open", "upcoming", "listed", "closed"];

  const filteredAndSortedIPOs = useMemo(() => {
    let filtered = ipoData;

    if (selectedStatus !== "all") {
      filtered = ipoData.filter((ipo) => ipo.status.toLowerCase() === selectedStatus);
    }

    const sorted = [...filtered].sort((a, b) => {
      let aValue: any;
      let bValue: any;

      switch (sortField) {
        case "name":
          aValue = a.name.toLowerCase();
          bValue = b.name.toLowerCase();
          break;
        case "gmpPrice":
          aValue = a.gmpPrice || 0;
          bValue = b.gmpPrice || 0;
          break;
        case "expectedListing":
          aValue = a.expectedListing || 0;
          bValue = b.expectedListing || 0;
          break;
        case "status":
          aValue = a.status.toLowerCase();
          bValue = b.status.toLowerCase();
          break;
        default:
          return 0;
      }

      if (aValue < bValue) return sortOrder === "asc" ? -1 : 1;
      if (aValue > bValue) return sortOrder === "asc" ? 1 : -1;
      return 0;
    });

    return sorted;
  }, [selectedStatus, sortField, sortOrder]);

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortOrder("desc");
    }
  };

  const selectedIPOData = selectedIPO ? ipoData.find((ipo) => ipo.id === selectedIPO) : null;

  const totalIPOs = filteredAndSortedIPOs.length;
  const avgGMP = filteredAndSortedIPOs.reduce((sum, ipo) => sum + (ipo.gmpPremium || 0), 0) / totalIPOs;
  const positiveGMP = filteredAndSortedIPOs.filter((ipo) => (ipo.gmpPremium || 0) > 0).length;

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="mb-8">
          <h1 className="text-hero font-bold mb-2">GMP Live Tracker</h1>
          <p className="text-muted-foreground">
            Real-time Grey Market Premium data for all IPOs
          </p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <Card>
            <CardContent className="pt-6">
              <div className="text-2xl font-bold">{totalIPOs}</div>
              <p className="text-sm text-muted-foreground">Total IPOs</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="text-2xl font-bold">₹{avgGMP.toFixed(0)}</div>
              <p className="text-sm text-muted-foreground">Average GMP</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="text-2xl font-bold">{positiveGMP}</div>
              <p className="text-sm text-muted-foreground">Positive GMP</p>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Filter by Status</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {statuses.map((status) => (
                <Button
                  key={status}
                  variant={selectedStatus === status ? "default" : "outline"}
                  onClick={() => setSelectedStatus(status)}
                  className="capitalize"
                >
                  {status}
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* GMP Table */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>GMP Data</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-4">
                      <Button
                        variant="ghost"
                        onClick={() => handleSort("name")}
                        className="font-semibold hover:bg-muted"
                      >
                        Company
                        <ArrowUpDown className="ml-2 h-4 w-4" />
                      </Button>
                    </th>
                    <th className="text-left py-3 px-4">
                      <Button
                        variant="ghost"
                        onClick={() => handleSort("status")}
                        className="font-semibold hover:bg-muted"
                      >
                        Status
                        <ArrowUpDown className="ml-2 h-4 w-4" />
                      </Button>
                    </th>
                    <th className="text-right py-3 px-4">
                      <Button
                        variant="ghost"
                        onClick={() => handleSort("gmpPrice")}
                        className="font-semibold hover:bg-muted"
                      >
                        GMP Premium
                        <ArrowUpDown className="ml-2 h-4 w-4" />
                      </Button>
                    </th>
                    <th className="text-right py-3 px-4">Premium %</th>
                    <th className="text-right py-3 px-4">
                      <Button
                        variant="ghost"
                        onClick={() => handleSort("expectedListing")}
                        className="font-semibold hover:bg-muted"
                      >
                        Expected Listing
                        <ArrowUpDown className="ml-2 h-4 w-4" />
                      </Button>
                    </th>
                    <th className="text-center py-3 px-4">Chart</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredAndSortedIPOs.map((ipo) => {
                    const premium = ipo.gmpPremiumPercent || 0;
                    const isPositive = (ipo.gmpPremium || 0) > 0;

                    return (
                      <tr key={ipo.id} className="border-b hover:bg-muted/50">
                        <td className="py-3 px-4">
                          <Link href={`/ipo/${ipo.id}`} className="hover:underline font-medium">
                            {ipo.name}
                          </Link>
                        </td>
                        <td className="py-3 px-4">
                          <Badge
                            variant={
                              ipo.status === "Open"
                                ? "default"
                                : ipo.status === "Upcoming"
                                  ? "secondary"
                                  : "outline"
                            }
                          >
                            {ipo.status}
                          </Badge>
                        </td>
                        <td className="text-right py-3 px-4 font-semibold">
                          <span className={isPositive ? "text-green-600" : "text-red-600"}>
                            ₹{ipo.gmpPremium || 0}
                          </span>
                        </td>
                        <td className="text-right py-3 px-4">
                          <div className="flex items-center justify-end gap-1">
                            {isPositive ? (
                              <TrendingUp className="h-4 w-4 text-green-600" />
                            ) : (
                              <TrendingDown className="h-4 w-4 text-red-600" />
                            )}
                            <span className={isPositive ? "text-green-600" : "text-red-600"}>
                              {premium.toFixed(1)}%
                            </span>
                          </div>
                        </td>
                        <td className="text-right py-3 px-4 font-semibold">
                          ₹{ipo.expectedListing || 0}
                        </td>
                        <td className="text-center py-3 px-4">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => setSelectedIPO(ipo.id === selectedIPO ? null : ipo.id)}
                            disabled={!ipo.tradingData || ipo.tradingData.length === 0}
                          >
                            <Calendar className="h-4 w-4" />
                          </Button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* Historical Price Chart */}
        {selectedIPOData && selectedIPOData.tradingData && selectedIPOData.tradingData.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle>{selectedIPOData.name} - Price History</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={selectedIPOData.tradingData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="time" />
                    <YAxis />
                    <Tooltip />
                    <Line
                      type="monotone"
                      dataKey="close"
                      stroke="hsl(var(--primary))"
                      strokeWidth={2}
                      dot={{ r: 4 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default GMPTracker;
