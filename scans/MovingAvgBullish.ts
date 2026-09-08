def days = 90;
def pctThreshold = 0.07;
def pctAthThreshold = 0.20;

# Find previous high
def ath = Highest(high, 365);
def recent_low = Lowest(low, days);

# Exponetial Moving Avg
def EMA8 = ExpAverage(close, 8);
def EMA21 = ExpAverage(close, 21);
def EMA34 = ExpAverage(close, 34);

def bullish = EMA8 > EMA21 and EMA21 > EMA34;
# def bearish = EMA8 < EMA21 and EMA21 < EMA34;

def VolAvg8 = average(volume, 8)[1];
def VolAvg21 = average(volume, 21)[1];
def VolAvg34 = average(volume, 34)[1];

def volume_rising = VolAvg8 > VolAvg21 and VolAvg21 > VolAvg34;

# 1. EMA(8) > EMA(21) > EMA(31)
# 2. VolumeAvg(8) > VolumeAvg(21) > VolumeAvg(34)
# 3. Recent low (of last 90 days) less than All time high by 20% or more

plot signal = close < ath and bullish and volume_rising and 
              ((ath - recent_low) / recent_low >= pctAthThreshold);

