#TOS Indicators
#Home of the Volatility Box
#More info regarding this indicator here: tosindicators.com/indicators/market-pulse
#Code written in 2019 
#Full Youtube Tutorial here: https://youtu.be/Hku6dLR-m_A

def price = close;
def length = 10;

def tmp1 = if price > price[1] then price - price[1] else 0;
def tmp2 = if price[1] > price then price[1] - price else 0;
def d2 = sum(tmp1, length);
def d4 = sum(tmp2, length);
def cond = d2 + d4 == 0;
def ad3 = if cond then 0 else (d2 - d4) / (d2 + d4) * 100;
def coeff = 2 / (length + 1) * AbsValue(ad3) / 100;
def asd = compoundValue("visible data" = coeff * price + (if IsNaN(asd[1]) then 0 else asd[1]) * (1 - coeff), "historical data" = price
);
def VMA = asd;


def vwma8 = sum(volume * close, 8) / sum(volume, 8);
def vwma21 = sum(volume * close, 21) / sum(volume, 21);
def vwma34 = sum(volume * close, 34) / sum(volume, 34);

def bullish = if vwma8 > vwma21 and vwma21 > vwma34 then 1 else 0;
def bearish = if vwma8 < vwma21 and vwma21 < vwma34 then 1 else 0;
def distribution = if !bullish and !bearish then 1 else 0;

def bullishCounter = if bullish then bullishCounter[1] + 1 else if !bullish then 0 else bullishCounter[1];

def bearishCounter = if bearish then bearishCounter[1] + 1 else if !bearish then 0 else bearishCounter[1];

def accumulationCounter = if (close >= VMA) then accumulationCounter[1] + 1 else if !(close >= VMA) then 0 else accumulationCounter[1];

def distributionCounter = if (close <= VMA) then distributionCounter[1] + 1 else if !(close <= VMA) then 0 else distributionCounter[1];

# AddLabel(yes, if bullish and close >= VMA then bullishCounter + ": Accel" else if bearish and close <= VMA then bearishCounter + ": Decel " else if close>=VMA then accumulationCounter + ": Accum" else distributionCounter + ": Distr", color.black);
AddLabel(yes, if bullish and close >= VMA then bullishCounter else if bearish and close <= VMA then bearishCounter else if close>=VMA then accumulationCounter else distributionCounter , color.black);

AssignBackgroundColor(if bullish and close >= VMA then color.green else if bearish and close <= VMA then color.red else if close>=VMA then color.gray else color.orange);

