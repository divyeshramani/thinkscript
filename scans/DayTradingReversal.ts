# TI_DayTradingScan
# Scan for stocks closing above 20 SMA with 20 SMA above 200 SMA
# This identifies stocks in a bullish trend with price momentum

# Define Simple Moving Averages
def SMA20 = Average(close, 20);
def SMA200 = Average(close, 200);

# Condition 1: Stock closing above 20-period SMA
def openAboveSMA20 = open > SMA20;
def openBelowSMA20 = open < SMA20;
def openBelowSMA20Prev = open[1] <= SMA20[1];
def openAboveMA20Prev = open[1] >= SMA20[1];

# Condition 2: 20-period SMA is above 200-period SMA (Golden Cross alignment)
def SMA20AboveSMA200 = SMA20 > SMA200;
def SMA20BelowSMA200 = SMA20 < SMA200;


# Plot signal when both conditions are met
plot signal = (openBelowSMA20Prev and openAboveSMA20 and SMA200 - SMA20 >= 3) OR (openAboveMA20Prev and openBelowSMA20 and SMA20 - SMA200 >= 3);
