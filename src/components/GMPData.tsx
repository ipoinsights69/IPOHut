import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, TrendingDown, Minus, AlertCircle } from "lucide-react";
import { ipoData } from "@/data/ipos";

const GMPData = () => {
  const tenneco = ipoData.find((ipo) => ipo.id === "tenneco");

  if (!tenneco || !tenneco.gmpPrice) {
    return null;
  }

  const getSentimentIcon = (sentiment?: string) => {
    if (sentiment === "Positive") return <TrendingUp className="w-4 h-4" />;
    if (sentiment === "Negative") return <TrendingDown className="w-4 h-4" />;
    return <Minus className="w-4 h-4" />;
  };

  const getSentimentColor = (sentiment?: string) => {
    if (sentiment === "Positive") return "text-success";
    if (sentiment === "Negative") return "text-destructive";
    return "text-muted-foreground";
  };

  return (
    <Card className="md:col-span-2">
      <div className="border-b p-4 bg-muted/30">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-semibold text-sm">Grey Market Premium (GMP)</h3>
            <p className="text-xs text-muted-foreground mt-1">
              Pre-listing market sentiment • Updated {tenneco.gmpUpdated}
            </p>
          </div>
          <Badge
            variant={
              tenneco.sentiment === "Positive"
                ? "default"
                : tenneco.sentiment === "Negative"
                ? "destructive"
                : "secondary"
            }
            className="gap-1"
          >
            {getSentimentIcon(tenneco.sentiment)}
            {tenneco.sentiment}
          </Badge>
        </div>
      </div>

      <div className="grid md:grid-cols-4 divide-x">
        <div className="p-4">
          <p className="text-xs text-muted-foreground mb-2">GMP Price</p>
          <p className="font-mono text-xl font-bold">₹{tenneco.gmpPrice}</p>
          <p className="text-xs text-muted-foreground mt-1">Expected listing price</p>
        </div>

        <div className="p-4">
          <p className="text-xs text-muted-foreground mb-2">GMP Premium</p>
          <div>
            <p
              className={`font-mono text-xl font-bold ${
                tenneco.gmpPremium && tenneco.gmpPremium >= 0
                  ? "text-success"
                  : "text-destructive"
              }`}
            >
              ₹{tenneco.gmpPremium}
            </p>
            <p
              className={`text-xs font-mono mt-1 ${
                tenneco.gmpPremiumPercent && tenneco.gmpPremiumPercent >= 0
                  ? "text-success"
                  : "text-destructive"
              }`}
            >
              {tenneco.gmpPremiumPercent && tenneco.gmpPremiumPercent >= 0 ? "+" : ""}
              {tenneco.gmpPremiumPercent?.toFixed(2)}% from issue
            </p>
          </div>
        </div>

        <div className="p-4">
          <p className="text-xs text-muted-foreground mb-2">Kostak Rate</p>
          <p className="font-mono text-xl font-bold">₹{tenneco.kostakRate}</p>
          <p className="text-xs text-muted-foreground mt-1">Per application</p>
        </div>

        <div className="p-4">
          <p className="text-xs text-muted-foreground mb-2">Subject to Sauda</p>
          <p className="font-mono text-xl font-bold">₹{tenneco.subjectToSauda}</p>
          <p className="text-xs text-muted-foreground mt-1">Post-allotment price</p>
        </div>
      </div>

      <div className="border-t p-4 bg-primary/5">
        <div className="flex items-start gap-2">
          <AlertCircle className="w-4 h-4 text-muted-foreground mt-0.5 flex-shrink-0" />
          <div className="text-xs text-muted-foreground space-y-1">
            <p>
              <strong>Grey Market Trading:</strong> Unofficial pre-listing market where IPO applications
              and shares are traded before official listing.
            </p>
            <p>
              <strong>Kostak:</strong> Selling IPO application before allotment (risk-free, guaranteed
              profit).
            </p>
            <p>
              <strong>Subject to Sauda:</strong> Conditional selling after allotment but before
              listing (higher risk, higher potential reward).
            </p>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default GMPData;
