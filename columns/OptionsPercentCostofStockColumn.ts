def condition = ((close/close(getUnderlyingSymbol())));
#plot condition = if signal <= 0.04 then 1 else 0;

#def condition =(close - close[1])/close[1];
AddLabel(condition,Round(condition*100,0)+"%",if condition >= 0.5 then color.green else if condition <= -0.5 then color.red else color.white);


