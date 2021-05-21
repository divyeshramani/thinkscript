#TOS Indicators
#Home of the Volatility Box
#Indicator Name: Cumulative TICK 
#Full tutorial here: tosindicators.com/indicators/cumulative-tick

declare upper;

def newDay = GetDay() != GetDay()[1];
def tickData = hlc3(symbol="$TICK");

def cumulativeTickValue = if SecondsTillTime(930) < 0 and SEcondsTillTime(1600) > 0 then tickData + cumulativeTickValue[1] else 0;

AddLabel(yes, "$TICK: " + Round(cumulativeTickValue,0), if cumulativeTickValue > 0 then color.light_green else color.light_red);