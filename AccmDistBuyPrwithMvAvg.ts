#Follow @KRose_TDA on twitter for updates to this and other scripts
#this script provides 2 moving averages of the study chosen
#default study in OnBalanceVolume Volume
declare lower;

#place the study desired after reference in the line below you must include the brackets "()"
#Initial study is OnBalanceVolume
#plot MyStudy = reference OnBalanceVolume();
input zeroLine = yes;
input Moving_Averge_One_Length = 12;
input Moving_Averge_Two_Length = 50;
input Line_Weight_MyStudy = 1;
input Line_Weight_Moving_Average_One = 1;
input Line_Weight_Moving_Average_Two = 1;


plot MyStudy = reference AccumDistBuyPr();
MyStudy.SetDefaultColor(GetColor(4));
MyStudy.setlineWeight(Line_Weight_MyStudy);

plot MaOne = Average(mystudy, Moving_Averge_One_Length);

MaOne.SetDefaultColor(GetColor(6));
MaOne.setlineWeight(Line_Weight_Moving_Average_One);

Plot MaTwo = Average(mystudy, Moving_Averge_Two_Length);

MaTwo.SetDefaultColor(GetColor(8));
MaTwo.setlineWeight(Line_Weight_Moving_Average_Two);

plot zero = if zeroLine then 0 else Double.NaN;
zero.setDefaultColor(color.LIGHT_GRAY);
zero.setLineWeight(2);

# plot bearishReversalSignal = if MaOne > MaTwo and MyStudy > MaOne and CCI() <= 100 and CCI()[1] > 100 and Highest(CCI(), 10) >= 120 then MyStudy else Double.NaN;
plot bearishReversalSignal = if MyStudy <= MaOne and MyStudy[1] > MaOne[1] and MaOne > MaTwo and Highest(CCI(), 7) > 100  then MyStudy else Double.NaN;
bearishReversalSignal.setpaintingStrategy(PaintingStrategy.ARROW_DOWN);
bearishReversalSignal.setlineWeight(3);

# plot bullishReversalSignal = if (MyStudy > MaTwo or MyStudy > MaOne or MaOne > MaTwo) and CCI()[1] < -100 and CCI() >= -100 then MyStudy else Double.NaN;
plot bullishReversalSignal = if MyStudy >= MaOne and MyStudy[1] < MaOne[1] and (MaOne < MaTwo or MaOne - MaTwo < 5) and Lowest(CCI(), 7) < -100 and CCI() < 50 then MyStudy else Double.NaN;
bullishReversalSignal.setpaintingStrategy(PaintingStrategy.Arrow_UP);
bullishReversalSignal.setlineWeight(3);


