declare upper;

input trin = yes;
input market_pcr = yes;
input dow_pcr = no;
input russle_pcr = no;
input snp_pcr = no;
input nasdaq_pcr = no;

def trinRatio = Round(close(symbol = "$TRIN"), 2);
# $TRIN > 2.0 indicates Oversold. Enter long as soon as the price starts to show strength again and the TRIN reverses back below 2.0.
# $TRIN < 0.5 indicates Overbought. 
def trinOverlyBearish = if trinRatio >= 2 then 1 else 0;
def trinOverlyBullish = if trinRatio <= 0.5 then 1 else 0;
AddLabel(trin, "$TRIN: " + trinRatio + "  ", if trinOverlyBullish then Color.GREEN
         else if trinOverlyBearish > 0.75 then Color.RED
         else Color.GRAY);

# Entire Market Put/Call Ratio
def pcallRatio = Round(SimpleMovingAvg(close(symbol = "$PCALL"), 10), 2);
def pcall = close("$PCALL");
def pcallOverlyBearish = if pcallRatio >= 1 then 1 else 0;
def pcallOverlyBullish = if pcallRatio <= 0.85 then 1 else 0;
AddLabel(market_pcr, "$PCALL: " + pcallRatio + "  ", if pcallOverlyBullish then Color.GREEN
         else if pcallOverlyBearish then Color.RED
         else Color.GRAY);


# DowJones Put/Call Ratio
def pci = close("$PCI");
AddLabel(dow_pcr, "$PCI: " + pci + " ", if pci > 1.05 then Color.GREEN
         else if pci > 0.75 then Color.GRAY
         else Color.RED);

# Rusell Put/Call Ratio
def pcrl = close("$PCRL");
AddLabel(russle_pcr, "$PCRL: " + pcrl + "  ", if pcrl > 1.05 then Color.GREEN
         else if pcrl > 0.75 then Color.GRAY
         else Color.RED);

# S&P Put/Call Ratio
def pcsp = close("$PCSP");
AddLabel(snp_pcr, "$PCSP: " + pcsp + "  ", if pcsp > 1.05 then Color.GREEN
         else if pcsp > 0.75 then Color.GRAY
         else Color.RED);

# Nasdaq Put/Call Ratio
def pcnd = close("$PCND");
AddLabel(nasdaq_pcr, "$PCND: " + pcnd + "  ", if pcnd > 1.05 then Color.GREEN
         else if pcnd > 0.75 then Color.GRAY
         else Color.RED);


