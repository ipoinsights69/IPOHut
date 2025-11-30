"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { IPOData } from "@/data/ipos";
import { Search, FileCheck, AlertCircle, ArrowLeft, ExternalLink, CheckCircle2, XCircle } from "lucide-react";
import { toast } from "sonner";

interface AllotmentCheckerProps {
  ipo: IPOData;
}

const AllotmentChecker = ({ ipo }: AllotmentCheckerProps) => {

  const [panNumber, setPanNumber] = useState("");
  const [applicationNumber, setApplicationNumber] = useState("");
  const [dpId, setDpId] = useState("");
  const [clientId, setClientId] = useState("");
  const [isChecking, setIsChecking] = useState(false);

  const handleCheckByPAN = () => {
    if (!panNumber || panNumber.length !== 10) {
      toast.error("Please enter a valid 10-character PAN number");
      return;
    }

    setIsChecking(true);
    // Simulate API call
    setTimeout(() => {
      setIsChecking(false);
      toast.info("This is a demo. Connect to registrar API for live allotment status.");
    }, 2000);
  };

  const handleCheckByApplication = () => {
    if (!applicationNumber) {
      toast.error("Please enter your application number");
      return;
    }

    setIsChecking(true);
    setTimeout(() => {
      setIsChecking(false);
      toast.info("This is a demo. Connect to registrar API for live allotment status.");
    }, 2000);
  };

  const handleCheckByDPID = () => {
    if (!dpId || !clientId) {
      toast.error("Please enter both DP ID and Client ID");
      return;
    }

    setIsChecking(true);
    setTimeout(() => {
      setIsChecking(false);
      toast.info("This is a demo. Connect to registrar API for live allotment status.");
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Page Header */}
      <div className="border-b bg-gradient-to-b from-muted/30 to-background">
        <div className="container mx-auto px-4 py-6 sm:py-8">
          <Link href={`/ipo/${ipo.id}`}>
            <Button variant="ghost" size="sm" className="gap-2 mb-4">
              <ArrowLeft className="w-4 h-4" />
              Back to IPO Details
            </Button>
          </Link>

          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 rounded-lg bg-primary/10">
              <FileCheck className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h1 className="font-heading text-2xl sm:text-4xl font-bold text-foreground">{ipo.name}</h1>
              <p className="text-sm sm:text-base text-muted-foreground mt-1">Check IPO Allotment Status</p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <Badge className={ipo.status === "Listed" ? "bg-gold/10 text-gold border-gold/20" : "bg-warning/10 text-warning border-warning/20"}>
              {ipo.status}
            </Badge>
            {ipo.registrar && (
              <div className="text-sm text-muted-foreground">
                Registrar: <span className="font-semibold text-foreground">{ipo.registrar}</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto space-y-6">
          {/* Important Info Card */}
          <Card className="border-warning/50 bg-warning/5">
            <div className="p-4 sm:p-6">
              <div className="flex gap-3">
                <AlertCircle className="w-5 h-5 text-warning flex-shrink-0 mt-0.5" />
                <div className="space-y-2 text-sm">
                  <p className="font-semibold text-foreground">Important Information</p>
                  <ul className="space-y-1 text-muted-foreground">
                    <li>• Allotment status is usually available 7-10 days after IPO closes</li>
                    <li>• Check on the allotment date: <span className="font-semibold text-foreground">{ipo.listingDate}</span></li>
                    <li>• You can check status using PAN, Application Number, or DP ID/Client ID</li>
                    <li>• Registrar: {ipo.registrar || "TBA"}</li>
                  </ul>
                </div>
              </div>
            </div>
          </Card>

          {/* Check Allotment Status */}
          <Card>
            <div className="border-b p-4 sm:p-6 bg-muted/30">
              <h2 className="font-semibold text-lg sm:text-xl flex items-center gap-2">
                <Search className="w-5 h-5" />
                Check Allotment Status
              </h2>
            </div>

            <div className="p-4 sm:p-6">
              <Tabs defaultValue="pan" className="w-full">
                <TabsList className="grid w-full grid-cols-3 mb-6">
                  <TabsTrigger value="pan">By PAN</TabsTrigger>
                  <TabsTrigger value="application">By Application No.</TabsTrigger>
                  <TabsTrigger value="dpid">By DP ID</TabsTrigger>
                </TabsList>

                <TabsContent value="pan" className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="pan">PAN Number</Label>
                    <Input
                      id="pan"
                      placeholder="Enter your PAN (e.g., ABCDE1234F)"
                      value={panNumber}
                      onChange={(e) => setPanNumber(e.target.value.toUpperCase())}
                      maxLength={10}
                      className="font-mono uppercase"
                    />
                    <p className="text-xs text-muted-foreground">Enter the PAN used while applying for the IPO</p>
                  </div>
                  <Button
                    onClick={handleCheckByPAN}
                    className="w-full gap-2"
                    disabled={isChecking}
                  >
                    {isChecking ? (
                      <>Checking...</>
                    ) : (
                      <>
                        <Search className="w-4 h-4" />
                        Check Allotment Status
                      </>
                    )}
                  </Button>
                </TabsContent>

                <TabsContent value="application" className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="application">Application Number</Label>
                    <Input
                      id="application"
                      placeholder="Enter your application number"
                      value={applicationNumber}
                      onChange={(e) => setApplicationNumber(e.target.value)}
                      className="font-mono"
                    />
                    <p className="text-xs text-muted-foreground">Application number from your IPO application form</p>
                  </div>
                  <Button
                    onClick={handleCheckByApplication}
                    className="w-full gap-2"
                    disabled={isChecking}
                  >
                    {isChecking ? (
                      <>Checking...</>
                    ) : (
                      <>
                        <Search className="w-4 h-4" />
                        Check Allotment Status
                      </>
                    )}
                  </Button>
                </TabsContent>

                <TabsContent value="dpid" className="space-y-4">
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="dpid">DP ID</Label>
                      <Input
                        id="dpid"
                        placeholder="Enter your DP ID"
                        value={dpId}
                        onChange={(e) => setDpId(e.target.value)}
                        className="font-mono"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="clientid">Client ID</Label>
                      <Input
                        id="clientid"
                        placeholder="Enter your Client ID"
                        value={clientId}
                        onChange={(e) => setClientId(e.target.value)}
                        className="font-mono"
                      />
                    </div>
                    <p className="text-xs text-muted-foreground">DP ID and Client ID from your demat account</p>
                  </div>
                  <Button
                    onClick={handleCheckByDPID}
                    className="w-full gap-2"
                    disabled={isChecking}
                  >
                    {isChecking ? (
                      <>Checking...</>
                    ) : (
                      <>
                        <Search className="w-4 h-4" />
                        Check Allotment Status
                      </>
                    )}
                  </Button>
                </TabsContent>
              </Tabs>
            </div>
          </Card>

          {/* Registrar Links */}
          {ipo.registrar && (
            <Card>
              <div className="border-b p-4 sm:p-6 bg-muted/30">
                <h3 className="font-semibold text-base sm:text-lg">Official Registrar Links</h3>
              </div>
              <div className="p-4 sm:p-6 space-y-4">
                {ipo.registrarWebsite && (
                  <a
                    href={ipo.registrarWebsite}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between p-4 rounded-lg border hover:bg-muted/50 transition-colors group"
                  >
                    <div>
                      <p className="font-semibold text-sm sm:text-base mb-1">Check on Registrar Website</p>
                      <p className="text-xs text-muted-foreground">{ipo.registrar} Official Portal</p>
                    </div>
                    <ExternalLink className="w-5 h-5 text-muted-foreground group-hover:text-primary" />
                  </a>
                )}

                <div className="p-4 rounded-lg bg-muted/30 text-sm text-muted-foreground">
                  <p className="font-semibold text-foreground mb-2">Alternative Methods:</p>
                  <ul className="space-y-1">
                    <li>• Visit the registrar's website directly</li>
                    <li>• Check your email for allotment confirmation</li>
                    <li>• Contact your broker for allotment details</li>
                  </ul>
                </div>
              </div>
            </Card>
          )}

          {/* What Next */}
          <Card>
            <div className="border-b p-4 sm:p-6 bg-muted/30">
              <h3 className="font-semibold text-base sm:text-lg">What Happens Next?</h3>
            </div>
            <div className="p-4 sm:p-6">
              <div className="space-y-4">
                <div className="flex gap-4">
                  <div className="p-2 rounded-lg bg-success/10 h-fit">
                    <CheckCircle2 className="w-5 h-5 text-success" />
                  </div>
                  <div>
                    <p className="font-semibold mb-1">If Allotted</p>
                    <p className="text-sm text-muted-foreground">
                      Shares will be credited to your demat account within 2-3 days.
                      Check your demat account for confirmation.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="p-2 rounded-lg bg-destructive/10 h-fit">
                    <XCircle className="w-5 h-5 text-destructive" />
                  </div>
                  <div>
                    <p className="font-semibold mb-1">If Not Allotted</p>
                    <p className="text-sm text-muted-foreground">
                      Your application money will be refunded to your bank account within 7 working days.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="p-2 rounded-lg bg-warning/10 h-fit">
                    <AlertCircle className="w-5 h-5 text-warning" />
                  </div>
                  <div>
                    <p className="font-semibold mb-1">Listing Day</p>
                    <p className="text-sm text-muted-foreground">
                      Shares will be listed on {ipo.listingDate}. You can start trading from that day onwards.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </Card>

          {/* IPO Timeline Reference */}
          <Card>
            <div className="border-b p-4 sm:p-6 bg-muted/30">
              <h3 className="font-semibold text-base sm:text-lg">IPO Timeline</h3>
            </div>
            <div className="p-4 sm:p-6">
              <div className="space-y-3 text-sm">
                <div className="flex justify-between py-2 border-b">
                  <span className="text-muted-foreground">IPO Open</span>
                  <span className="font-semibold">{ipo.openDate}</span>
                </div>
                <div className="flex justify-between py-2 border-b">
                  <span className="text-muted-foreground">IPO Close</span>
                  <span className="font-semibold">{ipo.closeDate}</span>
                </div>
                <div className="flex justify-between py-2 border-b">
                  <span className="text-muted-foreground">Allotment Date</span>
                  <span className="font-semibold text-primary">Check after 2-3 days of closing</span>
                </div>
                <div className="flex justify-between py-2">
                  <span className="text-muted-foreground">Listing Date</span>
                  <span className="font-semibold text-success">{ipo.listingDate}</span>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default AllotmentChecker;
