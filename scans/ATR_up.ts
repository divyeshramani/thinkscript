# Scan: Up by More Than Daily ATR from Yesterday's Close
# Finds stocks where current price is > yesterday's close + one daily ATR.

input atrLength = 14;
input averageType = AverageType.WILDERS;

# Daily series
def dailyHigh = high(period = "DAY");
def dailyLow = low(period = "DAY");
def dailyClose = close(period = "DAY");

# Daily ATR (Wilder's smoothing)
def dailyTR = TrueRange(dailyHigh, dailyClose, dailyLow);
def atrDaily = MovingAverage(averageType, dailyTR, atrLength);

# Yesterday's close and yesterday's ATR
def yesterdayClose = close(period = "DAY")[1];
def yesterdayATR = atrDaily[1];

# Current price is more than one daily ATR above yesterday's close
def upMoreThanATR = close > yesterdayClose + yesterdayATR;

plot scan = upMoreThanATR;
