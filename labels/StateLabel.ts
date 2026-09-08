# StateLabel
# Label showing SMA20/SMA200 band state: Narrow, Normal, Wide, or ExtraWide
# Based on distance between 20- and 200-period SMAs as % of price

input narrowThreshold = 0.1;
input normalThreshold = 1.1;
input priceAboveSMA20Pct = 0.8;

def mark = close(priceType=PriceType.MARK);
# Simple Moving Averages
def SMA20 = Average(close, 20);
def SMA200 = Average(close, 200);

# Distance between SMAs as % of current price
def distanceMAs = AbsValue(SMA20 - SMA200);
def distanceMAsPct = (distanceMAs / close) * 100;

def distancePrice20MA = AbsValue(mark - SMA20);
def distancePrice200MA = AbsValue(mark - SMA200);
def distancePricePct = (distancePrice20MA / close) * 100;

# Price is at least priceAboveSMA20Pct% above 20 SMA (for ExtraWide)
def markFarThanThreshold = if distancePrice20MA >= priceAboveSMA20Pct and distancePrice200MA > distanceMAs then 1 else 0 ;


# State logic (evaluate in order)
# Narrow: distance <= 0.2%
# Normal: distance <= 1.1% (and > 0.2%)
# ExtraWide: distance >= 1.1% AND close >= 0.8% above SMA20
# Wide: distance >= 1.1% but not ExtraWide
def isNarrow = if distanceMAsPct <= narrowThreshold then 1 else 0;
def isNormal = if distanceMAsPct > narrowThreshold and distanceMAsPct < normalThreshold then 1 else 0;
def isExtraWide = if distanceMAsPct >= normalThreshold and markFarThanThreshold == 1 then 1 else 0;
def isWide = if distanceMAsPct >= normalThreshold and markFarThanThreshold == 0 then 1 else 0;


AddLabel(yes, "State: " + (if isNarrow then "Narrow" else if isNormal then "Normal" else if isExtraWide then "Extra Wide" else "Wide") + " (" + Round(distanceMAsPct, 2) + "%) (" + Round(distancePricePct, 2) + "%)", if isNarrow then Color.LIGHT_GREEN else if isNormal then Color.GRAY else if isExtraWide then Color.LIGHT_ORANGE else Color.YELLOW);




