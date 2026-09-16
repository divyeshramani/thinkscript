#TOS Indicators
#Home of the Volatility Box
#Indicator Name: Heiken Ashi Trend
#Full tutorial here: tosindicators.com/indicators/heikein-ashi


declare lower;

def heikenAshiClose = ohlc4;
def heikenAshiOpen = (heikenAshiOpen[1] + heikenAshiClose[1]) / 2;
def heikenAshiTrendUp = if heikenAshiClose >= heikenAshiOpen then 1 else 0;
def heikenAshiTrendDown = if heikenAshiClose < heikenAshiOpen then 1 else 0;
def heikenAshiTrendSignal = if heikenAshiTrendUp == 1 and heikenAshiTrendUp[1] == 1 then 1 else if heikenAshiTrendDown == 1 and heikenAshiTrendDown[1] == 1 then -1 else 0;

plot heikenAshiDots = if !IsNan(heikenAshiClose) then 0 else Double.NaN;
heikenAshiDots.SetPaintingStrategy(PaintingStrategy.POINTS);
heikenAshiDots.SetLineWeight(5);
heikenAshiDots.AssignValueColor(if heikenAshiTrendSignal == 1 then Color.GREEN else if heikenAshiTrendSignal == -1 then Color.RED else Color.YELLOW);
