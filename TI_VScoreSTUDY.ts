#TOS Indicators - Home of the Volatility Box
#Full YouTube Tutorial: https://youtu.be/mAPEodczf-k
#
#**10/6/19 - Feature Added: Ability for Users to Set Custom Standard Deviation in Label Output

declare lower;
input anchorDate = 20180901;
input barsGoBack = 120;
input showStopLabel = yes;
input devStop = {default One, Two, Three, Zero, NegOne, NegTwo, NegThree, Custom};
input customDev = 0.15;
def chosenDev;
switch(devStop){
case One:
    chosenDev = 1;
case Two:
    chosenDev = 2;
case Three:
    chosenDev = 3;
case Zero:
    chosenDev = 0;
case NegOne:
    chosenDev = -1;
case NegTwo:
    chosenDev = -2;
case NegThree:
    chosenDev = -3;
case Custom:
    chosenDev = customDev;
}



def postAnchorDate = if GetYYYYMMDD() >= anchorDate then 1 else 0;


def yyyyMmDd = getYyyyMmDd();
def periodIndx = if getAggregationPeriod() < AggregationPeriod.HOUR then yyyyMMDD else postAnchorDate;
def isPeriodRolled = compoundValue(1, periodIndx != periodIndx[1], yes);

def volumeSum;
def volumeVwapSum;
def volumeVwap2Sum;

if (isPeriodRolled) {
    volumeSum = volume;
    volumeVwapSum = volume * vwap;
    volumeVwap2Sum = volume * Sqr(vwap);
} else {
    volumeSum = compoundValue(1, volumeSum[1] + volume, volume);
    volumeVwapSum = compoundValue(1, volumeVwapSum[1] + volume * vwap, volume * vwap);
    volumeVwap2Sum = compoundValue(1, volumeVwap2Sum[1] + volume * Sqr(vwap), volume * Sqr(vwap));
}
def price = volumeVwapSum / volumeSum;
def deviation = Sqrt(Max(volumeVwap2Sum / volumeSum - Sqr(price), 0));

plot VScore = if (((price - close)*(-1))/deviation) > 5 or (((price - close)*(-1))/deviation) < -5 then 0 else (((price - close)*(-1))/(deviation));
plot zero = 0;
plot one = 1;
plot two = 2;
plot three = 3;
plot negOne = -1;
plot negTwo = -2;
plot negThree = -3;
plot posInt = 0.3;
plot negInt = -0.3;

def stopPrice = (chosenDev)*(deviation) + (price);
# AddLabel(showStopLabel, "Price at ["+chosenDev+"] SD: "+AsPrice(Round(stopPrice,2)),color.white);

AddLabel(showStopLabel, "SD: "+AsPrice(Round(deviation,2)) + " ",color.light_gray);
AddLabel(showStopLabel, "Midpoint: "+AsPrice(Round(price,2)) + " ",color.white);
AddLabel(showStopLabel, "[.3] SD: "+AsPrice(Round((0.3) * (deviation) + (price) ,2)) + " ",color.light_gray);
AddLabel(showStopLabel, "[1] SD: "+AsPrice(Round((deviation) + (price) ,2)) + " ",color.light_green);
AddLabel(showStopLabel, "[2] SD: "+AsPrice(Round((2)*(deviation) + (price) ,2)) + " ",color.green);
AddLabel(showStopLabel, "[3] SD: "+AsPrice(Round((3)*(deviation) + (price) ,2)) + " ",color.dark_green);

AddLabel(showStopLabel, "[-.3] SD: "+AsPrice(Round((-0.3) * (deviation) + (price) ,2)) + " ",color.light_gray);
AddLabel(showStopLabel, "[-1] SD: "+AsPrice(Round((-1)*(deviation) + (price) ,2)) + " ",color.orange);
AddLabel(showStopLabel, "[-2] SD: "+AsPrice(Round((-2)*(deviation) + (price) ,2)) + " ",color.light_red);
AddLabel(showStopLabel, "[-3] SD: "+AsPrice(Round((-3)*(deviation) + (price) ,2)) + " ",color.red);

def zeroAndOne = if VScore > zero and VScore <= one then 1 else 0;
def oneAndTwo = if VScore > one and VScore <= two then 1 else 0;
def twoAndThree = if VScore > two and VScore <= three then 1 else 0;

def negZeroAndOne = if VScore > negOne and VScore < zero then 1 else 0;
def negOneAndTwo = if VScore > negTwo and VScore <= negOne then 1 else 0;
def negTwoAndThree = if VScore > negThree and VScore <= negTwo then 1 else 0;

def cloud1;
def cloud2;
if Sum(zeroAndOne, barsGoBack) > Sum(OneAndTwo,barsGoBack) and Sum(zeroAndOne, barsGoBack) > Sum(twoAndThree,barsGoBack) and Sum(zeroAndOne, barsGoBack) > Sum(negZeroAndOne,barsGoBack) and Sum(zeroAndOne, barsGoBack) > Sum(negoneAndTwo,barsGoBack) and Sum(zeroAndOne, barsGoBack) > Sum(negtwoAndThree,barsGoBack){
    cloud1 = zero;
    cloud2 = one;
}
else if Sum(OneAndTwo, barsGoBack) > Sum(zeroAndOne,barsGoBack) and Sum(OneAndTwo, barsGoBack) > Sum(twoAndThree,barsGoBack) and Sum(OneAndTwo, barsGoBack) > Sum(negZeroAndOne,barsGoBack) and Sum(OneAndTwo, barsGoBack) > Sum(negoneAndTwo,barsGoBack) and Sum(OneAndTwo, barsGoBack) > Sum(negtwoAndThree,barsGoBack){ 
    cloud1 = one;
    cloud2 = two;
}
else if Sum(twoAndThree, barsGoBack) > Sum(zeroAndOne,barsGoBack) and Sum(twoAndThree, barsGoBack) > Sum(oneAndTwo,barsGoBack) and Sum(twoAndThree, barsGoBack) > Sum(negZeroAndOne,barsGoBack) and Sum(twoAndThree, barsGoBack) > Sum(negoneAndTwo,barsGoBack) and Sum(twoAndThree, barsGoBack) > Sum(negtwoAndThree,barsGoBack){ 
    cloud1 = two;
    cloud2 = three;
}
else if Sum(negZeroAndOne, barsGoBack) > Sum(zeroAndOne,barsGoBack) and Sum(negZeroAndOne, barsGoBack) > Sum(oneAndTwo,barsGoBack) and Sum(negZeroAndOne, barsGoBack) > Sum(twoAndThree,barsGoBack) and Sum(negZeroAndOne, barsGoBack) > Sum(negoneAndTwo,barsGoBack) and Sum(negZeroAndOne, barsGoBack) > Sum(negtwoAndThree,barsGoBack){ 
    cloud1 = zero;
    cloud2 = negOne;
}
else if Sum(negoneAndTwo, barsGoBack) > Sum(zeroAndOne,barsGoBack) and Sum(negoneAndTwo, barsGoBack) > Sum(oneAndTwo,barsGoBack) and Sum(negoneAndTwo, barsGoBack) > Sum(twoAndThree,barsGoBack) and Sum(negoneAndTwo, barsGoBack) > Sum(negZeroAndOne,barsGoBack) and Sum(negoneAndTwo, barsGoBack) > Sum(negtwoAndThree,barsGoBack){ 
    cloud1 = negOne;
    cloud2 = negTwo;
}
else if Sum(negtwoAndThree, barsGoBack) > Sum(zeroAndOne,barsGoBack) and Sum(negtwoAndThree, barsGoBack) > Sum(oneAndTwo,barsGoBack) and Sum(negtwoAndThree, barsGoBack) > Sum(twoAndThree,barsGoBack) and Sum(negtwoAndThree, barsGoBack) > Sum(negZeroAndOne,barsGoBack) and Sum(negtwoAndThree, barsGoBack) > Sum(negOneAndTwo,barsGoBack){ 
    cloud1 = negTwo;
    cloud2 = negThree;
}
else {
    cloud1 = Double.nan;
    cloud2 = Double.nan;
}
AddCloud(cloud1, cloud2, color.light_red, color.light_green);


plot BullSignal = if (cloud1 == one or cloud2 == one or cloud1 == two or cloud2 == two or cloud1 == three or cloud2 ==three) and (VScore <= 0.3 and Vscore[1] >0) and CCI() > -100 then -2 else Double.nan;

plot BearSignal = if (cloud1 == negOne or cloud2 == negOne or cloud1 == negTwo or cloud2 == negTwo or cloud1 == negThree or cloud2 ==negThree) and (VScore >= 0.3 and Vscore[1] < 0) and CCI() < 100 then 2 else Double.nan;

BullSignal.SetPaintingStrategy(PaintingStrategy.Arrow_UP);
BearSignal.SetPaintingStrategy(PaintingStrategy.Arrow_DOWN);
BullSignal.SetLineWeight(3);
BearSignal.SetLineWeight(3);

input soundAlertsOn = no;
Alert((cloud1 == one or cloud2 == one or cloud1 == two or cloud2 == two or cloud1 == three or cloud2 == three) and (VScore <= 0 and VScore[1] > 0) and (SoundAlertsOn), "Bullish VScore Entry", Alert.BAR);
Alert((cloud1 == negOne or cloud2 == negone or cloud1 == negtwo or cloud2 == negtwo or cloud1 == negthree or cloud2 == negthree) and (VScore >= 0 and VScore[1] < 0)and (SoundAlertsOn), "Bearish VScore Entry", Alert.BAR);
