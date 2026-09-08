#TOS Indicators
#Home of the Volatility Box
#Indicator Name: Multi-Time Frame Squeeze 
#Full Tutorial Available Here: www.tosindicators.com/indicators/mtf-squeeze
#Contains TTM_Squeeze Source Code, found here (http://freethinkscript.blogspot.com/2009/05/ttm-like-squeeze-indicator-with.html)



##Global Variables
def length = 20;
def AlertLine = 1;
def nk = 1.5;
def nBB = 2;
def averageTpype = AverageType.SIMPLE;
def displace = 0;
def trueRangeAverageType = AverageType.SIMPLE;

## Month Aggregation Period Variables

def monthPrice;
def monthATR;
def monthSDev;
def monthDenom;
def monthBBSInd;
def monthSqueeze;
def monthAggregationPeriod;
if GetAggregationPeriod() <= AggregationPeriod.Month {
    monthPrice = close(period="Month");
    monthATR = Average(TrueRange(high (period="Month"), close(period="Month"), low(period="Month")), Length);
    monthSDev = stdev(monthPrice, Length);
    monthDenom = (nK*monthATR);
    monthBBSInd = if (monthDenom <> 0, ((nBB * monthSDev) /monthDenom), 0);
    monthSqueeze = if monthBBSInd < AlertLine then 1 else 0;
    monthAggregationPeriod = 1;
}
else {
    monthPrice = 0;
    monthATR = 0;
    monthSDev = 0;
    monthDenom = 0;
    monthBBSInd = 0;
    monthSqueeze = 0;
    monthAggregationPeriod = 0;
}
AddLabel(monthSqueeze and monthAggregationPeriod, "M", color.red);
AddLabel(!monthSqueeze and monthAggregationPeriod,"M", color.dark_green);

def weekPrice;
def weekATR;
def weekSDev;
def weekDenom;
def weekBBSInd;
def weekSqueeze;
def WeekAggregationPeriod;
if GetAggregationPeriod() <= AggregationPeriod.week {
    weekPrice = close(period="week");
    weekATR = Average(TrueRange(high (period="week"), close(period="week"), low(period="week")), Length);
    weekSDev = stdev(weekPrice, Length);
    weekDenom = (nK*weekATR);
    weekBBSInd = if (weekDenom <> 0, ((nBB * weekSDev) /weekDenom), 0);
    weekSqueeze = if weekBBSInd < AlertLine then 1 else 0;
    WeekAggregationPeriod = 1;
}
else {
    weekPrice = 0;
    weekATR = 0;
    weekSDev = 0;
    weekDenom = 0;
    weekBBSInd = 0;
    weekSqueeze = 0;
    WeekAggregationPeriod = 0;
}
AddLabel(weekSqueeze and WeekAggregationPeriod, "W", color.red);
AddLabel(!weekSqueeze and WeekAggregationPeriod,"W", color.dark_green);


def four_daysPrice;
def four_daysATR;
def four_daysSDev;
def four_daysDenom;
def four_daysBBSInd;
def four_daysSqueeze;
def FourDayAggregationPeriod;
if GetAggregationPeriod() <= AggregationPeriod.four_days {
    four_daysPrice = close(period="4 days");
    four_daysATR = Average(TrueRange(high (period="4 days"), close(period="4 days"), low(period="4 days")), Length);
    four_daysSDev = stdev(four_daysPrice, Length);
    four_daysDenom = (nK*four_daysATR);
    four_daysBBSInd = if (four_daysDenom <> 0, ((nBB * four_daysSDev) /four_daysDenom), 0);
    four_daysSqueeze = if four_daysBBSInd < AlertLine then 1 else 0;
    FourDayAggregationPeriod = 1;
}
else {
    four_daysPrice = 0;
    four_daysATR = 0;
    four_daysSDev = 0;
    four_daysDenom = 0;
    four_daysBBSInd = 0;
    four_daysSqueeze = 0;
    FourDayAggregationPeriod = 0;
}
AddLabel(four_daysSqueeze and FourDayAggregationPeriod, "4D", color.red);
AddLabel(!four_daysSqueeze and FourDayAggregationPeriod,"4D", color.dark_green);

def three_daysPrice;
def three_daysATR;
def three_daysSDev;
def three_daysDenom;
def three_daysBBSInd;
def three_daysSqueeze;
def ThreeDayMinAggregationPeriod;
if GetAggregationPeriod() <= AggregationPeriod.three_days {
    three_daysPrice = close(period="3 days");
    three_daysATR = Average(TrueRange(high (period="3 days"), close(period="3 days"), low(period="3 days")), Length);
    three_daysSDev = stdev(three_daysPrice, Length);
    three_daysDenom = (nK*three_daysATR);
    three_daysBBSInd = if (three_daysDenom <> 0, ((nBB * three_daysSDev) /three_daysDenom), 0);
    three_daysSqueeze = if three_daysBBSInd < AlertLine then 1 else 0;
    ThreeDayMinAggregationPeriod = 1;
}
else {
    three_daysPrice = 0;
    three_daysATR = 0;
    three_daysSDev = 0;
    three_daysDenom = 0;
    three_daysBBSInd = 0;
    three_daysSqueeze = 0;
    ThreeDayMinAggregationPeriod = 0;
}
AddLabel(three_daysSqueeze and ThreeDayMinAggregationPeriod, "3D", color.red);
AddLabel(!three_daysSqueeze and ThreeDayMinAggregationPeriod,"3D", color.dark_green);


def two_daysPrice;
def two_daysATR;
def two_daysSDev;
def two_daysDenom;
def two_daysBBSInd;
def two_daysSqueeze;
def TwoDayMinAggregationPeriod;
if GetAggregationPeriod() <= AggregationPeriod.two_days {
    two_daysPrice = close(period="2 days");
    two_daysATR = Average(TrueRange(high (period="2 days"), close(period="2 days"), low(period="2 days")), Length);
    two_daysSDev = stdev(two_daysPrice, Length);
    two_daysDenom = (nK*two_daysATR);
    two_daysBBSInd = if (two_daysDenom <> 0, ((nBB * two_daysSDev) /two_daysDenom), 0);
    two_daysSqueeze = if two_daysBBSInd < AlertLine then 1 else 0;
    TwoDayMinAggregationPeriod = 1;
}
else {
    two_daysPrice = 0;
    two_daysATR = 0;
    two_daysSDev = 0;
    two_daysDenom = 0;
    two_daysBBSInd = 0;
    two_daysSqueeze = 0;
    TwoDayMinAggregationPeriod = 0;
}
AddLabel(two_daysSqueeze and TwoDayMinAggregationPeriod, "2D", color.red);
AddLabel(!two_daysSqueeze and TwoDayMinAggregationPeriod,"2D", color.dark_green);

def dayPrice;
def dayATR;
def daySDev;
def dayDenom;
def dayBBSInd;
def daySqueeze;
def DayMinAggregationPeriod;
if GetAggregationPeriod() <= AggregationPeriod.day {
    dayPrice = close(period="day");
    dayATR = Average(TrueRange(high (period="day"), close(period="day"), low(period="day")), Length);
    daySDev = stdev(dayPrice, Length);
    dayDenom = (nK*dayATR);
    dayBBSInd = if (dayDenom <> 0, ((nBB * daySDev) /dayDenom), 0);
    daySqueeze = if dayBBSInd < AlertLine then 1 else 0;
    DayMinAggregationPeriod = 1;
}
else {
    dayPrice = 0;
    dayATR = 0;
    daySDev = 0;
    dayDenom = 0;
    dayBBSInd = 0;
    daySqueeze = 0;
    DayMinAggregationPeriod = 0;
}
AddLabel(daySqueeze and DayMinAggregationPeriod, "D", color.red);
AddLabel(!daySqueeze and DayMinAggregationPeriod,"D", color.dark_green);

def four_hoursPrice;
def four_hoursATR;
def four_hoursSDev;
def four_hoursDenom;
def four_hoursBBSInd;
def four_hoursSqueeze;
def FourHourMinAggregationPeriod;
if GetAggregationPeriod() <= AggregationPeriod.four_hours {
    four_hoursPrice = close(period="4 Hours");
    four_hoursATR = Average(TrueRange(high (period="4 Hours"), close(period="4 Hours"), low(period="4 Hours")), Length);
    four_hoursSDev = stdev(four_hoursPrice, Length);
    four_hoursDenom = (nK*four_hoursATR);
    four_hoursBBSInd = if (four_hoursDenom <> 0, ((nBB * four_hoursSDev) /four_hoursDenom), 0);
    four_hoursSqueeze = if four_hoursBBSInd < AlertLine then 1 else 0;
    FourHourMinAggregationPeriod = 1;
}
else {
    four_hoursPrice = 0;
    four_hoursATR = 0;
    four_hoursSDev = 0;
    four_hoursDenom = 0;
    four_hoursBBSInd = 0;
    four_hoursSqueeze = 0;
    FourHourMinAggregationPeriod = 0;
}
AddLabel(four_hoursSqueeze and FourHourMinAggregationPeriod, "4h", color.red);
AddLabel(!four_hoursSqueeze and FourHourMinAggregationPeriod,"4h", color.dark_green);

def two_hoursPrice;
def two_hoursATR;
def two_hoursSDev;
def two_hoursDenom;
def two_hoursBBSInd;
def two_hoursSqueeze;
def TwoHourMinAggregationPeriod;
if GetAggregationPeriod() <= AggregationPeriod.two_hours {
    two_hoursPrice = close(period="2 Hours");
    two_hoursATR = Average(TrueRange(high (period="2 Hours"), close(period="2 Hours"), low(period="2 Hours")), Length);
    two_hoursSDev = stdev(two_hoursPrice, Length);
    two_hoursDenom = (nK*two_hoursATR);
    two_hoursBBSInd = if (two_hoursDenom <> 0, ((nBB * two_hoursSDev) /two_hoursDenom), 0);
    two_hoursSqueeze = if two_hoursBBSInd < AlertLine then 1 else 0;
    TwoHourMinAggregationPeriod = 1;
}
else {
    two_hoursPrice = 0;
    two_hoursATR = 0;
    two_hoursSDev = 0;
    two_hoursDenom = 0;
    two_hoursBBSInd = 0;
    two_hoursSqueeze = 0;
    TwoHourMinAggregationPeriod = 0;
}
AddLabel(two_hoursSqueeze and TwoHourMinAggregationPeriod, "2h", color.red);
AddLabel(!two_hoursSqueeze and TwoHourMinAggregationPeriod,"2h", color.dark_green);

def hourPrice;
def hourATR;
def hourSDev;
def hourDenom;
def hourBBSInd;
def hourSqueeze;
def HourMinAggregationPeriod;
if GetAggregationPeriod() <= AggregationPeriod.hour {
    hourPrice = close(period="1 Hour");
    hourATR = Average(TrueRange(high (period="1 Hour"), close(period="1 Hour"), low(period="1 Hour")), Length);
    hourSDev = stdev(hourPrice, Length);
    hourDenom = (nK*hourATR);
    hourBBSInd = if (hourDenom <> 0, ((nBB * hourSDev) /hourDenom), 0);
    hourSqueeze = if hourBBSInd < AlertLine then 1 else 0;
    HourMinAggregationPeriod = 1;
}
else {
    hourPrice = 0;
    hourATR = 0;
    hourSDev = 0;
    hourDenom = 0;
    hourBBSInd = 0;
    hourSqueeze = 0;
    HourMinAggregationPeriod = 0;
}
AddLabel(hourSqueeze and HourMinAggregationPeriod, "1h", color.red);
AddLabel(!hourSqueeze and HourMinAggregationPeriod,"1h", color.dark_green);

def Thirty_MinPrice;
def Thirty_MinATR;
def Thirty_MinSDev;
def Thirty_MinDenom;
def Thirty_MinBBSInd;
def Thirty_MinSqueeze;
def ThirtyMinAggregationPeriod;
if GetAggregationPeriod() <= AggregationPeriod.Thirty_Min {
    Thirty_MinPrice = close(period="30 Min");
    Thirty_MinATR = Average(TrueRange(high (period="30 Min"), close(period="30 Min"), low(period="30 Min")), Length);
    Thirty_MinSDev = stdev(Thirty_MinPrice, Length);
    Thirty_MinDenom = (nK*Thirty_MinATR);
    Thirty_MinBBSInd = if (Thirty_MinDenom <> 0, ((nBB * Thirty_MinSDev) /Thirty_MinDenom), 0);
    Thirty_MinSqueeze = if Thirty_MinBBSInd < AlertLine then 1 else 0;
    ThirtyMinAggregationPeriod = 1;
}
else {
    Thirty_MinPrice = 0;
    Thirty_MinATR = 0;
    Thirty_MinSDev = 0;
    Thirty_MinDenom = 0;
    Thirty_MinBBSInd = 0;
    Thirty_MinSqueeze = 0;
    ThirtyMinAggregationPeriod = 0;
}
AddLabel(Thirty_MinSqueeze and ThirtyMinAggregationPeriod, "30m", color.red);
AddLabel(!Thirty_MinSqueeze and ThirtyMinAggregationPeriod,"30m", color.dark_green);

def Twenty_MinPrice;
def Twenty_MinATR;
def Twenty_MinSDev;
def Twenty_MinDenom;
def Twenty_MinBBSInd;
def Twenty_MinSqueeze;
def TwentyMinAggregationPeriod;
if GetAggregationPeriod() <= AggregationPeriod.Twenty_Min {
    Twenty_MinPrice = close(period="20 Min");
    Twenty_MinATR = Average(TrueRange(high (period="20 Min"), close(period="20 Min"), low(period="20 Min")), Length);
    Twenty_MinSDev = stdev(Twenty_MinPrice, Length);
    Twenty_MinDenom = (nK*Twenty_MinATR);
    Twenty_MinBBSInd = if (Twenty_MinDenom <> 0, ((nBB * Twenty_MinSDev) /Twenty_MinDenom), 0);
    Twenty_MinSqueeze = if Twenty_MinBBSInd < AlertLine then 1 else 0;
    TwentyMinAggregationPeriod = 1;
}
else {
    Twenty_MinPrice = 0;
    Twenty_MinATR = 0;
    Twenty_MinSDev = 0;
    Twenty_MinDenom = 0;
    Twenty_MinBBSInd = 0;
    Twenty_MinSqueeze = 0;
    TwentyMinAggregationPeriod = 0;
}
AddLabel(Twenty_MinSqueeze and TwentyMinAggregationPeriod, "20m", color.red);
AddLabel(!Twenty_MinSqueeze and TwentyMinAggregationPeriod,"20m", color.dark_green);


def Fifteen_MinPrice;
def Fifteen_MinATR;
def Fifteen_MinSDev;
def Fifteen_MinDenom;
def Fifteen_MinBBSInd;
def Fifteen_MinSqueeze;
def FifteenMinAggregationPeriod;
if GetAggregationPeriod() <= AggregationPeriod.Fifteen_Min {
    Fifteen_MinPrice = close(period="15 Min");
    Fifteen_MinATR = Average(TrueRange(high (period="15 Min"), close(period="15 Min"), low(period="15 Min")), Length);
    Fifteen_MinSDev = stdev(Fifteen_MinPrice, Length);
    Fifteen_MinDenom = (nK*Fifteen_MinATR);
    Fifteen_MinBBSInd = if (Fifteen_MinDenom <> 0, ((nBB * Fifteen_MinSDev) /Fifteen_MinDenom), 0);
    Fifteen_MinSqueeze = if Fifteen_MinBBSInd < AlertLine then 1 else 0;
    FifteenMinAggregationPeriod = 1;
}
else {
    Fifteen_MinPrice = 0;
    Fifteen_MinATR = 0;
    Fifteen_MinSDev = 0;
    Fifteen_MinDenom = 0;
    Fifteen_MinBBSInd = 0;
    Fifteen_MinSqueeze = 0;
    FifteenMinAggregationPeriod = 0;
}
AddLabel(Fifteen_MinSqueeze and FifteenMinAggregationPeriod, "15m", color.red);
AddLabel(!Fifteen_MinSqueeze and FifteenMinAggregationPeriod,"15m", color.dark_green);

def Ten_MinPrice;
def Ten_MinATR;
def Ten_MinSDev;
def Ten_MinDenom;
def Ten_MinBBSInd;
def Ten_MinSqueeze;
def TenMinAggregationPeriod;
if GetAggregationPeriod() <= AggregationPeriod.Ten_Min {
    Ten_MinPrice = close(period="10 Min");
    Ten_MinATR = Average(TrueRange(high (period="10 Min"), close(period="10 Min"), low(period="10 Min")), Length);
    Ten_MinSDev = stdev(Ten_MinPrice, Length);
    Ten_MinDenom = (nK*Ten_MinATR);
    Ten_MinBBSInd = if (Ten_MinDenom <> 0, ((nBB * Ten_MinSDev) /Ten_MinDenom), 0);
    Ten_MinSqueeze = if Ten_MinBBSInd < AlertLine then 1 else 0;
    TenMinAggregationPeriod = 1;
}
else {
    Ten_MinPrice = 0;
    Ten_MinATR = 0;
    Ten_MinSDev = 0;
    Ten_MinDenom = 0;
    Ten_MinBBSInd = 0;
    Ten_MinSqueeze = 0;
    TenMinAggregationPeriod = 0;
}
AddLabel(Ten_MinSqueeze and TenMinAggregationPeriod, "10m", color.red);
AddLabel(!Ten_MinSqueeze and TenMinAggregationPeriod,"10m", color.dark_green);


def Five_MinPrice;
def Five_MinATR;
def Five_MinSDev;
def Five_MinDenom;
def Five_MinBBSInd;
def Five_MinSqueeze;
def FiveMinAggregationPeriod;
if GetAggregationPeriod() <= AggregationPeriod.Five_Min {
    Five_MinPrice = close(period="5 Min");
    Five_MinATR = Average(TrueRange(high (period="5 Min"), close(period="5 Min"), low(period="5 Min")), Length);
    Five_MinSDev = stdev(Five_MinPrice, Length);
    Five_MinDenom = (nK*Five_MinATR);
    Five_MinBBSInd = if (Five_MinDenom <> 0, ((nBB * Five_MinSDev) /Five_MinDenom), 0);
    Five_MinSqueeze = if Five_MinBBSInd < AlertLine then 1 else 0;
    FiveMinAggregationPeriod = 1;
}
else {
    Five_MinPrice = 0;
    Five_MinATR = 0;
    Five_MinSDev = 0;
    Five_MinDenom = 0;
    Five_MinBBSInd = 0;
    Five_MinSqueeze = 0;
    FiveMinAggregationPeriod = 0;
}
AddLabel(Five_MinSqueeze and FiveMinAggregationPeriod, "5m", color.red);
AddLabel(!Five_MinSqueeze and FiveMinAggregationPeriod,"5m", color.dark_green);


def Four_MinPrice;
def Four_MinATR;
def Four_MinSDev;
def Four_MinDenom;
def Four_MinBBSInd;
def Four_MinSqueeze;
def FourMinAggregationPeriod;
if GetAggregationPeriod() <= AggregationPeriod.Four_Min {
    Four_MinPrice = close(period="4 Min");
    Four_MinATR = Average(TrueRange(high (period="4 Min"), close(period="4 Min"), low(period="4 Min")), Length);
    Four_MinSDev = stdev(Four_MinPrice, Length);
    Four_MinDenom = (nK*Four_MinATR);
    Four_MinBBSInd = if (Four_MinDenom <> 0, ((nBB * Four_MinSDev) /Four_MinDenom), 0);
    Four_MinSqueeze = if Four_MinBBSInd < AlertLine then 1 else 0;
    FourMinAggregationPeriod = 1;
}
else {
    Four_MinPrice = 0;
    Four_MinATR = 0;
    Four_MinSDev = 0;
    Four_MinDenom = 0;
    Four_MinBBSInd = 0;
    Four_MinSqueeze = 0;
    FourMinAggregationPeriod = 0;
}
AddLabel(Four_MinSqueeze and FourMinAggregationPeriod, "4m", color.red);
AddLabel(!Four_MinSqueeze and FourMinAggregationPeriod,"4m", color.dark_green);


def Three_MinPrice;
def Three_MinATR;
def Three_MinSDev;
def Three_MinDenom;
def Three_MinBBSInd;
def Three_MinSqueeze;
def ThreeMinAggregationPeriod;
if GetAggregationPeriod() <= AggregationPeriod.Three_Min {
    Three_MinPrice = close(period="3 Min");
    Three_MinATR = Average(TrueRange(high (period="3 Min"), close(period="3 Min"), low(period="3 Min")), Length);
    Three_MinSDev = stdev(Three_MinPrice, Length);
    Three_MinDenom = (nK*Three_MinATR);
    Three_MinBBSInd = if (Three_MinDenom <> 0, ((nBB * Three_MinSDev) /Three_MinDenom), 0);
    Three_MinSqueeze = if Three_MinBBSInd < AlertLine then 1 else 0;
    ThreeMinAggregationPeriod = 1;
}
else {
    Three_MinPrice = 0;
    Three_MinATR = 0;
    Three_MinSDev = 0;
    Three_MinDenom = 0;
    Three_MinBBSInd = 0;
    Three_MinSqueeze = 0;
    ThreeMinAggregationPeriod = 0;
}
AddLabel(Three_MinSqueeze and ThreeMinAggregationPeriod, "3m", color.red);
AddLabel(!Three_MinSqueeze and ThreeMinAggregationPeriod,"3m", color.dark_green);


def Two_MinPrice;
def Two_MinATR;
def Two_MinSDev;
def Two_MinDenom;
def Two_MinBBSInd;
def Two_MinSqueeze;
def twoMinAggregationPeriod;
if GetAggregationPeriod() <= AggregationPeriod.Two_Min {
    Two_MinPrice = close(period="2 Min");
    Two_MinATR = Average(TrueRange(high (period="2 Min"), close(period="2 Min"), low(period="2 Min")), Length);
    Two_MinSDev = stdev(Two_MinPrice, Length);
    Two_MinDenom = (nK*Two_MinATR);
    Two_MinBBSInd = if (Two_MinDenom <> 0, ((nBB * Two_MinSDev) /Two_MinDenom), 0);
    Two_MinSqueeze = if Two_MinBBSInd < AlertLine then 1 else 0;
    twoMinAggregationPeriod = 1;
}
else {
    Two_MinPrice = 0;
    Two_MinATR = 0;
    Two_MinSDev = 0;
    Two_MinDenom = 0;
    Two_MinBBSInd = 0;
    Two_MinSqueeze = 0;
    twoMinAggregationPeriod = 0;
}
AddLabel(Two_MinSqueeze and twoMinAggregationPeriod, "2m", color.red);
AddLabel(!Two_MinSqueeze and twoMinAggregationPeriod,"2m", color.dark_green);


def One_MinPrice;
def One_MinATR;
def One_MinSDev;
def One_MinDenom;
def One_MinBBSInd;
def One_MinSqueeze;
def minAggregationPeriod;

if GetAggregationPeriod() <= AggregationPeriod.Min {
    One_MinPrice = close(period="1 Min");
    One_MinATR = Average(TrueRange(high (period="1 Min"), close(period="1 Min"), low(period="1 Min")), Length);
    One_MinSDev = stdev(One_MinPrice, Length);
    One_MinDenom = (nK*One_MinATR);
    One_MinBBSInd = if (One_MinDenom <> 0, ((nBB * One_MinSDev) /One_MinDenom), 0);
    One_MinSqueeze = if One_MinBBSInd < AlertLine then 1 else 0;
    minAggregationPeriod = 1;
}
else {
    One_MinPrice = 0;
    One_MinATR = 0;
    One_MinSDev = 0;
    One_MinDenom = 0;
    One_MinBBSInd = 0;
    One_MinSqueeze = 0;
    minAggregationPeriod = 0;
}
AddLabel(One_MinSqueeze and minAggregationPeriod, "1m", color.red);
AddLabel(!One_MinSqueeze and minAggregationPeriod,"1m", color.dark_green);

