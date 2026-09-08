### Includes code written by Keith C., Mobius, and TOS Indicators 
### Last Update: 11/3/2019 
### Full Tutorial Available Here: https://www.tosindicators.com/indicators/dynamic-rsi

### Global Variables ###
declare upper;
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

def RSI = 50 * (ChgRatio + 1);
def MiddleLine = 50;
def MiddleLine1 = 70;
def MiddleLine2 = 30;

def DYNAverage = Average(DYNRSI, Volatility_Band);

def UpperBollinger = DYNAverage + STDEV_Multiplier * SDBB;

def LowerBollinger = DYNAverage - STDEV_Multiplier * SDBB;


def OverSold = over_Sold;
def OverBought = over_Bought;
def UpSignal = if RSI crosses above OverSold then OverSold else Double.NaN;
def DownSignal = if RSI crosses below OverBought then OverBought else Double.NaN;


### RSI & Bollinger Band Relationships
plot bullSignal = if (lowerBollinger <= 45) and (RSI <= 30) and (RSI <= LowerBollinger) then 1 else 0;
plot bearSignal = if (upperBollinger >= 55) and (RSI >= 70) and (RSI >= UpperBollinger) then 1 else 0;
BullSignal.SetPaintingStrategy(PaintingStrategy.Boolean_arrow_up);
BearSignal.SetPaintingStrategy(PaintingStrategy.Boolean_arrow_down);


### Dynamic Average & O/B O/S Relationships

def superOverbought = DYNAverage crosses above Overbought; 
def superOversold = DYNAverage crosses below Oversold;

def superOverboughtExit = DYNAverage crosses below OverBought;
def superOversoldExit = DYNAverage crosses above Oversold;

AddChartBubble(superOverbought and !superOverbought[1], close, "Enter Super Overbought", color.light_red);
AddChartBubble(superOversold and !superOversold[1], close, "Enter Super Oversold", color.light_green);

AddChartBubble(superOverboughtExit and !superOverboughtExit[1], close, "Exit Super Overbought", color.red);
AddChartBubble(superOversoldExit and !superOversoldExit[1], close, "Exit Super Oversold", color.green);


### Squeeze Relationship (Lower and Upper Bollinger Bands Compressing)
def BBDistance = if UpperBollinger - LowerBollinger <= 10 then 1 else 0;
plot squeeze = if BBDistance then close else Double.nan;
squeeze.SetPaintingStrategy(PaintingStrategy.POINTS);
squeeze.SetLineWeight(4);
squeeze.SetDefaultColor(Color.Red);


