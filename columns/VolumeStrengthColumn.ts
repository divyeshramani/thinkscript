
def length = 7;
def vol_avg = average(volume, 50)[1];

# def exceed_vol_avg = if close > open and volume >= vol_avg then 1 else if close < open and volume >= vol_avg then -1 else 0;
def exceed_vol_avg = if volume >= vol_avg then 1 else 0;

def exceed_vol_ratio = if close > open and volume >= vol_avg then volume / vol_avg else if close < open and volume > vol_avg then - volume / vol_avg else 0;

def sum_vol = Round(Sum(exceed_vol_avg, length)[1],1); 
def sum_vol_ratio = Round(Sum(exceed_vol_ratio, length)[1],1);

def denominator = if sum_vol == 0 then 1 else sum_vol;

def bull_strength = sum_vol_ratio / denominator;

AddLabel(yes, Round(bull_strength,1) , color.black);
#AddLabel(yes, vol_avg , color.black);

AssignBackgroundColor(if bull_strength >= length/3 then color.green else if bull_strength <= -length /3 then color.red else color.gray);