# Daily ATR Label
input length = 14;
input averageType = AverageType.WILDERS;

def atr = MovingAverage(averageType, TrueRange(high(period = "DAY"), close(period = "DAY"), low(period = "DAY")), length);

def atrPct = (atr * 100) / close;

AddLabel (yes, (Concat("ATR: ", Round(atr, 2))) + "|" + Round(atrPct,2) + "%  ", if atrPct >= 3 then CreateColor(50, 205, 50) else Color.RED);
