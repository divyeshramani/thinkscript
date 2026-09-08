# Scan: Two consecutive candles with long lower wicks
# Lower wick = distance from low to bottom of body (min of open/close)
# Condition: lower wick > wickToBodyMultiple * body size on current and prior bar

input wickToBodyMultiple = 2.0;
input minBody = 0.0;

def body = AbsValue(close - open);
def lowerWick = Min(open, close) - low;
def upperWick = high - Max(open, close);

def longLowerWick = lowerWick > wickToBodyMultiple * body and body >= minBody and lowerWick > 0 and lowerWick > upperWick;;

plot scan = longLowerWick and longLowerWick[1];
