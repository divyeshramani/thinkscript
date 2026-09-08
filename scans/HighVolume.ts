# HighVolume Scan
# Find stocks trading with higher volume than 50-day average volume

# Calculate 50-day average volume
def avgVolume50 = Average(volume, 50);

# Current volume is greater than 50-day average
plot signal = volume > avgVolume50;
