def squeeze = if TTM_Squeeze().SqueezeAlert == 0 then 1 else 0;
def sumSqueeze = Sum(squeeze, 10); 
def squeezeFired = if TTM_Squeeze().SqueezeAlert[1] == 0 and TTM_Squeeze().SqueezeAlert == 1 then 1 else 0;

AddLabel(squeezeFired, "Sqz FIRED", color.black);
AddLabel(squeeze, "Sqz Count: "+sumSqueeze, color.white);
AddLabel(!squeezeFired and !squeeze, " ", color.black);

AssignBackgroundColor(if squeezeFired then color.green else if squeeze then color.red else color.black);