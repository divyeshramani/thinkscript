def  volumeCondition = RelativeVolumeStDev(50).RelVol >= 3;

# Scanning to see where we see greater than 3+ SD volume on 3 out of last 5 days. 
plot signal = Sum(volumeCondition, 5) >= 3;
