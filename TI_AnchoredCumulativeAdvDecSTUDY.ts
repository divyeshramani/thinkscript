#Written by TOS Indicators 2020
#Home of the Volatility Box
#Indicator: Anchored Cumulative Advance Decline
#References TTM_Squeeze source code in TOS and Edge Signals Source Code
#Full Course Link: tosindicators.com/squeeze-course/

#Update 12/6/20 - Fixed line #50 which contained a typo. Thanks to Karl N. and Sidd N. for catching the error.

declare lower;

input symbol_1 = "FB";
input symbol_2 = "AMZN";
input symbol_3 = "AAPL";
input symbol_4 = "NFLX";
input symbol_5 = "GOOG";
input symbol_6 = "MSFT";

#FB
def symbol1 = close(symbol_1);
def symbol11 = close(symbol_1)[1];

def symbol1a = symbol1 > symbol11;
def symbol1b = symbol1 < symbol11;

#AMZN
def symbol2 = close(symbol_2);
def symbol21 = close(symbol_2)[1];

def symbol2a = symbol2 > symbol21;
def symbol2b = symbol2 < symbol21;

#AAPL
def symbol3 = close(symbol_3);
def symbol31 = close(symbol_3)[1];

def symbol3a = symbol3 > symbol31;
def symbol3b = symbol3 < symbol31;

#NFLX
def symbol4 = close(symbol_4);
def symbol41 = close(symbol_4)[1];

def symbol4a = symbol4 > symbol41;
def symbol4b = symbol4 < symbol41;

#GOOG
def symbol5 = close(symbol_5);
def symbol51 = close(symbol_5)[1];

def symbol5a = symbol5 > symbol51;
def symbol5b = symbol5 < symbol51;

#MSFT
def symbol6 = close(symbol_6);
def symbol61 = close(symbol_6)[1];

def symbol6a = symbol6 > symbol61;
def symbol6b = symbol6 < symbol61;


input startDateYyyyMmDd = 2020120;

def beyondStartDate = if GetYYYYMMDD() >= startDateYyyyMmDd then 1 else 0;
plot advDecLine =  if beyondStartDate then TotalSum((symbol1a - symbol1b)+(symbol2a-symbol2b)+(symbol3a-symbol3b)+(symbol4a-symbol4b)+(symbol5a-symbol5b)+(symbol6a-symbol6b)) else totalsum(0);

plot advDecLineAvg = Average(advDecLine,50);

plot bearishCrossOverSignal = if advDecLine < advDecLineAvg and advDecLine[1] >= advDecLineAvg and CCI() <= -100 then advDecLineAvg else double.nan;

plot bullishCrossOverSignal = if advDecLine > advDecLineAvg and advDecLine[1] <= advDecLineAvg and CCI() >= 100 then advDecLineAvg else double.nan;

bearishCrossOverSignal.SetPaintingStrategy(PaintingStrategy.ARROW_DOWN);
bullishCrossOverSignal.SetPaintingStrategy(PaintingStrategy.ARROW_UP);
bearishCrossOverSignal.SetLineWeight(3);
bullishCrossOverSignal.SetLineWeight(3);