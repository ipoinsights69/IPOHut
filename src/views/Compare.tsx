"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { IPOData } from "@/data/ipos";
import { TrendingUp, TrendingDown } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ExportDialog from "@/components/ExportDialog";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
  LineChart,
  Line,
} from "recharts";

interface CompareProps {
  ipoData: IPOData[];
}

const Compare = ({ ipoData }: CompareProps) => {
  const [selectedIPOs, setSelectedIPOs] = useState<string[]>(["tenneco", "swiggy"]);

  const toggleIPO = (id: string) => {
    setSelectedIPOs((prev) =>
      prev.includes(id) ? prev.filter((ipoId) => ipoId !== id) : [...prev, id]
    );
  };

  const selectedIPOData = ipoData.filter((ipo: IPOData) => selectedIPOs.includes(ipo.id));

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <div className="container mx-auto px-4 py-8">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="font-heading text-hero font-bold mb-2">Compare IPOs</h1>
            <p className="text-muted-foreground">Detailed side-by-side comparison of IPO metrics</p>
          </div>
          {selectedIPOData.length > 0 && (
            <ExportDialog compareMode selectedIPOs={selectedIPOData} />
          )}
        </div>

        {/* IPO Selection */}
        <Card className="mb-6">
          <div className="border-b p-4 bg-muted/30">
            <h3 className="font-semibold text-sm">Select IPOs to Compare (Max 4)</h3>
          </div>
          <div className="p-4">
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {ipoData.map((ipo) => (
                <div
                  key={ipo.id}
                  className="flex items-start gap-3 p-3 border rounded-lg hover:bg-muted/30 transition-colors cursor-pointer"
                  onClick={() => selectedIPOs.length < 4 || selectedIPOs.includes(ipo.id) ? toggleIPO(ipo.id) : null}
                >
                  <Checkbox
                    checked={selectedIPOs.includes(ipo.id)}
                    disabled={!selectedIPOs.includes(ipo.id) && selectedIPOs.length >= 4}
                    className="mt-1"
                  />
                  <div className="flex-1">
                    <p className="font-semibold text-sm">{ipo.name}</p>
                    <p className="text-xs text-muted-foreground">{ipo.sector}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-xs font-mono">₹{ipo.currentPrice}</span>
                      <span
                        className={`text-xs font-mono ${ipo.priceChangePercent >= 0 ? "text-success" : "text-destructive"
                          }`}
                      >
                        {ipo.priceChangePercent >= 0 ? "+" : ""}
                        {ipo.priceChangePercent.toFixed(2)}%
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Card>

        {selectedIPOData.length === 0 && (
          <Card className="p-section text-center">
            <p className="text-muted-foreground">Select at least one IPO to compare</p>
          </Card>
        )}

        {selectedIPOData.length > 0 && (
          <>
            {/* Key Metrics Comparison */}
            <Card className="mb-6">
              <div className="border-b p-4 bg-muted/30">
                <h3 className="font-semibold text-sm">Key Metrics</h3>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b bg-muted/50">
                      <th className="p-3 text-left font-semibold sticky left-0 bg-muted/50">
                        Metric
                      </th>
                      {selectedIPOData.map((ipo) => (
                        <th key={ipo.id} className="p-3 text-right font-semibold min-w-[140px]">
                          {ipo.symbol}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b hover:bg-muted/30">
                      <td className="p-3 font-medium text-muted-foreground sticky left-0 bg-background">
                        Company
                      </td>
                      {selectedIPOData.map((ipo) => (
                        <td key={ipo.id} className="p-3 text-right">
                          <div className="text-xs">{ipo.name}</div>
                        </td>
                      ))}
                    </tr>
                    <tr className="border-b hover:bg-muted/30">
                      <td className="p-3 font-medium text-muted-foreground sticky left-0 bg-background">
                        Sector
                      </td>
                      {selectedIPOData.map((ipo) => (
                        <td key={ipo.id} className="p-3 text-right">
                          <Badge variant="secondary" className="text-xs">
                            {ipo.sector}
                          </Badge>
                        </td>
                      ))}
                    </tr>
                    <tr className="border-b hover:bg-muted/30">
                      <td className="p-3 font-medium text-muted-foreground sticky left-0 bg-background">
                        Issue Price
                      </td>
                      {selectedIPOData.map((ipo) => (
                        <td key={ipo.id} className="p-3 text-right font-mono font-semibold">
                          ₹{ipo.issuePrice}
                        </td>
                      ))}
                    </tr>
                    <tr className="border-b hover:bg-muted/30">
                      <td className="p-3 font-medium text-muted-foreground sticky left-0 bg-background">
                        Current Price
                      </td>
                      {selectedIPOData.map((ipo) => (
                        <td key={ipo.id} className="p-3 text-right">
                          <div className="font-mono font-bold">₹{ipo.currentPrice}</div>
                          <div
                            className={`text-xs font-mono ${ipo.priceChangePercent >= 0 ? "text-success" : "text-destructive"
                              }`}
                          >
                            {ipo.priceChangePercent >= 0 ? "+" : ""}
                            {ipo.priceChangePercent.toFixed(2)}%
                          </div>
                        </td>
                      ))}
                    </tr>
                    <tr className="border-b hover:bg-muted/30">
                      <td className="p-3 font-medium text-muted-foreground sticky left-0 bg-background">
                        Issue Size
                      </td>
                      {selectedIPOData.map((ipo) => (
                        <td key={ipo.id} className="p-3 text-right font-mono">
                          {ipo.issueSize}
                        </td>
                      ))}
                    </tr>
                    <tr className="border-b hover:bg-muted/30">
                      <td className="p-3 font-medium text-muted-foreground sticky left-0 bg-background">
                        Lot Size
                      </td>
                      {selectedIPOData.map((ipo) => (
                        <td key={ipo.id} className="p-3 text-right font-mono">
                          {ipo.lotSize} shares
                        </td>
                      ))}
                    </tr>
                    <tr className="border-b hover:bg-muted/30">
                      <td className="p-3 font-medium text-muted-foreground sticky left-0 bg-background">
                        Min Investment
                      </td>
                      {selectedIPOData.map((ipo) => (
                        <td key={ipo.id} className="p-3 text-right font-mono">
                          ₹{ipo.minInvestment.toLocaleString()}
                        </td>
                      ))}
                    </tr>
                    <tr className="border-b hover:bg-muted/30">
                      <td className="p-3 font-medium text-muted-foreground sticky left-0 bg-background">
                        Listing Date
                      </td>
                      {selectedIPOData.map((ipo) => (
                        <td key={ipo.id} className="p-3 text-right">
                          {ipo.listingDate}
                        </td>
                      ))}
                    </tr>
                    <tr className="border-b hover:bg-muted/30">
                      <td className="p-3 font-medium text-muted-foreground sticky left-0 bg-background">
                        Listing Gain
                      </td>
                      {selectedIPOData.map((ipo) => (
                        <td key={ipo.id} className="p-3 text-right">
                          <div
                            className={`font-mono font-semibold ${ipo.listingGainPercent >= 0 ? "text-success" : "text-destructive"
                              }`}
                          >
                            ₹{ipo.listingGain}
                            <span className="text-xs ml-1">
                              ({ipo.listingGainPercent >= 0 ? "+" : ""}
                              {ipo.listingGainPercent.toFixed(2)}%)
                            </span>
                          </div>
                        </td>
                      ))}
                    </tr>
                  </tbody>
                </table>
              </div>
            </Card>

            {/* GMP Data Comparison */}
            <Card className="mb-6">
              <div className="border-b p-4 bg-muted/30">
                <h3 className="font-semibold text-sm">Grey Market Premium (GMP) Data</h3>
                <p className="text-xs text-muted-foreground mt-1">
                  Pre-listing market sentiment and expected listing prices
                </p>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b bg-muted/50">
                      <th className="p-3 text-left font-semibold sticky left-0 bg-muted/50">
                        Metric
                      </th>
                      {selectedIPOData.map((ipo) => (
                        <th key={ipo.id} className="p-3 text-right font-semibold min-w-[140px]">
                          {ipo.symbol}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b hover:bg-muted/30">
                      <td className="p-3 font-medium text-muted-foreground sticky left-0 bg-background">
                        GMP Price
                      </td>
                      {selectedIPOData.map((ipo) => (
                        <td key={ipo.id} className="p-3 text-right font-mono font-bold">
                          {ipo.gmpPrice ? `₹${ipo.gmpPrice}` : "N/A"}
                        </td>
                      ))}
                    </tr>
                    <tr className="border-b hover:bg-muted/30">
                      <td className="p-3 font-medium text-muted-foreground sticky left-0 bg-background">
                        GMP Premium
                      </td>
                      {selectedIPOData.map((ipo) => (
                        <td key={ipo.id} className="p-3 text-right">
                          {ipo.gmpPremium !== undefined ? (
                            <div>
                              <span
                                className={`font-mono font-semibold ${ipo.gmpPremium >= 0 ? "text-success" : "text-destructive"
                                  }`}
                              >
                                ₹{ipo.gmpPremium}
                              </span>
                              <span
                                className={`text-xs font-mono ml-2 ${ipo.gmpPremiumPercent && ipo.gmpPremiumPercent >= 0
                                  ? "text-success"
                                  : "text-destructive"
                                  }`}
                              >
                                ({ipo.gmpPremiumPercent?.toFixed(2)}%)
                              </span>
                            </div>
                          ) : (
                            "N/A"
                          )}
                        </td>
                      ))}
                    </tr>
                    <tr className="border-b hover:bg-muted/30">
                      <td className="p-3 font-medium text-muted-foreground sticky left-0 bg-background">
                        Kostak Rate
                      </td>
                      {selectedIPOData.map((ipo) => (
                        <td key={ipo.id} className="p-3 text-right font-mono font-semibold">
                          {ipo.kostakRate !== undefined ? `₹${ipo.kostakRate}` : "N/A"}
                        </td>
                      ))}
                    </tr>
                    <tr className="border-b hover:bg-muted/30">
                      <td className="p-3 font-medium text-muted-foreground sticky left-0 bg-background">
                        Subject to Sauda
                      </td>
                      {selectedIPOData.map((ipo) => (
                        <td key={ipo.id} className="p-3 text-right font-mono font-semibold">
                          {ipo.subjectToSauda ? `₹${ipo.subjectToSauda}` : "N/A"}
                        </td>
                      ))}
                    </tr>
                    <tr className="border-b hover:bg-muted/30">
                      <td className="p-3 font-medium text-muted-foreground sticky left-0 bg-background">
                        Expected Listing
                      </td>
                      {selectedIPOData.map((ipo) => (
                        <td key={ipo.id} className="p-3 text-right font-mono font-bold text-primary">
                          {ipo.expectedListing ? `₹${ipo.expectedListing}` : "N/A"}
                        </td>
                      ))}
                    </tr>
                    <tr className="border-b hover:bg-muted/30">
                      <td className="p-3 font-medium text-muted-foreground sticky left-0 bg-background">
                        Market Sentiment
                      </td>
                      {selectedIPOData.map((ipo) => (
                        <td key={ipo.id} className="p-3 text-right">
                          {ipo.sentiment ? (
                            <Badge
                              variant={
                                ipo.sentiment === "Positive"
                                  ? "default"
                                  : ipo.sentiment === "Negative"
                                    ? "destructive"
                                    : "secondary"
                              }
                              className="text-xs"
                            >
                              {ipo.sentiment}
                            </Badge>
                          ) : (
                            "N/A"
                          )}
                        </td>
                      ))}
                    </tr>
                    <tr className="border-b hover:bg-muted/30">
                      <td className="p-3 font-medium text-muted-foreground sticky left-0 bg-background">
                        Last Updated
                      </td>
                      {selectedIPOData.map((ipo) => (
                        <td key={ipo.id} className="p-3 text-right text-xs">
                          {ipo.gmpUpdated || "N/A"}
                        </td>
                      ))}
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className="p-4 bg-primary/5 border-t text-xs">
                <p className="font-semibold mb-2">Understanding GMP Terms:</p>
                <ul className="space-y-1 text-muted-foreground">
                  <li>
                    <strong>GMP (Grey Market Premium):</strong> Unofficial pre-listing trading price
                    indicating market demand
                  </li>
                  <li>
                    <strong>Kostak Rate:</strong> Application selling price before allotment (risk-free
                    profit booking)
                  </li>
                  <li>
                    <strong>Subject to Sauda:</strong> Conditional share selling price post-allotment,
                    pre-listing
                  </li>
                </ul>
              </div>
            </Card>

            {/* Subscription Comparison */}
            <Card className="mb-6">
              <div className="border-b p-4 bg-muted/30">
                <h3 className="font-semibold text-sm">Subscription Data</h3>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b bg-muted/50">
                      <th className="p-3 text-left font-semibold sticky left-0 bg-muted/50">
                        Category
                      </th>
                      {selectedIPOData.map((ipo) => (
                        <th key={ipo.id} className="p-3 text-right font-semibold min-w-[140px]">
                          {ipo.symbol}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b hover:bg-muted/30">
                      <td className="p-3 font-medium text-muted-foreground sticky left-0 bg-background">
                        Retail (RII)
                      </td>
                      {selectedIPOData.map((ipo) => (
                        <td key={ipo.id} className="p-3 text-right font-mono font-semibold">
                          {ipo.subscriptionRetail.toFixed(2)}x
                        </td>
                      ))}
                    </tr>
                    <tr className="border-b hover:bg-muted/30">
                      <td className="p-3 font-medium text-muted-foreground sticky left-0 bg-background">
                        NII (HNI)
                      </td>
                      {selectedIPOData.map((ipo) => (
                        <td key={ipo.id} className="p-3 text-right font-mono font-semibold">
                          {ipo.subscriptionNII.toFixed(2)}x
                        </td>
                      ))}
                    </tr>
                    <tr className="border-b hover:bg-muted/30">
                      <td className="p-3 font-medium text-muted-foreground sticky left-0 bg-background">
                        QIB
                      </td>
                      {selectedIPOData.map((ipo) => (
                        <td key={ipo.id} className="p-3 text-right font-mono font-semibold">
                          {ipo.subscriptionQIB.toFixed(2)}x
                        </td>
                      ))}
                    </tr>
                    <tr className="border-b hover:bg-muted/30 bg-muted/20">
                      <td className="p-3 font-bold sticky left-0 bg-muted/20">Overall</td>
                      {selectedIPOData.map((ipo) => (
                        <td key={ipo.id} className="p-3 text-right font-mono font-bold">
                          {ipo.subscriptionOverall.toFixed(2)}x
                        </td>
                      ))}
                    </tr>
                  </tbody>
                </table>
              </div>
            </Card>

            {/* Subscription Chart */}
            <Card className="mb-6">
              <div className="border-b p-4 bg-muted/30">
                <h3 className="font-semibold text-sm">Overall Subscription Comparison</h3>
              </div>
              <div className="p-card">
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={selectedIPOData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                    <XAxis
                      dataKey="symbol"
                      stroke="hsl(var(--muted-foreground))"
                      fontSize={12}
                    />
                    <YAxis
                      stroke="hsl(var(--muted-foreground))"
                      fontSize={12}
                      label={{ value: "Times Subscribed", angle: -90, position: "insideLeft" }}
                    />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "hsl(var(--background))",
                        border: "1px solid hsl(var(--border))",
                        borderRadius: "8px",
                      }}
                    />
                    <Bar dataKey="subscriptionOverall" radius={[8, 8, 0, 0]}>
                      {selectedIPOData.map((ipo, index) => (
                        <Cell
                          key={ipo.id}
                          fill={`hsl(var(--chart-${(index % 5) + 1}))`}
                        />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </Card>

            {/* Performance Chart */}
            <Card>
              <div className="border-b p-4 bg-muted/30">
                <h3 className="font-semibold text-sm">Price Performance (% from Issue Price)</h3>
              </div>
              <div className="p-card">
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={selectedIPOData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                    <XAxis
                      dataKey="symbol"
                      stroke="hsl(var(--muted-foreground))"
                      fontSize={12}
                    />
                    <YAxis
                      stroke="hsl(var(--muted-foreground))"
                      fontSize={12}
                      label={{ value: "Gain/Loss %", angle: -90, position: "insideLeft" }}
                    />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "hsl(var(--background))",
                        border: "1px solid hsl(var(--border))",
                        borderRadius: "8px",
                      }}
                      formatter={(value: number) => `${value >= 0 ? "+" : ""}${value.toFixed(2)}%`}
                    />
                    <Bar dataKey="priceChangePercent" radius={[8, 8, 0, 0]}>
                      {selectedIPOData.map((ipo) => (
                        <Cell
                          key={ipo.id}
                          fill={
                            ipo.priceChangePercent >= 0
                              ? "hsl(var(--success))"
                              : "hsl(var(--destructive))"
                          }
                        />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </Card>
          </>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default Compare;
