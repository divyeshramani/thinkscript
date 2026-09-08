# Inputs
input pct = 0.03;

def ATR = ATR();

def highestHigh = Highest(high, 10);
def lowestLow = Lowest(low, 10);
def range = highestHigh - lowestLow;
def rangeATRcheck = range <= 2 * ATR;

# Moving Averages
def EMA8 = ExpAverage(close, 8);
def EMA34 = ExpAverage(close, 34);
def SMA50 = SimpleMovingAvg(close, 50);
def SMA200 = SimpleMovingAvg(close, 200);
def movingAvgCondition = EMA8 > EMA34 and EMA34 > SMA50 and SMA50 > SMA200;

# Pct within SMA
def pctWihtinSMA = close >= SMA50 * (1 - pct) and close <= SMA50 * (1 + pct);

plot signal = rangeATRcheck and movingAvgCondition and pctWihtinSMA;

