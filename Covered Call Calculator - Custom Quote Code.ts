#Written by TOS Indicators - 2021
#Home of the Volatility Box
#Covered Call Calculator
#Tutorial: https://www.tosindicators.com/indicators/covered-call-calculator
#The following thinkSript code needs to be pasted in a Custom Quote script on the options chain.


input maxPctThreshold = 0.5;

def maxShares = 100;
def maxContracts = 1;

def premium = maxContracts * close * 100;
def premiumPct = premium/(MaxShares * close(getUnderlyingSymbol()));

def strikePriceGain = getStrike() - close(getUnderlyingSymbol());
def premiumPlusSharesPct = ((strikePriceGain * maxShares) + premium)/(MaxShares * close(getUnderlyingSymbol()));


AddLabel(yes, AsPercent(premiumPct) + " | " + AsPercent(premiumPlusSharesPct), if premiumPlusSharesPct >= 0.5 then color.green else color.white);