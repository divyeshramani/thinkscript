### Includes code written by Keith C., Mobius, and TOS Indicators 
### Last Update: 11/3/2019 
### Full Tutorial Available Here: https://www.tosindicators.com/indicators/dynamic-rsi
### v1.1 - 11/6/19 Updated with fixed Lower Chart Bubble Code 

### Global Variables ###
declare lower;
input length = 14;
input over_Bought = 70;
input over_Sold = 30;
input price = close;
input averageType = AverageType.WILDERS;
input showBreakoutSignals = no;
input Volatility_Band = 14; #20-40
input STDEV_Multiplier = 2;
input RSI_Period = 14; #8-25
input RSI_Price = 0; #0-6
input RSI_Price_Line = 2;


### Keith RSI, BB, DYN ###
def NetChgAvg = MovingAverage(averageType, price - price[1], length);
def TotChgAvg = MovingAverage(averageType, AbsValue(price - price[1]), length);
def ChgRatio = if TotChgAvg != 0 then NetChgAvg / TotChgAvg else 0;

def DYNRSI = reference RSI(RSI_Period);
def Price1 = if averageType == AverageType.SIMPLE then Average(DYNRSI, RSI_Price_Line) else ExpAverage(DYNRSI, RSI_Price_Line);
def SDBB = StDev(DYNRSI, Volatility_Band);

plot RSI = 50 * (ChgRatio + 1);
plot MiddleLine = 50;
plot MiddleLine1 = 70;
plot MiddleLine2 = 30;

plot DYNAverage = Average(DYNRSI, Volatility_Band);
DYNAverage.SetDefaultColor(Color.YELLOW);
DYNAverage.SetLineWeight(2);

plot UpperBollinger = DYNAverage + STDEV_Multiplier * SDBB;
UpperBollinger.SetDefaultColor(Color.RED);
plot LowerBollinger = DYNAverage - STDEV_Multiplier * SDBB;
LowerBollinger.SetDefaultColor(Color.GREEN);

plot OverSold = over_Sold;
plot OverBought = over_Bought;
plot UpSignal = if RSI crosses above OverSold then OverSold else Double.NaN;
plot DownSignal = if RSI crosses below OverBought then OverBought else Double.NaN;

UpSignal.SetHiding(!showBreakoutSignals);
DownSignal.SetHiding(!showBreakoutSignals);

RSI.DefineColor("OverBought", GetColor(5));
RSI.DefineColor("Normal", GetColor(9));
RSI.DefineColor("OverSold", GetColor(6));
RSI.AssignValueColor(if RSI > over_Bought then RSI.Color("OverBought") else if RSI < over_Sold then RSI.Color("OverSold") else RSI.Color("Normal"));
MiddleLine.SetDefaultColor(GetColor(4));
MiddleLine1.SetDefaultColor(GetColor(5));
MiddleLine2.SetDefaultColor(GetColor(6));
UpSignal.SetDefaultColor(Color.UPTICK);
UpSignal.SetPaintingStrategy(PaintingStrategy.ARROW_UP);
DownSignal.SetDefaultColor(Color.DOWNTICK);
DownSignal.SetPaintingStrategy(PaintingStrategy.ARROW_DOWN);

AddCloud(RSI, OverBought, Color.RED, Color.CURRENT);
AddCloud(OverSold, RSI, Color.GREEN, Color.CURRENT);



### Squeeze Relationship (Lower and Upper Bollinger Bands Compressing)
def BBDistance = if UpperBollinger - LowerBollinger <= 10 then 1 else 0;
plot squeeze = if BBDistance then 50 else Double.nan;
squeeze.SetPaintingStrategy(PaintingStrategy.POINTS);
squeeze.SetLineWeight(4);
squeeze.SetDefaultColor(Color.Red);


### Automatic Trend Line Code (courtesy of Mobius) ###
### https://usethinkscript.com/threads/auto-trend-lines-indicator-for-thinkorswim-free-download.31/

input TrendLineLength1 = 150;
input TrendLineLength2 = 80;
input TrendLineLength3 = 40;

def Inertia1 = InertiaAll(RSI, TrendLineLength1);
def Inertia2 = InertiaAll(RSI, TrendLineLength2);
def Inertia3 = InertiaAll(RSI, TrendLineLength3);

def TL_Bull1 = Inertia1 - (HighestAll(AbsValue(Inertia1 - RSI)) * 0.8);
def TL_Bear1 = Inertia1 + (HighestAll(AbsValue(Inertia1 - RSI)) * 0.8);
def slope1a = TL_Bull1 > TL_Bull1[1];
def slope1b = TL_Bear1 > TL_Bear1[1];

def TL_Bull2 = Inertia2 - (HighestAll(AbsValue(Inertia2 - RSI)) * 0.8);
def TL_Bear2 = Inertia2 + (HighestAll(AbsValue(Inertia2 - RSI)) * 0.8);
def slope2a = TL_Bull2 > TL_Bull2[1];
def slope2b = TL_Bear2 > TL_Bear2[1];

def TL_Bull3 = Inertia3 - (HighestAll(AbsValue(Inertia3 - RSI)) * 0.8);
def TL_Bear3 = Inertia3 + (HighestAll(AbsValue(Inertia3 - RSI)) * 0.8);
def slope3a = TL_Bull3 > TL_Bull3[1];
def slope3b = TL_Bear3 > TL_Bear3[1];
#Long length
plot TrendLine1a = if slope1a > 0 then TL_Bull1 else TL_Bear1;
TrendLine1a.SetStyle(Curve.FIRM);
TrendLine1a.SetLineWeight(1);
TrendLine1a.AssignValueColor(if slope1a and IsAscending(RSI, 10) then Color.WHITE else if slope1a then Color.WHITE else if !IsAscending(RSI, 10) then Color.WHITE else Color.WHITE);

plot TrendLine1b = if slope1b > 0 then TL_Bear1 else TL_Bull1;
TrendLine1b.SetStyle(Curve.FIRM);
TrendLine1b.SetLineWeight(1);
TrendLine1b.AssignValueColor(if slope1b and IsAscending(RSI, 10) then Color.WHITE else if slope1b then Color.WHITE else if !IsAscending(RSI, 10) then Color.WHITE else Color.WHITE);
#Medium length
plot TrendLine2a = if slope2a > 0 then TL_Bull2 else TL_Bear2;
TrendLine2a.SetStyle(Curve.FIRM);
TrendLine2a.SetLineWeight(1);
TrendLine2a.AssignValueColor(if slope2a and IsAscending(RSI, 10) then Color.LIGHT_GREEN else if slope2a then Color.LIGHT_GREEN else if !IsAscending(RSI, 10) then Color.MAGENTA else Color.MAGENTA);

plot TrendLine2b = if slope2b > 0 then TL_Bear2 else TL_Bull2;
TrendLine2b.SetStyle(Curve.FIRM);
TrendLine2b.SetLineWeight(1);
TrendLine2b.AssignValueColor(if slope2b and IsAscending(RSI, 10) then Color.LIGHT_GREEN else if slope2b then Color.LIGHT_GREEN else if !IsAscending(RSI, 10) then Color.MAGENTA else Color.MAGENTA);
#Short length
plot TrendLine3a = if slope3a > 0 then TL_Bull3 else TL_Bear3;
TrendLine3a.SetStyle(Curve.FIRM);
TrendLine3a.SetLineWeight(1);
TrendLine3a.AssignValueColor(if slope3a and IsAscending(RSI, 10) then Color.LIGHT_GREEN else if slope3a then Color.LIGHT_GREEN else if !IsAscending(RSI, 10) then Color.PINK else Color.PINK);

plot TrendLine3b = if slope3b > 0 then TL_Bear3 else TL_Bull3;
TrendLine3b.SetStyle(Curve.FIRM);
TrendLine3b.SetLineWeight(1);
TrendLine3b.AssignValueColor(if slope3b and IsAscending(RSI, 10) then Color.LIGHT_GREEN else if slope3b then Color.LIGHT_GREEN else if !IsAscending(RSI, 10) then Color.PINK else Color.PINK);

def trendLineSignalLong = if RSI >= TrendLine2A then 1 else 0;
def trendLineSignalShort = if RSI <= TrendLine2B then 1 else 0;

AddChartBubble(trendLineSignalLong and !trendLineSignalLong[1], trendLine2A, "Short", Color.Red);
AddChartBubble(trendLineSignalShort and !trendLineSignalShort[1], trendLine2B, "Long", Color.Green);

