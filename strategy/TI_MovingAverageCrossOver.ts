input longEntries = yes;
input shortEntries = no;
input fastMALength = 8;
input slowMALength = 21;
input averageTypeFast = AverageType.Exponential;
input averageTypeSlow = AverageType.Exponential;
input quantity = 100;

plot fastMA = MovingAverage(averageTypeFast, close, fastMALength);
plot slowMA = MovingAverage(averageTypeSlow, close, slowMALength);

def longEntryCondition = longEntries and fastMA crosses above slowMA;
def longExitCondition = longEntries and fastMA crosses below slowMA;

def shortEntryCondition = shortEntries and fastMA crosses below slowMA;
def shortExitCondition = shortEntries and fastMA crosses above slowMA;

# Long Orders
AddOrder(OrderType.BUY_TO_OPEN, longEntryCondition, close, quantity);
AddOrder(OrderType.SELL_TO_CLOSE, longExitCondition, close, quantity);

# Short Orders
AddOrder(OrderType.SELL_TO_OPEN, longEntryCondition, close, quantity);
AddOrder(OrderType.BUY_TO_CLOSE, longExitCondition, close, quantity);

# Add TrailStop by adding another stratgey:  TrailStopLX(18.0, value);