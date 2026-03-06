# Scan to find the elephant bar 
# Find the bar 1.3 times in size of previous X bars

input numBars = 5;

def lastXBarsHigh = Highest(high[1], numBars);
def lastXBarsLow = Lowest(low[1], numBars);

# Get the max candle height of last numBars candles. 
def maxCandleHeight = fold i = 1 to numBars with p = 0.0 do Max(p, Absvalue(high[i] - low[i]));


plot signal =  AbsValue(high - low) > 1.6 * maxCandleHeight;