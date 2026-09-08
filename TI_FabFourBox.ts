# Previous Day Last 20 Bars High/Low Lines
# Draws horizontal lines at the high and low of the last 20 bars from the previous trading day

input numBars = 22;
input showLabels = yes;
input tradeEntryStartTimeEST = 930;
input tradeEntryEndTimeEST = 1100;
input lineWeight = 1;

input length = 14;
input averageType = AverageType.WILDERS;

# Compute once, reuse
def aggr = GetAggregationPeriod();
def day = GetDay();
def dailyHigh = high(period = "DAY");
def dailyLow = low(period = "DAY");
def dailyClose = close(period = "DAY");

def numBarsFinal = if aggr == AggregationPeriod.TWO_MIN then numBars
    else if aggr == AggregationPeriod.FIVE_MIN then 9
    else if aggr == AggregationPeriod.TEN_MIN then 4
    else if aggr == AggregationPeriod.FIFTEEN_MIN then 3
    else if aggr == AggregationPeriod.TWENTY_MIN then 2
    else 1;

# Only show lines for today's session
def isToday = day == GetLastDay();

def isDisplay = aggr <= AggregationPeriod.HOUR and isToday;
def lastXBar = BarNumber() >= HighestAll(BarNumber()) - 50;
def isLargeTimeFrame = aggr > AggregationPeriod.TWO_MIN;

def atrDaily = MovingAverage(averageType, TrueRange(dailyHigh, dailyClose, dailyLow), length);

# Detect new day
def newDay = day != day[1];
def isYesterday = day == day[1] and day != day[-1];

# Track if we're in the last N bars of previous day
def prevDayBarCount = if newDay then 0
    else if isYesterday then prevDayBarCount[1] + 1
    else prevDayBarCount[1];

# Calculate high and low of last N bars of previous day (single def, no if/else block)
def last20BarsHigh = if newDay then Highest(high[1], numBarsFinal) else last20BarsHigh[1];
def last20BarsLow = if newDay then Lowest(low[1], numBarsFinal) else last20BarsLow[1];
def previousDayClose = if newDay then close[1] else previousDayClose[1];

def midPoint = (last20BarsHigh + last20BarsLow) / 2;

# How long to display the lines (during trading hours)
def isInTradeEntryTime = SecondsFromTime(tradeEntryStartTimeEST) >= 0 and SecondsTillTime(tradeEntryEndTimeEST) >= 0; 

# Precompute ATR levels and thresholds (once per bar)
def atrUpLevel = previousDayClose + atrDaily;
def atrDownLevel = previousDayClose - atrDaily;
def atr66UpLevel = previousDayClose + atrDaily * 0.66;
def atr66DownLevel = previousDayClose - atrDaily * 0.66;
def lastOpen = open;

def isDisplayDownATRs = isLargeTimeFrame or (lastOpen <= midPoint and lastXBar);
def isDisplayUpATRs = isLargeTimeFrame or (lastOpen >= midPoint and lastXBar);
def isDisplayUpATR = isLargeTimeFrame or (dailyHigh >= atr66UpLevel);
def isDisplayDownATR = isLargeTimeFrame or (dailyLow <= atr66DownLevel);

# Plot the previous day close for reference
plot PrevDayClose = if isDisplay and !IsNaN(previousDayClose) and isInTradeEntryTime then previousDayClose else Double.NaN;
PrevDayClose.SetPaintingStrategy(PaintingStrategy.DASHES);
PrevDayClose.SetDefaultColor(Color.LIGHT_RED);
PrevDayClose.SetLineWeight(lineWeight);
PrevDayClose.SetStyle(Curve.MEDIUM_DASH);
PrevDayClose.HideBubble();

# Plot the fab 4 box high line
plot PrevDayLast20High = if isDisplay and !IsNaN(last20BarsHigh) and isInTradeEntryTime then last20BarsHigh else Double.NaN;
PrevDayLast20High.SetDefaultColor(Color.CYAN);
PrevDayLast20High.SetLineWeight(lineWeight);
PrevDayLast20High.SetPaintingStrategy(PaintingStrategy.HORIZONTAL);
PrevDayLast20High.SetStyle(Curve.MEDIUM_DASH);
PrevDayLast20High.HideBubble();

# Plot the fab 4 box low line
plot PrevDayLast20Low = if isDisplay and !IsNaN(last20BarsLow) and isInTradeEntryTime then last20BarsLow else Double.NaN;
PrevDayLast20Low.SetDefaultColor(Color.ORANGE);
PrevDayLast20Low.SetLineWeight(lineWeight);
PrevDayLast20Low.SetPaintingStrategy(PaintingStrategy.HORIZONTAL);
PrevDayLast20Low.SetStyle(Curve.MEDIUM_DASH);
PrevDayLast20Low.HideBubble();

# Plot 1-ATR up level from yesterday's close
plot atrUp = if isDisplay and isDisplayUpATRs and isDisplayUpATR  then atrUpLevel else Double.NaN;
atrUp.SetPaintingStrategy(PaintingStrategy.DASHES);
atrUp.SetDefaultColor(Color.LIGHT_GREEN);
atrUp.SetStyle(Curve.MEDIUM_DASH);
atrUp.SetLineWeight(1);
atrUp.HideBubble();

# Plot 0.66-ATR up level from yesterday's close
plot atr66Up = if isDisplay and isDisplayUpATRs then atr66UpLevel else Double.NaN;
atr66Up.SetPaintingStrategy(PaintingStrategy.DASHES);
atr66Up.SetDefaultColor(Color.DARK_GREEN);
atr66Up.SetStyle(Curve.SHORT_DASH);
atr66Up.SetLineWeight(1);
atr66Up.HideBubble();

# Plot 1-ATR down level from yesterday's close
plot atrDown = if isDisplay and isDisplayDownATRs and isDisplayDownATR then atrDownLevel else Double.NaN;
atrDown.SetPaintingStrategy(PaintingStrategy.DASHES);
atrDown.SetDefaultColor(Color.LIGHT_RED);
atrDown.SetStyle(Curve.MEDIUM_DASH);
atrDown.SetLineWeight(1);
atrDown.HideBubble();

# Plot 0.66-ATR down level from yesterday's close
plot atr66Down = if isDisplay and isDisplayDownATRs then atr66DownLevel else Double.NaN;
atr66Down.SetPaintingStrategy(PaintingStrategy.DASHES);
atr66Down.SetDefaultColor(Color.DARK_RED);
atr66Down.SetStyle(Curve.SHORT_DASH);
atr66Down.SetLineWeight(1);
atr66Down.HideBubble();

# Add labels
AddLabel(showLabels, "45 mins High: " + AsText(last20BarsHigh, NumberFormat.DOLLAR) + " ", Color.LIGHT_GREEN);
AddLabel(showLabels, "45 mins Low: " + AsText(last20BarsLow, NumberFormat.DOLLAR) + " ", Color.LIGHT_ORANGE);

# Add cloud between the lines (optional visual)
AddCloud(PrevDayLast20High, PrevDayLast20Low, Color.LIGHT_GRAY, Color.LIGHT_ORANGE);