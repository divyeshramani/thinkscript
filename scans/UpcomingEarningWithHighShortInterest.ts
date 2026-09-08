    def pctThreshold = 0.15;
    def ath = Highest(high, 365);

    plot signal = (ath - close) / close <= pctThreshold;

    