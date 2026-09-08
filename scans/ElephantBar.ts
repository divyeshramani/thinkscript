# Scan to find the elephant bar 
# Find the bar 1.3 times in size of previous X bars

input numBars = 4;

def lastXBarsHigh = Highest(high[1], numBars);
def lastXBarsLow = Lowest(low[1], numBars);

plot signal =  AbsValue(high - low) > 1.3 * AbsValue(lastXBarsHigh - lastXBarsLow);