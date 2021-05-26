def EMA8 = ExpAverage(close, 8);
def EMA13 = ExpAverage(close, 13);
def EMA21 = ExpAverage(close, 21);
def EMA34 = ExpAverage(close, 34);

def bullish = EMA8 > EMA13 and EMA13 > EMA21 and EMA21 > EMA34;
def bearish = EMA8 < EMA13 and EMA13 < EMA21 and EMA21 < EMA34;

AddLabel(bullish, "StackedMAs", color.black);
AddLabel(bearish, "StackedMAs", color.black);
AddLabel(!bullish and !bearish, " ", color.black);

AssignBackgroundColor(if bullish then color.green else if bearish then color.red else color.black);