#TOS Indicators - Home of the Volatility Box
#Full YouTube Tutorial: https://youtu.be/Z46DQYIkkpM


def SMA10 = SimpleMovingAvg(close,10);
def SMA30 = SimpleMovingAvg(close,30);
def SMA100 = SimpleMovingAvg(close,100);

def StoSloK = StochasticSlow(80,20,21,3).SlowK;
def StoSloD = StochasticSlow(80,20,21,3).SlowD;
def StoSloOB = StochasticSlow(80,20,21,3).Overbought;
def StoSloOS = StochasticSlow(80,20,21,3).Oversold;

def MH = MACDHistogram();

plot bullish = if (close > SMA10 and close[1] <= SMA10[1]) and (close > SMA100) and StoSloK < StoSloOB and StoSloD < StoSloOB and MH > 0 then 1 else 0;

plot bearish = if (close < SMA10 and close[1] >= SMA10[1]) and (close < SMA100) and StoSloK > StoSloOS and StoSloD > StoSloOS and MH < 0 then 1 else 0;

bullish.SetPaintingStrategy(PaintingStrategy.Boolean_Arrow_Up);
bearish.SetPaintingStrategy(PaintingStrategy.Boolean_Arrow_Down);

bullish.SetLineWeight(5);
bearish.SetLineWeight(5);



