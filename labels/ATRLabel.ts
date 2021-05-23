# beginning of code ---------------------- -
# current ATR as a label at top of the chart
#
# Label color changes according to value of ATR:
# . Green if >25
# . Gray if 20 to 25
# . Red if < 20
#

input length = 14;
input highATRPctThresold = 2.5;
input lowATRPctThresold = 1.0;

plot currentATR = reference ATR(length, averageType = AverageType.SIMPLE);

currentATR.Hide();

def atrPct = (currentATR * 100) / close;

DefineGlobalColor("ATRHigh", CreateColor(50, 205, 50));
DefineGlobalColor("ATRLow", Color.RED);
DefineGlobalColor("ATRMid", Color.GRAY);

# AddLabel (yes, (Concat("ATR: ", Round(currentATR, 1))) + " ", if currentATR > 25 then GlobalColor("ATRHigh") else if currentATR < 20 then GlobalColor("ATRLow") else GlobalColor("ATRMid"));
AddLabel (yes, (Concat("ATR: ", Round(currentATR, 1))) + " ", if atrPct >= highATRPctThresold then GlobalColor("ATRHigh") else if atrPct <= lowATRPctThresold then GlobalColor("ATRLow") else GlobalColor("ATRMid"));
