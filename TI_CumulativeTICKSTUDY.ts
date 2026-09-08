#TOS Indicators
#Home of the Volatility Box
#Indicator Name: Cumulative TICK 
#Full tutorial here: tosindicators.com/indicators/cumulative-tick

declare lower;

def newDay = GetDay() != GetDay()[1];
def tickData = hlc3(symbol="$TICK");

def cumulativeTickValue = if SecondsTillTime(930) < 0 and SEcondsTillTime(1600) > 0 then tickData + cumulativeTickValue[1] else 0;

plot cumulativeTickPlot = if cumulativeTickValue != 0 then cumulativeTickValue else Double.nan;
cumulativeTickPlot.setPaintingStrategy(PaintingStrategy.Line_VS_Points);
cumulativeTickPlot.AssignValueColor(if cumulativeTickPlot > cumulativeTickPlot[1] then color.cyan else color.gray);

AddVerticalLine(newDay, "New Day", color.gray, curve.Short_Dash);

# AddLabel(yes, cumulativeTickValue, color.white);
AddLabel(yes, "$TICK: " + Round(cumulativeTickValue,0), if cumulativeTickValue > 0 then color.light_green else color.light_red);