
input entryType = {default wickTouch, closeAbove};

input openingRangeStartTimeEST = 930;
input openingRangeEndTimeEST = 1000;

input tradeEntryStartTimeEST = 1000;
input tradeEntryEndTimeEst = 1100;

def isDisplay = if GetAggregationPeriod() <= AggregationPeriod.FIVE_MIN then 1 else 0;

def openingRange = if SecondsTillTime(openingRangeStartTimeEST) <= 0 and SecondsTillTime(openingRangeEndTimeEST) >= 0 and isDisplay  then 1 else 0;

def tradeRange = if SecondsTillTime(tradeEntryStartTimeEST) <= 0 and SecondsTillTime(tradeEntryEndTimeEst) >= 0 and isDisplay then 1 else 0;



def openingRangeHigh = if SecondsTillTime(openingRangeStartTimeEST) == 0 then high else if openingRange and high > openingRangeHigh[1] then high else openingRangeHigh[1];


def openingRangeLow = if SecondsTillTime(openingRangeStartTimeEST) == 0 then low else if openingRange and low < openingRangeLow[1] then low else openingRangeLow[1];


plot highCloud = if openingRange then openingRangeHigh else double.nan;
plot lowCloud = if openingRange then openingRangeLow else double.nan; 
highCloud.setDefaultColor(color.GRAY);
lowCloud.setDefaultColor(color.GRAY);

AddCloud(lowCloud, highCloud, color.Gray, color.Gray);
 
plot tradeEntryHighExtension = if tradeRange then openingRangeHigh else double.nan;
plot tradeEntryLowExtension = if tradeRange then openingRangeLow else double.nan;
tradeEntryHighExtension.setPaintingStrategy(PaintingStrategy.HORIZONTAL);
tradeEntryLowExtension.setPaintingStrategy(PaintingStrategy.HORIZONTAL);
tradeEntryHighExtension.setStyle(Curve.MEDIUM_DASH);
tradeEntryLowExtension.setStyle(Curve.MEDIUM_DASH);
tradeEntryHighExtension.setDefaultColor(Color.Gray);
tradeEntryLowExtension.setDefaultColor(Color.Gray);

def bullEntryCondition;
def bearEntryCondition;
switch(entryType) {
  case wickTouch:
    bullEntryCondition = tradeRange and high > openingRangeHigh and high[1] <= openingRangeHigh;
    bearEntryCondition = tradeRange and low < openingRangeLow and low[1] >= openingRangeLow;
  case closeAbove:
    bullEntryCondition = tradeRange and close > openingRangeHigh and close[1] <= openingRangeHigh;
    bearEntryCondition = tradeRange and close < openingRangeLow and close[1] >= openingRangeLow;
}

def bullishORB = if bullEntryCondition then 1 else if !tradeRange then 0  else bullishORB[1];
def bearishORB = if bearEntryCondition then 1 else if !tradeRange then 0  else bearishORB[1];

def range = openingRangeHigh - openingRangeLow;
def halfRange = range / 2;
def midRange = openingRangeLow + halfRange;


plot midRangePlot = if tradeRange then midRange else double.nan;
midRangePlot.setStyle(Curve.POINTS);
midRangePlot.setPaintingStrategy(PaintingStrategy.HORIZONTAL);
midRangePlot.setDefaultColor(color.Gray);

def halfUpsideProjection = openingRangeHigh + halfRange;
plot halfRangeAbovePlot = if bullishORB and tradeRange then halfUpsideProjection else double.nan;
halfRangeAbovePlot.setStyle(Curve.POINTS);
halfRangeAbovePlot.setPaintingStrategy(PaintingStrategy.HORIZONTAL);
halfRangeAbovePlot.setDefaultColor(color.Green);

def fullUpsideProj = openingRangeHigh + range;
plot fullRangeAbovePlot = if bullishORB and tradeRange then fullUpsideProj else double.nan;
fullRangeAbovePlot.setStyle(Curve.SHORT_DASH);
fullRangeAbovePlot.setPaintingStrategy(PaintingStrategy.HORIZONTAL);
fullRangeAbovePlot.setDefaultColor(color.Green);

def halfDownProjection = openingRangeLow - halfRange;
plot halfRangeBelowPlot = if bearishORB and tradeRange then halfDownProjection else double.nan;
halfRangeBelowPlot.setStyle(Curve.POINTS);
halfRangeBelowPlot.setPaintingStrategy(PaintingStrategy.HORIZONTAL);
halfRangeBelowPlot.setDefaultColor(color.Red);

def fullDownProj = openingRangeLow - range;
plot fullRangeBelowPlot = if bearishORB and tradeRange then fullDownProj else double.nan;
fullRangeBelowPlot.setStyle(Curve.SHORT_DASH);
fullRangeBelowPlot.setPaintingStrategy(PaintingStrategy.HORIZONTAL);
fullRangeBelowPlot.setDefaultColor(color.Red);

