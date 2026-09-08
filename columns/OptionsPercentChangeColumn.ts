def condition =(close - close[5])/close[5];
AddLabel(condition,Round(condition*100,0)+"%",if condition >= 0.5 then color.green else if condition <= -0.5 then color.red else color.white);

