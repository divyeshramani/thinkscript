def price_pct = 1;
def volume_pct = 25;


def price_pct_change = (close - low[1]) * 100 / low[1];
def price_sigal = price_pct_change > price_pct;




def vol_avg = average(volume, 50)[1];
def chg = 100*(price/vol_avg -1);
def volume_signal = chg >= volume_pct;



plot scan = price_sigal and volume_signal;


# Scanning to see where we see greater than 3+ SD volume on 3 out of last 5 days. 









