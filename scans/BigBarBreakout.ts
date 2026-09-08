# Scan: Big bar (1.2x previous 5) and price above prior 5-bar high
# Current bar range >= 1.2 * biggest range of previous 5 bars
# and close > highest high of previous 5 bars

input sizeMultiplier = 1.2;

# Current bar range (high - low)
def currentRange = high - low;

# Biggest range among previous 5 bars (bars 1 through 5)
def range1 = high[1] - low[1];
def range2 = high[2] - low[2];
def range3 = high[3] - low[3];
def range4 = high[4] - low[4];
def range5 = high[5] - low[5];
def biggestPrev5Range = Max(Max(Max(Max(range1, range2), range3), range4), range5);

# Highest high of previous 5 bars
def highestPrev5High = Highest(high[1], 5);

# Conditions
def barAtLeast12x = currentRange >= sizeMultiplier * biggestPrev5Range;
def priceAbovePrev5High = close > highestPrev5High;

plot scan = barAtLeast12x and priceAbovePrev5High;
