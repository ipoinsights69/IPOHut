import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Download, FileText, FileSpreadsheet, Calendar as CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { ipoData, IPOData } from "@/data/ipos";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import * as XLSX from "xlsx";
import { toast } from "sonner";

interface ExportDialogProps {
  selectedIPO?: IPOData;
  compareMode?: boolean;
  selectedIPOs?: IPOData[];
}

const ExportDialog = ({ selectedIPO, compareMode = false, selectedIPOs = [] }: ExportDialogProps) => {
  const [open, setOpen] = useState(false);
  const [exportFormat, setExportFormat] = useState<"pdf" | "excel">("pdf");
  const [dateFrom, setDateFrom] = useState<Date>();
  const [dateTo, setDateTo] = useState<Date>();

  const exportData = compareMode && selectedIPOs.length > 0 ? selectedIPOs : selectedIPO ? [selectedIPO] : [];

  const generatePDF = () => {
    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.getWidth();
    
    // Title
    doc.setFontSize(18);
    doc.setFont("helvetica", "bold");
    doc.text(compareMode ? "IPO Comparison Report" : "IPO Detailed Report", 14, 20);
    
    doc.setFontSize(10);
    doc.setFont("helvetica", "normal");
    doc.text(`Generated: ${format(new Date(), "PPP")}`, 14, 28);

    let yPosition = 40;

    exportData.forEach((ipo, index) => {
      if (index > 0) {
        doc.addPage();
        yPosition = 20;
      }

      // IPO Name
      doc.setFontSize(14);
      doc.setFont("helvetica", "bold");
      doc.text(ipo.name, 14, yPosition);
      yPosition += 8;

      // Basic Details Table
      doc.setFontSize(10);
      autoTable(doc, {
        startY: yPosition,
        head: [["Metric", "Value"]],
        body: [
          ["Symbol", ipo.symbol],
          ["Sector", ipo.sector],
          ["Issue Price", `₹${ipo.issuePrice}`],
          ["Current Price", `₹${ipo.currentPrice}`],
          ["Price Change", `₹${ipo.priceChange} (${ipo.priceChangePercent.toFixed(2)}%)`],
          ["Issue Size", ipo.issueSize],
          ["Lot Size", `${ipo.lotSize} shares`],
          ["Min Investment", `₹${ipo.minInvestment.toLocaleString()}`],
          ["Listing Date", ipo.listingDate],
          ["Listing Gain", `₹${ipo.listingGain} (${ipo.listingGainPercent.toFixed(2)}%)`],
        ],
        theme: "grid",
        headStyles: { fillColor: [41, 128, 185] },
        margin: { left: 14 },
      });

      yPosition = (doc as any).lastAutoTable.finalY + 10;

      // Subscription Data
      doc.setFontSize(12);
      doc.setFont("helvetica", "bold");
      doc.text("Subscription Data", 14, yPosition);
      yPosition += 6;

      autoTable(doc, {
        startY: yPosition,
        head: [["Category", "Times Subscribed"]],
        body: [
          ["Retail (RII)", `${ipo.subscriptionRetail.toFixed(2)}x`],
          ["NII (HNI)", `${ipo.subscriptionNII.toFixed(2)}x`],
          ["QIB", `${ipo.subscriptionQIB.toFixed(2)}x`],
          ["Overall", `${ipo.subscriptionOverall.toFixed(2)}x`],
        ],
        theme: "grid",
        headStyles: { fillColor: [41, 128, 185] },
        margin: { left: 14 },
      });

      yPosition = (doc as any).lastAutoTable.finalY + 10;

      // GMP Data (if available)
      if (ipo.gmpPrice) {
        doc.setFontSize(12);
        doc.setFont("helvetica", "bold");
        doc.text("Grey Market Premium (GMP)", 14, yPosition);
        yPosition += 6;

        autoTable(doc, {
          startY: yPosition,
          head: [["Metric", "Value"]],
          body: [
            ["GMP Price", `₹${ipo.gmpPrice}`],
            ["GMP Premium", `₹${ipo.gmpPremium} (${ipo.gmpPremiumPercent?.toFixed(2)}%)`],
            ["Kostak Rate", `₹${ipo.kostakRate}`],
            ["Subject to Sauda", `₹${ipo.subjectToSauda}`],
            ["Expected Listing", `₹${ipo.expectedListing}`],
            ["Sentiment", ipo.sentiment || "N/A"],
            ["Last Updated", ipo.gmpUpdated || "N/A"],
          ],
          theme: "grid",
          headStyles: { fillColor: [41, 128, 185] },
          margin: { left: 14 },
        });
      }
    });

    // Save PDF
    const fileName = compareMode
      ? `IPO_Comparison_${format(new Date(), "yyyy-MM-dd")}.pdf`
      : `${exportData[0]?.symbol}_Report_${format(new Date(), "yyyy-MM-dd")}.pdf`;
    
    doc.save(fileName);
    toast.success("PDF exported successfully!");
  };

  const generateExcel = () => {
    const workbook = XLSX.utils.book_new();

    exportData.forEach((ipo) => {
      // Basic Details Sheet
      const basicData = [
        ["Metric", "Value"],
        ["Company Name", ipo.name],
        ["Symbol", ipo.symbol],
        ["Sector", ipo.sector],
        ["Issue Price", ipo.issuePrice],
        ["Current Price", ipo.currentPrice],
        ["Price Change", ipo.priceChange],
        ["Price Change %", ipo.priceChangePercent],
        ["Issue Size", ipo.issueSize],
        ["Lot Size", ipo.lotSize],
        ["Min Investment", ipo.minInvestment],
        ["Open Date", ipo.openDate],
        ["Close Date", ipo.closeDate],
        ["Listing Date", ipo.listingDate],
        ["Listing Gain", ipo.listingGain],
        ["Listing Gain %", ipo.listingGainPercent],
      ];

      const basicSheet = XLSX.utils.aoa_to_sheet(basicData);
      XLSX.utils.book_append_sheet(workbook, basicSheet, `${ipo.symbol}-Basic`);

      // Subscription Sheet
      const subscriptionData = [
        ["Category", "Times Subscribed"],
        ["Retail (RII)", ipo.subscriptionRetail],
        ["NII (HNI)", ipo.subscriptionNII],
        ["QIB", ipo.subscriptionQIB],
        ["Overall", ipo.subscriptionOverall],
      ];

      const subscriptionSheet = XLSX.utils.aoa_to_sheet(subscriptionData);
      XLSX.utils.book_append_sheet(workbook, subscriptionSheet, `${ipo.symbol}-Subscription`);

      // GMP Sheet (if available)
      if (ipo.gmpPrice) {
        const gmpData = [
          ["Metric", "Value"],
          ["GMP Price", ipo.gmpPrice],
          ["GMP Premium", ipo.gmpPremium],
          ["GMP Premium %", ipo.gmpPremiumPercent],
          ["Kostak Rate", ipo.kostakRate],
          ["Subject to Sauda", ipo.subjectToSauda],
          ["Expected Listing", ipo.expectedListing],
          ["Sentiment", ipo.sentiment],
          ["Last Updated", ipo.gmpUpdated],
        ];

        // GMP Historical Trend (sample data for demonstration)
        const gmpHistoricalData = [
          ["", ""],
          ["GMP Historical Trend", ""],
          ["Date", "GMP Price", "Premium", "Premium %", "Kostak", "S2S", "Sentiment"],
          ["Nov 18, 2025", 495, 98, 24.69, 85, 482, "Positive"],
          ["Nov 17, 2025", 490, 93, 23.43, 80, 478, "Positive"],
          ["Nov 16, 2025", 485, 88, 22.17, 75, 475, "Positive"],
          ["Nov 14, 2025", 475, 78, 19.65, 65, 468, "Neutral"],
          ["Nov 13, 2025", 465, 68, 17.13, 55, 460, "Neutral"],
          ["Nov 12, 2025", 455, 58, 14.61, 45, 452, "Neutral"],
        ];

        const fullGmpData = [...gmpData, ...gmpHistoricalData];
        const gmpSheet = XLSX.utils.aoa_to_sheet(fullGmpData);
        XLSX.utils.book_append_sheet(workbook, gmpSheet, `${ipo.symbol}-GMP`);
      }
    });

    // Comparison Sheet (if in compare mode)
    if (compareMode && exportData.length > 1) {
      const comparisonData = [
        ["Metric", ...exportData.map((ipo) => ipo.symbol)],
        ["Issue Price", ...exportData.map((ipo) => ipo.issuePrice)],
        ["Current Price", ...exportData.map((ipo) => ipo.currentPrice)],
        ["Price Change %", ...exportData.map((ipo) => ipo.priceChangePercent)],
        ["Issue Size", ...exportData.map((ipo) => ipo.issueSize)],
        ["Lot Size", ...exportData.map((ipo) => ipo.lotSize)],
        ["Min Investment", ...exportData.map((ipo) => ipo.minInvestment)],
        ["Listing Gain %", ...exportData.map((ipo) => ipo.listingGainPercent)],
        ["Overall Subscription", ...exportData.map((ipo) => ipo.subscriptionOverall)],
        ["GMP Premium %", ...exportData.map((ipo) => ipo.gmpPremiumPercent || "N/A")],
        ["Sentiment", ...exportData.map((ipo) => ipo.sentiment || "N/A")],
      ];

      const comparisonSheet = XLSX.utils.aoa_to_sheet(comparisonData);
      XLSX.utils.book_append_sheet(workbook, comparisonSheet, "Comparison");
    }

    // Save Excel
    const fileName = compareMode
      ? `IPO_Comparison_${format(new Date(), "yyyy-MM-dd")}.xlsx`
      : `${exportData[0]?.symbol}_Report_${format(new Date(), "yyyy-MM-dd")}.xlsx`;
    
    XLSX.writeFile(workbook, fileName);
    toast.success("Excel file exported successfully!");
  };

  const handleExport = () => {
    if (exportData.length === 0) {
      toast.error("No data to export");
      return;
    }

    if (exportFormat === "pdf") {
      generatePDF();
    } else {
      generateExcel();
    }

    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="gap-2">
          <Download className="w-4 h-4" />
          Export Data
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Export IPO Data</DialogTitle>
        </DialogHeader>
        <div className="space-y-6 py-4">
          {/* Format Selection */}
          <div className="space-y-3">
            <Label className="text-sm font-semibold">Export Format</Label>
            <RadioGroup value={exportFormat} onValueChange={(value) => setExportFormat(value as "pdf" | "excel")}>
              <div className="flex items-center space-x-2 border rounded-lg p-3 hover:bg-muted/50 cursor-pointer">
                <RadioGroupItem value="pdf" id="pdf" />
                <Label htmlFor="pdf" className="flex items-center gap-2 cursor-pointer flex-1">
                  <FileText className="w-4 h-4 text-destructive" />
                  <div>
                    <p className="font-medium">PDF Report</p>
                    <p className="text-xs text-muted-foreground">Professional formatted document</p>
                  </div>
                </Label>
              </div>
              <div className="flex items-center space-x-2 border rounded-lg p-3 hover:bg-muted/50 cursor-pointer">
                <RadioGroupItem value="excel" id="excel" />
                <Label htmlFor="excel" className="flex items-center gap-2 cursor-pointer flex-1">
                  <FileSpreadsheet className="w-4 h-4 text-success" />
                  <div>
                    <p className="font-medium">Excel Spreadsheet</p>
                    <p className="text-xs text-muted-foreground">Editable data with multiple sheets</p>
                  </div>
                </Label>
              </div>
            </RadioGroup>
          </div>

          {/* Date Range Selection */}
          <div className="space-y-3">
            <Label className="text-sm font-semibold">Date Range (Optional)</Label>
            <p className="text-xs text-muted-foreground">Filter GMP historical data by date range</p>
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-2">
                <Label className="text-xs">From Date</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !dateFrom && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {dateFrom ? format(dateFrom, "PPP") : <span>Pick date</span>}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={dateFrom}
                      onSelect={setDateFrom}
                      initialFocus
                      className="pointer-events-auto"
                    />
                  </PopoverContent>
                </Popover>
              </div>
              <div className="space-y-2">
                <Label className="text-xs">To Date</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !dateTo && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {dateTo ? format(dateTo, "PPP") : <span>Pick date</span>}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={dateTo}
                      onSelect={setDateTo}
                      initialFocus
                      className="pointer-events-auto"
                    />
                  </PopoverContent>
                </Popover>
              </div>
            </div>
          </div>

          {/* Export Summary */}
          <div className="border rounded-lg p-3 bg-muted/30 space-y-1">
            <p className="text-xs font-semibold">Export Summary</p>
            <p className="text-xs text-muted-foreground">
              {compareMode
                ? `${exportData.length} IPO${exportData.length > 1 ? "s" : ""} selected for comparison`
                : exportData[0]?.name}
            </p>
            <p className="text-xs text-muted-foreground">
              Format: {exportFormat === "pdf" ? "PDF Report" : "Excel Spreadsheet"}
            </p>
            {dateFrom && dateTo && (
              <p className="text-xs text-muted-foreground">
                Date Range: {format(dateFrom, "MMM d, yyyy")} - {format(dateTo, "MMM d, yyyy")}
              </p>
            )}
          </div>
        </div>

        <div className="flex justify-end gap-3">
          <Button variant="outline" onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button onClick={handleExport} className="gap-2">
            <Download className="w-4 h-4" />
            Export {exportFormat === "pdf" ? "PDF" : "Excel"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ExportDialog;
