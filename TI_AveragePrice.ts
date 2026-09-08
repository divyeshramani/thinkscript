# Plot Average Open Price
def avgPrice = GetAveragePrice();
plot AvgPriceLine = if !IsNaN(avgPrice) and avgPrice > 0 then avgPrice else Double.NaN;

# Styling
AvgPriceLine.SetPaintingStrategy(PaintingStrategy.HORIZONTAL);
AvgPriceLine.SetDefaultColor(Color.CYAN);
AvgPriceLine.SetStyle(Curve.SHORT_DASH);
AvgPriceLine.SetLineWeight(1);