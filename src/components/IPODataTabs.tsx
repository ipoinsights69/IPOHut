"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from "recharts";
import GMPData from "@/components/GMPData";
import TradingChart from "@/components/TradingChart";
import { useParams } from "next/navigation";
import { ipoData } from "@/data/ipos";

const subscriptionData = [
  { category: "Retail", times: 3.2, color: "hsl(var(--chart-1))" },
  { category: "sNII", times: 5.8, color: "hsl(var(--chart-2))" },
  { category: "bNII", times: 6.5, color: "hsl(var(--chart-3))" },
  { category: "QIB", times: 12.4, color: "hsl(var(--chart-4))" },
];

const IPODataTabs = () => {
  const { id } = useParams();
  const ipo = ipoData.find((i) => i.id === id) || ipoData[0];

  return (
    <div className="container mx-auto px-4 py-6">
      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="w-full justify-start border-b rounded-none h-auto p-0 bg-transparent">
          <TabsTrigger value="overview" className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent">
            Overview
          </TabsTrigger>
          <TabsTrigger value="investment" className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent">
            Investment Details
          </TabsTrigger>
          <TabsTrigger value="allocation" className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent">
            Allocation
          </TabsTrigger>
          <TabsTrigger value="financials" className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent">
            Financials
          </TabsTrigger>
          <TabsTrigger value="subscription" className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent">
            Subscription
          </TabsTrigger>
          <TabsTrigger value="gmp" className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent">
            GMP
          </TabsTrigger>
          <TabsTrigger value="contact" className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent">
            Contact
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="mt-6 animate-fade-in">
          {/* Trading Chart - Full width at top for Listed IPOs */}
          {ipo.status === "Listed" && ipo.tradingData && (
            <div className="mb-6">
              <TradingChart data={ipo.tradingData} issuePrice={ipo.issuePrice} />
            </div>
          )}

          <div className="grid md:grid-cols-2 gap-6">
            <Card>
              <div className="border-b p-4 bg-muted/30">
                <h3 className="font-semibold text-sm">IPO Details</h3>
              </div>
              <table className="w-full text-sm">
                <tbody>
                  <tr className="border-b">
                    <td className="p-3 text-muted-foreground">Issue Type</td>
                    <td className="p-3 font-medium text-right">Offer For Sale</td>
                  </tr>
                  <tr className="border-b">
                    <td className="p-3 text-muted-foreground">Issue Size</td>
                    <td className="p-3 font-mono font-semibold text-right">₹3,600.00 Cr</td>
                  </tr>
                  <tr className="border-b">
                    <td className="p-3 text-muted-foreground">Total Shares</td>
                    <td className="p-3 font-mono font-semibold text-right">9,06,80,100</td>
                  </tr>
                  <tr className="border-b">
                    <td className="p-3 text-muted-foreground">Face Value</td>
                    <td className="p-3 font-mono text-right">₹10 per share</td>
                  </tr>
                  <tr className="border-b">
                    <td className="p-3 text-muted-foreground">Price Band</td>
                    <td className="p-3 font-mono text-right">₹378 - ₹397</td>
                  </tr>
                  <tr className="border-b">
                    <td className="p-3 text-muted-foreground">Issue Price</td>
                    <td className="p-3 font-mono font-bold text-right">₹397</td>
                  </tr>
                  <tr className="border-b">
                    <td className="p-3 text-muted-foreground">Lot Size</td>
                    <td className="p-3 font-mono font-bold text-right text-primary">37 shares</td>
                  </tr>
                  <tr>
                    <td className="p-3 text-muted-foreground">Min Investment</td>
                    <td className="p-3 font-mono font-bold text-right text-primary">₹14,689</td>
                  </tr>
                </tbody>
              </table>
            </Card>

            <Card>
              <div className="border-b p-4 bg-muted/30">
                <h3 className="font-semibold text-sm">Timeline</h3>
              </div>
              <table className="w-full text-sm">
                <tbody>
                  <tr className="border-b">
                    <td className="p-3 text-muted-foreground">IPO Open Date</td>
                    <td className="p-3 font-medium text-right">Nov 12, 2025</td>
                  </tr>
                  <tr className="border-b">
                    <td className="p-3 text-muted-foreground">IPO Close Date</td>
                    <td className="p-3 font-medium text-right">Nov 14, 2025</td>
                  </tr>
                  <tr className="border-b">
                    <td className="p-3 text-muted-foreground">Allotment Date</td>
                    <td className="p-3 font-medium text-right">Nov 17, 2025</td>
                  </tr>
                  <tr className="border-b">
                    <td className="p-3 text-muted-foreground">Refund Date</td>
                    <td className="p-3 font-medium text-right">Nov 18, 2025</td>
                  </tr>
                  <tr className="border-b">
                    <td className="p-3 text-muted-foreground">Demat Credit</td>
                    <td className="p-3 font-medium text-right">Nov 18, 2025</td>
                  </tr>
                  <tr className="border-b">
                    <td className="p-3 text-muted-foreground">Listing Date</td>
                    <td className="p-3 font-semibold text-right">Nov 19, 2025</td>
                  </tr>
                  <tr className="border-b">
                    <td className="p-3 text-muted-foreground">Anchor Lock-in (50%)</td>
                    <td className="p-3 font-medium text-right">Dec 16, 2025</td>
                  </tr>
                  <tr>
                    <td className="p-3 text-muted-foreground">Anchor Lock-in (100%)</td>
                    <td className="p-3 font-medium text-right">Feb 14, 2026</td>
                  </tr>
                </tbody>
              </table>
            </Card>

            {/* Trading Chart for non-listed but has data */}
            {ipo.status !== "Listed" && ipo.tradingData && (
              <Card className="md:col-span-2">
                <TradingChart data={ipo.tradingData} issuePrice={ipo.issuePrice} />
              </Card>
            )}

            <GMPData />
          </div>
        </TabsContent>

        <TabsContent value="investment" className="mt-6 animate-fade-in">
          <Card>
            <div className="border-b p-4 bg-muted/30">
              <h3 className="font-semibold text-sm">Lot Size & Application Limits</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b bg-muted/50">
                    <th className="p-3 text-left font-semibold">Investor Category</th>
                    <th className="p-3 text-right font-semibold">Min Lots</th>
                    <th className="p-3 text-right font-semibold">Max Lots</th>
                    <th className="p-3 text-right font-semibold">Min Shares</th>
                    <th className="p-3 text-right font-semibold">Max Shares</th>
                    <th className="p-3 text-right font-semibold">Min Amount</th>
                    <th className="p-3 text-right font-semibold">Max Amount</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b hover:bg-muted/30">
                    <td className="p-3 font-medium">Retail Individual (RII)</td>
                    <td className="p-3 text-right font-mono">1</td>
                    <td className="p-3 text-right font-mono">13</td>
                    <td className="p-3 text-right font-mono">37</td>
                    <td className="p-3 text-right font-mono">481</td>
                    <td className="p-3 text-right font-mono font-semibold">₹14,689</td>
                    <td className="p-3 text-right font-mono font-semibold">₹1,90,957</td>
                  </tr>
                  <tr className="border-b hover:bg-muted/30">
                    <td className="p-3 font-medium">Small NII (sNII) - Min</td>
                    <td className="p-3 text-right font-mono">14</td>
                    <td className="p-3 text-right font-mono">-</td>
                    <td className="p-3 text-right font-mono">518</td>
                    <td className="p-3 text-right font-mono">-</td>
                    <td className="p-3 text-right font-mono font-semibold">₹2,05,646</td>
                    <td className="p-3 text-right font-mono">-</td>
                  </tr>
                  <tr className="border-b hover:bg-muted/30">
                    <td className="p-3 font-medium">Small NII (sNII) - Max</td>
                    <td className="p-3 text-right font-mono">-</td>
                    <td className="p-3 text-right font-mono">68</td>
                    <td className="p-3 text-right font-mono">-</td>
                    <td className="p-3 text-right font-mono">2,516</td>
                    <td className="p-3 text-right font-mono">-</td>
                    <td className="p-3 text-right font-mono font-semibold">₹9,98,852</td>
                  </tr>
                  <tr className="border-b hover:bg-muted/30">
                    <td className="p-3 font-medium">Big NII (bNII) - Min</td>
                    <td className="p-3 text-right font-mono">69</td>
                    <td className="p-3 text-right font-mono">-</td>
                    <td className="p-3 text-right font-mono">2,553</td>
                    <td className="p-3 text-right font-mono">-</td>
                    <td className="p-3 text-right font-mono font-semibold">₹10,13,541</td>
                    <td className="p-3 text-right font-mono">-</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="p-4 bg-primary/5 border-t text-xs">
              <p className="font-semibold mb-1">Key Information:</p>
              <ul className="space-y-1 text-muted-foreground">
                <li>• Lot Size: <span className="font-mono font-semibold text-foreground">37 shares</span></li>
                <li>• Issue Price: <span className="font-mono font-semibold text-foreground">₹397 per share</span></li>
                <li>• RII = Retail Individual Investors | sNII = Small Non-Institutional Investors | bNII = Big Non-Institutional Investors</li>
              </ul>
            </div>
          </Card>

          <Card className="mt-6">
            <div className="border-b p-4 bg-muted/30">
              <h3 className="font-semibold text-sm">Listing Day Performance</h3>
            </div>
            <div className="grid md:grid-cols-2 divide-x">
              <div className="p-4">
                <p className="text-xs font-semibold text-muted-foreground mb-3">BSE (Bombay Stock Exchange)</p>
                <table className="w-full text-sm">
                  <tbody>
                    <tr className="border-b">
                      <td className="py-2 text-muted-foreground">Open</td>
                      <td className="py-2 text-right font-mono font-semibold">₹498.00</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-2 text-muted-foreground">High</td>
                      <td className="py-2 text-right font-mono font-semibold text-success">₹517.00</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-2 text-muted-foreground">Low</td>
                      <td className="py-2 text-right font-mono font-semibold text-destructive">₹479.75</td>
                    </tr>
                    <tr>
                      <td className="py-2 text-muted-foreground">Close</td>
                      <td className="py-2 text-right font-mono font-semibold">₹491.20</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className="p-4">
                <p className="text-xs font-semibold text-muted-foreground mb-3">NSE (National Stock Exchange)</p>
                <table className="w-full text-sm">
                  <tbody>
                    <tr className="border-b">
                      <td className="py-2 text-muted-foreground">Open</td>
                      <td className="py-2 text-right font-mono font-semibold">₹505.00</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-2 text-muted-foreground">High</td>
                      <td className="py-2 text-right font-mono font-semibold text-success">₹517.00</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-2 text-muted-foreground">Low</td>
                      <td className="py-2 text-right font-mono font-semibold text-destructive">₹480.10</td>
                    </tr>
                    <tr>
                      <td className="py-2 text-muted-foreground">Close</td>
                      <td className="py-2 text-right font-mono font-semibold">₹490.80</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="allocation" className="mt-6 animate-fade-in">
          <div className="grid md:grid-cols-2 gap-6">
            <Card>
              <div className="border-b p-4 bg-muted/30">
                <h3 className="font-semibold text-sm">Share Reservation</h3>
              </div>
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b bg-muted/50">
                    <th className="p-3 text-left font-semibold">Category</th>
                    <th className="p-3 text-right font-semibold">Shares</th>
                    <th className="p-3 text-right font-semibold">Percentage</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b hover:bg-muted/30">
                    <td className="p-3 font-medium">QIB (Ex. Anchor)</td>
                    <td className="p-3 text-right font-mono">1,81,36,020</td>
                    <td className="p-3 text-right font-mono font-bold">20.00%</td>
                  </tr>
                  <tr className="border-b hover:bg-muted/30">
                    <td className="p-3 font-medium">Anchor Investors</td>
                    <td className="p-3 text-right font-mono">2,72,04,030</td>
                    <td className="p-3 text-right font-mono font-bold">30.00%</td>
                  </tr>
                  <tr className="border-b hover:bg-muted/30">
                    <td className="p-3 font-medium">NII (HNI)</td>
                    <td className="p-3 text-right font-mono">1,36,02,015</td>
                    <td className="p-3 text-right font-mono font-bold">15.00%</td>
                  </tr>
                  <tr className="border-b hover:bg-muted/30">
                    <td className="p-3 font-medium">Retail (RII)</td>
                    <td className="p-3 text-right font-mono">3,17,38,035</td>
                    <td className="p-3 text-right font-mono font-bold">35.00%</td>
                  </tr>
                  <tr className="bg-muted/30">
                    <td className="p-3 font-bold">Total</td>
                    <td className="p-3 text-right font-mono font-bold">9,06,80,100</td>
                    <td className="p-3 text-right font-mono font-bold">100.00%</td>
                  </tr>
                </tbody>
              </table>
            </Card>

            <Card>
              <div className="border-b p-4 bg-muted/30">
                <h3 className="font-semibold text-sm">Anchor Investor Details</h3>
              </div>
              <table className="w-full text-sm">
                <tbody>
                  <tr className="border-b">
                    <td className="p-3 text-muted-foreground">Shares Allocated</td>
                    <td className="p-3 text-right font-mono font-semibold">2,72,04,030</td>
                  </tr>
                  <tr className="border-b">
                    <td className="p-3 text-muted-foreground">Amount Raised</td>
                    <td className="p-3 text-right font-mono font-bold">₹1,080.00 Cr</td>
                  </tr>
                  <tr className="border-b">
                    <td className="p-3 text-muted-foreground">Bid Date</td>
                    <td className="p-3 text-right font-medium">November 11, 2025</td>
                  </tr>
                  <tr className="border-b">
                    <td className="p-3 text-muted-foreground">Lock-in (50% shares)</td>
                    <td className="p-3 text-right font-medium">30 Days (Dec 16, 2025)</td>
                  </tr>
                  <tr>
                    <td className="p-3 text-muted-foreground">Lock-in (Remaining)</td>
                    <td className="p-3 text-right font-medium">90 Days (Feb 14, 2026)</td>
                  </tr>
                </tbody>
              </table>

              <div className="p-4 border-t">
                <p className="text-xs font-semibold text-muted-foreground mb-3">Promoter Holding</p>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">Pre-Issue</p>
                    <p className="font-mono text-lg font-bold">97.25%</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">Post-Issue</p>
                    <p className="font-mono text-lg font-bold">74.79%</p>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="financials" className="mt-6 animate-fade-in">
          <div className="grid md:grid-cols-2 gap-6">
            <Card>
              <div className="border-b p-4 bg-muted/30">
                <h3 className="font-semibold text-sm">Company Information</h3>
              </div>
              <table className="w-full text-sm">
                <tbody>
                  <tr className="border-b">
                    <td className="p-3 text-muted-foreground">Company Name</td>
                    <td className="p-3 text-right font-medium">Tenneco Clean Air India Ltd.</td>
                  </tr>
                  <tr className="border-b">
                    <td className="p-3 text-muted-foreground">Incorporation</td>
                    <td className="p-3 text-right font-medium">2018</td>
                  </tr>
                  <tr className="border-b">
                    <td className="p-3 text-muted-foreground">Parent Company</td>
                    <td className="p-3 text-right font-medium">Tenneco Inc.</td>
                  </tr>
                  <tr className="border-b">
                    <td className="p-3 text-muted-foreground">Manufacturing Facilities</td>
                    <td className="p-3 text-right font-mono font-semibold">12 Plants</td>
                  </tr>
                  <tr className="border-b">
                    <td className="p-3 text-muted-foreground">Clean Air Facilities</td>
                    <td className="p-3 text-right font-mono">7</td>
                  </tr>
                  <tr>
                    <td className="p-3 text-muted-foreground">Ride Technology Facilities</td>
                    <td className="p-3 text-right font-mono">5</td>
                  </tr>
                </tbody>
              </table>
            </Card>

            <Card>
              <div className="border-b p-4 bg-muted/30">
                <h3 className="font-semibold text-sm">Financial Performance (FY24-25)</h3>
              </div>
              <table className="w-full text-sm">
                <tbody>
                  <tr className="border-b">
                    <td className="p-3 text-muted-foreground">Revenue Growth</td>
                    <td className="p-3 text-right">
                      <span className="font-mono font-bold text-destructive">-11%</span>
                      <span className="text-xs text-muted-foreground ml-2">YoY</span>
                    </td>
                  </tr>
                  <tr className="border-b">
                    <td className="p-3 text-muted-foreground">PAT Growth</td>
                    <td className="p-3 text-right">
                      <span className="font-mono font-bold text-success">+33%</span>
                      <span className="text-xs text-muted-foreground ml-2">YoY</span>
                    </td>
                  </tr>
                  <tr>
                    <td className="p-3 text-muted-foreground" colSpan={2}>
                      <p className="text-xs">Improved profitability despite revenue decline indicates better operational efficiency and cost management</p>
                    </td>
                  </tr>
                </tbody>
              </table>
            </Card>

            <Card className="md:col-span-2">
              <div className="border-b p-4 bg-muted/30">
                <h3 className="font-semibold text-sm">Product Portfolio</h3>
              </div>
              <div className="grid md:grid-cols-2 divide-x text-sm">
                <div className="p-4">
                  <p className="font-semibold mb-3">Clean Air & Powertrain Solutions</p>
                  <ul className="space-y-2 text-muted-foreground">
                    <li>• Catalytic Converters</li>
                    <li>• Diesel Particulate Filters (DPFs)</li>
                    <li>• Mufflers and Exhaust Systems</li>
                    <li>• Emission Control Technologies</li>
                    <li>• Powertrain Solutions for BS-VI compliance</li>
                  </ul>
                </div>
                <div className="p-4">
                  <p className="font-semibold mb-3">Advanced Ride Technologies</p>
                  <ul className="space-y-2 text-muted-foreground">
                    <li>• Shock Absorbers</li>
                    <li>• Struts</li>
                    <li>• Advanced Suspension Systems</li>
                    <li>• Ride Control Technology</li>
                  </ul>
                </div>
              </div>
            </Card>

            <Card className="md:col-span-2">
              <div className="border-b p-4 bg-muted/30">
                <h3 className="font-semibold text-sm">Key Promoters</h3>
              </div>
              <div className="p-4">
                <ul className="grid md:grid-cols-2 gap-2 text-sm">
                  <li className="flex items-start gap-2">
                    <span className="text-muted-foreground">•</span>
                    <span>Tenneco Mauritius Holdings Limited</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-muted-foreground">•</span>
                    <span>Tenneco (Mauritius) Limited</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-muted-foreground">•</span>
                    <span>Federal-Mogul Investments B.V.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-muted-foreground">•</span>
                    <span>Federal-Mogul Pty Ltd</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-muted-foreground">•</span>
                    <span>Tenneco LLC</span>
                  </li>
                </ul>
              </div>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="subscription" className="mt-6 animate-fade-in">
          <div className="grid md:grid-cols-2 gap-6">
            <Card>
              <div className="border-b p-4 bg-muted/30">
                <h3 className="font-semibold text-sm">Subscription Data</h3>
              </div>
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b bg-muted/50">
                    <th className="p-3 text-left font-semibold">Category</th>
                    <th className="p-3 text-right font-semibold">Times Subscribed</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b hover:bg-muted/30">
                    <td className="p-3 font-medium">Retail Individual Investors</td>
                    <td className="p-3 text-right font-mono font-bold">3.2x</td>
                  </tr>
                  <tr className="border-b hover:bg-muted/30">
                    <td className="p-3 font-medium">Small NII</td>
                    <td className="p-3 text-right font-mono font-bold">5.8x</td>
                  </tr>
                  <tr className="border-b hover:bg-muted/30">
                    <td className="p-3 font-medium">Big NII</td>
                    <td className="p-3 text-right font-mono font-bold">6.5x</td>
                  </tr>
                  <tr className="border-b hover:bg-muted/30">
                    <td className="p-3 font-medium">Qualified Institutional Buyers</td>
                    <td className="p-3 text-right font-mono font-bold">12.4x</td>
                  </tr>
                  <tr className="bg-muted/30">
                    <td className="p-3 font-bold">Overall Subscription</td>
                    <td className="p-3 text-right font-mono font-bold text-primary">7.1x</td>
                  </tr>
                </tbody>
              </table>
            </Card>

            <Card>
              <div className="border-b p-4 bg-muted/30">
                <h3 className="font-semibold text-sm">Subscription Chart</h3>
              </div>
              <div className="p-4">
                <ResponsiveContainer width="100%" height={280}>
                  <BarChart data={subscriptionData} layout="vertical">
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                    <XAxis
                      type="number"
                      tick={{ fontSize: 11, fill: 'hsl(var(--muted-foreground))' }}
                      stroke="hsl(var(--border))"
                      label={{ value: 'Times Subscribed', position: 'bottom', style: { fontSize: 11 } }}
                    />
                    <YAxis
                      type="category"
                      dataKey="category"
                      tick={{ fontSize: 11, fill: 'hsl(var(--muted-foreground))' }}
                      stroke="hsl(var(--border))"
                      width={60}
                    />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: 'hsl(var(--card))',
                        border: '1px solid hsl(var(--border))',
                        borderRadius: '8px',
                        fontSize: '12px'
                      }}
                      formatter={(value: number) => [`${value}x`, 'Subscribed']}
                    />
                    <Bar dataKey="times" radius={[0, 4, 4, 0]}>
                      {subscriptionData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="gmp" className="mt-6 animate-fade-in">
          <GMPData />

          <Card className="mt-6">
            <div className="border-b p-4 bg-muted/30">
              <h3 className="font-semibold text-sm">GMP Historical Trend</h3>
              <p className="text-xs text-muted-foreground mt-1">
                Grey market premium changes during the subscription period
              </p>
            </div>
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b bg-muted/50">
                  <th className="p-3 text-left font-semibold">Date</th>
                  <th className="p-3 text-right font-semibold">GMP Price</th>
                  <th className="p-3 text-right font-semibold">Premium</th>
                  <th className="p-3 text-right font-semibold">Kostak</th>
                  <th className="p-3 text-right font-semibold">S2S</th>
                  <th className="p-3 text-left font-semibold">Sentiment</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b hover:bg-muted/30">
                  <td className="p-3">Nov 18, 2025</td>
                  <td className="p-3 text-right font-mono font-bold">₹495</td>
                  <td className="p-3 text-right font-mono text-success">+₹98 (24.69%)</td>
                  <td className="p-3 text-right font-mono">₹85</td>
                  <td className="p-3 text-right font-mono">₹482</td>
                  <td className="p-3">
                    <Badge variant="default" className="text-xs">Positive</Badge>
                  </td>
                </tr>
                <tr className="border-b hover:bg-muted/30">
                  <td className="p-3">Nov 17, 2025</td>
                  <td className="p-3 text-right font-mono font-bold">₹490</td>
                  <td className="p-3 text-right font-mono text-success">+₹93 (23.43%)</td>
                  <td className="p-3 text-right font-mono">₹80</td>
                  <td className="p-3 text-right font-mono">₹478</td>
                  <td className="p-3">
                    <Badge variant="default" className="text-xs">Positive</Badge>
                  </td>
                </tr>
                <tr className="border-b hover:bg-muted/30">
                  <td className="p-3">Nov 16, 2025</td>
                  <td className="p-3 text-right font-mono font-bold">₹485</td>
                  <td className="p-3 text-right font-mono text-success">+₹88 (22.17%)</td>
                  <td className="p-3 text-right font-mono">₹75</td>
                  <td className="p-3 text-right font-mono">₹475</td>
                  <td className="p-3">
                    <Badge variant="default" className="text-xs">Positive</Badge>
                  </td>
                </tr>
                <tr className="border-b hover:bg-muted/30">
                  <td className="p-3">Nov 14, 2025</td>
                  <td className="p-3 text-right font-mono font-bold">₹475</td>
                  <td className="p-3 text-right font-mono text-success">+₹78 (19.65%)</td>
                  <td className="p-3 text-right font-mono">₹65</td>
                  <td className="p-3 text-right font-mono">₹468</td>
                  <td className="p-3">
                    <Badge variant="secondary" className="text-xs">Neutral</Badge>
                  </td>
                </tr>
                <tr className="border-b hover:bg-muted/30">
                  <td className="p-3">Nov 13, 2025</td>
                  <td className="p-3 text-right font-mono font-bold">₹465</td>
                  <td className="p-3 text-right font-mono text-success">+₹68 (17.13%)</td>
                  <td className="p-3 text-right font-mono">₹55</td>
                  <td className="p-3 text-right font-mono">₹460</td>
                  <td className="p-3">
                    <Badge variant="secondary" className="text-xs">Neutral</Badge>
                  </td>
                </tr>
                <tr className="hover:bg-muted/30">
                  <td className="p-3">Nov 12, 2025</td>
                  <td className="p-3 text-right font-mono font-bold">₹455</td>
                  <td className="p-3 text-right font-mono text-success">+₹58 (14.61%)</td>
                  <td className="p-3 text-right font-mono">₹45</td>
                  <td className="p-3 text-right font-mono">₹452</td>
                  <td className="p-3">
                    <Badge variant="secondary" className="text-xs">Neutral</Badge>
                  </td>
                </tr>
              </tbody>
            </table>
          </Card>
        </TabsContent>

        <TabsContent value="contact" className="mt-6 animate-fade-in">
          <div className="grid md:grid-cols-2 gap-6">
            <Card>
              <div className="border-b p-4 bg-muted/30">
                <h3 className="font-semibold text-sm">Company Contact</h3>
              </div>
              <table className="w-full text-sm">
                <tbody>
                  <tr className="border-b">
                    <td className="p-3 text-muted-foreground">Company Name</td>
                    <td className="p-3 text-right font-medium">Tenneco Clean Air India Ltd.</td>
                  </tr>
                  <tr className="border-b">
                    <td className="p-3 text-muted-foreground">Phone</td>
                    <td className="p-3 text-right font-mono">+91 124 4784 530</td>
                  </tr>
                  <tr>
                    <td className="p-3 text-muted-foreground">Email</td>
                    <td className="p-3 text-right">
                      <a href="mailto:TennecoIndiaInvestors@tenneco.com" className="text-primary hover:underline text-xs">
                        TennecoIndiaInvestors@tenneco.com
                      </a>
                    </td>
                  </tr>
                </tbody>
              </table>
            </Card>

            <Card>
              <div className="border-b p-4 bg-muted/30">
                <h3 className="font-semibold text-sm">Registrar</h3>
              </div>
              <table className="w-full text-sm">
                <tbody>
                  <tr className="border-b">
                    <td className="p-3 text-muted-foreground">Name</td>
                    <td className="p-3 text-right font-medium">MUFG Intime India Pvt. Ltd.</td>
                  </tr>
                  <tr className="border-b">
                    <td className="p-3 text-muted-foreground">Phone</td>
                    <td className="p-3 text-right font-mono">+91-22-4918 6270</td>
                  </tr>
                  <tr>
                    <td className="p-3 text-muted-foreground">Email</td>
                    <td className="p-3 text-right">
                      <a href="mailto:tennecocleanair.ipo@in.mpms.mufg.com" className="text-primary hover:underline text-xs">
                        tennecocleanair.ipo@in.mpms.mufg.com
                      </a>
                    </td>
                  </tr>
                </tbody>
              </table>
            </Card>

            <Card className="md:col-span-2">
              <div className="border-b p-4 bg-muted/30">
                <h3 className="font-semibold text-sm">Book Running Lead Managers</h3>
              </div>
              <div className="p-4">
                <div className="grid md:grid-cols-2 gap-4 text-sm">
                  <div className="p-3 border rounded">
                    <p className="font-medium">JM Financial Ltd.</p>
                  </div>
                  <div className="p-3 border rounded">
                    <p className="font-medium">Citigroup Global Markets India Pvt. Ltd.</p>
                  </div>
                  <div className="p-3 border rounded">
                    <p className="font-medium">HSBC Securities & Capital Markets (India) Pvt. Ltd.</p>
                  </div>
                  <div className="p-3 border rounded">
                    <p className="font-medium">Axis Capital Ltd.</p>
                  </div>
                </div>
              </div>
            </Card>

            <Card className="md:col-span-2">
              <div className="border-b p-4 bg-muted/30">
                <h3 className="font-semibold text-sm">Stock Exchange Details</h3>
              </div>
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b bg-muted/50">
                    <th className="p-3 text-left font-semibold">Exchange</th>
                    <th className="p-3 text-right font-semibold">Symbol/Code</th>
                    <th className="p-3 text-right font-semibold">Listing Date</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b hover:bg-muted/30">
                    <td className="p-3 font-medium">National Stock Exchange (NSE)</td>
                    <td className="p-3 text-right font-mono font-bold">TENNIND</td>
                    <td className="p-3 text-right">November 19, 2025</td>
                  </tr>
                  <tr className="hover:bg-muted/30">
                    <td className="p-3 font-medium">Bombay Stock Exchange (BSE)</td>
                    <td className="p-3 text-right font-mono font-bold">544612</td>
                    <td className="p-3 text-right">November 19, 2025</td>
                  </tr>
                </tbody>
              </table>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default IPODataTabs;
