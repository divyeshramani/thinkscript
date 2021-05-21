input length = 20;
input nk = 1.5;
input nBB = 2.0;

def squeeze = TTM_Squeeze(close, length, nk, nBB).SqueezeAlert;

def EMA13 = ExpAverage(close, 13);
def EMA21 = ExpAverage(close, 21);
def EMA34 = ExpAverage(close, 34);

def bullish = EMA13 > EMA21 and EMA21 > EMA34;
def bearish = EMA13 < EMA21 and EMA21 < EMA34;

def fiveDotSqueeze = Sum(squeeze, 5) == 0;

def bullishSignal = if fiveDotSqueeze and bullish then 1 else 0;
def bearishSignal = if fiveDotSqueeze and bearish then 1 else 0;

def exitBullishTrade = if EMA13 < EMA21 and EMA13[1] >= EMA21[1] then 1 else 0;
def exitBearishTrade = if EMA13 > EMA21 and EMA13[1] <= EMA21[1] then 1 else 0;


AddOrder(OrderType.Buy_To_Open, bullishSignal, close, 100);
AddOrder(OrderType.Sell_To_Close, high>= entryPrice() + entryPrice()*0.03, entryPrice() + entryPrice()*0.03, 100);
AddOrder(OrderType.Sell_To_Close, exitBullishTrade, close, 100);
 
AddOrder(OrderType.Sell_To_Open, bearishSignal, close, 100);
AddOrder(OrderType.Buy_To_Close, low <= entryPrice() - (entryPrice()*0.03),  entryPrice() - (entryPrice()*0.03), 100);
AddOrder(OrderType.Buy_To_Close, exitBearishTrade, close, 100);

