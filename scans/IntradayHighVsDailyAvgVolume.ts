# Scan: Intraday volume pace vs average volume per minute
# Avg daily volume (past N completed days) / session minutes = avg vol per minute.
# Today's session vol / minutes since open = current vol per minute.
# Passes when current vol/min >= volumeMultiple * avg vol/min (default: at least double).

input avgDays = 20;
# Regular session length in minutes (US equities RTH 9:30-16:00 = 390)
input sessionMinutes = 390;
# Current pace must be at least this multiple of historical avg vol/min (2 = double)
input volumeMultiple = 2.0;
input requireRTH = yes;
input rthStart = 0930;
input rthEnd = 1600;

def avgDailyVol = Average(volume(period = "DAY")[1], avgDays);
def todaySessionVol = volume(period = "DAY");

def avgVolPerMinute = if sessionMinutes > 0 and avgDailyVol > 0 then avgDailyVol / sessionMinutes else Double.NaN;

def inRTH = SecondsFromTime(rthStart) >= 0 and SecondsTillTime(rthEnd) > 0;
# Minutes elapsed since regular session open (floor to whole minutes, min 1 to avoid spike at open)
def minsSinceOpen = if SecondsFromTime(rthStart) > 0 then Max(1, Floor(SecondsFromTime(rthStart) / 60)) else 0;

def volPerMinuteSoFar = if minsSinceOpen > 0 then todaySessionVol / minsSinceOpen else Double.NaN;

def paceVsHistorical = if !IsNaN(avgVolPerMinute) and avgVolPerMinute > 0 and !IsNaN(volPerMinuteSoFar) then volPerMinuteSoFar / avgVolPerMinute else Double.NaN;

def doublePace = paceVsHistorical >= volumeMultiple;

plot scan = !IsNaN(avgVolPerMinute) and doublePace and (if requireRTH then inRTH else yes);
