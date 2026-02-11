# Scan to find the elephant bar 
# Draws horizontal lines at the high and low of the last 20 bars from the previous trading day

input numBars = 3;

lastXBarsHigh = Highest(high[1], numBars);
lastXBarsLow = Lowest(low[1], numBars);

plot signal =  AbsValue(open - close) > 1.2 * AbsValue(lastXBarsHigh - lastXBarsLow);