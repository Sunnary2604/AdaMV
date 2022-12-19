# -*- coding: utf-8 -*-
"""
Created on Tue Jan 19 16:19:56 2021

@author: 哲
"""
import pandas as pd
import math
df = pd.read_csv("F:/GitHub/LayoutCMV_Code-Paper/show-system/01-06-2021.csv")
long=[]
lat=[]
number=[]
country=[]
total=0
for i in range(df.shape[0]):
    if(i!=0 and (df.iloc[i]["Country_Region"]==df.iloc[i-1]["Country_Region"])):
        total=total+df.iloc[i]["Confirmed"]
    if(i!=0 and (df.iloc[i]["Country_Region"]==df.iloc[i-1]["Country_Region"]) and 
         (df.iloc[i]["Country_Region"]!=df.iloc[i+1]["Country_Region"])):
        number.append(math.sqrt(total))
        total=0
    elif (i==0 or i==df.shape[0]-1 or((df.iloc[i]["Country_Region"]!=df.iloc[i-1]["Country_Region"]) and 
         (df.iloc[i]["Country_Region"]!=df.iloc[i+1]["Country_Region"]))):
        number.append(math.sqrt(df.iloc[i]["Confirmed"]))
    if(df.iloc[i]["Whethercapital"]=="Y"):
        long.append(df.iloc[i]["Long"])
        lat.append(df.iloc[i]["Lat"]+1.4)
        country.append(df.iloc[i]["Country_Region"])
dataframe=pd.DataFrame({'Confirmed':number,'Long':long,'Lat':lat,'country':country})
dataframe.to_csv("map.csv",index=False,sep=',')
