# TI_DayTradingScan
# Scan for stocks closing above 20 SMA with 20 SMA above 200 SMA
# This identifies stocks in a bullish trend with price momentum

# Define Simple Moving Averages
def SMA20 = Average(close, 20);
def SMA200 = Average(close, 200);

# Condition 1: Stock closing above 20-period SMA
def closeAboveSMA20 = close > SMA20;
def closeBelowSMA20Prev = close[1] <= SMA20[1];

# Condition 2: 20-period SMA is above 200-period SMA (Golden Cross alignment)
def SMA20AboveSMA200 = SMA20 > SMA200;


# Plot signal when both conditions are met
plot signal = closeBelowSMA20Prev and closeAboveSMA20 and SMA20AboveSMA200;
