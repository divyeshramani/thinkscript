# Rising MFI + Slower Price Upward Move
def length = 15;
def minimmum_mfi_change = 35;
def multiplier = 7;

def mfi = MoneyFlowIndex();
def close = close();

def lowest_mfi = Lowest(mfi, length);
def mfi_change = mfi - lowest_mfi;

def lowest_close = Lowest(close, length);

def percent_change = (close - lowest_close) * 100 / lowest_close;

#plot rising_mfi = if mfi - lowest_mfi > 50 then 1 else Double.NaN;

plot rising_mfi_low_price = if percent_change * multiplier < mfi_change and mfi_change > minimmum_mfi_change then 1 else Double.NaN;