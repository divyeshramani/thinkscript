#TOS Indicators
#Home of the Volatility Box
#Indicator Name: Advanced VZO
#Full tutorial here: tosindicators.com/indicators/vzo
#Contains built-in ThinkOrSwim code from VolumeZoneOscillator() and TOS documentation


declare lower;

input length = 14;

def VP = ExpAverage(Sign(close - close[1]) * volume, length);
def TV = ExpAverage(volume, length);

plot VZO = 100 * VP / TV;
plot VZO_DOTS = 100 * VP / TV;
plot "+60" = 60;
plot "+40" = 40;
#plot "+15" = 15;
#plot "-5" = -5;
plot "-40" = -40;
plot "-60" = -60;
plot ZeroLine = 0;

VZO.SetDefaultColor(GetColor(1));
"+60".SetDefaultColor(GetColor(6));
"+40".SetDefaultColor(GetColor(6));
#"+15".SetDefaultColor(GetColor(3));
#"-5".SetDefaultColor(GetColor(3));
"-40".SetDefaultColor(GetColor(5));
"-60".SetDefaultColor(GetColor(5));
ZeroLine.SetDefaultColor(GetColor(4));


def ADX = ADX(14);
def EMA60 = ExpAverage(close, 60);

def trendExistence = ADX > 18;
#1 - crosses above EMA60, 2 - above EMA60, 3 - crossing below EMA60, 4 - below EMA60
def direction = if close > EMA60 and close[1] <= EMA60 then 1 else if close > EMA60 and close[1] >= EMA60 then 2 else if close < EMA60 and close[1] >= EMA60 then 3 else 4;

def bullishCrossover = if VZO >= 40 and VZO[1] < 40 then 1 else 0;
def bearishCrossover = if VZO <= -40 and VZO[1] > -40 then 1 else 0;

AddCloud(40, 60, color.green, color.green);
AddCloud(-40,-60, color.red, color.red);
VZO.AssignValueColor(if VZO > 15 then color.green else if VZO > -5 then color.yellow else color.red);
VZO_DOTS.SetPaintingStrategy(PaintingStrategy.POINTS);
VZO_DOTS.AssignValueColor(if VZO > 15 then color.green else if VZO > -5 then color.yellow else color.red);
VZO_DOTS.SetLineWeight(3);

