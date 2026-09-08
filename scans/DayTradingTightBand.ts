# MidayDayTightband
# Scan for stocks with SMA20 and SMA200 close together

# Define Simple Moving Averages
def SMA20 = Average(close, 20);
def SMA200 = Average(close, 200);


# Condition 1: Stock closing above 20-period SMA
# def closeAboveSMA20 = close > SMA20;
def diff = AbsValue(SMA20 - SMA200);

# Plot signal when  condition are met
plot signal = diff < close * 0.01;
