import { useState, useMemo } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, ComposedChart } from "recharts";
import { TrendingUp, TrendingDown } from "lucide-react";

// Sample trading data structure
interface CandleData {
  time: string;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
}

interface TradingChartProps {
  data?: CandleData[];
  issuePrice: number;
}

const TradingChart = ({ data, issuePrice }: TradingChartProps) => {
  const [timeRange, setTimeRange] = useState<"1D" | "7D" | "1M" | "3M" | "6M" | "1Y">("7D");

  // Sample data - replace with actual API data
  const sampleData: CandleData[] = [
    { time: "2025-11-13", open: 11.1, high: 11.1, low: 10.55, close: 10.55, volume: 12000 },
    { time: "2025-11-12", open: 11.1, high: 11.1, low: 11.1, close: 11.1, volume: 6000 },
    { time: "2025-11-11", open: 11.07, high: 11.07, low: 10.1, close: 10.9, volume: 42000 },
    { time: "2025-11-10", open: 11.94, high: 11.94, low: 11.35, close: 11.65, volume: 12000 },
    { time: "2025-11-04", open: 11.95, high: 11.95, low: 11.95, close: 11.95, volume: 6000 },
    { time: "2025-11-03", open: 11.95, high: 11.95, low: 11.95, close: 11.95, volume: 6000 },
    { time: "2025-10-30", open: 12.2, high: 12.2, low: 12.2, close: 12.2, volume: 6000 },
  ];

  const chartData = data || sampleData;

  // Filter data based on time range
  const filteredData = useMemo(() => {
    const now = new Date();
    let cutoffDate: Date;

    switch (timeRange) {
      case "1D":
        cutoffDate = new Date(now.setDate(now.getDate() - 1));
        break;
      case "7D":
        cutoffDate = new Date(now.setDate(now.getDate() - 7));
        break;
      case "1M":
        cutoffDate = new Date(now.setMonth(now.getMonth() - 1));
        break;
      case "3M":
        cutoffDate = new Date(now.setMonth(now.getMonth() - 3));
        break;
      case "6M":
        cutoffDate = new Date(now.setMonth(now.getMonth() - 6));
        break;
      case "1Y":
        cutoffDate = new Date(now.setFullYear(now.getFullYear() - 1));
        break;
      default:
        cutoffDate = new Date(now.setDate(now.getDate() - 7));
    }

    return chartData
      .filter(item => new Date(item.time) >= cutoffDate)
      .sort((a, b) => new Date(a.time).getTime() - new Date(b.time).getTime());
  }, [chartData, timeRange]);

  // Calculate statistics
  const stats = useMemo(() => {
    if (filteredData.length === 0) return null;

    const latest = filteredData[filteredData.length - 1];
    const previous = filteredData[filteredData.length - 2] || latest;
    const change = latest.close - previous.close;
    const changePercent = (change / previous.close) * 100;
    const high = Math.max(...filteredData.map(d => d.high));
    const low = Math.min(...filteredData.map(d => d.low));
    const totalVolume = filteredData.reduce((sum, d) => sum + d.volume, 0);
    const gainFromIssue = ((latest.close - issuePrice) / issuePrice) * 100;

    return {
      current: latest.close,
      change,
      changePercent,
      high,
      low,
      totalVolume,
      gainFromIssue,
      prevClose: previous.close,
    };
  }, [filteredData, issuePrice]);

  // Format data for chart
  const priceData = filteredData.map(item => ({
    date: new Date(item.time).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
    price: item.close,
    high: item.high,
    low: item.low,
    volume: item.volume,
  }));

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-background border border-border rounded-lg p-3 shadow-lg">
          <p className="text-xs font-semibold mb-1">{payload[0].payload.date}</p>
          <p className="text-xs text-muted-foreground">Close: <span className="font-mono font-bold text-foreground">₹{payload[0].value.toFixed(2)}</span></p>
          {payload[0].payload.high && (
            <>
              <p className="text-xs text-success">High: <span className="font-mono">₹{payload[0].payload.high.toFixed(2)}</span></p>
              <p className="text-xs text-destructive">Low: <span className="font-mono">₹{payload[0].payload.low.toFixed(2)}</span></p>
            </>
          )}
          {payload[0].payload.volume && (
            <p className="text-xs text-muted-foreground mt-1">Vol: <span className="font-mono">{(payload[0].payload.volume / 1000).toFixed(1)}K</span></p>
          )}
        </div>
      );
    }
    return null;
  };

  if (!stats) return null;

  return (
    <Card className="overflow-hidden">
      <div className="border-b p-3 sm:p-4 bg-muted/30">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <h3 className="font-semibold text-sm sm:text-base">Current Trading Data</h3>
          {/* Time Range Filters */}
          <div className="flex gap-1 overflow-x-auto pb-1 sm:pb-0 -mx-1 px-1 sm:mx-0 sm:px-0">
            {(["1D", "7D", "1M", "3M", "6M", "1Y"] as const).map((range) => (
              <Button
                key={range}
                variant={timeRange === range ? "default" : "ghost"}
                size="sm"
                onClick={() => setTimeRange(range)}
                className="text-xs px-3 py-1 h-7 flex-shrink-0"
              >
                {range}
              </Button>
            ))}
          </div>
        </div>
      </div>

      {/* Key Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 divide-x divide-y sm:divide-y-0 border-b">
        <div className="p-3 sm:p-4">
          <p className="text-[10px] sm:text-xs text-muted-foreground mb-1">Current Price</p>
          <p className={`font-mono text-lg sm:text-xl font-bold ${stats.change >= 0 ? "text-success" : "text-destructive"}`}>
            ₹{stats.current.toFixed(2)}
          </p>
          <div className="flex items-center gap-1 mt-1">
            {stats.change >= 0 ? (
              <TrendingUp className="w-3 h-3 text-success" />
            ) : (
              <TrendingDown className="w-3 h-3 text-destructive" />
            )}
            <p className={`text-[10px] sm:text-xs font-mono ${stats.change >= 0 ? "text-success" : "text-destructive"}`}>
              {stats.change >= 0 ? "+" : ""}₹{stats.change.toFixed(2)} ({stats.changePercent >= 0 ? "+" : ""}{stats.changePercent.toFixed(2)}%)
            </p>
          </div>
        </div>
        
        <div className="p-3 sm:p-4">
          <p className="text-[10px] sm:text-xs text-muted-foreground mb-1">Prev Close</p>
          <p className="font-mono text-lg sm:text-xl font-bold">₹{stats.prevClose.toFixed(2)}</p>
        </div>
        
        <div className="p-3 sm:p-4">
          <p className="text-[10px] sm:text-xs text-muted-foreground mb-1">High / Low</p>
          <p className="font-mono text-sm sm:text-base font-semibold text-success">₹{stats.high.toFixed(2)}</p>
          <p className="font-mono text-sm sm:text-base font-semibold text-destructive">₹{stats.low.toFixed(2)}</p>
        </div>
        
        <div className="p-3 sm:p-4">
          <p className="text-[10px] sm:text-xs text-muted-foreground mb-1">Listing Gain</p>
          <p className={`font-mono text-lg sm:text-xl font-bold ${stats.gainFromIssue >= 0 ? "text-success" : "text-destructive"}`}>
            {stats.gainFromIssue >= 0 ? "+" : ""}{stats.gainFromIssue.toFixed(2)}%
          </p>
          <p className="text-[10px] sm:text-xs text-muted-foreground mt-1">From ₹{issuePrice}</p>
        </div>
      </div>

      {/* Price Chart */}
      <div className="p-3 sm:p-6">
        <div className="h-[200px] sm:h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <ComposedChart data={priceData}>
              <defs>
                <linearGradient id="priceGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={stats.change >= 0 ? "hsl(var(--success))" : "hsl(var(--destructive))"} stopOpacity={0.3} />
                  <stop offset="95%" stopColor={stats.change >= 0 ? "hsl(var(--success))" : "hsl(var(--destructive))"} stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" opacity={0.3} />
              <XAxis 
                dataKey="date" 
                stroke="hsl(var(--muted-foreground))"
                fontSize={11}
                tickLine={false}
                axisLine={false}
              />
              <YAxis 
                stroke="hsl(var(--muted-foreground))"
                fontSize={11}
                tickLine={false}
                axisLine={false}
                domain={['dataMin - 1', 'dataMax + 1']}
                tickFormatter={(value) => `₹${value}`}
              />
              <Tooltip content={<CustomTooltip />} />
              <Area 
                type="natural" 
                dataKey="price" 
                stroke="none"
                fill="url(#priceGradient)"
              />
              <Line 
                type="natural" 
                dataKey="price" 
                stroke={stats.change >= 0 ? "hsl(var(--success))" : "hsl(var(--destructive))"} 
                strokeWidth={2.5}
                dot={false}
                activeDot={{ r: 5, strokeWidth: 2 }}
              />
            </ComposedChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Volume Chart */}
      <div className="p-3 sm:p-6 border-t">
        <p className="text-xs font-semibold text-muted-foreground mb-3">Trading Volume</p>
        <div className="h-[80px] sm:h-[100px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={priceData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" opacity={0.3} />
              <XAxis 
                dataKey="date" 
                stroke="hsl(var(--muted-foreground))"
                fontSize={10}
                tickLine={false}
                axisLine={false}
                hide
              />
              <YAxis 
                stroke="hsl(var(--muted-foreground))"
                fontSize={10}
                tickLine={false}
                axisLine={false}
                tickFormatter={(value) => `${(value / 1000).toFixed(0)}K`}
              />
              <Tooltip 
                content={({ active, payload }) => {
                  if (active && payload && payload.length) {
                    return (
                      <div className="bg-background border border-border rounded-lg p-2 shadow-lg">
                        <p className="text-xs font-mono">Vol: {(payload[0].value as number / 1000).toFixed(1)}K</p>
                      </div>
                    );
                  }
                  return null;
                }}
              />
              <Bar dataKey="volume" fill="hsl(var(--primary))" opacity={0.6} radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </Card>
  );
};

export default TradingChart;
