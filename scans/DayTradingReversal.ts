# Scan for stocks too high or too low from SMA20 and SMA200

# Define Simple Moving Averages
def SMA20 = Average(close, 20);
def SMA200 = Average(close, 200);
def OnePercent = close * 0.01;

# Condition 1: Stock closing above 20-period SMA
def closeAboveSMA20 = close - SMA20 > 0.75 * OnePercent;
def SMA20AboveSMA200 = SMA20 - SMA200 > 3 * OnePercent;

def closeBelowSMA20 = SMA20 - close > 0.75 * OnePercent;
def SMA20BelowSMA200 = SMA200 - SMA20 > 3 * OnePercent;

# Plot signal when both conditions are met
plot signal = (closeAboveSMA20 and SMA20AboveSMA200) OR (closeBelowSMA20 and SMA20BelowSMA200);
