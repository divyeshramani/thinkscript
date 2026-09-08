# Falling MFI + Slower Price Downward Move
def length = 15;
def minimmum_mfi_change = 30;
def multiplier = 6;

def mfi = MoneyFlowIndex();
def close = close();

def highest_mfi = Highest(mfi, length);
def mfi_change = highest_mfi - mfi;

def highest_close = Highest(close, length);

def percent_change = (highest_close - close) * 100 / highest_close;

#plot rising_mfi = if mfi - lowest_mfi > 50 then 1 else Double.NaN;

plot falling_mfi_high_price = if percent_change * multiplier < mfi_change and mfi_change > minimmum_mfi_change then 1 else Double.NaN;