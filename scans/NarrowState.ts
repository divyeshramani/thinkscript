input fuzziness = 0.4; # percent
def sma20 = SimpleMovingAvg(length = 20);
def sma200 = SimpleMovingAvg(length = 200);
def flat20 = if AbsValue(sma20 - sma20[8]) / sma20 <= (fuzziness / 100) then 1 else 0;
def flat200 = if AbsValue(sma200 - sma200[8]) / sma200 <= (fuzziness / 100) then 1 else 0;

plot condition_met = if flat20 == 1 and flat200 == 1 and AbsValue(sma20 - sma200) <= 0.01 * close then 1 else double.nan;