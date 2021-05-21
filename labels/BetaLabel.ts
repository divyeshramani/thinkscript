declare upper;

input length = 21;
input returnLength = 1;
input index = {Default SPX, "Nasdaq Composite", NDX, Dow30, "Russell 2000"};

assert(returnLength > 0, "'return length' must be positive: " + returnLength);

def primary = if close[returnLength] == 0 then 0 else (close - close[returnLength]) / close[returnLength] * 100;

def logic;
switch(index) {
case SPX:
logic = close("SPX");
case "Nasdaq Composite":
logic = close("COMP");
case NDX:
logic = close("NDX");
case "Dow30":
logic = close("$DJI");
case "Russell 2000":
logic = close("RUT");
}

def secondary = if logic[returnLength] == 0 then 0 else (logic - logic[returnLength]) / logic[returnLength] * 100;

def Beta = Round(covariance(primary, secondary, length) / Sqr(stdev(secondary, length)), 2);

AddLabel(yes, index + " Beta: " + Beta, Color.WHITE);