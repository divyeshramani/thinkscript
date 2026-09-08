input length = 14;
input ADXLength = 20;
input averageType = AverageType.WILDERS;

def HiDiff = high - high[1];
def LoDiff = low[1] - low;
def PlusDM = if HiDiff > LoDiff and HiDiff > 0 then HiDiff else 0;
def MinusDM =  if LoDiff > HiDiff and LoDiff > 0 then LoDiff else 0;
def ATR = MovingAverage(averageType, TrueRange(high, close,        low), length);
def Adx = DMI(length, averageType).ADX;
def Plus = 100 * MovingAverage(averageType, PlusDM, length) / ATR;
def Minus = 100 * MovingAverage(averageType, MinusDM, length) / ATR;
def BullishSignal = Plus crosses above Minus;
def BearishSignal = Plus crosses below Minus;

plot BullishZone = Plus > Minus and ADX >= ADXLength;
def BearishZone = Plus < Minus and ADX >= ADXLength;
def NeutralZone = !BullishZone and !BearishZone;
