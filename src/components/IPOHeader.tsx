import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { TrendingUp, ArrowLeftRight } from "lucide-react";
import Link from "next/link";
import { ipoData } from "@/data/ipos";
import ExportDialog from "@/components/ExportDialog";

const IPOHeader = () => {
  const tenneco = ipoData.find((ipo) => ipo.id === "tenneco");

  return (
    <header className="border-b bg-background sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between gap-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <h1 className="font-heading text-xl md:text-2xl font-bold">Tenneco Clean Air India</h1>
              <Badge variant="secondary" className="bg-success/10 text-success border-success/20 text-xs">
                LISTED
              </Badge>
            </div>
            <div className="flex items-center gap-4 text-xs text-muted-foreground">
              <span>NSE: TENNIND</span>
              <span>•</span>
              <span>BSE: 544612</span>
              <span>•</span>
              <span>Listed: Nov 19, 2025</span>
            </div>
          </div>

          <div className="flex gap-6 items-center">
            <div>
              <p className="text-xs text-muted-foreground">Issue Price</p>
              <p className="font-mono text-lg font-bold">₹397</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Current Price</p>
              <div className="flex items-baseline gap-2">
                <p className="font-mono text-lg font-bold text-success">₹496.75</p>
                <span className="flex items-center text-xs text-success font-mono">
                  <TrendingUp className="w-3 h-3 mr-1" />
                  +25.19%
                </span>
              </div>
            </div>
            <div className="flex gap-2">
              <ExportDialog selectedIPO={tenneco} />
              <Link href="/compare">
                <Button variant="outline" size="sm" className="gap-2">
                  <ArrowLeftRight className="w-4 h-4" />
                  Compare IPOs
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default IPOHeader;
