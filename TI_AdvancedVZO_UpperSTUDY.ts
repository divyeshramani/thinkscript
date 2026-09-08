#TOS Indicators
#Home of the Volatility Box
#Indicator Name: Advanced VZO
#Full tutorial here: tosindicators.com/indicators/vzo
#Contains built-in ThinkOrSwim code from VolumeZoneOscillator() and TOS documentation

declare upper;

input length = 14;

def VP = ExpAverage(Sign(close - close[1]) * volume, length);
def TV = ExpAverage(volume, length);

def VZO = 100 * VP / TV;


def ADX = ADX(14);
def EMA60 = ExpAverage(close, 60);

def trendExistence = ADX > 18;
#1 - crosses above EMA60, 2 - above EMA60, 3 - crossing below EMA60, 4 - below EMA60
def direction = if close > EMA60 and close[1] <= EMA60 then 1 else if close > EMA60 and close[1] >= EMA60 then 2 else if close < EMA60 and close[1] >= EMA60 then 3 else 4;

def bullishCrossover = if VZO >= 40 and VZO[1] < 40 then 1 else 0;
def bearishCrossover = if VZO <= -40 and VZO[1] > -40 then 1 else 0;

plot bullSignal = if trendExistence == 1 and direction == 1 and bullishCrossover then 1 else 0;
bullSignal.setPaintingStrategy(PaintingStrategy.BOOLEAN_ARROW_UP);
bullSignal.SetLineWeight(5);

plot bearSignal = if trendExistence == 1 and direction == 3 and bearishCrossover then 1 else 0;
bearSignal.setPaintingStrategy(PaintingStrategy.BOOLEAN_ARROW_DOWN);
bearSignal.SetLineWeight(5);

AssignPriceColor(if VZO > 15 then color.green else if VZO > -5 then color.yellow else color.red);
