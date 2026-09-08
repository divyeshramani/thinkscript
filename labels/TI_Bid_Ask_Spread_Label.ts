# Bid-Ask Spread Label
input threshold = 0.10;
def spread = AbsValue(open(priceType=PriceType.BID) - close(priceType=PriceType.ASK));

AddLabel(yes, "Spread: $" + Round(spread, 3), 
    if spread <= threshold then Color.LIGHT_GREEN else Color.LIGHT_RED);


