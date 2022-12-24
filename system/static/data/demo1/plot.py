# -*- coding: utf-8 -*-
"""
Created on Thu Jan 14 13:54:21 2021

@author: 哲
"""
import pandas as pd
import math
df = pd.read_csv("F:/GitHub/LayoutCMV_Code-Paper/show-system/demo1/owid-covid-data.csv")
death_m=[]
deaths=[]
cases=[]
country=[]
for i in range(df.shape[0]):
    if(df.iloc[i]["date"]=="2020/12/31"):
        cases.append(round(math.log(df.iloc[i]["total_cases"],10),4))
        deaths.append(round(math.log(df.iloc[i]["total_deaths"],10),4))
        country.append(df.iloc[i]["location"])
        death_m.append(math.sqrt(df.iloc[i]["total_deaths_per_million"]))
dataframe=pd.DataFrame({'country':country,'Total deaths(lg)':deaths,'Total cases(lg)':cases,'deaths per million':death_m})
dataframe.to_csv("plot-covid-data.csv",index=False,sep=',')
