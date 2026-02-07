# MFI-RSI Divergence

input difference = 35;
# Define Simple Moving Averages
def mfi = MoneyFlowIndex();
def rsi = RSI();

def diff = AbsValue(mfi - rsi);


plot value = diff > difference;