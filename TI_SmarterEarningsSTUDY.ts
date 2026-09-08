### User Inputs
input expectedMoveLabels = yes;
input gapFillLabels = yes;
input gapNGoLabels = yes;


### Global Variables
def earningsDay = HasEarnings();
def beforeMarketEarnings = HasEarnings(EarningTime.BEFORE_MARKET);
def afterMarketEarnings = HasEarnings(EarningTime.AFTER_MARKET);
def groupBME = earningsDay and beforeMarketEarnings;
def groupAME = earningsDay[1] and afterMarketEarnings[1];
def earningsGroup = groupBME or groupAME;
def totalEarnings = TotalSum(earningsDay);

### Estimated Earnings Vs. Actual Earnings
def EstimatedEarnings = if IsNan(getEstimatedEarnings()) then EstimatedEarnings[1] else getEstimatedEarnings();
def ActualEarnings = if IsNan(getActualEarnings()) then ActualEarnings[1] else getActualEarnings();
def earningsBeat = if (earningsGroup) and ActualEarnings > EstimatedEarnings then 1 else 0;
def earningsMiss = if (earningsGroup) and ActualEarnings < EstimatedEarnings then 1 else 0;

### Gap Fills
def gapUp = if earningsGroup and open > high[1] then 1 else 0;
def gapDown = if earningsGroup and open < low[1] then 1 else 0;
def gapUpFilled = if gapUp and low <= high[1] then 1 else 0;
def gapDownFilled = if gapDown and high >= low[1] then 1 else 0;
def gapUpFilledAndEarningsMiss = gapUpFilled and earningsMiss;
def gapDownFilledAndEarningsBeat = gapDownFilled and earningsBeat;
def totalGapUpFills = TotalSum(gapUpFilled);
def totalGapDownFills = TotalSum(gapDownFilled);
def totalGapFills = totalGapUpFills + totalGapDownFills;
def gapUpFillsOnBeat = TotalSum(gapUpFilled and earningsBeat); #test
def gapUpFillsOnMiss = TotalSum(gapUpFilledAndEarningsMiss);
def gapDownFillsOnMiss = TotalSum(gapDownFilled and earningsMiss); #test
def gapDownFillsOnBeat = TotalSum(gapDownFilledAndEarningsBeat);
def gapUpDidNotFill = (gapUp and !gapUpFilled);
def gapDownDidNotFill = (gapDown and !gapDownFilled);
def gapDidNotFill = gapUpDidNotFill or gapDownDidNotFill;

### Gap N Go
def gapNGoBullish = if gapUpDidNotFill then 1 else 0;
def gapNGoBearish = if gapDownDidNotFill then 1 else 0;
def totalSumGNG = TotalSum(GapNGoBullish) + TotalSum(GapNGoBearish);
def totalSumGNGBullish =  TotalSum(GapNGoBullish);
def totalSumGNGBearish =  TotalSum(GapNGoBearish);

def gapNGoBullishWithEarnings = if earningsBeat and gapUpDidNotFill then 1 else 0;
def gapNGoBearishWithEarnings = if earningsMiss and gapDownDidNotFill then 1 else 0;
def totalSumGNGBullishWithEarnings =  TotalSum(gapNGoBullishWithEarnings);
def totalSumGNGBearishWithEarnings =  TotalSum(gapNGoBearishWithEarnings);

def avgPostBullishMove = if GapNGoBullish then high - open else 0;
def avgPostBearishMove = if GapNGoBearish then open - low else 0;
def sumAvgBull = TotalSum(avgPostBullishMove);
def sumAvgBear = TotalSum(avgPostBearishMove);
def counterAvgBull = TotalSum(GapNGoBullish);
def counterAvgBear = TotalSum(GapNGoBearish);
def PostAvgBullishMove = SumAvgBull/counterAvgBull;
def PostAvgBearishMove = SumAvgBear/counterAvgBear;
def lowestPostBullishMove = if GapNGoBullish then high - open else double.nan;
def lowestPostBearishMove = if GapNGoBearish then open - low else double.nan;
def lowestBullishMove = LowestAll(lowestPostBullishMove);
def lowestBearishMove = LowestAll(lowestPostBearishMove);

### Expected Move Rough Calculation 
### Note - this is a rough calculation, in which we use a 2 day square root 
def expectedEarningsMove = if earningsgroup then  Sqrt(2) / Sqrt(365)  * (2*imp_volatility()[1]) * close[1] else Sqrt(2) / Sqrt(365)  * (2*imp_volatility()[1]) * close[1];
def actualEarningsMove = if earningsGroup then AbsValue(close[1]-open) else 0;
def greaterThanExpected = actualEarningsMove > expectedEarningsMove;
def totalGreaterThanExpected = TotalSum(greaterThanExpected);
def totalGreaterThanExpectedPct = totalGreaterThanExpected/totalEarnings * 100;

# Total Earnigns Beats/Misses
def totalEarningsBeat = TotalSum(earningsBeat);
def totalEarningsMiss = TotalSum(earningsMiss);

### Labels & Chart Bubbles
AddLabel(gapFillLabels or gapNGoLabels or expectedMoveLabels, "# of Earnings/Beats/Miss: "+totalEarnings + "/" + totalEarningsBeat + "/" + totalEarningsMiss + "  ", color.white);
AddLabel(gapFillLabels or gapNGoLabels or expectedMoveLabels, "Greater Than Expected Move "+totalGreaterThanExpectedPct+"% of Time  ", color.lime);


AddLabel(gapFillLabels, "Total Gap Fills: "+totalGapFills + "  ", color.cyan);
AddLabel(gapFillLabels, "Total Gap Up Fills: "+totalGapUpFills+", "+gapUpFillsOnMiss+" on Miss  ", color.cyan);
AddLabel(gapFillLabels, "Total Gap Down Fills: "+totalGapDownFills+", "+gapDownFillsOnBeat+" on Beat  ", color.cyan);
#AddLabel(gapFillLabels, "Gap Up Fills On Beat: "+gapUpFillsOnBeat, color.cyan);
#AddLabel(gapFillLabels, "Gap Up Fills On Miss: "+gapUpFillsOnMiss, color.cyan);
#AddLabel(gapFillLabels, "Gap Down Fills On Miss: "+gapDownFillsOnMiss, color.cyan);
#AddLabel(gapFillLabels, "Gap Down Fills On Beat: "+gapDownFillsOnBeat, color.cyan);

AddLabel(gapNGoLabels, "Total Gap N' Go: "+totalSumGNG, color.yellow);
AddLabel(gapNGoLabels, "GNG Bullish: "+totalSumGNGBullish+", "+totalSumGNGBullishWithEarnings+" on Beats  ", color.yellow);
AddLabel(gapNGoLabels, "GNG Bearish: "+totalSumGNGBearish+", "+totalSumGNGBearishWithEarnings+" on Misses  ", color.yellow);
AddLabel(gapNGoLabels, "GNG Avg Bullish Move: $"+Round(PostAvgBullishMove,2) + "  ", color.yellow);
AddLabel(gapNGoLabels, "GNG Avg Bearish Move: $"+Round(PostAvgBearishMove,2) + "  ", color.yellow);
AddLabel(gapNGoLabels, "GNG Lowest Bullish Move: $"+Round(lowestBullishMove,2) + "  ", color.yellow);
AddLabel(gapNGoLabels, "GNG Lowest Bearish Move: $"+Round(lowestBearishMove,2) + "  ", color.yellow);

AddChartBubble(gapUpFilled, close, if gapUpFilledAndEarningsMiss then "Gap Up Filled On\nEarnings Miss" else "Gap Up Filled", color.cyan);
AddChartBubble(gapDownFilled, close, if gapDownFilledAndEarningsBeat then "Gap Down Filled On\nEarnings Beat" else "Gap Down Filled", color.cyan);
AddChartBubble(gapNGoBullish, close, "Gap N' Go Bullish", color.yellow);
AddChartBubble(gapNGoBearish, close, "Gap N' Go Bearish", color.yellow);


#AddChartBubble(greaterThanExpected, close, "Expected: $"+Round(expectedEarningsMove, 2)+ " vs. Actual: $"+AsPrice(actualEarningsMove), color.lime);
AddChartBubble(earningsGroup, close, "Expected: $"+Round(expectedEarningsMove, 2)+ " vs. Actual: $"+AsPrice(actualEarningsMove), color.lime);
AddChartBubble(isNan(close[-1]) and earningsGroup[-1], close, "Expected: $"+Round(expectedEarningsMove, 2), color.lime);
