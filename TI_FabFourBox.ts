# Previous Day Last 20 Bars High/Low Lines
# Draws horizontal lines at the high and low of the last 20 bars from the previous trading day

input numBars = 22;
input showLabels = yes;
input tradeEntryStartTimeEST = 930;
input tradeEntryEndTimeEST = 1100;

input lineWeight = 2;

# Detect new day
def newDay = GetDay() != GetDay()[1];

# Count bars from end of previous day (going backwards)
def isYesterday = GetDay() == GetDay()[1] and GetDay() != GetDay()[-1];

# Track if we're in the last N bars of previous day
def prevDayBarCount = if newDay then 0 
                      else if isYesterday then prevDayBarCount[1] + 1 
                      else prevDayBarCount[1];                      

# Find the bar number at end of previous day
def endOfPrevDay = if newDay then prevDayBarCount[1] else endOfPrevDay[1];

# how long to display the lines (during trading hours)
def isInTradeEntryTime = SecondsFromTime(tradeEntryStartTimeEST) >= 0 and SecondsTillTime(tradeEntryEndTimeEST) >= 0;

# Calculate high and low of last N bars of previous day
def last20BarsHigh;
def last20BarsLow;

if newDay {
    # At start of new day, calculate high/low of last N bars from previous day
    last20BarsHigh = Highest(high[1], numBars);
    last20BarsLow = Lowest(low[1], numBars);
} else {
    last20BarsHigh = last20BarsHigh[1];
    last20BarsLow = last20BarsLow[1];
}

# Only show lines for today's session
def isToday = GetDay() == GetLastDay();

# Plot the high line
plot PrevDayLast20High = if isToday and !IsNaN(last20BarsHigh) and isInTradeEntryTime then last20BarsHigh else Double.NaN;
PrevDayLast20High.SetDefaultColor(color.CYAN);
PrevDayLast20High.SetLineWeight(lineWeight);
PrevDayLast20High.SetPaintingStrategy(PaintingStrategy.HORIZONTAL);
PrevDayLast20High.SetStyle(Curve.MEDIUM_DASH);
PrevDayLast20High.HideBubble();

# Plot the low line
plot PrevDayLast20Low = if isToday and !IsNaN(last20BarsLow) and isInTradeEntryTime then last20BarsLow else Double.NaN;
PrevDayLast20Low.SetDefaultColor(color.ORANGE);
PrevDayLast20Low.SetLineWeight(lineWeight);
PrevDayLast20Low.SetPaintingStrategy(PaintingStrategy.HORIZONTAL);
PrevDayLast20Low.SetStyle(Curve.MEDIUM_DASH);
PrevDayLast20Low.HideBubble();

# Add labels
AddLabel(showLabels, "Last " + numBars + " Bars High: " + AsText(last20BarsHigh, NumberFormat.DOLLAR) + " ", color.light_GREEN);
AddLabel(showLabels, "Last " + numBars + " Bars Low: " + AsText(last20BarsLow, NumberFormat.DOLLAR) + " ", color.LIGHT_ORANGE);

# Add cloud between the lines (optional visual)
# AddCloud(PrevDayLast20High, PrevDayLast20Low, Color.LIGHT_GREEN, Color.LIGHT_RED);