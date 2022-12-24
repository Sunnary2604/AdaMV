# -*- coding: utf-8 -*-
"""
Created on Wed Mar 17 13:23:18 2021

@author: 哲
"""
import pandas as pd 
import numpy as np
import math
df = pd.read_csv("./original.csv")
ef=pd.read_csv("../demo1/map.csv")
country=[]
date=np.arange(1970,2011)
total=np.zeros(41)
Rate=np.zeros(41)
map_rate=[]
for i in range(df.shape[0]):
    if(df.iloc[i]["Sex"]=="Both" and df.iloc[i]["Age Group"]=="All ages" 
       and df.iloc[i]["Year"]==2010):
        country.append(df.iloc[i]["Country Name"])
        map_rate.append(pd.to_numeric(df.iloc[i]["Death Rate Per 100,000"].replace(",",""))*10)
    if(df.iloc[i]["Sex"]=="Both" and df.iloc[i]["Age Group"]=="All ages"):
        total[df.iloc[i]["Year"]-1970]=total[df.iloc[i]["Year"]-1970]+pd.to_numeric(df.iloc[i]["Number of Deaths"].replace(",",""))
        Rate[df.iloc[i]["Year"]-1970]=Rate[df.iloc[i]["Year"]-1970]+pd.to_numeric(df.iloc[i]["Death Rate Per 100,000"].replace(",",""))*10
Lat=np.zeros(len(country))
Long=np.zeros(len(country))
for i in range(len(country)):
    for j in range(ef.shape[0]):
        if(ef.iloc[j]["country"]==country[i]):
            Long[i]=ef.iloc[j]["Long"]
            Lat[i]=ef.iloc[j]["Lat"]
            break
for i in range(len(Rate)):
    Rate[i]=Rate[i]/len(country)
for i in range(len(total)):
    total[i]=total[i]/1000000
dataframe=pd.DataFrame({'country':country,'deaths per million':map_rate,'Long':Long,'Lat':Lat})
dataframe.to_csv("map.csv",index=False,sep=',')
dataframe=pd.DataFrame({'date':date,'deaths number(M)':total})
dataframe.to_csv("area_1.csv",index=False,sep=',')
dataframe=pd.DataFrame({'date':date,'deaths per million':Rate})
dataframe.to_csv("area_2.csv",index=False,sep=',')
