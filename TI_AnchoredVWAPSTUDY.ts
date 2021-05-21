declare upper;

input anchorDate = 20210122;
input anchorTime = 930;
input dayTrading = no;

def postAnchorDate = if (dayTrading == no and GetYYYYMMDD() >= anchorDate) or (dayTrading == yes and GetLastDay() == GetDay() and GetLastYear() == GetYear()) then 1 else 0;

def postAnchorTime = if SecondsTillTime(anchorTime) == 0 then 1 else if GetYYYYMMDD() < AnchorDate then 0 else postAnchorTime[1];

plot anchoredVWAP = TotalSum(if postAnchorDate and postAnchorTime then ((high+low+close)/3)*(volume) else 0)/TotalSum(if postAnchorDate and postAnchorTime then volume else 0);

anchoredVWAP.setStyle(Curve.Firm);
anchoredVWAP.SetLineWeight(2);
anchoredVWAP.SetDefaultColor(Color.Cyan);

#AddChartBubble(yes,close, revisedDate, color.yellow);